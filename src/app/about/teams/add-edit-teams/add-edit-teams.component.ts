import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutService } from 'src/app/services/about.service';
import { TeamsComponent } from '../teams.component';

@Component({
  selector: 'app-add-edit-teams',
  templateUrl: './add-edit-teams.component.html',
  styleUrls: ['./add-edit-teams.component.scss']
})
export class AddEditTeamsComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  teamsForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<TeamsComponent>,
    private formBuilder: FormBuilder,
    private _about: AboutService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.teamsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      image: ['', [Validators.required]],
      order: [0, [Validators.required]]
    });

    if(this.id){
      this.getSingleNews();
    }
  }

  async addForm() {
    console.log(this.teamsForm.value);
    
    if (this.teamsForm.invalid) {
      return;
    }
    
    console.log(this.teamsForm.value);
    this.submit = true;
    
      await (await (this._about.addTeam(this.teamsForm.value))).subscribe((response: any) => {
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
    if (this.teamsForm.invalid) {
      return;
    }

    this.submit = true;
      console.log(this.teamsForm.value);
      
      await (await (this._about.editTeam(this.teamsForm.value, this.id))).subscribe((response: any) => {
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
        
          this.teamsForm.patchValue({
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
    this.isLoading = true;
    (await (this._about.getSingleTeam(this.id))).subscribe( (res:any) => {
      this.isLoading = false;
      console.log(res);
      this.teamsForm.setValue({
        name: res.data.name,
        designation: res.data.designation,
        image: res.data.image,
        order: res.data.order
      })
      console.log(this.teamsForm.value)
    })
  }

}
