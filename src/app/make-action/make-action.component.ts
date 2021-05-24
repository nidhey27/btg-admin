import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-make-action',
  templateUrl: './make-action.component.html',
  styleUrls: ['./make-action.component.scss']
})
export class MakeActionComponent implements OnInit {
  isLoading = true;
  changeRole: FormGroup;
  changePass: FormGroup;

  type: String;
  submit: boolean;
  errorMsg: string;
  successMsg: string;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<MakeActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _auth: AuthService) {

    this.changePass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],


    }, { validators: this.checkPassword("password","confirmPassword") });
  }

  checkPassword(passordKey : string, confirmPasswordKey : string){
    return(group : FormGroup) => {
      let password = group.controls[passordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value == confirmPassword.value){
        return;
      } else{
        confirmPassword.setErrors({
          notEqualToPassword : "Password Does Not Match"
        })
      }
    }
   }

  ngOnInit(): void {



    this.type = this.data.type;
    console.log(this.data.id, this.data.type);

    this._auth.getOneAdmin(this.data.id).then((res) => {
      res.subscribe((resp: any) => {
        console.log(resp);
        this.isLoading = false;
        this.changeRole = this.formBuilder.group({
          adminName: [resp.data.name, [Validators.required]],
          adminEmail: [resp.data.email, [Validators.required, Validators.email]],
          adminPrivilages: [(resp.data.role).toString(), [Validators.required]]

        });
      })
    })

  }


  // change role
  changeAdminRole(){
    console.log(this.changeRole.value);
    if (this.changeRole.invalid) {
      return;
    }

       this.submit = true;
    let name: string = this.changeRole.value.adminName;
    let role: string = this.changeRole.value.adminPrivilages;


    this._auth.changeRole({ name, role  } ,this.data.id ).then(res => {
      res.subscribe((response: any) => {
        if (response.status) {
          this.errorMsg = "";
          
          this.successMsg = 'Role Changed';
          this.submit = false;
          console.log(response)
         
          setTimeout(() => {

            window.location.reload()

          },1000);

         
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
    
   }

  //  change password
 
   changeAdminPass(){
     console.log(this.changePass.value);
     if (this.changePass.invalid) {
      return;
    }

    this.submit = true;
    let password: string = this.changePass.value.password;
    let confirmPassword: string = this.changePass.value.confirmPassword;

    this._auth.changePass({password ,confirmPassword} , this.data.id).then(res => {
      res.subscribe((response: any) => {
        if (response.status) {
          this.errorMsg = "";
          
          this.successMsg = 'Password Changed.';
          this.submit = false;
          console.log(response)

          setTimeout(() => {

            window.location.reload()

          },1000);
         

         
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



   }


  






}
