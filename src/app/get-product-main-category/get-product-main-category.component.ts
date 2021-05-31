import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-get-product-main-category',
  templateUrl: './get-product-main-category.component.html',
  styleUrls: ['./get-product-main-category.component.scss']
})
export class GetProductMainCategoryComponent implements OnInit {
  id: String;
  productMainCategory:any = [];
  isLoading: boolean = true;
  message: string;
  pid: any;

  constructor(private _activatedRoute: ActivatedRoute, private _nav: NavbarService, private router: Router) { }
  goBack(){
    window.history.back()
  }
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.pid = params['pid']
    });

 
    
    

    this._nav.getproductMainCategory(this.id).then((res: any) => {
      res.subscribe((response: any) => {
        this.productMainCategory = response.data;

        this.isLoading = false;
        if (this.productMainCategory.length == 0) {

          this.message = "No product main catagory added yet";

        }
        console.log(this.productMainCategory)
      })

    }).catch(error => {
      console.error(error)
    })
  }

}
