import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { UserDTO } from "src/user.dto";
import { ForgotPasswordDto } from '../dto/forgot-password.dto'
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/utils/email/email.service";
import * as bcrypt from "bcrypt"


@Injectable()
export class ForgotPasswordService {

    constructor(
        private jwtService: JwtService,
        private emailService: EmailService
    ) { }

    async sendPasswordResetEmail(ForgotPasswordDto: ForgotPasswordDto): Promise<any> {
        const { email } = ForgotPasswordDto;
        const usersCollection = admin.firestore().collection('users');
        const query = usersCollection.where('email', '==', email).limit(1);

        const userQuerySnapshot = await query.get();
        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data() as UserDTO;

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();
            if (!userDoc) {
                throw new UnauthorizedException('User is not exist ');
            }
            const resetToken = this.jwtService.sign({ id: userDoc.id });

            const resetLink = `http://localhost:4200/auth/createpasswors/${resetToken}`;
            const subject: any = "Reset Password ";
            const html: any = `<!DOCTYPE html>
    <html>
    <head>
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
        <h1>Password Reset</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hello ${userData.name},</p>
        <p>We received a request to reset your password for ${userData.name}.</p>
        <p>If you didn't make this request, you can ignore this email. Otherwise, you can reset your password using the link below:</p>
        <p><a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none;">${resetLink}</a></p>
        <p>This link will expire in 10 minuts.</p>
        <p>If you have any questions or need assistance, please contact our support team at [Support Email].</p>
        <p>Best regards,<br>Stock-Dashboard Team</p>
      </div>
      <div style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
        <p>&copy; 2023 Stock-Dashboard. All rights reserved.</p>
      </div>
    </body>
    `;
            try {
                await this.emailService.sendEmail(userData.email, subject, html);
                return { message: 'Email sent successfully' };
            } catch (error) {
                return { message: 'Failed to send email' };
            }
        }

    }


    async resetPassword(resetToken: string, newPassword: string): Promise<any> {
        try {
            const decodedToken = await this.jwtService.verify(resetToken);
            const userId = decodedToken.id;
            const usersCollection = admin.firestore().collection('users');
            const userDocRef = usersCollection.doc(userId);

            // Fetch the user's data
            const userDoc = await userDocRef.get();

            if (!userDoc.exists) {
                throw new UnauthorizedException('Invalid token');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in Firestore
            await userDocRef.update({
                password: hashedPassword,
            });

            return { message: 'Password change successfully' };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}