import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      let name = localStorage.getItem('name');
      let id = localStorage.getItem('id');
      let auth_token = localStorage.getItem('auth-token');
      console.log(name,id,auth_token)
      if (auth_token != null && id != null && name != null)
        resolve(true);
      else {
        reject(false);
        this.router.navigateByUrl('login');


      }

    })
  }

}
