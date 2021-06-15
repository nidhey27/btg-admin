import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../services/testimonials.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditTestimonialsComponent } from './add-edit-testimonials/add-edit-testimonials.component';

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
    (await this._test.deleteTestimonials(type, id)).subscribe((resp: any) => {
      console.log(resp);
      
      if(resp.status){
        setTimeout(() => { window.location.reload() }, 1000)
      }else{
        alert(resp.message)
      }
    })
  }
}
