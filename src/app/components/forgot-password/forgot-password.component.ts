import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public isAuthenticated = false;
  public submitClicked = false;
  public login: string = "";
  public responseMsg: string = "";
  public authenticatedUserId: string = "";
  public registeredUser:FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private fgtPwd: ForgotPasswordService, private route: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registeredUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required ],
      newPass: ['', null ],
      confirmPass: ['', null ]
    });
  }

  matchPasswords(confirmPassValue:any) {
    const newPassField = this.registeredUser.controls["newPass"].value;
    const confirmPassField = confirmPassValue;
    if ( newPassField !== '' && confirmPassField !== '' && newPassField === confirmPassField ) {
      return null;
    } else {
      return { passWordMismatch: true };
    }
  }

  checkAuthentication() {
    this.submitClicked = true;
    if (this.registeredUser.valid) {
      const formData = this.registeredUser.controls;
      const reqObj = {
        email: formData["email"].value
      };
      this.fgtPwd.checkAuthentication(reqObj).subscribe({
        next: resp => {
          if (resp.length > 0) {
            console.log(resp);
            this.authenticatedUserId = resp[0]['id'];
            this.registeredUser.get('email')?.clearValidators();
            this.registeredUser.get('dob')?.clearValidators();
            this.registeredUser.get('newPass')?.setValidators([Validators.required, Validators.minLength(8)]);
            this.registeredUser.get('confirmPass')?.setValidators([Validators.required, (c) => this.matchPasswords(c.value)]);
            this.isAuthenticated = true;
          } else {
            this.responseMsg = 'User Do not Exist';
            return;
          }
        },
        error: err => {
          // will not execute since upon entering wrong email, response comes as a blank array with status 200
          this.responseMsg = err.message;
        }
      })
    }
  }

  reset() {
    console.log(this.authenticatedUserId);
    if (this.registeredUser.valid) {
      const formData = this.registeredUser.controls;
      const reqBody = {
        _id: this.authenticatedUserId,
        password: formData["newPass"].value
      };
      this.fgtPwd.resetPassword(reqBody).subscribe({
        next: resp => {
          this.route.navigate(['/' + environment.appConstants.routes.LOGIN]);
        }
      })
    } else {
      return;
    }
  }

}
