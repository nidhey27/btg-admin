import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

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
  dataForm:any = {}; 
  productData:any = []; 
  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });

    this._proService.getProduct(this.id).then((res: any) => {
      res.subscribe((response: any) => {
        if(response?.status)
          this.productData = response.data
          this.isLoading = false
          console.log(this.productData)
      })

    }).catch(error => {
      console.error(error)
    })


  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    // console.log(key)
    this.dataForm[key] = val;
    console.log(this.dataForm)
  }

  goBack() {
    window.history.back()
  }

  async update() {
    
    (await this._product.addProduct(this.dataForm, this.id)).subscribe((resp: any) => {
      console.log(resp)
    })

  }

  uploadProImg(event){
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
        console.log(this.url);
    }

    
    
    
  }

}
