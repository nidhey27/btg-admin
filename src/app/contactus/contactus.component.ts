import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { EditContactusComponent } from './edit-contactus/edit-contactus.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contacts:any;
  constructor(
    public dialog: MatDialog,
    private _contact: HomeService
    ) { }

  ngOnInit(): void {
    this.getContact();
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(EditContactusComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async getContact(){
    (await this._contact.getContactUs()).subscribe( (res:any) => {
      console.log(res);
      this.contacts = res.data
      
    })
  }

  async delete(type = '', id){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Contact Us will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._contact.deleteContactUs(id)).subscribe((res: any) => {
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

}
