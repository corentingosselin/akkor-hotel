import { UserService } from '@akkor-hotel/backend/feature-user/data-access';
import {
  LoginUserDto,
  RegisterUserDto,
  SessionResponse,
  UserAccount
} from '@akkor-hotel/shared/api-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
  
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginUserDto): Promise<UserAccount> {
    const user = await this.userService.findOneByEmailOrPseudo(loginDto.email);
    const dtoPassword = await argon2.hash(loginDto.password);
    if (user && user.password === dtoPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: UserAccount): SessionResponse {
    return {
      access_token: this.jwtService.sign({ email: user.email, id: user.id }),
      user,
    };
  }

  register(registerDto: RegisterUserDto) {
    throw new Error('Method not implemented.');
  }
}
