import { Controller, Param, Post, Body, UnauthorizedException, } from '@nestjs/common';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto'


@Controller('forgot-password')
export class ForgotPasswordController {
    constructor(private readonly forgotPasswordService: ForgotPasswordService) { }

    @Post('/forgot-password')
    async forgotPassword(@Body() ForgotPasswordDto: ForgotPasswordDto): Promise<any> {
        return this.forgotPasswordService.sendPasswordResetEmail(ForgotPasswordDto);
    }

    @Post('/resetNewPassword')
    async ForgotPassword(
        @Body('token') token: string,
        @Body('newPassword') newPassword: string,
        @Body('confirmpassword') confirmPassword: string,
    ): Promise<any> {
        try {
            if (confirmPassword !== newPassword) {
                throw new UnauthorizedException('Password mismatch');
            }

            return await this.forgotPasswordService.resetPassword(token, newPassword);
        } catch (error) {
            // Handle the error based on its type
            if (error instanceof UnauthorizedException) {
                throw error; // Re-throw the UnauthorizedException as-is
            } else {
                // Handle other types of errors (e.g., log the error and throw a generic error)
                console.error('An unexpected error occurred:', error);
                throw new UnauthorizedException('An unexpected error occurred');
            }
        }
    }
}