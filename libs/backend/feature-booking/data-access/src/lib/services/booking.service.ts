import { HotelService } from '@akkor-hotel/backend/feature-hotel/data-access';
import {
  BookingResponse,
  CreateBookingDto,
  CreatedBookingResponse,
  UpdateBookingDto,
} from '@akkor-hotel/shared/api-interfaces';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!emailOrPseudo) {
      throw new BadRequestException();
    }
    //find booking by email or pseudo
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .where('user.email = :emailOrPseudo', { emailOrPseudo })
      .orWhere('user.pseudo = :emailOrPseudo', { emailOrPseudo })
      .getMany();

    //remove users password
    booking.forEach((booking) => {
      delete booking.user.password;
    });

    return booking;
  }

  async getAllByUser(userId: number) {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .where('booking.userId = :userId', { userId })
      .getMany();
    return bookings;
  }

  async getAllBookingsByHotel(hotelId: number): Promise<BookingResponse[]> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .where('booking.hotelId = :hotelId', { hotelId })
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
    const hotel = await this.hotelService.getById(booking.hotelId);
    if (!hotel) {
      throw new BadRequestException(
        'The hotel your are trying to book does not exist'
      );
    }

    const result = await this.bookingRepository.save(newBooking);
    if (!result) {
      throw new BadRequestException('The booking could not be registered');
    }

    return {
      id: result.id,
      hotel: hotel,
      startDate: result.startDate,
      endDate: result.endDate,
      updated_at: result.updated_at,
      created_at: result.created_at,
    };
  }

  async createByStaff(booking: CreateBookingDto) {
    return this.create(booking);
  }

  async createByUser(userId: number, booking: CreateBookingDto) {
    //verify if the user owns the booking
    if (booking.userId != userId) {
      throw new BadRequestException();
    }

    //check if the booking does not already exist for same user
    const bookings = await this.getAllByUser(userId);
    const bookingAlreadyExist = bookings.some((b) => {
      const bDate = new Date(booking.startDate);
      const d1 = new Date(
        b.startDate.getFullYear(),
        b.startDate.getMonth(),
        b.startDate.getDate()
      );
      const d2 = new Date(
        bDate.getFullYear(),
        bDate.getMonth(),
        bDate.getDate()
      );
      return b.hotel.id === booking.hotelId && d1.getTime() === d2.getTime();
    });
    if (bookingAlreadyExist) {
      throw new BadRequestException(
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
    //return this.bookingRepository.findOneBy({ id });
    //get booking with hotel
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .where('booking.id = :id', { id })
      .getOne();
    if (!booking) {
      throw new NotFoundException(`Booking not found`);
    }
    return booking;
  }

  async update(id: number, booking: UpdateBookingDto) {
    const result = await this.bookingRepository.update(id, booking);
    return result.affected > 0;
  }
}
