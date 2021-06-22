import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageDatasheetsService } from 'src/app/services/manage-datasheets.service';
import { ManageDataSheetsComponent } from '../manage-data-sheets.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ManageDataSheetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _dataSheet: ManageDatasheetsService) { }


  ngOnInit(): void {
    this.type = this.data.type
    this.cat = this.data.cat
    this.parentId = this.data.pid
    this.categoryId = this.data.cid

    if(this.categoryId){
      this.getSingleCatergory();
    }

    if(this.cat == 'datasheet'){
      this.getSingleDataSheet();
    }

    this.dataSheetCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],

    });

    this.dataSheeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });

    console.log(this.data)
  }

   formData = new FormData()
  async addDataSheet(){
    console.log(this.dataSheeForm.value);

    // let file = new FileReader()
    // File file = new File("this.dataSheeForm.value.file");
    
    this.formData.append('name', this.dataSheeForm.value.name)
    this.formData.append('language', this.dataSheeForm.value.language)

    this.formData.forEach((elem, key) => {
      console.log(elem, key)
    })
    // return 0
    ;(await this._dataSheet.addDataSheet(this.parentId, this.categoryId, this.formData)).subscribe((res: any) => {
      // console.log(res);

      if (res?.status) {
        this.errorMsg = '';
        this.successMsg = res?.message
        setTimeout(() => { window.location.reload() }, 2000)
      }else{
        this.errorMsg = res.message
      }
      
    })
  }

  async updateDataSheet(){
    console.log(this.dataSheeForm.value);

    // let file = new FileReader()
    // File file = new File("this.dataSheeForm.value.file");
    
    this.formData.append('name', this.dataSheeForm.value.name)
    this.formData.append('language', this.dataSheeForm.value.language)
    
    this.formData.forEach((elem, key) => {
      
      if(key == 'file' && elem == ''){
        this.formData.delete('file');
      }
      // console.log(elem, key)
    })

    // this.formData.forEach((elem, key) => {
    //   console.log(elem, key)
    // })
    
    // return 0
    ;(await this._dataSheet.editDataSheet(this.categoryId, this.formData)).subscribe((res: any) => {
      // console.log(res);

      if (res?.status) {
        this.errorMsg = '';
        this.successMsg = res?.message
        setTimeout(() => { window.location.reload() }, 2000)
      }else{
        this.errorMsg = res.message
      }
      
    })
  }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      this.formData.append('file', event.target.files[0] )
    }
  }

  async addCategory() {
    if (this.dataSheetCategoryForm.invalid) {
      return;
    }

    this.submit = true;
    let name = this.dataSheetCategoryForm.value.name
      // console.log(name, this.parentId)

      ; (await this._dataSheet.addDataSheetCategory(this.parentId, { name })).subscribe((res: any) => {
        // console.log(res)

        if (res?.status) {
          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        }else{
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

      ; (await this._dataSheet.editCategorie(this.categoryId, this.dataSheetCategoryForm.value)).subscribe((res: any) => {
        // console.log(res)

        if (res?.status) {
          this.errorMsg = '';
          this.successMsg = res?.message
          setTimeout(() => { window.location.reload() }, 2000)
        }else{
          this.errorMsg = res.message
        }
      })

  }

  async getSingleCatergory(){
    (await this._dataSheet.getSingleCategory(this.categoryId)).subscribe( (res:any) => {
      this.dataSheetCategoryForm.patchValue({
        name: res?.data.name
      });
    })
  }

  async getSingleDataSheet(){
    (await this._dataSheet.getSingleDataSheets(this.categoryId)).subscribe( (res:any) => {
      this.dataSheeForm.patchValue({
        name: res?.data.name,
        language: res?.data.language
      });
    })
  }
}
