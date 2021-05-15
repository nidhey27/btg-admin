import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {
  isLoading = true;
  industrySolutionData: any = [];
  solutionMainCategoryData: any = [];
  solutionSubCategoryData: any = [];
  productMainCategoryData: any = [];

  panelOpenState = false;
  panelOpenState1 = false;
  constructor(private _nav: NavbarService) { }



  ngOnInit(): void {

  }

  getData(type, id) {
    switch (type) {
      case 'solutionMainCategory': {
        this._nav.getsolutionMainCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionMainCategoryData = response.data;
            // console.log(this.solutionMainCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'solutionSubCategory': {
        this._nav.getsolutionSubCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionSubCategoryData = response.data;
            console.log(this.solutionSubCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'productMainCategory': {
        this._nav.getproductMainCategory(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.productMainCategoryData = response.data;
            console.log(this.productMainCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
    }
  }
  ngAfterViewInit() {
    this._nav.getIndustrySolutionFor().then((res: any) => {
      res.subscribe((response: any) => {
        this.industrySolutionData = response.data;
        this.isLoading = false;
      })

    }).catch(error => {
      console.error(error)
    })
  }
}
