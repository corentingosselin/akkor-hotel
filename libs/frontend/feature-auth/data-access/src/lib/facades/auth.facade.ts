import {
  JwtUserSession,
  LoginUserDto,
  RegisterUserDto,
  SessionResponse
} from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import {
  BehaviorSubject,
  catchError, filter,
  Observable,
  tap,
  throwError
} from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly loadingErrorService: LoadingErrorService,
    private route: Router,
  ) {}

  private loggedIn$ = new BehaviorSubject<SessionResponse | null>(null);
  public logout$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<SessionResponse | null> {
    return this.loggedIn$.asObservable();
  }

  set loggedIn(session: SessionResponse | null) {
    this.loggedIn$.next(session);
  }

  login(loginDto: LoginUserDto) {
    this.loadingErrorService.startLoading();
    this.authService
      .login(loginDto.username, loginDto.password)
      .pipe(
        filter((session) => !!session),
        filter((session) => !!session.access_token),
        tap((session) => {
          this.loggedIn$.next(session);
          localStorage.setItem('userSession',  JSON.stringify(session));
          this.route.navigate(['/home']);
          this.logout$.next(false);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggedIn$.next(null);
          if (error.status === 401) {
            return throwError(() =>
              this.loadingErrorService.showError('Invalid email or password.')
            );
          } else {
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

  clearUserSession() {
    localStorage.removeItem('userSession');
    this.loadingErrorService.stopLoading();
    this.loggedIn$.next(null);
    this.logout$.next(true);
  }

  isAuthenticated(): boolean {
    const storedSession = localStorage.getItem('userSession');
    if(!storedSession) {
      this.clearUserSession();
      this.loggedIn$.next(null);
      return false;
    }
    const session = JSON.parse(storedSession) as SessionResponse;

    const decodedToken = decode(session.access_token) as JwtUserSession;
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp? decodedToken.exp : 0);
    if (expirationDate < new Date()) {
      this.clearUserSession();
      return false;
    }
    this.loggedIn$.next(session);
    return true;
  }

  logout(): void {
    this.clearUserSession();
    this.route.navigate(['/login']);
  }

  register(registerDto: RegisterUserDto) {
    this.loadingErrorService.startLoading
    this.authService
      .register(registerDto)
      .pipe(
        filter((session) => !!session),
        filter((session) => !!session.access_token),
        tap((session) => {
          this.loggedIn$.next(session);
          localStorage.setItem('userSession', JSON.stringify(session));
          this.loadingErrorService.stopLoading
          this.route.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggedIn$.next(null);
          if (error.status === 400) {
            return throwError(() =>
              this.loadingErrorService.showError(
                error.error.message || 'An error occurred. Please try again later.'
              )
            );
          } else {
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
