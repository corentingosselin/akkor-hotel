import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Hotel } from '../interfaces/hotel.interface';

export class CreateHotelDto implements Omit<Hotel, 'id'> {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsString()
  picture!: string;
}

export class UpdateHotelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  pictures?: string[];
}

export class CreateBookingDto {
  @IsString()
  startDate!: string;

  @IsString()
  endDate!: string;

  @IsNumber()
  hotelId!: number;

  @IsNumber()
  userId!: number;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  hotelId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
