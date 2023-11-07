import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });

  const configService: ConfigService = app.get(ConfigService);
  const firebaseConfig: ServiceAccount = {
    type: configService.get<string>('TYPE'),
    project_id: configService.get<string>('PROJECT_ID'),
    private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
    private_key: configService.get<string>('PRIVATE_KEY'),
    client_email: configService.get<string>('CLIENT_EMAIL'),
    client_id: configService.get<string>('CLIENT_ID'),
    auth_uri: configService.get<string>('AUTH_URI'),
    token_uri: configService.get<string>('TOKEN_URI'),
    auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
    client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
    universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
  } as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
    storageBucket: `${firebaseConfig.projectId}.appspot.com`,
  });

  await app.listen(3000);
}
bootstrap();
