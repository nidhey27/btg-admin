import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
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
  sectionOne: String = '';
  sectionTwo: String = '';
  sectionThree: String = '';
  sectionFour: String = '';
  sectionFive: String = '';
  sectionSix: String = '';
  sectionSeven: String = '';
  sectionEight: String = '';
  sectionNine: String = '';
  sectionTen: String = '';
  sectionEleven: String = '';
  sectionTwelve: String = '';

  // Edit On Variables

  editSectionOne: boolean = false;
  editSectionTwo: boolean = false;
  editSectionThree: boolean = false;
  editSectionFour: boolean = false;
  editSectionFive: boolean = false;
  editSectionSix: boolean = false;
  editSectionSeven: boolean = false;
  editSectionEight: boolean = false;
  editSectionNine: boolean = false;
  editSectionTen: boolean = false;
  editSectionEleven: boolean = false;
  editSectionTwelve: boolean = false;
  

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _proService: ProductService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });
    this.getProduct();
  }

  goBack() {
    window.history.back()
  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    this.heading = val;
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
        this.sectionOne = this.productData?.sectionOne
        this.sectionTwo = this.productData?.sectionTwo
        this.sectionThree = this.productData?.sectionThree
        this.sectionFour = this.productData?.sectionFour
        this.sectionFive = this.productData?.sectionFive
        this.sectionSix = this.productData?.sectionSix
        this.sectionSeven = this.productData?.sectionSeven
        this.sectionEight = this.productData?.sectionEight
        this.sectionNine = this.productData?.sectionNine
        this.sectionTen = this.productData?.sectionTen
        this.sectionEleven = this.productData?.sectionEleven
        this.sectionTwelve = this.productData?.sectionTwelve

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
      sectionOne: this.sectionOne, 
      sectionTwo: this.sectionTwo, 
      sectionThree: this.sectionThree, 
      sectionFour: this.sectionFour, 
      sectionFive: this.sectionFive, 
      sectionSix: this.sectionSix, 
      sectionSeven: this.sectionSeven, 
      sectionEight: this.sectionEight, 
      sectionNine: this.sectionNine, 
      sectionTen: this.sectionTen, 
      sectionEleven: this.sectionEleven, 
      sectionTwelve: this.sectionTwelve, 
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
