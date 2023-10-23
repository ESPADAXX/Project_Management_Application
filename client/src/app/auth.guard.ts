import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const user = sessionStorage.getItem('user');
  const router=inject(Router)
  if (!user) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
