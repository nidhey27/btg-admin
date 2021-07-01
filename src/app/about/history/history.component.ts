import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AboutService } from 'src/app/services/about.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  heading: any;
  data: any;
  isLoading: boolean;
  toggle:boolean;
  id: any;
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
  constructor(
    private _about: AboutService
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

  goBack() {
    window.history.back()
  }

  toggleEdit(){
      this.toggle = !this.toggle;
    
  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    this.heading = val;
  }

  async update() {

    let body = {
      heading: this.heading,
      parentId: this.data 
    };

    console.log(body);
    

    // return 0;
    (await this._about.editHistory(body, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }
  
  async getHistory(){
    (await this._about.getHistory()).subscribe( (res:any) => {
      console.log(res);
      this.data = res.data[0].content
      this.heading = res.data[0].heading
    })
  }
}
