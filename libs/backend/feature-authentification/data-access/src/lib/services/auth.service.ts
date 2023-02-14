import { LoginUserDto, RegisterUserDto } from '@akkor-hotel/shared/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
  login(loginDto: LoginUserDto) {
    throw new Error('Method not implemented.');
  }

  register(registerDto: RegisterUserDto) {
    throw new Error('Method not implemented.');
  }
}
