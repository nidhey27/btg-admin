import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  carsouleType = 0;
  constructor(private _home: HomeService,) { }

  ngOnInit(): void {
  }

  private _prevSelected: any;

  async handleChange(evt, type) {
    // alert(type)
    this.carsouleType = type
    // alert(this.carsouleType)
  }

  async addCarsoule() {
    if (this.carsouleType == 1 || this.carsouleType == 2 || this.carsouleType == 3) {
      (await this._home.addCarsoule(this.carsouleType)).subscribe((res: any) => {
        console.log(res)
      })
    }
  }

}
