import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-carasoul-edit',
  templateUrl: './carasoul-edit.component.html',
  styleUrls: ['./carasoul-edit.component.scss']
})
export class CarasoulEditComponent implements OnInit {

  chooseimg:FormGroup;
  id: any;
  type: any;
  submit: boolean;
  errorMsg: string;
  successMsg: any;
  title:string;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private _home: HomeService) {

    this.chooseimg = this.formBuilder.group({
      banner: ['' , [Validators.required]],
      type:['' , [Validators.required]]
    });

}

  ngOnInit(): void {
    this.id = this.data?.id;
    this.type = this.data?.type;

    if(this.type == 4){
      this.title = "Choose Image/Gif";
    }else if(this.type == 5){
      this.title = "Choose Video";
    }
    
    console.log(this.data);
    
    console.log(this.id , this.type);
    this.chooseimg.patchValue({
      type:this.type
    })

  }

  async setImage(e){
    if (e.target.files) {
      const file = e.target.files[0];
      const type = file.type;
      await this.changeFile(file).then((base64: string): any => {
        // console.log(base64);
        
          this.chooseimg.patchValue({
            banner: base64
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



  updateImg() {
    if (this.chooseimg.invalid) {
      return;
    }

    this.submit = true;
       
    this._home.editBanner(this.id , this.chooseimg.value).then(res => {
      res.subscribe((resp:any) => {
        if (resp?.status) {
          this.errorMsg = "";

          this.successMsg = resp?.message;
          this.submit = false;
          console.log(resp)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = resp.message;
        }
      })
    })
  }

}
