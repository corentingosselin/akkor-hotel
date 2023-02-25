import { BackendFeatureAuthentificationCoreModule } from '@akkor-hotel/backend/feature-authentification/core';
import { BackendFeatureUserCoreModule } from '@akkor-hotel/backend/feature-user/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendFeatureHotelCoreModule } from '@akkor-hotel/backend/feature-hotel/core';
import { BackendFeatureBookingCoreModule } from '@akkor-hotel/backend/feature-booking/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/backend/environments/.local.env',
    }),
    BackendFeatureAuthentificationCoreModule,
    BackendFeatureUserCoreModule,
    BackendFeatureHotelCoreModule,
    BackendFeatureBookingCoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
