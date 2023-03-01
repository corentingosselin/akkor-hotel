import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../facades/auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authFacade: AuthFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const storedSession = localStorage.getItem('userSession');
    if (storedSession) {
      const currentUser = JSON.parse(storedSession);
      if (currentUser && currentUser.access_token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.access_token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect the user to the login page
          this.authFacade.logout();
          
        }
        return throwError(error);
      })
    );
  }
}
