import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommingSoonService } from '../services/comming-soon.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {
  section: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  id: any;
  toggle: boolean;
  constructor(
    private _comming: CommingSoonService
  ) { }

  ngOnInit(): void {
    this.getCommingSoon();
  }

  toggleEdit(){
    this.toggle = !this.toggle
  }
  
  goBack() {
    window.history.back()
  }

  async update() {

    let body = {
      data: this.section
      
    };

    console.log(body);
    

    // return 0;
    (await this._comming.editCommingSoon(body, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }

  async getCommingSoon(){
    (await this._comming.getComingSoon()).subscribe( (res:any) => {
      console.log(res);
      this.section = res.data[0].data;
      this.id = res.data[0]._id
    })
  }
}
