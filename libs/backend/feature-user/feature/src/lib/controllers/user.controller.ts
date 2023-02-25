import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import { JwtAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { UpdateUserDto, UserRole } from '@akkor-hotel/shared/api-interfaces';
import {
  RoleGuard,
  Roles,
} from '@akkor-hotel/shared/backend/utils';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard)
  @Put()
  @Roles(UserRole.ADMIN)
  async update(@Body() updateUser: UpdateUserDto) {
    return this.userService.update(updateUser);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  @Delete(':id')
  async delete(@Req() req, @Param('id') id: number) {
    if (req.user.userId != id) {
      return new BadRequestException('You can only delete your own account');
    }
    return this.userService.delete(req.user.userId);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
