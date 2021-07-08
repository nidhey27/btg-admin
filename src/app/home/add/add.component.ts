import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  carsouleType = 0;
  banner: any;
  errorMsg: string;
  successMsg: any;
  submit: boolean;
  constructor(private _home: HomeService,) { }

  ngOnInit(): void {
  }

  private _prevSelected: any;

  async handleChange(evt, type) {
    // alert(type)
    this.carsouleType = type
    // alert(this.carsouleType)
  }

  async setImage(e){
    if (e.target.files) {
      const file = e.target.files[0];
      const type = file.type;
      await this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        
          this.banner = base64;
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

  async addCarsoule() {
    if (this.carsouleType == 1 || this.carsouleType == 2 || this.carsouleType == 3) {
      this.submit = true;
      (await this._home.addCarsoule(this.carsouleType)).subscribe((res: any) => {
        console.log(res)
        if (res?.status) {
          this.errorMsg = "";

          this.successMsg = res?.message;
          this.submit = false;
          console.log(res)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = res.message;
        }
      })
    }else{
      this.submit = true;
      (await this._home.addCarsoule(this.carsouleType, this.banner)).subscribe((res: any) => {
        console.log(res)
        if (res?.status) {
          this.errorMsg = "";

          this.successMsg = res?.message;
          this.submit = false;
          console.log(res)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = res.message;
        }
      })
    }
  }

}
