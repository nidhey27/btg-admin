import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { SocialLinkComponent } from '../social-link.component';
import { SocialLinkService } from 'src/app/services/social-link.service';
@Component({
  selector: 'app-add-edit-social-link',
  templateUrl: './add-edit-social-link.component.html',
  styleUrls: ['./add-edit-social-link.component.scss']
})
export class AddEditSocialLinkComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  socialForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<SocialLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _social: SocialLinkService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.socialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      link: ['', [Validators.required]],
      icon: ['', [Validators.required]]
    });

    if(this.id){
      this.getSingleNews();
    }
  }

  async addForm() {
    if (this.socialForm.invalid) {
      return;
    }
    
    this.submit = true;
    
      await (await (this._social.addSocial(this.socialForm.value))).subscribe((response: any) => {
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
    if (this.socialForm.invalid) {
      return;
    }

    this.submit = true;
      console.log(this.socialForm.value);
      
      await (await (this._social.editSocial(this.socialForm.value, this.id))).subscribe((response: any) => {
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
        }this.id
      },(error: any) => {

      })
  }

  async setImage(e){
    if (e.target.files) {
      const file = e.target.files[0];
      const type = file.type;
      await this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        
          this.socialForm.patchValue({
            icon: base64
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
    (await (this._social.getSingleSocial(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.socialForm.setValue({
        name: res.data.name,
        link: res.data.link,
        icon: res.data.icon
      })
      console.log(this.socialForm.value)
    })
  }

}
