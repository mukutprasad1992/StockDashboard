import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {

    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Please enter correct email' })
    email: string;

    // @IsNotEmpty()
    // phone: number;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmpassword: string;
}