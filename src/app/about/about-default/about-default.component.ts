import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAboutDefaultComponent } from './add-edit-about-default/add-edit-about-default.component';
@Component({
  selector: 'app-about-default',
  templateUrl: './about-default.component.html',
  styleUrls: ['./about-default.component.scss']
})
export class AboutDefaultComponent implements OnInit {
  id: any;
  heading: any;
  section1: any;
  section2: any;
  section3: any;
  vision: any;
  misson: any;

  data: any = [];
  leadershipData: any = [];

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
  toggle1: boolean;
  toggle2: boolean;
  toggle3: boolean;
  toggle4: boolean;
  toggle5: boolean;
  constructor(
    private _about: AboutService,
    public dialog: MatDialog
  ) { }


  toggleEdit(i) {
    if(i == 1){
      this.toggle1 = !this.toggle1
      this.toggle2 = false
      this.toggle3 = false
      this.toggle4 = false
      this.toggle5 = false
    }else if(i == 2){
      this.toggle2 = !this.toggle2
      this.toggle1 = false
      this.toggle3 = false
      this.toggle4 = false
      this.toggle5 = false
    }else if(i == 3){
      this.toggle3 = !this.toggle3
      this.toggle1 = false
      this.toggle2 = false
      this.toggle4 = false
      this.toggle5 = false
    }else if(i == 4){
      this.toggle4 = !this.toggle4
      this.toggle1 = false
      this.toggle3 = false
      this.toggle2 = false
      this.toggle5 = false
    }else if(i == 5){
      this.toggle5 = !this.toggle5
      this.toggle1 = false
      this.toggle3 = false
      this.toggle2 = false
      this.toggle4 = false
    }

  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    this.heading = val;
  }

  async update() {

    let body = {
      heading: this.heading,
      section1: this.section1,
      section2: this.section2,
      section3: this.section3,
      vision: this.vision,
      misson: this.misson,
      
    };

    console.log(body);
    

    // return 0;
    (await this._about.editAbout(body, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }
  async ngOnInit() {
    this.getAbout();

    (await this._about.getLeadership()).subscribe((res: any) => {
      this.leadershipData = res.data
    })
  }
  goBack() {
    window.history.back()
  }

  async getAbout() {
    (await this._about.getAbout()).subscribe((res: any) => {
      console.log(res);
      this.data = res.data[0]

      this.heading = this.data.heading
      this.section1 = this.data.section1
      this.section2 = this.data.section2
      this.section3 = this.data.section3
      this.vision = this.data.vision
      this.misson = this.data.misson

      this.id = this.data._id
    })
  }

  openFormDialog(type, id = ""): void {
    const dialogRef = this.dialog.open(AddEditAboutDefaultComponent, {
      width: '100%',
      data: {type, id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
