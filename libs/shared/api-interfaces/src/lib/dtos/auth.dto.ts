import { IsEmail } from 'class-validator';
import { IsPasswordSecure, Match } from '@akkor-hotel/shared/utils';

export class LoginUserDto {
  username!: string;
  password!: string;
}

export class RegisterUserDto {

  @IsEmail()
  email!: string;
  firstName!: string;
  lastName!: string;
  @IsPasswordSecure()
  password!: string;
  @Match('password')
  confirmPassword!: string;
  pseudo!: string;
}