import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _router: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(2),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
      this.router.navigate(['./login']);
      return false
      })
    );
  }
}
