import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedinGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const isAuthenticated = !this.authService.currentUser();
    if (isAuthenticated) {
      return true;
    }
    return this.router.createUrlTree(['/']);
  }
}
