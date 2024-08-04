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
import { UserFirestoreService } from '../services/user.firestore.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private userFirestoreService = inject(UserFirestoreService);
  private authService = inject(AuthService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const isAuthenticated = this.authService.authenticated();
    if (!isAuthenticated) {
      return this.router.createUrlTree(['/login']);
    }
    const currentUserId = this.authService.authenticated()?.id;
    if (!currentUserId) {
      return this.router.createUrlTree(['/login']);
    }

    return this.userFirestoreService.getUser(currentUserId).then((user) => {
      if (user.isAdmin) {
        return true;
      }
      return this.router.createUrlTree(['/']);
    });
  }
}
