import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthFacade } from '../facades/auth.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Add your authorization token to the request here

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
