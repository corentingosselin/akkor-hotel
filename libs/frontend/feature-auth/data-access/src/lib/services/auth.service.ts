import { RegisterUserDto, SessionResponse } from '@akkor-hotel/shared/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
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