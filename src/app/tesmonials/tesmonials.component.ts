import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../services/testimonials.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditTestimonialsComponent } from './add-edit-testimonials/add-edit-testimonials.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-tesmonials',
  templateUrl: './tesmonials.component.html',
  styleUrls: ['./tesmonials.component.scss']
})
export class TesmonialsComponent implements OnInit {
  testimonials:any;
  constructor(
    private _test: TestimonialsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    (await this._test.getTestimonials()).subscribe( (res:any) => {
      console.log(res);
      this.testimonials = res.data
    })
  }
  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditTestimonialsComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async delete(type = '', id){

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'All datasheets will be deleted if any!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._test.deleteTestimonials(type, id)).subscribe((resp: any) => {
          console.log(resp);
          
          if(resp.status){
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

}
