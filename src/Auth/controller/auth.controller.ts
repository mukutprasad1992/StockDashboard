import { Controller, Res, Post, Body, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res() res): Promise<void> {
        const data = await this.authService.login(loginDto);

        if (!data) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                status: false,
                message: 'Invalid credentials',
            });
            return;
        }

        res.status(HttpStatus.OK).json({
            status: true,
            message: 'Login successfully',
            data,  // Include the token in the response
        });
    }
}