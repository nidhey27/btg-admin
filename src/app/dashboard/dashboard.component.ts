import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  mainNavData: any = [];
  subNavData: any = [];
  constructor(private _http: HttpClient, private _nav: NavbarService) { }

  async ngOnInit() {
    window.scroll(0,0);
    await this._nav.getMainNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.mainNavData = response;
      })

    }).catch(error => {
      console.log(error)
    })

    await this._nav.getSubNav().then((res: any) => {
      res.subscribe((response: any) => {
        this.subNavData = response.data
      })

    }).catch(error => {
      console.log(error)
    })
    
  }

}
