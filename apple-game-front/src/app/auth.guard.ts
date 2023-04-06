import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './share/service/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = localStorage.getItem('access_token');

    if (token) {
      return this.userService.checkUserToken().pipe(
        tap((isValid) => {
          if (!isValid) {
            this.router.navigate(['/home']);
          }
        })
      );
    } else {
      this.router.navigate(['/home']);
      return new Observable((observer) => {
        observer.next(false);
      });
    }
  }
}
