import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CareerService } from 'src/app/services/career.service';
import { CareerComponent } from '../career.component';

@Component({
  selector: 'app-add-edit-career',
  templateUrl: './add-edit-career.component.html',
  styleUrls: ['./add-edit-career.component.scss']
})
export class AddEditCareerComponent implements OnInit {

  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  careerForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<CareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _career: CareerService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.careerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

    if(this.id){
      this.getSingleNews();
    }
  }

  async addForm() {
    if (this.careerForm.invalid) {
      return;
    }

    this.submit = true;
      await (await (this._career.addCareer(this.careerForm.value))).subscribe((response: any) => {
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
    console.log(this.careerForm.value);
    // return 0;
    if (this.careerForm.invalid) {
      return;
    }

    this.submit = true;
      await (await (this._career.editCareer(this.careerForm.value, this.id))).subscribe((response: any) => {
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
        
          this.careerForm.patchValue({
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
    (await (this._career.getSingleCareer(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.careerForm.setValue({
        name: res?.data.name,
        location: res?.data.location,
        description: res?.data.description,
        responsibilities: res?.data.responsibilities,
        type: res?.data.type
      })
    })
  }

}
