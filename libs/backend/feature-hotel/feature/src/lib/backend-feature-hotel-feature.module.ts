import { BackendFeatureHotelDataAccessModule } from '@akkor-hotel/backend/feature-hotel/data-access';
import { RoleGuard } from '@akkor-hotel/shared/backend/utils';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HotelController } from './controllers/hotel.controller';

@Module({
  controllers: [HotelController],
  providers: [RoleGuard, JwtService],
  exports: [],
  imports: [
    BackendFeatureHotelDataAccessModule
  ],
})
export class BackendFeatureHotelFeatureModule {}
