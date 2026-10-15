import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable cookie parsing for HttpOnly authentication cookies
  app.use(cookieParser());

  const port = configService.get<number>('PORT', 4000);
  const configuredCorsOrigin = configService.get<string>('CORS_ORIGIN', '');

  const defaultOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ];

  const allowedOrigins = configuredCorsOrigin
    ? [...defaultOrigins, ...configuredCorsOrigin.split(',').map((o) => o.trim())]
    : defaultOrigins;

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Hamilton Hotel API is running on http://localhost:${port}`);
}

bootstrap();
