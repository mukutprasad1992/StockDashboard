import { DefaultValuePipe } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export class PaymentDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    amount: number;

    status: string = "pending";

    @IsNotEmpty()
    @IsString()
    paymentMode: string;

    createdAt: Date;

    updatedAt: Date;
}
