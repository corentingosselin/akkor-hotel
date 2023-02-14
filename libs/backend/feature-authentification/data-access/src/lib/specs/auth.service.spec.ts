import { LoginUserDto } from '@akkor-hotel/shared/api-interfaces';
import { Test } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';


const loginDto : LoginUserDto = {
    email: 'test@gmail.com',
    password: 'test1234'
}

describe('AuthService', () => {
    let service: AuthService;
  
    beforeAll(async () => {
      const app = await Test.createTestingModule({
        providers: [AuthService],
      }).compile();
  
      service = app.get<AuthService>(AuthService);
    });
  
    describe('login', () => {
      it('should return access token"', () => {
        expect(service.login(loginDto)).toEqual({ message: 'Welcome to api!' });
      });
    });
  });