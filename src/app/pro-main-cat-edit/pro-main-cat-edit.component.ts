import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pro-main-cat-edit',
  templateUrl: './pro-main-cat-edit.component.html',
  styleUrls: ['./pro-main-cat-edit.component.scss']
})
export class ProMainCatEditComponent implements OnInit {

  id: String;
  imagePath: any;
  url: string | ArrayBuffer = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
  isLoading: boolean = true;
  constructor(private _product: ProductService, private _activatedRoute: ActivatedRoute, private _proService: ProductService) { }
  dataForm: any = {};

  formData = new FormData();
  productData: any = [];


  dataSheets: any = [];
  count = 0;
  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });


    // Get Products Data
    this._proService.getProduct(this.id).then((res: any) => {
      res.subscribe((response: any) => {
        if (response?.status)
          this.productData = response.data
        this.isLoading = false
        // console.log(this.productData)
        this.url = this.productData?.productImage

        for (const [key, value] of Object.entries(this.productData)) {
          // console.log(`Key : ${key}`);
          // console.log(`Value : ${value}`);
          this.formData.set(key, value?.toString())
        }

        // this.formData.forEach((value, key) => {
        //   console.error(key, value)
        // })

      })

    }).catch(error => {
      console.error(error)
    })


  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    // console.log(key)
    // this.dataForm[key] = val;
    this.formData.set(key, val)
    // this.formData.forEach((value, key) => {
    //   console.warn(key, value)
    // })
  }

  goBack() {
    window.history.back()
  }

  async update() {

    // this.formData.forEach((value, key) => {
    //   console.warn(key, value)
    // })

    // return 0;
    (await this._product.addProduct(this.formData, this.id)).subscribe((resp: any) => {
      console.log(resp)

      if (resp?.status) {
        Swal.fire('Hurray', resp.message, 'success').then(() => {
          window.location.reload()
        })
      }
    })

  }

  uploadProImg(event) {
    console.log(event.target.files[0]);

    const files = event.target.files;
    if (files.length === 0)
      return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }

    this.formData.set('productImage', event.target.files[0], event.target.files[0].name)



  }


  addDataSheets() {
    if (this.count < 8) {
      this.dataSheets.push(
        { "data-fieldName": "dataSheetsName", "type": "text" },
        { "data-fieldName": "dataSheetsFile", "type": "file" },
      )
      this.count = this.count + 1;
    } else {
      alert('Bas na bhai! Jaan Lega ky?')
    }


  }
  
  dataSheetFormData = []

  getDataSheet(event) {
    // console.log(event.target.files[0])
    // console.log(event.target.parentNode.nextSibling)
    this.dataSheetFormData.push({ file: event.target.files[0] })

    console.log(this.dataSheetFormData)

    let purifiedData = [];
    // for(let i = 0; i < this.dataSheetFormData.length / 2; i+2){
      
    //     purifiedData.push({ name:  this.dataSheetFormData[i], file:  this.dataSheetFormData[i+1] })

    // }

    // console.log(purifiedData)

  }
  getButtonName(event) {
    // console.log(event.target.innerHTML)
    this.dataSheetFormData.push({ 'name': event.target.innerHTML })
  }

}
