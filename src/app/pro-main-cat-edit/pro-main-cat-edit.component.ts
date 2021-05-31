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

  constructor(private _product: ProductService, private _activatedRoute: ActivatedRoute) { }
  dataForm = [];
  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });
  }
  sub = {};
  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    // console.log(key)
    this.sub[key] = val;
    console.log(this.sub)
  }

  goBack() {
    window.history.back()
  }

  async update() {
    (await this._product.addProduct(this.sub, this.id)).subscribe((resp: any) => {
      console.log(resp)
    })

    // //  (await this._nav.getsolutionMainCategoryFor(element._id)).subscribe((resp2:any) => {



    //   let pushData = {main: element, sub: resp2?.data}
    //   this.industrySolutuonMain.push(pushData)
    // })
  }

}
