import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {UserRoles} from "../enums/userRoles";

@Injectable({
  providedIn: 'root'
})
export class RegisterTripGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.getUserRole()==UserRoles[0]) {
      return true;
    } else {
      console.log(route);
      this.router.navigate(['forbidden'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
