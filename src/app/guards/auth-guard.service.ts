import { Inject, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService =inject(UserService);
  const router = inject(Router)

  if(authService.isLoggedIn()){
    return true;
  }else{
    return  router.navigate(['/login'])
  }
};