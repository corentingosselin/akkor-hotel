import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserDto, SessionResponse } from '@akkor-hotel/shared/api-interfaces';
import { FrontendFeatureAuthDataAccessModule } from '../frontend-feature-auth-data-access.module';


@Injectable({
  providedIn: FrontendFeatureAuthDataAccessModule
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // Send a POST request to the server with the login credentials
    return this.http.post<SessionResponse>('/api/auth/login', {username, password});
  }

  register(registerDto: RegisterUserDto) {
    // Send a POST request to the server with the registration details
    return this.http.post<SessionResponse>('/api/auth/register', registerDto);
  }

}