import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingErrorService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string>('');

  get loadingStatus$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  get errorStatus$(): Observable<string> {
    return this.error$.asObservable();
  }

  startLoading(): void {
    this.showLoading();
    this.clearError();
  }

  stopLoading(): void {
    this.hideLoading();
    this.clearError();
  }

  private showLoading(): void {
    this.loading$.next(true);
  }

  private hideLoading(): void {
    this.loading$.next(false);
  }

  showError(message: string): void {
    this.hideLoading();
    this.error$.next(message);
  }

  private clearError(): void {
    this.error$.next('');
  }
}
