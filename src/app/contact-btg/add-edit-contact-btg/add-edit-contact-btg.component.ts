import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactBtgService } from 'src/app/services/contact-btg.service';
import { ContactBtgComponent } from '../contact-btg.component';

@Component({
  selector: 'app-add-edit-contact-btg',
  templateUrl: './add-edit-contact-btg.component.html',
  styleUrls: ['./add-edit-contact-btg.component.scss']
})
export class AddEditContactBtgComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  contactForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  country: any;
  constructor(
    public dialogRef: MatDialogRef<ContactBtgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _contact: ContactBtgService 
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.country = this.data?.country;
    this.id = this.data?.id;
    this.isLoading = false;
    console.log(this.data);
    
    this.contactForm = this.formBuilder.group({
      office_name: ['', [Validators.required]],
      display_country: ['', [Validators.required]],
      other_countries: ['', [Validators.required]],
      products: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email_address: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    if(this.country && this.id){
      this.getSingleTestimonial();
    }
  }

  async addForm() {
    if (this.contactForm.invalid) {
      return;
    }
    
    this.submit = true;
      await (await (this._contact.addContact(this.contactForm.value))).subscribe((response: any) => {
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
    if (this.contactForm.invalid) {
      return;
    }

    this.submit = true;
    
      await (await (this._contact.editSingleContact(this.contactForm.value, this.country, this.id))).subscribe((response: any) => {
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

  async getSingleTestimonial(){
    this.isLoading = true;
    (await (this._contact.getSingleContact(this.country, this.id))).subscribe( (res:any) => {
      console.log(res);
      this.isLoading = false;
      this.contactForm.setValue({
        office_name: res.data[0]?.office_name,
        display_country: res.data[0]?.display_country,
        other_countries: res.data[0]?.other_countries,
        products: res.data[0]?.products,
        contact_number: res.data[0]?.contact_number,
        email_address: res.data[0]?.email_address,
        fax: res.data[0]?.fax,
        address: res.data[0]?.address
      })
    })
  }

}
