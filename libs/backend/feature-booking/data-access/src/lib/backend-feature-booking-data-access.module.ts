import { BackendFeatureHotelDataAccessModule } from '@akkor-hotel/backend/feature-hotel/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { BookingService } from './services/booking.service';

@Module({
  controllers: [],
  providers: [BookingService],
  exports: [BookingService],
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    BackendFeatureHotelDataAccessModule
  ],
})
export class BackendFeatureBookingDataAccessModule {}
