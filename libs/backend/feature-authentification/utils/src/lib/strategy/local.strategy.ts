
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, UserAccount } from '@akkor-hotel/shared/api-interfaces';
import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import { verify } from 'argon2';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService) {
    super();
  }

  async validateUser(loginDto: LoginUserDto): Promise<UserAccount> {
    const user = await this.userService.findOneByEmailOrPseudo(
      loginDto.username
    );
    if (user && await verify(user.password, loginDto.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async validate(username: string, password: string) {
    const user = await this.validateUser({ username, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}