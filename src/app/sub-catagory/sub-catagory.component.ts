import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndustrySolForService } from '../services/industry-sol-for.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-sub-catagory',
  templateUrl: './sub-catagory.component.html',
  styleUrls: ['./sub-catagory.component.scss']
})
export class SubCatagoryComponent implements OnInit {

  id:any;
  indusSolFor: any;

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

  toggleBody: boolean = false;
  heading: any;
  constructor(private _indSol : IndustrySolForService,private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getIndSolFor(this.id)
    })
  }

  async getIndSolFor(id){

   (await this._indSol.getIndSolFor(id)).subscribe((res:any) => {

    
    this.indusSolFor = res.data[0];
    console.log(this.indusSolFor);
    

   })

  }


  toggleEdit(){
   this.toggleBody = !this.toggleBody
   
  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    // this.heading = val;
    // console.log(this.heading);
    console.log(val);
    console.log(key);

    
    
    
  }

}
