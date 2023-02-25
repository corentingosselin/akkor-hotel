import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import { JwtAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { UpdateUserDto, UserRole } from '@akkor-hotel/shared/api-interfaces';
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
  @Delete()
  async delete(@Req() req) {
    return this.userService.delete(req.user.id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
