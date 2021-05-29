import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-get-sub-catagory',
  templateUrl: './get-sub-catagory.component.html',
  styleUrls: ['./get-sub-catagory.component.scss']
})
export class GetSubCatagoryComponent implements OnInit {

  type:string;
  id:string;
  isLoading = true;
  solutionMainCategoryData: any = [];
  solutionSubCategoryData: any = [];
  productMainCategoryData: any = [];
  message: string;
  constructor(private _activatedRoute: ActivatedRoute,private _nav: NavbarService,private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    // Get type
    this._activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      
      this.type = params['type'];
      
 
    })


    // Get id
    this._activatedRoute.params.subscribe(params => {
      
      this.id = params['id']
    });

 
  }

  ngAfterViewInit(): void{
   
    this.getData(this.type , this.id);

  }

  getData(type , id ){
    console.error(type, id)
    this.isLoading = true;
     // switch start
    switch (type) {
   
      case 'solutionMainCategory': {
        
        this.solutionMainCategoryData = [];
        this.solutionSubCategoryData = [];
        this.productMainCategoryData = [];
        this._nav.getsolutionMainCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionMainCategoryData = response.data;
            
            this.isLoading = false;
            if(this.solutionMainCategoryData.length == 0){
            
              this.message = "No solution main category added yet";
            
            }
            console.log(this.solutionMainCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'solutionSubCategory': {
        this.solutionMainCategoryData = [];
        this.solutionSubCategoryData = [];
        this.productMainCategoryData = [];
        this._nav.getsolutionSubCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionSubCategoryData = response.data;
            this.isLoading = false;
            if(this.solutionSubCategoryData.length == 0){
            
              this.message = "No solution sub category added yet";
            
            }
            console.log(this.solutionSubCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'productMainCategory': {
        this.solutionMainCategoryData = [];
        this.solutionSubCategoryData = [];
        this.productMainCategoryData = [];
        this._nav.getproductMainCategory(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.productMainCategoryData = response.data;
            this.isLoading = false;
            if(this.productMainCategoryData.length == 0){
            
              this.message = "No product main category added yet";
            
            }
            console.log(this.productMainCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
    }


    // switch end
  }

  

}
