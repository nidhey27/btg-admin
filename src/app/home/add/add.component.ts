import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  carsouleType = 0;
  constructor() { }

  ngOnInit(): void {
  }

  private _prevSelected: any;

    handleChange(evt, type) {
      // alert(type)
      this.carsouleType = type
    }

}
