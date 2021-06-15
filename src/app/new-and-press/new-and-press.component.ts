import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';
import { AddNewsComponent } from './add-news/add-news.component';

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
    (await this._news.deleteNews(type, id)).subscribe((resp: any) => {
      if(resp.status){
        setTimeout(() => { window.location.reload() }, 1000)
      }else{
        alert(resp.message)
      }
    })
  }
}
