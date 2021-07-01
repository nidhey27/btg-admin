import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddEditTeamsComponent } from './add-edit-teams/add-edit-teams.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams:any;
  loader:boolean = false;
  constructor(
    private _about: AboutService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTeam();
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditTeamsComponent, {
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
        (await this._about.deleteTeam(id)).subscribe((res: any) => {
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

  async getAllTeam(){
    (await this._about.getTeams()).subscribe( (res:any) => {
      console.log(res);
      this.teams = res.data
    })
  }

}
