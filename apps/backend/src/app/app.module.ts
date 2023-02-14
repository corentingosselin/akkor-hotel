import { BackendFeatureAuthentificationCoreModule } from '@akkor-hotel/backend/feature-authentification/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/backend/environments/.local.env',
    }),
    BackendFeatureAuthentificationCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
