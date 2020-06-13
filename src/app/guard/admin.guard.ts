import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private route : Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=localStorage.getItem('token') ;
      let roles=helper.decodeToken(token).roles
     let open=roles.includes('seller')|roles.includes('admin')|roles.includes('superadmin')
      if(!open)
     {
      this.route.navigateByUrl('/home')
      return false;
     }
     return true ;
  }
  
}
