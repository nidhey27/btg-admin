import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: String = '';
  successMsg: String = '';
  submit = false;
  constructor(public gVar : GlobalConstants, private formBuilder: FormBuilder, public router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

    if (localStorage.getItem('id') != null) {
      this.router.navigateByUrl('dashboard');
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submit = true;
    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.password;

    this._auth.login({ email, password }).then(res => {
      res.subscribe((response: any) => {
        if (response.status) {
          this.errorMsg = "";
          this.gVar.isLoggeddIn = true;
          this.gVar.adminName = response.data.name;
          this.successMsg = 'Login Successful';
          this.submit = false;
          console.log(response)
          localStorage.setItem('auth-token', response.data.accessToken)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('role', response.data.role)

          this.router.navigateByUrl('dashboard');
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

}
