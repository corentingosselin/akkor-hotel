import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { interval, Observable, throwError } from 'rxjs';
import { tap, catchError, finalize, delay, mergeMap } from 'rxjs/operators';
import { LoadingErrorService } from '../services/loading-error.service';

@Injectable()
export class HttpLoadingErrorInterceptor implements HttpInterceptor {
  constructor(private loadingErrorService: LoadingErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingErrorService.startLoading();
    return next.handle(request).pipe(
      delay(3000),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingErrorService.stopLoading();
        }
      }),
      catchError((error: HttpErrorResponse) =>
        interval(5000).pipe(
          // only affects "error"
          mergeMap(() => {
            if (error.error instanceof ErrorEvent) {
              this.loadingErrorService.showError('An error occurred.');
            } else {
              this.loadingErrorService.showError(
                'An error occurred. Please try again later.'
              );
            }
            return throwError(() => error);
          }) 
        )
      ),
      finalize(() => {
        this.loadingErrorService.stopLoading();
      })
    );
  }
}
