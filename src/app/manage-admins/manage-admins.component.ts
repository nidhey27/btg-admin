import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MakeActionComponent } from '../make-action/make-action.component';
@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit {

  adminsData: any = [];
  adminForm: FormGroup;
  toggle: boolean = false;
  submit: boolean = false;
  errorMsg: string;
  successMsg: string;
  btnName: String = "Add Admins";
  isLoading = true;
  adminId: String = '';
  constructor(private _auth: AuthService, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.adminId = localStorage.getItem('id');

    this.adminForm = this.formBuilder.group({
      adminName: ['', [Validators.required]],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', [Validators.required, Validators.min(8)]],
      adminPrivilages: ['', [Validators.required]]

    });

    this._auth.getAllAdmin().then(res => {
      res.subscribe((resp: any) => {
        console.log(resp)
        this.adminsData = resp.data

        this.isLoading = false;
      })
    }).catch(error => {
      console.error(error)
    })
  }

  addAdmin() {
    this.toggle = !this.toggle;
    this.btnName = this.btnName == 'View Admins' ? "Add Admins" : "View Admins";
  }

  onSubmit() {
    if (this.adminForm.invalid) {
      return;
    }
    this.submit = true;
    let email: string = this.adminForm.value.adminEmail;
    let name: string = this.adminForm.value.adminName;
    let role: string = this.adminForm.value.adminPrivilages;
    let password: string = this.adminForm.value.adminPassword;

    console.log(this.adminForm.value)

    this._auth.registerAdmin({ name, email, password, role }).then(res => {
      res.subscribe((response: any) => {
        if (response.status) {
          this.errorMsg = "";

          this.successMsg = 'Admin Registration Successful';
          this.submit = false;
          console.log(response)

          setTimeout(() => {
            window.location.reload();
          }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = response.message;
        }

      })
    }).catch(error => {
      this.submit = false;
      console.log(error)
    })

    // console.log(email, password)
  }

  action(event, id) {
    // console.log(event.target.value, id);
    if (event.target.value != '') {


      const dialogRef = this.dialog.open(MakeActionComponent, {
        width: '50%',
        data: { id, type: event.target.value }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
    }
  }



}
