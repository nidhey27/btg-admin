import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';

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
    (await this._event.deleteEvent(id)).subscribe((resp: any) => {
      if(resp.status){
        setTimeout(() => { window.location.reload() }, 1000)
      }else{
        alert(resp.message)
      }
    })
  }

}
