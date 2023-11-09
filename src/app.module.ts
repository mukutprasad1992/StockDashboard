import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { StockModule } from './stocks/stock.module';
import { ProfileModule } from './profile/profile.module';
import { FileUploadService } from './utils/file-upload/file-upload.service';
import { UserAnalyticsModule } from './UserAnalatics/userAnalatics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, envFilePath: '.env' }),
    AuthModule,
    StockModule,
    ProfileModule,
    UserAnalyticsModule,


  ],
  controllers: [AppController,],
  providers: [AppService, FileUploadService],
})
export class AppModule { }
