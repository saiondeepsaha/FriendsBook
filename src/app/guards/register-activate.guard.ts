import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login.service';

export const registerActivateGuard: CanActivateFn = (route, state) => {
  
  const userPath = environment.appConstants.routes.LANDING.USER,
        adminPath = environment.appConstants.routes.LANDING.ADMIN,
        loginPath = environment.appConstants.routes.LOGIN,
        ls = inject(LoginService),
        router = inject(Router),
        stateURL = state.url,
        activatedURL = stateURL.substring(1, stateURL.length);

  let hasToken = false;

  ls.getToken().subscribe( resp => {
    let response:any = resp;
    if (response['isActive'] && response['token'] !== null && response['token'] !== undefined && response['token'].length > 0) {
        hasToken = true;
    } else {
        hasToken = false;
        router.navigate([`/${loginPath}`]);
    }
  });

  if (hasToken && (activatedURL === userPath || activatedURL === adminPath)) {
    return true;
  } else {
    return false;
  }

};
