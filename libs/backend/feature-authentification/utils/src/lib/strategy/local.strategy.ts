
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '@akkor-hotel/shared/api-interfaces';
import { AuthService } from '@akkor-hotel/backend/feature-authentification/data-access';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {
    super();
  }

  async validate(loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}