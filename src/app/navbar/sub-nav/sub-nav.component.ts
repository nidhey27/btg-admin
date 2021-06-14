import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormCardComponent } from 'src/app/form-card/form-card.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'; //Drag And Drop

import { GlobalConstants } from '../../common/global-constants';
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

  flag: boolean;

  panelOpenState = false;
  panelOpenState1 = false;
  constructor(private _nav: NavbarService, public dialog: MatDialog,public gVar: GlobalConstants) { }



  ngOnInit(): void {

  }

  getData(type, id) {
    this.flag = true;
    
    
  
    switch (type) {
      case 'solutionMainCategory': {
        this.solutionMainCategoryData = [];
        this._nav.getsolutionMainCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionMainCategoryData = response.data;
            this.solutionMainCategoryData = this.solutionMainCategoryData.sort(function(a,b){
              return ((a['order'] < b['order']) ? -1 : ((a['order'] > b['order']) ? 1 : 0));
            });
            this.solutionMainCategoryData.forEach((isd,index) => {
              isd.order = index;          
            });
            this.flag = false;
            // console.log(this.solutionMainCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'solutionSubCategory': {
        this.solutionSubCategoryData = [];
        this._nav.getsolutionSubCategoryFor(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.solutionSubCategoryData = response.data;
            this.solutionSubCategoryData = this.solutionSubCategoryData.sort(function(a,b){
              return ((a['order'] < b['order']) ? -1 : ((a['order'] > b['order']) ? 1 : 0));
            });
            this.solutionSubCategoryData.forEach((isd,index) => {
              isd.order = index;          
            });
            this.flag = false;
            // console.log(this.solutionSubCategoryData)
          })

        }).catch(error => {
          console.error(error)
        })
        break;
      }
      case 'productMainCategory': {
        this.productMainCategoryData = [];
        this._nav.getproductMainCategory(id).then((res: any) => {
          res.subscribe((response: any) => {
            this.productMainCategoryData = response.data;
            this.productMainCategoryData = this.productMainCategoryData.sort(function(a,b){
              return ((a['order'] < b['order']) ? -1 : ((a['order'] > b['order']) ? 1 : 0));
            });
            this.productMainCategoryData.forEach((isd,index) => {
              isd.order = index;          
            });
            this.flag = false;
            // console.log(this.productMainCategoryData)
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
        this.industrySolutionData = this.industrySolutionData.sort(function(a,b){
          return ((a['order'] < b['order']) ? -1 : ((a['order'] > b['order']) ? 1 : 0));
        });
        this.industrySolutionData.forEach((isd,index) => {
          isd.order = index;          
        });
        this.isLoading = false;
        console.log('industrySolutionData');
        console.log(this.industrySolutionData);
        
      })

    }).catch(error => {
      console.error(error)
    })
  }

  openFormDialog(type = '', navId = '', parentId = '', category = ''): void {
    const dialogRef = this.dialog.open(FormCardComponent, {
      width: '50%',

      data: { type, navId, category, parentId: parentId ?? undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  deleteNav(navId, catagory) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        if (catagory == 'industry_solutions_for') {
          this._nav.deleteIndustrySolutionFor(navId).then(res => {
            res.subscribe(async (response: any) => {
              if (response?.status) {

                console.log(response)

                Swal.fire(
                  'Deleted!',
                  'Deleted Successfully',
                  'success'
                ).then(() => {
                  setTimeout(() => { window.location.reload() }, 500);
                })

              } else {
                Swal.fire(
                  'Failed to delete!',
                  'Unable to delete.',
                  'error'
                )
              }
            })
          }).catch(error => {
            console.error(error)
          })
        } else if (catagory == 'solution_main_category') {
          this._nav.deletesolutionMainCategoryFor(navId).then(res => {
            res.subscribe(async (response: any) => {
              if (response?.status) {

                console.log(response)

                Swal.fire(
                  'Deleted!',
                  'Deleted Successfully',
                  'success'
                ).then(() => {
                  setTimeout(() => { window.location.reload() }, 500);
                })

              } else {
                Swal.fire(
                  'Failed to delete!',
                  'Unable to delete.',
                  'error'
                )
              }
            })
          }).catch(error => {
            console.error(error)
          })
        } else if (catagory == 'solution_sub_category') {
          this._nav.deletesolutionSubCategoryFor(navId).then(res => {
            res.subscribe(async (response: any) => {
              if (response?.status) {

                console.log(response)

                Swal.fire(
                  'Deleted!',
                  'Deleted Successfully',
                  'success'
                ).then(() => {
                  setTimeout(() => { window.location.reload() }, 500);
                })

              } else {
                Swal.fire(
                  'Failed to delete!',
                  'Unable to delete.',
                  'error'
                )
              }
            })
          }).catch(error => {
            console.error(error)
          })
        } else if (catagory == 'product_main_category') {
          this._nav.deleteproductMainCategory(navId).then(res => {
            res.subscribe(async (response: any) => {
              if (response?.status) {

                console.log(response)

                Swal.fire(
                  'Deleted!',
                  'Deleted Successfully',
                  'success'
                ).then(() => {
                  setTimeout(() => { window.location.reload() }, 500);
                })

              } else {
                Swal.fire(
                  'Failed to delete!',
                  'Unable to delete.',
                  'error'
                )
              }
            })
          }).catch(error => {
            console.error(error)
          })
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }

  // Drag and Grop Function
  async drag(event: CdkDragDrop<string[]>, category = 'industry') {
    
    if( category == 'industry'){
      moveItemInArray(this.industrySolutionData, event.previousIndex, event.currentIndex);
      this.industrySolutionData.forEach((isd,index) => {
        isd.order = index;         
      });

      (await this._nav.updateOrder(this.industrySolutionData, category)).subscribe( (res:any) => {
        console.log(res);
      })

    }else if( category == 'solutionMainCategory' ){
      moveItemInArray(this.solutionMainCategoryData, event.previousIndex, event.currentIndex);
      this.solutionMainCategoryData.forEach((isd,index) => {
        isd.order = index;         
      });

      (await this._nav.updateOrder(this.solutionMainCategoryData, category)).subscribe( (res:any) => {
        console.log(res);
      })
    }else if( category == 'solutionSubCategory' ){
      moveItemInArray(this.solutionSubCategoryData, event.previousIndex, event.currentIndex);
      this.solutionSubCategoryData.forEach((isd,index) => {
        isd.order = index;         
      });

      (await this._nav.updateOrder(this.solutionSubCategoryData, category)).subscribe( (res:any) => {
        console.log(res);
      })
    }else if( category == 'product' ){
      moveItemInArray(this.productMainCategoryData, event.previousIndex, event.currentIndex);
      this.productMainCategoryData.forEach((isd,index) => {
        isd.order = index;         
      });

      (await this._nav.updateOrder(this.productMainCategoryData, category)).subscribe( (res:any) => {
        console.log(res);
      })
    }

  }

}
