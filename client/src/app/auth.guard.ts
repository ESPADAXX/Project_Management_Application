import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const userInSession = sessionStorage.getItem('user');
  const router=inject(Router)
  if (!userInSession) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
