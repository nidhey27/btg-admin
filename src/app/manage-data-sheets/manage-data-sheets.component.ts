import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ManageDatasheetsService } from '../services/manage-datasheets.service';
import { FormComponent } from './form/form.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manage-data-sheets',
  templateUrl: './manage-data-sheets.component.html',
  styleUrls: ['./manage-data-sheets.component.scss']
})
export class ManageDataSheetsComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  pdfURL = '';
  id: String = '';
  pName: String = '';
  categories: any = [];
  dataSheets: any = [];
  constructor(private _activatedRoute: ActivatedRoute, private _dataSheet: ManageDatasheetsService
    , public dialog: MatDialog) { }

  showPDF(url) {
    this.pdfURL = url
  }
  async ngOnInit() {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.pName = params['name']
    });

    (await this._dataSheet.getCategories(this.id)).subscribe((res: any) => {
      console.log(res)
      this.categories = res?.data
    })


  }

  // ngAfterViewInit() {
  //   console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  // }
  async tabChanged(tabChangeEvent: MatTabChangeEvent) {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);

    // console.log(this.categories[tabChangeEvent.index])
    let parentId = this.categories[tabChangeEvent.index].parentId
    let categoryId = this.categories[tabChangeEvent.index]._id

      ; (await this._dataSheet.getDataSheets(parentId, categoryId)).subscribe((res: any) => {
        console.log(res)
        this.dataSheets = res.data
      })
  }

  async deleteCat(id) {

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'All datasheets will be deleted if any!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._dataSheet.deleteCategorie(id)).subscribe( (res:any) => {
          if(res.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
    
  }

  async deleteDataSheet(id) {

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'This datasheets will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._dataSheet.deleteDataSheet(id)).subscribe( (res:any) => {
          if(res.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
    
  }

  openFormDialog(type, cat, pid, cid = ''): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',

      data: { type, cat, pid, cid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
