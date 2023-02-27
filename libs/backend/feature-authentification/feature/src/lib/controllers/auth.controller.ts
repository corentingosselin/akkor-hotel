import { AuthService } from '@akkor-hotel/backend/feature-authentification/data-access';
import { LocalAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { RegisterUserDto } from '@akkor-hotel/shared/api-interfaces';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.authService.register(registerDto);
  }
}
