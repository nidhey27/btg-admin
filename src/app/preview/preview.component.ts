import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewService } from '../services/preview.service';
import { GlobalConstants } from '../common/global-constants';
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  editSection:any;
  heading: any;
  year = new Date().getFullYear();
  industrySolutuonForData: any;
  industrySolutuonMain: any = [];
  constructor(private _preview: PreviewService,public gVar: GlobalConstants,
    private _route: Router, private _activeRoute: ActivatedRoute, private _nav: NavbarService) { }

  async ngOnInit() {

    this._activeRoute.queryParams.subscribe(params => {
      console.log(params)
    })

    this._preview.getData().then( (res:any) => {
      console.log(res)
      this.heading = res.heading;
      this.editSection = res.data;
    })
    this.gVar.isLoggeddIn = false

  await this._nav.getSubNav().then((res) => {
      
    res.subscribe((resp: any) => {
      let response1 = resp.data;
      response1.forEach(async element => {

        (await this._nav.getsolutionMainCategoryFor(element._id)).subscribe((resp2:any) => {

          
          
          let pushData = {main: element, sub: resp2?.data}
          this.industrySolutuonMain.push(pushData)
        })
        
      });

    })
      
    console.log(this.industrySolutuonMain)

  }).catch(error => {
    console.error(error)
  });

}
}
