import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import {
  LoginUserDto,
  RegisterUserDto,
  SessionResponse,
  UserAccount,
} from '@akkor-hotel/shared/api-interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginUserDto): Promise<UserAccount> {
    const user = await this.userService.findOneByEmailOrPseudo(
      loginDto.username
    );
    if (user && verify(user.password, loginDto.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: UserAccount) : SessionResponse {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user
    };
  }

  async register(registerDto: RegisterUserDto) {
    if (await this.userService.isUserExistsByEmailOrPseudo(registerDto.email)) {
      throw new BadRequestException('Email already exists');
    }
    if (await this.userService.isUserExistsByEmailOrPseudo(registerDto.pseudo)) {
      throw new BadRequestException('Pseudo already exists');
    }

    const userEntity = await this.userService.create(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userEntity;
    const userAccount: UserAccount = user;
    return this.login(userAccount);
  }
}
