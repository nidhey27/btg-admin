import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SocialLinkService } from '../services/social-link.service';
import { AddEditSocialLinkComponent } from './add-edit-social-link/add-edit-social-link.component';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss']
})
export class SocialLinkComponent implements OnInit {
  events:any;
  constructor(
    private _social: SocialLinkService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  async getAllEvents(){
    (await this._social.getSocial()).subscribe( (res:any) => {
      console.log(res.data);
      
      this.events = res.data;      
    })
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditSocialLinkComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async delete(id){

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Event will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._social.deleteSocial(id)).subscribe((res: any) => {
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
