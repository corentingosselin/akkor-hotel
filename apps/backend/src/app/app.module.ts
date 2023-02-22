import { BackendFeatureAuthentificationCoreModule } from '@akkor-hotel/backend/feature-authentification/core';
import { BackendFeatureUserCoreModule } from '@akkor-hotel/backend/feature-user/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/backend/environments/.local.env',  
    }),
    BackendFeatureAuthentificationCoreModule,
    BackendFeatureUserCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
