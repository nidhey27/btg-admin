import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SeeWhatWeDoComponent } from '../see-what-we-do.component';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add-edit-see-what-we-do',
  templateUrl: './add-edit-see-what-we-do.component.html',
  styleUrls: ['./add-edit-see-what-we-do.component.scss']
})
export class AddEditSeeWhatWeDoComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  seeForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<SeeWhatWeDoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _see: HomeService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.seeForm = this.formBuilder.group({
      heading: ['', [Validators.required]],
      description: ['', [Validators.required]],
      video_url: [' ', [Validators.required]],
      blob_data: [' ', [Validators.required]],
      video_url_check: false,
      blob_data_check: false
    });

    if(this.id){
      this.getSingleSeeWhatWeDo();
    }
  }

  async addForm() {
    // if (this.seeForm.invalid) {
    //   return;
    // }
    console.log(this.seeForm.value)
    this.submit = true;
      let data = {
        heading: this.seeForm.value.heading,
        description: this.seeForm.value.description,
        video_url: this.seeForm.value.video_url,
        blob_data: this.seeForm.value.blob_data,

      }
      await (await (this._see.addSeeWhatWeDo(data))).subscribe((response: any) => {
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
    if (this.seeForm.invalid) {
      return;
    }

    this.submit = true;
      let data = {
        heading: this.seeForm.value.heading,
        description: this.seeForm.value.description,
        video_url: this.seeForm.value.video_url,
        blob_data: this.seeForm.value.blob_data,

      }
      await (await (this._see.editSeeWhatWeDo(data, this.id))).subscribe((response: any) => {
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
        
          this.seeForm.patchValue({
            blob_data: base64
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

  async getSingleSeeWhatWeDo(){
    (await (this._see.getSingleSeeWhatWeDo(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.seeForm.setValue({
        heading: res.data.heading,
        description: res.data.description,
        video_url: res.data.video_url,
        blob_data: res.data.blob_data,
        video_url_check: false,
        blob_data_check: false
      })
    })
  }
}
