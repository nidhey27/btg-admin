import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndustrySolForService } from '../services/industry-sol-for.service';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-sub-catagory',
  templateUrl: './sub-catagory.component.html',
  styleUrls: ['./sub-catagory.component.scss']
})
export class SubCatagoryComponent implements OnInit {

  id: any;
  indusSolFor: any;
  isLoading: boolean = true;
  formData = new FormData();
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    uploadUrl: 'https://btg-app.herokuapp.com/api/uploadFilestoAzure/add',
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

  async onFileChange(event, type) {

    if (event.target.files.length > 0) {
      this.formData.append('file', event.target.files[0] )
    }

    this._http.post(`${environment.apiUrl}api/uploadFilestoAzure/add`, this.formData, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    }).subscribe((res: any) => {
      console.log(res);
      if(type == 'section2')
        this.section2 = res.data.link
      else if(type == 'section5')
        this.section5 = res.data.link
      else if(type == 'section8')
        this.section8 = res.data.link
      else if(type == 'section11')
        this.section11 = res.data.link
      else if(type == 'gifURL')
        this.indusSolFor.gifURL = res.data.link

      console.log(this.indusSolFor);

    })
  }

  toggleBody: boolean = false;
  heading: any;
  editSection: any = [
    { id: 1, data: "", toggle: false },
    { id: 2, data: "", toggle: false },
    { id: 3, data: "", toggle: false },
    { id: 4, data: "", toggle: false },
    { id: 5, data: "", toggle: false },
    { id: 6, data: "", toggle: false },
    { id: 7, data: "", toggle: false },
    { id: 8, data: "", toggle: false },
    { id: 9, data: "", toggle: false },
    { id: 10, data: "", toggle: false },
    { id: 11, data: "", toggle: false },
    { id: 12, data: "", toggle: false },
  ]
  section1: any;
  section2: any;
  section3: any;
  section4: any;
  section5: any;
  section6: any;
  section7: any;
  section8: any;
  section9: any;
  section10: any;
  section11: any;
  section12: any;
  constructor(private _indSol: IndustrySolForService, private _activatedRoute: ActivatedRoute, private _http: HttpClient) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getIndSolFor(this.id)
    })
  }

  goBack() {
    window.history.back()
  }

  async getIndSolFor(id) {

    (await this._indSol.getIndSolFor(id)).subscribe((res: any) => {

      console.log(res);

      this.indusSolFor = res.data[0]
      this.section1 = res.data[0]?.data[0].section1
      this.section2 = res.data[0]?.data[0].section2
      this.section3 = res.data[0]?.data[0].section3
      this.section4 = res.data[0]?.data[0].section4
      this.section5 = res.data[0]?.data[0].section5
      this.section6 = res.data[0]?.data[0].section6
      this.section7 = res.data[0]?.data[0].section7
      this.section8 = res.data[0]?.data[0].section8
      this.section9 = res.data[0]?.data[0].section9
      this.section10 = res.data[0]?.data[0].section10
      this.section11 = res.data[0]?.data[0].section11
      this.section12 = res.data[0]?.data[0].section12
      this.isLoading = false;
      console.log(this.indusSolFor);


    })

  }


  toggleEdit() {
    this.toggleBody = !this.toggleBody

  }

  toggleEditSection(index) {
    for (let i = 0; i < this.editSection.length; i++) {
      if (index == i)
        this.editSection[i].toggle = !this.editSection[i].toggle
      else
        this.editSection[i].toggle = false
    }
  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    // this.heading = val;
    // console.log(this.heading);
    // key = 'heading1';
    console.warn(val);
    console.warn(key);
    this.indusSolFor[key] = val;

    console.warn(this.indusSolFor);


  }

  async setImage(e) {
    if (e.target.files) {
      const file = e.target.files[0];
      const type = file.type;
      await this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        this.indusSolFor.gifURL = base64
        console.log(this.indusSolFor);

      });
    }
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async update() {


    let body = {
      section1: this.section1,
      section2: this.section2,
      section3: this.section3,
      section4: this.section4,
      section5: this.section5,
      section6: this.section6,
      section7: this.section7,
      section8: this.section8,
      section9: this.section9,
      section10: this.section10,
      section11: this.section11,
      section12: this.section12,
      body: this.indusSolFor.body,
      gifURL: this.indusSolFor.gifURL,
      heading1: this.indusSolFor.heading1,
      heading2: this.indusSolFor.heading2,
      heading3: this.indusSolFor.heading3,
      heading4: this.indusSolFor.heading4,
      heading: this.indusSolFor.heading
    }

    // return 0;
    console.log(this.indusSolFor);

    (await this._indSol.editIndSolFor(this.indusSolFor.parentId, this.indusSolFor.childId, body)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      } else {
        Swal.fire('Failed to update!', resp.error, 'error');
      }
    })

  }
}
