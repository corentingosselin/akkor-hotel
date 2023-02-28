import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthFacade } from '../facades/auth.facade';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuardService implements CanActivate {
  constructor(public auth: AuthFacade, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}