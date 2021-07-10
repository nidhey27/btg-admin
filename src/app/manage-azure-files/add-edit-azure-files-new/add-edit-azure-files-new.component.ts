import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageAzureFilesService } from 'src/app/services/manage-azure-files.service';
import { ManageAzureFilesComponent } from '../manage-azure-files.component';
@Component({
  selector: 'app-add-edit-azure-files-new',
  templateUrl: './add-edit-azure-files-new.component.html',
  styleUrls: ['./add-edit-azure-files-new.component.scss']
})
export class AddEditAzureFilesNewComponent implements OnInit {

  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  teamsForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  formData = new FormData()
  fileUrl: String;
  constructor(
    public dialogRef: MatDialogRef<ManageAzureFilesComponent>,
    private formBuilder: FormBuilder,
    private _about: ManageAzureFilesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private files: ManageAzureFilesService
  ) { }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      this.formData.append('file', event.target.files[0] )
    }
  }

  async ngOnInit() {

    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.teamsForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

    if(this.type == 'edit' && this.id != ""){
      (await this.files.getSingle(this.id)).subscribe((res: any) => {

        this.fileUrl = res.data.link
        this.teamsForm.setValue({
          name: res.data.name
        })
      })
    }
  }

  async addForm() {
    console.log(this.teamsForm.value);
    this.formData.append('name',this.teamsForm.value.name)
    this.formData.forEach((elem, key) => {
      console.log(elem, key)
    })
    // return 0;
    
    if (this.teamsForm.invalid) {
      return;
    }
    
    console.log(this.teamsForm.value);
    this.submit = true;
    
      await (await (this.files.addFile(this.formData))).subscribe((response: any) => {
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
    console.log(this.teamsForm.value);
    this.formData.append('name',this.teamsForm.value.name)
    this.formData.forEach((elem, key) => {
      console.log(elem, key)
    })

    // console.log(this.formData.has('file'))
    if(!this.formData.has('file'))
      this.formData.append('file', this.fileUrl.toString())
    // return 0;
    
    if (this.teamsForm.invalid) {
      return;
    }
    
    console.log(this.teamsForm.value);
    this.submit = true;
    
      await (await (this.files.editFile(this.formData, this.id))).subscribe((response: any) => {
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
