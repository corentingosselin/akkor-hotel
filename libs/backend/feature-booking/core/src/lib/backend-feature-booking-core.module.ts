import { BackendFeatureBookingFeatureModule } from '@akkor-hotel/backend/feature-booking/feature';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    BackendFeatureBookingFeatureModule
  ],
})
export class BackendFeatureBookingCoreModule {}
