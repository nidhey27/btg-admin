import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AboutService } from 'src/app/services/about.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HelpdeskFormComponent } from './helpdesk-form/helpdesk-form.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
    public dialog: MatDialog,
    private _http: HttpClient
  ) { }

  async ngOnInit() {
    this.getComplaince();

    this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/get-helpdesk-cat`).subscribe((res: any) =>{
      this.categories = res.data
    })
  }

  goBack() {
    window.history.back()
  }

  async tabChanged(tabChangeEvent: MatTabChangeEvent) {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);

    // console.log(this.categories[tabChangeEvent.index])
    let parentId = this.categories[tabChangeEvent.index].parentId
    let categoryId = this.categories[tabChangeEvent.index]._id

      ; (await this._about.getSingleComWhistleCategoryHelpdesk(categoryId)).subscribe((res: any) => {
        console.log(res)
        this.dataSheets = res.data
      })
  }

  toggleEdit(){
      this.toggle = !this.toggle;
    
  }

  async deleteHelpDesk(id){
   
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Event will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._about.deleteComWhistleCategoryHelpdesk(id)).subscribe((res: any) => {
          if(res.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })

  }
  async deleteCat(id){
   
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Event will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._about.deleteComWhistleCategory(id)).subscribe((res: any) => {
          if(res.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })

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
    (await this._about.editComWhistle(body, this.id)).subscribe((resp: any) => {
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
