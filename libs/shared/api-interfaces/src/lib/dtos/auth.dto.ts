import { IsEmail, IsString } from 'class-validator';
import { IsPasswordSecure, Match } from '@akkor-hotel/shared/utils';

export class LoginUserDto {
  @IsString()
  username!: string;
  
  @IsString()
  password!: string;
}

export class RegisterUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsPasswordSecure()
  password!: string;

  @Match('password')
  confirmPassword!: string;

  @IsString()
  pseudo!: string;
}