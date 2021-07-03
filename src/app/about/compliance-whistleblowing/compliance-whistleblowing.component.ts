import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AboutService } from 'src/app/services/about.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HelpdeskFormComponent } from './helpdesk-form/helpdesk-form.component';
@Component({
  selector: 'app-compliance-whistleblowing',
  templateUrl: './compliance-whistleblowing.component.html',
  styleUrls: ['./compliance-whistleblowing.component.scss']
})
export class ComplianceWhistleblowingComponent implements OnInit {

  heading: any;
  body: any;
  isLoading: boolean;
  toggle:boolean;
  id: any;
  categories: any = [];
  dataSheets: any = [];
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
    private _about: AboutService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getComplaince();
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
      body: this.body 
    };

    console.log(body);
    

    // return 0;
    (await this._about.editComWhistleCategory(body, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }
  
  async getComplaince(){
    (await this._about.getComWhistle()).subscribe( (res:any) => {
      console.log(res);
      this.body = res.data[0].body,
      this.heading = res.data[0].heading,
      this.id = res.data[0]._id
    })
  }

  openFormDialog(type, cat, pid, cid = ''): void {
    const dialogRef = this.dialog.open(HelpdeskFormComponent, {
      width: '50%',

      data: { type, cat, pid, cid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
