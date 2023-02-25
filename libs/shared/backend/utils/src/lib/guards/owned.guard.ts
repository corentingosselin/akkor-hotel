import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnedGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
    const decodedToken = this.jwtService.decode(token) as { user_id: number }; 
    const { id  } = request.params; 

    if (id != decodedToken.user_id) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
  
    return true;
  }
}