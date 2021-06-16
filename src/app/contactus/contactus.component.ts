import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { EditContactusComponent } from './edit-contactus/edit-contactus.component';

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
    (await this._contact.deleteContactUs(id)).subscribe((resp: any) => {
      if(resp.status){
        setTimeout(() => { window.location.reload() }, 1000)
      }else{
        alert(resp.message)
      }
    })
  }

}
