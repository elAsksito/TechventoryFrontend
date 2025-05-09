import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, GuardResult, MaybeAsync,
  Router, RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
      if (token) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
