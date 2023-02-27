import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthFacade } from '../facades/auth.facade';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthFacade, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}