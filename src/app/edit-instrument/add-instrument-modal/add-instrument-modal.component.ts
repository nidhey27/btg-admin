import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentService } from 'src/app/services/instrument.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { EditInstrumentComponent } from '../edit-instrument.component';

@Component({
  selector: 'app-add-instrument-modal',
  templateUrl: './add-instrument-modal.component.html',
  styleUrls: ['./add-instrument-modal.component.scss']
})
export class AddInstrumentModalComponent implements OnInit {

  row: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  instrumentForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  instruments:any;
  constructor(
    public dialogRef: MatDialogRef<EditInstrumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _instru: InstrumentService,
    private _nav: NavbarService
  ) { }

  ngOnInit(): void {
    this.row = this.data?.row;
    this.id = this.data?.id;
    this.isLoading = false;
    console.log(this.row, this.id);
    
    this.instrumentForm = this.formBuilder.group({
      parentId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      row: [this.row, [Validators.required]]
    });
    this.getInstruments();
  }

  async addForm() {
    console.log(this.instrumentForm.value);
    
    if (this.instrumentForm.invalid) {
      return;
    }
    
    this.submit = true;
    
      await (await (this._instru.addInstrument(this.instrumentForm.value))).subscribe((response: any) => {
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
        
          this.instrumentForm.patchValue({
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

 async getInstruments(){
    (await this._nav.getproductMainCategory(this.id)).subscribe( (res:any) => {
      this.instruments = res.data;
    })
  }
}
