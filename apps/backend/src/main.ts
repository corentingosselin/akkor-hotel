/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import 'mysql2';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: true,
      stopAtFirstError: true,
      forbidUnknownValues: true,
      skipMissingProperties: true,

    }),
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // inject configservice
  const configService = app.get(ConfigService);
  console.log(configService.get('BACKEND_PORT'));
  console.log(process.env.BACKEND_PORT);

  const port = configService.get('BACKEND_PORT') || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
