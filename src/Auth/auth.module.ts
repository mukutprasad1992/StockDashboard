import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; // Correct import for JwtModule
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/utils/Token/jwt.strategy';
import { EmailService } from 'src/utils/email/email.service';
import { ForgotPasswordService } from './service/forgot-password.service';
import { ForgotPasswordController } from './controller/forgot-password.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT-EXPIRE'),
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController, ForgotPasswordController],
    providers: [AuthService, JwtStrategy, EmailService, ForgotPasswordService],
    exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule { }
