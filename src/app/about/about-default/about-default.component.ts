import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about-default',
  templateUrl: './about-default.component.html',
  styleUrls: ['./about-default.component.scss']
})
export class AboutDefaultComponent implements OnInit {

  constructor(
    private _about: AboutService
  ) { }

  ngOnInit(): void {
    this.getAbout();
  }

  async getAbout(){
    (await this._about.getAbout()).subscribe( (res:any) => {
      console.log(res);
      
    })
  }
}
