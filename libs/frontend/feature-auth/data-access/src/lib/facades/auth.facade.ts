import {
  LoginUserDto,
  RegisterUserDto,
  SessionResponse
} from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError, filter,
  Observable,
  tap,
  throwError
} from 'rxjs';
import { FrontendFeatureAuthDataAccessModule } from '../frontend-feature-auth-data-access.module';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable({
  providedIn: FrontendFeatureAuthDataAccessModule,
})
export class AuthFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly loadingErrorService: LoadingErrorService,
    private route: Router,
    private readonly jwtService: JwtService

  ) {}

  private loggedIn$ = new BehaviorSubject<SessionResponse | null>(null);

  get isLoggedIn$(): Observable<SessionResponse | null> {
    return this.loggedIn$.asObservable();
  }

  login(loginDto: LoginUserDto) {
    this.loadingErrorService.showLoading();
    this.authService
      .login(loginDto.username, loginDto.password)
      .pipe(
        filter((session) => !!session),
        filter((session) => !!session.access_token),
        tap((session) => {
          this.loggedIn$.next(session);
          localStorage.setItem('access_token', session.access_token);
          this.loadingErrorService.hideLoading();
          this.route.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggedIn$.next(null);
          if (error.status === 401) {
            this.loadingErrorService.hideLoading();
            return throwError(() =>
              this.loadingErrorService.showError('Invalid email or password.')
            );
          } else {
            this.loadingErrorService.hideLoading();
            return throwError(() =>
              this.loadingErrorService.showError(
                'An error occurred. Please try again later.'
              )
            );
          }
        })
      )
      .subscribe();
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken) {
      this.loggedIn$.next(null);
      return false;
    }



    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.loggedIn$.next(null);
    this.route.navigate(['/login']);
  }

  register(registerDto: RegisterUserDto) {
    this.loadingErrorService.showLoading();
    this.authService
      .register(registerDto)
      .pipe(
        filter((session) => !!session),
        filter((session) => !!session.access_token),
        tap((session) => {
          this.loggedIn$.next(session);
          localStorage.setItem('access_token', session.access_token);
          this.loadingErrorService.hideLoading();
          this.route.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggedIn$.next(null);
          if (error.status === 400) {
            this.loadingErrorService.hideLoading();
            return throwError(() =>
              this.loadingErrorService.showError(
                error.error.message || 'An error occurred. Please try again later.'
              )
            );
          } else {
            this.loadingErrorService.hideLoading();
            return throwError(() =>
              this.loadingErrorService.showError(
                'An error occurred. Please try again later.'
              )
            );
          }
        })
      )
      .subscribe();
  }
}
