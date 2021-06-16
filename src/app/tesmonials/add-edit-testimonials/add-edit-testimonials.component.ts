import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TesmonialsComponent } from '../tesmonials.component';
import { TestimonialsService } from 'src/app/services/testimonials.service';

@Component({
  selector: 'app-add-edit-testimonials',
  templateUrl: './add-edit-testimonials.component.html',
  styleUrls: ['./add-edit-testimonials.component.scss']
})
export class AddEditTestimonialsComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  testForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";

  constructor(
    public dialogRef: MatDialogRef<TesmonialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _test: TestimonialsService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.testForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.getSingleTestimonial();
  }

  async addForm() {
    if (this.testForm.invalid) {
      return;
    }
    
    this.submit = true;
      await (await (this._test.addTestimonials(this.testForm.value))).subscribe((response: any) => {
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
    if (this.testForm.invalid) {
      return;
    }

    this.submit = true;
    
      await (await (this._test.editTestimonials(this.testForm.value, this.id))).subscribe((response: any) => {
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
        
          this.testForm.patchValue({
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

  async getSingleTestimonial(){
    (await (this._test.getSingleTestimonials(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.testForm.setValue({
        name: res.data.name,
        designation: res.data.designation,
        description: res.data.description,
        image: res.data.image
      })
    })
  }

}
