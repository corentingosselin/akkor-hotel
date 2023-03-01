import { JwtAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { BookingService } from '@akkor-hotel/backend/feature-booking/data-access';
import { CreateBookingDto, UserRole } from '@akkor-hotel/shared/api-interfaces';
import {
  RoleGuard,
  Roles,
} from '@akkor-hotel/shared/backend/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  @Post()
  async create(@Body() booking: CreateBookingDto, @Req() req) {
    const userId = req.user.userId;
    return await this.bookingService.createByUser(userId, booking);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Post()
  async createByStaff(@Body() booking: CreateBookingDto) {
    return await this.bookingService.createByStaff(booking);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    const userId = req.user.userId as number;
    return await this.bookingService.deleteByUser(userId, id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Delete(':id')
  async staffDelete(@Param('id') id: number) {
    return await this.bookingService.deleteByStaff(id);
  }


  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.bookingService.getById(id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  @Get()
  async getAllByUser(@Req() req) {
    const userId = req.user.userId;
    return await this.bookingService.getAllByUser(userId);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get('user/:username')
  async getAll(@Param('username') username: string) {
    return await this.bookingService.findBookingByEmailOrPseudo(username);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get('hotel/:id')
  async getAllBookings(@Param('id') id: number) {
    return await this.bookingService.getAllBookingsByHotel(id);
  }
}
