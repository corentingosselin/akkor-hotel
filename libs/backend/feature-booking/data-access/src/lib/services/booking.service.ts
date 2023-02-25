import { HotelService } from '@akkor-hotel/backend/feature-hotel/data-access';
import {
  CreateBookingDto,
  CreatedBookingResponse,
  UpdateBookingDto,
} from '@akkor-hotel/shared/api-interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
    private readonly hotelService: HotelService
  ) {}

  async findBookingByEmailOrPseudo(emailOrPseudo: string) {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.user', 'user')
      .innerJoinAndSelect('booking.hotel', 'hotel')
      .where('booking.email = :emailOrPseudo OR user.pseudo = :emailOrPseudo', {
        emailOrPseudo,
      })
      .getMany();
    return bookings;
  }

  async getAllByUser(userId: number) {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .where('booking.userId = :userId', { userId })
      .getMany();
    return bookings;
  }

  private async create(
    booking: CreateBookingDto
  ): Promise<CreatedBookingResponse> {
    const newBooking = {
      ...booking,
      hotel: { id: booking.hotelId },
      user: { id: booking.userId },
    };
    const result = await this.bookingRepository.save(newBooking);
    const hotel = await this.hotelService.getById(booking.hotelId);

    return {
      id: result.id,
      hotel: hotel,
      startDate: result.startDate,
      endDate: result.endDate,
    };
  }

  async createByStaff(booking: CreateBookingDto) {
    return this.create(booking);
  }

  async createByUser(userId: number, booking: CreateBookingDto) {
    //verify if the user owns the booking
    if (booking.userId !== userId) {
      return new UnauthorizedException();
    }

    //check if the booking does not already exist for same user
    const bookings = await this.getAllByUser(userId);
    const bookingAlreadyExist = bookings.some(
      (b) => b.hotel.id === booking.hotelId
    );
    if (bookingAlreadyExist) {
      return new UnauthorizedException(
        'You already have a booking for this hotel'
      );
    }

    return this.create(booking);
  }

  async deleteByUser(userId: number, bookingId: number) {
    //delete booking owned by userId using typeorm
    const result = await this.bookingRepository
      .createQueryBuilder()
      .delete()
      .from(BookingEntity)
      .where('id = :bookingId AND userId = :userId', { bookingId, userId })
      .execute();
    return result.affected > 0;
  }

  async deleteByStaff(bookingId: number) {
    //delete booking owned by userId using typeorm
    const result = await this.delete(bookingId);
    return result.affected > 0;
  }

  private async delete(id: number) {
    const result = await this.bookingRepository.delete(id);
    return result;
  }

  async getById(id: number) {
    return this.bookingRepository.findOneBy({ id });
  }

  async update(id: number, booking: UpdateBookingDto) {
    const result = await this.bookingRepository.update(id, booking);
    return result.affected > 0;
  }
}
