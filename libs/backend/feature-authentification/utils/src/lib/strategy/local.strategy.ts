
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@akkor-hotel/backend/feature-authentification/data-access';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({ username, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}