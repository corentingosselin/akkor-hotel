import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import { UpdateUserDto, UserRole } from '@akkor-hotel/shared/api-interfaces';
import {
  OwnedGuard,
  RoleGuard,
  Roles,
} from '@akkor-hotel/shared/backend/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard)
  @Put()
  @Roles(UserRole.ADMIN)
  async update(@Body() updateUser: UpdateUserDto) {
    return this.userService.update(updateUser);
  }

  @UseGuards(OwnedGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
