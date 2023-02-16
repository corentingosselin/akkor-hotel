import { AuthService } from '@akkor-hotel/backend/feature-authentification/data-access';
import { LocalAuthGuard } from '@akkor-hotel/backend/feature-authentification/utils';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}