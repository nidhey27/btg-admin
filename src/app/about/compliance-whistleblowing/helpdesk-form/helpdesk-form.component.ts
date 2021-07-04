import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutService } from 'src/app/services/about.service';
import { ManageDatasheetsService } from 'src/app/services/manage-datasheets.service';
import { ComplianceWhistleblowingComponent } from '../compliance-whistleblowing.component';

@Component({
  selector: 'app-helpdesk-form',
  templateUrl: './helpdesk-form.component.html',
  styleUrls: ['./helpdesk-form.component.scss']
})
export class HelpdeskFormComponent implements OnInit {

  type: String = '' // Add-Edit
  cat: String = '' // Category - DataSheet
  parentId: String = '' // Product ID
  categoryId: String = '' // DataSheet Category ID

  dataSheetCategoryForm: FormGroup;
  dataSheeForm: FormGroup;
  errorMsg: String = '';
  successMsg: String = '';
  submit = false;

  constructor(
    public dialogRef: MatDialogRef<ComplianceWhistleblowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _about: AboutService
  ) { }


  ngOnInit(): void {
    this.type = this.data.type
    this.cat = this.data.cat
    this.parentId = this.data.pid
    this.categoryId = this.data.cid

    if (this.categoryId) {
      this.getSingleCatergory();
    }

    if (this.parentId) {
      this.getSingleHelpDeskOne();
    }

    this.dataSheetCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],

    });

    this.dataSheeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      subheadingName: ['', [Validators.required]],
      data: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    console.log(this.data)
  }

  async getSingleHelpDeskOne() {
    console.log(this.parentId, "fuck");
    (await this._about.getSingleComWhistleCategoryHelpdeskOne(this.parentId)).subscribe((res: any) => {
      console.log(res);
      
      this.dataSheeForm.patchValue({
        name: res.data[0].name,
        subheadingName: res.data[0].subHeading,
        data: res.data[0].data,
        email: res.data[0].email,
      });
    })
  }

  formData = new FormData()
  async addDataSheet() {
    console.log(this.dataSheeForm.value);

    // let file = new FileReader()
    // File file = new File("this.dataSheeForm.value.file");

    this.formData.append('name', this.dataSheeForm.value.name)
    this.formData.append('language', this.dataSheeForm.value.language)

    this.formData.forEach((elem, key) => {
      console.log(elem, key)
    })
    let body = {
      parentId: this.categoryId,
      name: this.dataSheeForm.value.name,
      subHeading: this.dataSheeForm.value.subheadingName,
      data: this.dataSheeForm.value.data,
      email: this.dataSheeForm.value.email,
    }
      // return 0
      ; (await this._about.addComWhistleCategoryHelpdesk(body)).subscribe((res: any) => {
        // console.log(res);

        if (res?.status) {
          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        } else {
          this.errorMsg = res.message
        }

      })
  }

  async updateDataSheet() {
    console.log(this.dataSheeForm.value);

    // let file = new FileReader()
    // File file = new File("this.dataSheeForm.value.file");

    this.formData.append('name', this.dataSheeForm.value.name)
    this.formData.append('language', this.dataSheeForm.value.language)

    this.formData.forEach((elem, key) => {

      if (key == 'file' && elem == '') {
        this.formData.delete('file');
      }
      // console.log(elem, key)
    })

      // this.formData.forEach((elem, key) => {
      //   console.log(elem, key)
      // })

      // return 0

      let body = {
        parentId: this.categoryId,
        name: this.dataSheeForm.value.name,
        subHeading: this.dataSheeForm.value.subheadingName,
        data: this.dataSheeForm.value.data,
        email: this.dataSheeForm.value.email,
      }
      ; (await this._about.editComWhistleCategoryHelpdesk(body, this.parentId)).subscribe((res: any) => {
        // console.log(res);

        if (res?.status) {
          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        } else {
          this.errorMsg = res.message
        }

      })
  }


  onFileChange(event) {

    if (event.target.files.length > 0) {
      this.formData.append('file', event.target.files[0])
    }
  }

  async addCategory() {
    if (this.dataSheetCategoryForm.invalid) {
      return;
    }

    this.submit = true;
    let name = this.dataSheetCategoryForm.value.name
      // console.log(name, this.parentId)

      ; (await this._about.addComWhistleCategory({ name })).subscribe((res: any) => {
        // console.log(res)

        if (res?.status) {
          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        } else {
          console.log(res);

          this.errorMsg = res.message
        }
      })

  }

  async updateCategory(id) {
    if (this.dataSheetCategoryForm.invalid) {
      return;
    }

    this.submit = true;
    let name = this.dataSheetCategoryForm.value.name
      // console.log(name, this.parentId)

      ; (await this._about.editComWhistleCategory(this.dataSheetCategoryForm.value, this.categoryId,)).subscribe((res: any) => {
        console.log(res)

        if (res?.status) {

          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        } else {
          this.errorMsg = res.message
        }
      })

  }

  async getSingleCatergory() {
    (await this._about.getSingleComWhistleCategory(this.categoryId)).subscribe((res: any) => {
      console.log(res.data.name)
      this.dataSheetCategoryForm.patchValue({
        name: res.data[0].name
      });
    })
  }

}
