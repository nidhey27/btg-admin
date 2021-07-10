import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditContactBtgComponent } from './add-edit-contact-btg/add-edit-contact-btg.component';
import { ContactBtgService } from '../services/contact-btg.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact-btg',
  templateUrl: './contact-btg.component.html',
  styleUrls: ['./contact-btg.component.scss']
})
export class ContactBtgComponent implements OnInit {
  contacts: any = [];
  toggle: boolean = false;
  submit: boolean = false;
  errorMsg: string;
  successMsg: string;
  btnName: String = "Add Admins";
  isLoading = false;
  adminId: String = '';
  searchInput: string;
  searchForm: FormGroup;
  constructor(
    private _auth: AuthService, 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private _contact: ContactBtgService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
  }


  async search(){
    if (this.searchForm.invalid) {
      return;
    }
    this.contacts = [];
    this.isLoading = true;
    (await this._contact.getContacts(this.searchForm.value.search)).subscribe( (res:any) => {
      this.isLoading = false;
      if(res.status){
        this.contacts = res.data;
      }else{
        this.errorMsg = 'Failed to fetch data at the moment!'
      }
    })
  }

  openFormDialog(type = '', country = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditContactBtgComponent, {
      width: '50%',

      data: { type, country, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async delete(country, id){

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'All datasheets will be deleted if any!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this._contact.deleteSingleContact(country, id)).subscribe((resp: any) => {
          console.log(resp);
          
          if(resp.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }

}
