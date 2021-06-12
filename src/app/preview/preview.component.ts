import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewService } from '../services/preview.service';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  editSection:any;
  heading: any;
  constructor(private _preview: PreviewService,public gVar: GlobalConstants,
    private _route: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this._activeRoute.queryParams.subscribe(params => {
      console.log(params)
    })

    this._preview.getData().then( (res:any) => {
      console.log(res)
      this.heading = res.heading;
      this.editSection = res.data;
    })
    this.gVar.isLoggeddIn = false
  }

}
