import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewAndPressComponent } from '../new-and-press.component';
import { NewsService } from 'src/app/services/news.service';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  newsForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<NewAndPressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _news: NewsService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.newsForm = this.formBuilder.group({
      heading: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.getSingleNews();
  }

  async addForm() {
    if (this.newsForm.invalid) {
      return;
    }

    this.submit = true;
      await (await (this._news.addNews(this.newsForm.value))).subscribe((response: any) => {
        if (response?.status) {
          this.errorMsg = "";

          this.successMsg = response?.message;
          this.submit = false;
          console.log(response)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = response.message;
        }
      },(error: any) => {

      })
  }

  async editForm() {
    if (this.newsForm.invalid) {
      return;
    }

    this.submit = true;
      await (await (this._news.editNews(this.newsForm.value, this.id))).subscribe((response: any) => {
        if (response?.status) {
          this.errorMsg = "";

          this.successMsg = response?.message;
          this.submit = false;
          console.log(response)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = response.message;
        }
      },(error: any) => {

      })
  }

  async setImage(e){
    if (e.target.files) {
      const file = e.target.files[0];
      const type = file.type;
      await this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        
          this.newsForm.patchValue({
            image: base64
          })
      });
    } 
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  async getSingleNews(){
    (await (this._news.getSingleNews(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.newsForm.setValue({
        heading: res.data.heading,
        description: res.data.description,
        image: res.data.image
      })
    })
  }
}
