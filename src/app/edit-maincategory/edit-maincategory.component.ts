import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-edit-maincategory',
  templateUrl: './edit-maincategory.component.html',
  styleUrls: ['./edit-maincategory.component.scss']
})
export class EditMaincategoryComponent implements OnInit {
  productData: any;
  isLoading: boolean;
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
  url: any;
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
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _proService: ProductService,
    private _preview: PreviewService,
    private _route: Router
  ) { }



  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });
    this.getProduct();
  }

  // Toggle of Angular editor
  toggleEdit(index){
    for(let i = 0; i < this.editSection.length; i++){
      if(index == i)
        this.editSection[i].toggle = !this.editSection[i].toggle
      else
        this.editSection[i].toggle = false
    }
  }


  goBack() {
    window.history.back()
  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    this.heading = val;
  }


  preview(){
    console.log(this.heading);
    
    this._preview.saveData(this.editSection,this.heading).then(() => {
      // this._route.navigate(['/preview'])
      console.log(this.editSection)
      this._route.navigate([]).then(result => { window.open('#/preview?type=product', '_blank'); });
    })
  }

  getProduct() {
    // Get Products Data
    this._proService.getProduct(this.id).then((res: any) => {
      res.subscribe((response: any) => {
        if (response?.status)
          this.productData = response.data
        this.isLoading = false
        console.log(this.productData)
        this.heading = this.productData?.heading
        this.editSection[0].data = this.productData?.sectionOne
        this.editSection[1].data = this.productData?.sectionTwo
        this.editSection[2].data = this.productData?.sectionThree
        this.editSection[3].data = this.productData?.sectionFour
        this.editSection[4].data = this.productData?.sectionFive
        this.editSection[5].data = this.productData?.sectionSix
        this.editSection[6].data = this.productData?.sectionSeven
        this.editSection[7].data = this.productData?.sectionEight
        this.editSection[8].data = this.productData?.sectionNine
        this.editSection[9].data = this.productData?.sectionTen
        this.editSection[10].data = this.productData?.sectionEleven
        this.editSection[11].data = this.productData?.sectionTwelve

        

        // for (const [key, value] of Object.entries(this.productData)) {
        //   // console.log(`Key : ${key}`);
        //   // console.log(`Value : ${value}`);
        //   this.formData.set(key, value?.toString())
        // }

        // this.formData.forEach((value, key) => {
        //   console.error(key, value)
        // })

      })

    }).catch(error => {
      console.error(error)
    })
  }

  async update() {

    let body = {
      heading: this.heading,
      parentId: this.id,
      sectionOne: this.editSection[0].data, 
      sectionTwo: this.editSection[1].data, 
      sectionThree: this.editSection[2].data, 
      sectionFour: this.editSection[3].data, 
      sectionFive: this.editSection[4].data, 
      sectionSix: this.editSection[5].data, 
      sectionSeven: this.editSection[6].data, 
      sectionEight: this.editSection[7].data, 
      sectionNine: this.editSection[8].data, 
      sectionTen: this.editSection[9].data, 
      sectionEleven: this.editSection[10].data, 
      sectionTwelve: this.editSection[11].data, 
    };

    console.log(body);
    

    // return 0;
    (await this._proService.addProduct(body, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }

}
