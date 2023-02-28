import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function handleErrorAndLoading<T>(loadingErrorService: any, errorMessage = "Something went wrong. Please try again later.") {
    return (source: Observable<T>) =>
      source.pipe(
        tap(() => {
          loadingErrorService.hideLoading();
        }),
        catchError(() => {
          loadingErrorService.hideLoading();
          return throwError(() => loadingErrorService.showError(errorMessage));
        })
      );
  }