import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubNavComponent } from '../navbar/sub-nav/sub-nav.component';
import { NavbarService } from '../services/navbar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  // private formBuilder: FormBuilder, public router: Router, private _http: HttpClient, public dialogRef: MatDialogRef<UpcomingWorkshopsComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: any,
  // private _sanitizer: DomSanitizer,

  type: string;
  navId: string;
  category: string;
  getData: any = [];
  isLoading: boolean = true;
  navBarForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  parentId: any;
  constructor(public dialogRef: MatDialogRef<SubNavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _nav: NavbarService, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.type = this.data?.type;
    this.navId = this.data?.navId;
    this.category = this.data?.category;
    this.parentId = this.data?.parentId;
    // console.log(this.type);


    if ((this.category == 'solution_main_category' && this.type == 'add') || (this.category == 'industry_solutions_for' && this.type == 'edit')) {
      this._nav.getIndustrySolutionFor().then(async (res: any) => {
        res.subscribe(async (response: any) => {
          this.getData = await response.data;

          this.isLoading = false;
          this.getData = (this.extractData(this.getData, this.navId));
          console.log(this.getData)
          if (this.type == 'edit') {
            this.navBarForm = await this.formBuilder.group({
              name: [this.getData?.name, [Validators.required]],
              level: [this.getData?.level, [Validators.required]]
            });
          }

        })

      }).catch(error => {
        console.error(error)
      })
    } else if ((this.category == 'solution_sub_category' && this.type == 'add') || (this.category == 'solution_main_category'  && this.type == 'edit')) {
      console.warn(this.parentId, this.navId);
      //https://btg-app.herokuapp.com/api/navbar/solution-main-category/6094d55d8c327c48807489c1
      this._nav.getsolutionMainCategoryFor(this.parentId).then(async (res: any) => {
        res.subscribe(async (response: any) => {
          this.getData = await response.data;

          this.isLoading = false;

          this.getData = this.extractData(this.getData, this.navId);
          console.log(this.getData);
          
          console.log(`%c${this.getData}`, "font-size: 3rem");
          if (this.type == 'edit') {
            
            this.navBarForm = await this.formBuilder.group({
              name: [this.getData?.name, [Validators.required]],
              level: [this.getData?.level, [Validators.required]]
            });
          }

        })

      }).catch(error => {
        console.error(error)
      })
    } else if ((this.category == 'product_main_category'  && this.type == 'add') || (this.category == 'solution_sub_category'  && this.type == 'edit')) {
      console.warn(this.parentId, this.navId);

      this._nav.getsolutionSubCategoryFor(this.parentId).then(async (res: any) => {
        res.subscribe(async (response: any) => {
          this.getData = await response.data;

          this.isLoading = false;

          this.getData = this.extractData(this.getData, this.navId);
          console.log(response);
          if (this.type == 'edit') {
            this.navBarForm = await this.formBuilder.group({
              name: [this.getData?.name, [Validators.required]],
              level: [this.getData?.level, [Validators.required]]
            });
          }

        })

      }).catch(error => {
        console.error(error)
      })
    }else if ((this.category == 'product_main_category'  && this.type == 'edit')) {
      console.warn(this.navId , this.parentId);

      this._nav.getproductMainCategory(this.parentId).then(async (res: any) => {
        res.subscribe(async (response: any) => {
          this.getData = await response.data[0];

          this.isLoading = false;

          
          console.log(response);
          console.log(this.getData);
          
          
          this.navBarForm = await this.formBuilder.group({
            name: [this.getData?.name, [Validators.required]],
            level: [this.getData?.level, [Validators.required]]
          });
          

        })

      }).catch(error => {
        console.error(error)
      })
    }else if (this.type == 'industry_solution') {
      this.isLoading = false;
    }





    this.navBarForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      level: [this.getData?.level, [Validators.required]]
    });


  }

  extractData(object, navId) {
    let data;
    object.forEach((element, key) => {
      if (element?._id == navId) data = element

    });
    return data;
  }

  addForm() {
    if (this.navBarForm.invalid) {
      return;
    }

    this.submit = true;
    let name: string = this.navBarForm.value.name;
    let level: number = this.navBarForm.value.level;
    if (this.category == 'solution_main_category') {
      this._nav.addsolutionMainCategoryFor(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    } else if (this.category == 'solution_sub_category') {
      this._nav.addsolutionSubCategoryFor(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    } else if (this.category == 'product_main_category') {
      this._nav.addproductMainCategory(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }else if (this.type == 'industry_solution') {
      this._nav.addIndustrySolutionFor(this.navBarForm.value).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }

  }

  editForm(){
    if (this.navBarForm.invalid) {
      return;
    }

    this.submit = true;
    let name: string = this.navBarForm.value.name;

    if(this.category == 'industry_solutions_for'){
      this._nav.updateIndustrySolutionFor(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }else if(this.category == 'solution_main_category'){
      this._nav.updatesolutionMainCategoryFor(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }else if(this.category == 'solution_sub_category'){
      this._nav.updatesolutionSubCategoryFor(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }else if(this.category == 'product_main_category'){
      this._nav.updateproductMainCategory(this.navBarForm.value, this.navId).then(res => {
        res.subscribe(async (response: any) => {
          if (response?.status) {
            this.errorMsg = "";

            this.successMsg = response?.message;
            this.submit = false;
            console.log(response)
            setTimeout(() => { window.location.reload() }, 1000)


          } else {
            this.submit = false;
            this.successMsg = "";
            this.errorMsg = response.message;
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }
  }

}
