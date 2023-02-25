import { JwtAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { BackendFeatureBookingDataAccessModule } from '@akkor-hotel/backend/feature-booking/data-access';
import { RoleGuard } from '@akkor-hotel/shared/backend/utils';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BookingController } from './controllers/booking.controller';

@Module({
  controllers: [BookingController],
  providers: [RoleGuard, JwtService, JwtAuthGuard],
  exports: [], 
  imports: [BackendFeatureBookingDataAccessModule],
})
export class BackendFeatureBookingFeatureModule {}
