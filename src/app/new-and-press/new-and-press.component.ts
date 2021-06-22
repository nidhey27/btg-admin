import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';
import { AddNewsComponent } from './add-news/add-news.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-new-and-press',
  templateUrl: './new-and-press.component.html',
  styleUrls: ['./new-and-press.component.scss']
})
export class NewAndPressComponent implements OnInit {
  news:any;
  constructor(
    private _news: NewsService,
    public dialog: MatDialog,
    public gVar: GlobalConstants
  ) { }

  ngOnInit(): void {
    this.getAllNews();
  }

  async getAllNews(){
    (await this._news.getNews()).subscribe((resp: any) => {
      console.log(resp)
      this.news = resp.data;
    })
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddNewsComponent, {
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
        (await this._news.deleteNews(type, id)).subscribe((res: any) => {
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
