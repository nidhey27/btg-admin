import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'btgadmin';

  mainNavData: any = [];
  subNavData: any;

  constructor(private breakpointObserver: BreakpointObserver, public _router: Router, private _http: HttpClient, private _nav: NavbarService) {
    this._nav.getMainNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.mainNavData = response;
      })

    }).catch(error => {
      console.log(error)
    })

    this._nav.getSubNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.subNavData = response.data
      })

    }).catch(error => {
      console.log(error)
    })

  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('')
  }
}
