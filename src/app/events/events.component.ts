import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events:any;
  constructor(
    private _event: EventsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  async getAllEvents(){
    (await this._event.getEvent()).subscribe( (res:any) => {
      console.log(res.data);
      
      this.events = res.data;      
    })
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditEventsComponent, {
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
        (await this._event.deleteEvent(id)).subscribe((res: any) => {
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
