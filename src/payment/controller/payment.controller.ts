import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { PaymentDto } from "../payment.dto";
import { PaymentService } from "../service/payment.service";



@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) { }

    @Post('/create')
    async createPayment(@Res() response, @Body() payment: PaymentDto) {
        try {
            payment.status = "pending"
            const createPayment = await this.paymentService.createPayment(payment)
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Payment entered successfully",
                data: createPayment
            })

        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in creating Payment",
                error: error.message
            });
        }
    }

    @Get('/paymentID/:paymentId')
    async cityById(@Param('paymentId') paymentId: string, @Res() Response) {
        try {
            const getPaymentById = await this.paymentService.findOne(paymentId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched payment by Id successfully",
                data: getPaymentById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching payment by id",
                error: error.message
            });

        }
    }
}