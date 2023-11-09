import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { UserAnalyticsService } from "./userAnalatics.service";

@Controller('userAnalatics')
export class UserAnalyticsController {

    constructor(private userAnalyticsService: UserAnalyticsService,
    ) { }



    @Get('/getBullish')
    async getBullish(@Res() response): Promise<void> {
        try {
            const getUserInstance = await this.userAnalyticsService.geBullishAnalatics();
            return response.status(HttpStatus.OK).json({
                status: true,
                message: 'User analytics for bullish',
                data: getUserInstance,
            });
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'Analytics not found',
                error: error.message,
            });
        }
    }

    @Get('/getBearish')
    async getBearish(@Res() response): Promise<void> {
        try {
            const getUserInstance = await this.userAnalyticsService.getBearishAnalatics();


            return response.status(HttpStatus.OK).json({
                status: true,
                message: 'User analytics for bearish',
                data: getUserInstance,
            });
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'Analytics not found',
                error: error.message,
            });
        }
    }

}
