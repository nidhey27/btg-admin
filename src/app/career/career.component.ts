import { Component, OnInit } from '@angular/core';
import { CareerService } from '../services/career.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddEditCareerComponent } from './add-edit-career/add-edit-career.component';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  careers:any;
  constructor(
    private _career: CareerService,
    public dialog: MatDialog,
    public gVar: GlobalConstants
  ) { }

  ngOnInit(): void {
    this.getAll();
  }


  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditCareerComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async delete( id){

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'All datasheets will be deleted if any!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._career.deleteCareer(id)).subscribe((res: any) => {
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
  
  async getAll(){
    (await this._career.getCareer()).subscribe( (res:any) => {
      console.log(res);
      this.careers = res.data
    })
  }
}
