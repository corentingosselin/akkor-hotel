import { HotelService } from '@akkor-hotel/backend/feature-hotel/data-access';
import { CreateHotelDto, UserRole } from '@akkor-hotel/shared/api-interfaces';
import { JwtAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { RoleGuard, Roles } from '@akkor-hotel/shared/backend/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  //List all hotel and allow you to sort by date, name, location with a limit (default limit is 10 but can be changed with a parameter)
  @Get()
  async findAll(@Query('sort') sort: string, @Query('limit') limit = 10) {
    return this.hotelService.findAll(sort, limit);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.hotelService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() hotel: CreateHotelDto) {
    return this.hotelService.create(hotel);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.hotelService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id') id: number, @Body() hotel: CreateHotelDto) {
    return this.hotelService.update(id, hotel);
  }

  
}
