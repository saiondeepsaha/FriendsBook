import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login.service';

export const registerMatchGuard: CanMatchFn = (route, segments) => {

  const ls = inject(LoginService);
  const router = inject(Router);

  const userPath = environment.appConstants.routes.LANDING.USER,
        adminPath = environment.appConstants.routes.LANDING.ADMIN,
        loginPath = environment.appConstants.routes.LOGIN;
        
   let authPath = route['path'],
        hasToken = false;

    ls.getToken().subscribe( resp => {
      let response:any = resp;
      if (response['isActive'] && response['token'] !== null && response['token'] !== undefined && response['token'].length > 0) {
          hasToken = true;
      } else {
          hasToken = false;
          router.navigate([`/${loginPath}`]);
      }
    });

    if (hasToken && (authPath === userPath || authPath === adminPath)){
      return true;
    } else {
      router.navigate([`/${loginPath}`]);
      return false;
    }

};
