import { Module } from '@nestjs/common';
import { UserAnalyticsController } from './userAnalatics.controller';
import { UserAnalyticsService } from './userAnalatics.service';

@Module({
    controllers: [UserAnalyticsController],
    providers: [UserAnalyticsService],
})
export class UserAnalyticsModule { }