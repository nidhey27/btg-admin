import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageAzureFilesService } from 'src/app/services/manage-azure-files.service';
import { ManageAzureFilesComponent } from '../manage-azure-files.component';

@Component({
  selector: 'app-add-edit-azure-files',
  templateUrl: './add-edit-azure-files.component.html',
  styleUrls: ['./add-edit-azure-files.component.scss']
})
export class AddEditAzureFilesComponent implements OnInit {

  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  teamsForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";

  constructor(
    public dialogRef: MatDialogRef<ManageAzureFilesComponent>,
    private formBuilder: FormBuilder,
    private _about: ManageAzureFilesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.teamsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
  }

}
