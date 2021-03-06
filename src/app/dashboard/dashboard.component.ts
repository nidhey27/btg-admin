import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavbarService } from '../services/navbar.service';

import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = true;
  mainNavData: any = [];
  subNavData: any = [];
  constructor(private _http: HttpClient, private _nav: NavbarService,public gVar: GlobalConstants) { }

  async ngOnInit() {

    console.log(this.gVar)
    window.scroll(0,0);
    await this._nav.getMainNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.mainNavData = response.data;
      })

    }).catch(error => {
      console.log(error)
    })

    await this._nav.getSubNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.subNavData = response.data
        this.isLoading = false;
      })

    }).catch(error => {
      console.log(error)

    })
    
  }

}
