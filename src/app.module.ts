import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { StockModule } from './stocks/stock.module';
import { ProfileModule } from './profile/profile.module';
import { FileUploadService } from './utils/file-upload/file-upload.service';
import { UserAnalyticsModule } from './UserAnalatics/userAnalatics.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, envFilePath: '.env' }),
    AuthModule,
    StockModule,
    ProfileModule,
    UserAnalyticsModule,
    PaymentModule,


  ],
  controllers: [AppController,],
  providers: [AppService, FileUploadService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // Apply the authentication middleware globally to all routes
    consumer.apply(AuthenticationMiddleware).forRoutes('user/getUser/:userId');
    consumer.apply(AuthenticationMiddleware).forRoutes('user/getAll');   //delete
    consumer.apply(AuthenticationMiddleware).forRoutes('user/delete');   //update
    consumer.apply(AuthenticationMiddleware).forRoutes('user/update/:userid');  //get
    // consumer.apply(AuthenticationMiddleware).forRoutes('profile/getProfile/:userid');
    consumer.apply(AuthenticationMiddleware).forRoutes('profile/upload');
    consumer.apply(AuthenticationMiddleware).forRoutes('payment');
  }
}
