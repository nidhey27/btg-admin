import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstrumentService } from '../services/instrument.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddInstrumentModalComponent } from './add-instrument-modal/add-instrument-modal.component';

@Component({
  selector: 'app-edit-instrument',
  templateUrl: './edit-instrument.component.html',
  styleUrls: ['./edit-instrument.component.scss']
})
export class EditInstrumentComponent implements OnInit {
  id: any;
  icon: any;
  row1: any = [];
  row2: any = [];
  row3: any = [];
  row4: any = [];
  name: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _instru: InstrumentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {

      this.id = params['id']

    });
    this.getInstrument();
  }

  goBack() {
    window.history.back()
  }

  async getInstrument() {
    // Get Instrument Data
    (await this._instru.getInstrument()).subscribe( (res:any) => {
      console.log(res.data);
      console.log(this.row1.length);
      
      res.data.forEach(e => {
        if( e.row == 1 )
          this.row1.push(e);
        if( e.row == 2 )
          this.row2.push(e);
        if( e.row == 3 )
          this.row3.push(e);
        if( e.row == 4 )
          this.row4.push(e);
      });
      
    })
  }

  openFormDialog(row): void {
    const dialogRef = this.dialog.open(AddInstrumentModalComponent, {
      width: '50%',

      data: { 
        row: row, 
        id: this.id 
      }
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
        (await this._instru.deleteInstrument(id)).subscribe((res: any) => {
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
