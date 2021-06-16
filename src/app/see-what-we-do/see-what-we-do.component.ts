import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditSeeWhatWeDoComponent } from './add-edit-see-what-we-do/add-edit-see-what-we-do.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-see-what-we-do',
  templateUrl: './see-what-we-do.component.html',
  styleUrls: ['./see-what-we-do.component.scss']
})
export class SeeWhatWeDoComponent implements OnInit {
  videos:any;
  constructor(
    private _see: HomeService,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditSeeWhatWeDoComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async getAll(){
    
    (await this._see.getSeeWhatWeDo()).subscribe( (res:any) => {
      console.log(res);
      this.videos = res.data
    })
  }

  async delete(id){
    (await this._see.deleteSeeWhatWeDo(id)).subscribe((resp: any) => {
      if(resp.status){
        setTimeout(() => { window.location.reload() }, 1000)
      }else{
        alert(resp.message)
      }
    })
  }

  sanitize(url){

    if( url.includes('youtube') ){
      return this.urlSanitize(url);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(url)

  }
  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  urlSanitize(url){
    // console.log(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    
    let videoId;
    if (url != null)
      videoId = this.getId(url);
    else
      videoId = this.getId("https://youtu.be/8PtsKRBgLrA");
    // console.log('Video ID:', `www.youtube.com/embed/${videoId}`)
    // console.warn(`www.youtube.com/embed/${videoId}`)
    let urlParse = this._sanitizer.bypassSecurityTrustResourceUrl((`https://www.youtube.com/embed/${videoId}`).toString())

    let returnUrl = urlParse['changingThisBreaksApplicationSecurity']
    // console.log(returnUrl)
    return urlParse;
  }
}
