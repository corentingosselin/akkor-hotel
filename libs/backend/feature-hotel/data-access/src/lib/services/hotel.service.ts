import {
  CreatedHotelResponse,
  CreateHotelDto,
  UpdateHotelDto,
} from '@akkor-hotel/shared/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelEntity } from '../entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntity)
    private hotelRepository: Repository<HotelEntity>
  ) {}

  //List all hotel and allow you to sort by date, name, location with a limit (default limit is 10 but can be changed with a parameter)
  async findAll(sortBy = 'id', limit = 10) {
    const queryBuilder = this.hotelRepository.createQueryBuilder('hotel');
    switch (sortBy) {
      case 'name':
        queryBuilder.orderBy('hotel.name', 'ASC');
        break;
      case 'city':
        queryBuilder.orderBy('hotel.city', 'ASC');
        break;
      case 'date':
        queryBuilder.orderBy('hotel.created_at', 'ASC');
        break;
      default:
        queryBuilder.orderBy('hotel.id', 'ASC');
    }

    const hotels = await queryBuilder.limit(limit).getMany();
    return hotels;
  }

  async create(hotel: CreateHotelDto) : Promise<CreatedHotelResponse> {
    const hotelEntity = this.hotelRepository.save(hotel);
    return hotelEntity;
  }

  async delete(id: number) {
    const result = await this.hotelRepository.delete(id);
    return result.affected > 0;
  }

  async getById(id: number) {
    return this.hotelRepository.findOneBy({ id });
  }

  async update(id: number, hotel: UpdateHotelDto) {
    const result = await this.hotelRepository.update(id, hotel);
    return result.affected > 0;
  }
}
