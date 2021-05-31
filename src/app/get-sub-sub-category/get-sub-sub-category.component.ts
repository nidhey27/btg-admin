import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-get-sub-sub-category',
  templateUrl: './get-sub-sub-category.component.html',
  styleUrls: ['./get-sub-sub-category.component.scss']
})
export class GetSubSubCategoryComponent implements OnInit {

  id: String;
  solutionSubCategoryData:any = [];
  isLoading: boolean=true;
  message: string;
  pid: any;
  constructor(private _activatedRoute: ActivatedRoute, private _nav: NavbarService, private router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.pid = params['pid']
    });

 
    
    

    this._nav.getsolutionSubCategoryFor(this.id).then((res: any) => {
      res.subscribe((response: any) => {
        this.solutionSubCategoryData = response.data;

        this.isLoading = false;
        if (this.solutionSubCategoryData.length == 0) {

          this.message = "No solution sub category added yet";

        }
        console.log(this.solutionSubCategoryData)
      })

    }).catch(error => {
      console.error(error)
    })
  }

  goBack(){
    window.history.back()
  }


}
