import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from "src/user.dto";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
    ) { }


    async login(loginDto: LoginDto): Promise<UserDTO> {
        try {
            // Find the user document by email
            const { email, password } = loginDto
            const userCollection = admin.firestore().collection('users');
            const query = userCollection.where('email', '==', email).limit(1);
            const userQuerySnapshot = await query.get();
            console.log(userQuerySnapshot)

            if (userQuerySnapshot.empty) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data() as UserDTO;
            const isPasswordMatched = await bcrypt.compare(password, userData.password)

            // Check if the provided password matches the stored password
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Invalid email or password');
            }
            const token = this.jwtService.sign({ id: userDoc.id });
            const getUser = userData;
            delete getUser.password
            const result: any = { token: token, getUser: getUser }
            return result;
        } catch (error) {
            // Catch any errors and throw a standardized exception
            throw new UnauthorizedException('Login faild', ' ' + error);
        }
    }

    verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt)
    }

}