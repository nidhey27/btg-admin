import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/preview-navbar.service';

@Component({
  selector: 'app-preview-navbar',
  templateUrl: './preview-navbar.component.html',
  styleUrls: ['./preview-navbar.component.scss']
})
export class PreviewNavbarComponent implements OnInit {

  mainNavData: any;
  industrySolutuonForData: any;

  flag: boolean;

  
  constructor( private _nav: NavbarService) { }

  ngOnInit(): void {

    // Get main Nav content 
    this._nav.getMainNav().then((res) => {
      res.subscribe((response: any) => {
        
        
        if (response?.status && response?.status == true)
          this.mainNavData = response?.data
      })
    }).catch(error => {
      console.error(error)
    })

    // Get Industry Solution For
    this._nav.getSubNav().then((res) => {
      res.subscribe((response: any) => {
        
        
        if (response?.status && response?.status == true)
          this.industrySolutuonForData = response?.data
          console.log(response?.data);
        })
    }).catch(error => {
      console.error(error)
    })
  }

  SolutionMainCategoryData: any;

  getSolutionMainCategory(id){
    this.flag = true;
    this.SolutionMainCategoryData = [];
    this._nav.getsolutionMainCategoryFor(id).then((res) => {
      res.subscribe((response: any) => {
        
        
        
        if (response?.status && response?.status == true)
        
          this.SolutionMainCategoryData = response?.data
          // console.log(response?.data);
          if(response?.data?.length != 0 || response?.data?.length == 0)
            this.flag = false;
        })
    }).catch(error => {
      console.error(error)
    })
  }

  SolutionSubCategory: any;
  getSolutionSubCategory(id){
    this.flag = true;
    this.SolutionSubCategory = [];
    this._nav.getsolutionSubCategoryFor(id).then((res) => {
      res.subscribe((response: any) => {
        
        
        if (response?.status && response?.status == true)
          this.SolutionSubCategory = response?.data
          // console.log(response?.data);
          if(response?.data?.length != 0 || response?.data?.length == 0)
            this.flag = false;
        })
    }).catch(error => {
      console.error(error)
    })
  }

  ProductMainCategory: any;
  getProductMainCategory(id){
    this.flag = true;
    this.ProductMainCategory = [];
    this._nav.getproductMainCategory(id).then((res) => {
      res.subscribe((response: any) => {
        
        
        if (response?.status && response?.status == true)
          this.ProductMainCategory = response?.data
          // console.log(response?.data);
          if(response?.data?.length != 0 || response?.data?.length == 0)
            this.flag = false;
        })
    }).catch(error => {
      console.error(error)
    })
  }




}
