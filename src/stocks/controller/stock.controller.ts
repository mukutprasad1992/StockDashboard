import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { StockService } from "../service/stock.service";

@Controller('allStock')
export class StockController {

    constructor(private readonly stockService: StockService) { }


    @Get('/data')
    async getStockData(@Res() response): Promise<any> {
        const data = await this.stockService.getStockData();

        return response.status(HttpStatus.OK).json({
            status: true,
            message: 'User found',
            data: data,
        });
    }

}