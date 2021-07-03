import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutService } from 'src/app/services/about.service';
import { AboutDefaultComponent } from '../about-default.component';

@Component({
  selector: 'app-add-edit-about-default',
  templateUrl: './add-edit-about-default.component.html',
  styleUrls: ['./add-edit-about-default.component.scss']
})
export class AddEditAboutDefaultComponent implements OnInit {
  isLoading: boolean = false;
  type: string;
  id: string;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  leaderShipForm: any;
  constructor(
    public dialogRef: MatDialogRef<AboutDefaultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _event: AboutService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;

    this.leaderShipForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
    
  }

  async addForm() {
    if (this.leaderShipForm.invalid) {
      return;
    }
    
    this.submit = true;
    
      await (await (this._event.addLeadership(this.leaderShipForm.value.name, this.leaderShipForm.value.designation))).subscribe((response: any) => {
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

}
