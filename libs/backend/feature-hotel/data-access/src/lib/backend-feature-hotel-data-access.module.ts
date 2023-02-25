import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { HotelService } from './services/hotel.service';

@Module({
  controllers: [],
  providers: [HotelService],
  exports: [HotelService],
  imports: [
    TypeOrmModule.forFeature([HotelEntity])
  ],
})
export class BackendFeatureHotelDataAccessModule {}
