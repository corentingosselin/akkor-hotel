import {
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
  async findAll(sortBy: string, limit: number) {
    return this.hotelRepository.find({
      order: {
        [sortBy]: 'ASC',
      },
      take: limit,
    });
  }

  async create(hotel: CreateHotelDto) {
    return this.hotelRepository.save(hotel);
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
