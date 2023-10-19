import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registeredUser: FormGroup = new FormGroup({});
  public formSubmitted?: boolean;
  public loginError?: boolean;
  public responseMsg: any;

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registeredUser = this.fb.group({
      uname: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const formData = this.registeredUser.controls;
    if (this.registeredUser.valid) {
      this.formSubmitted = true;
      const userData = {
        email: formData["uname"].value,
        password: formData["pass"].value
      };
      this.loginService.isAuthenticated(userData).subscribe({
        next: data => {
          this.formSubmitted = false;
          this.loginError = false;
          console.log(data);
          if (typeof(data) === 'object') {
            if (data.isAdmin) {
              this.route.navigateByUrl('/' + environment.appConstants.routes.LANDING.ADMIN);
            } else {
              this.route.navigateByUrl('/' + environment.appConstants.routes.LANDING.USER);
            }
          } else { // when server returns an error message
            this.formSubmitted = false;
            this.loginError = true;
            this.responseMsg = data;
          }
        },
        error: error => { // when server returns error response
          this.formSubmitted = false;
          this.loginError = true;
          this.responseMsg = error;
        }
      });
    }
  }

  redirectUser() {
    this.route.navigate(['/' + environment.appConstants.routes.FGTPWD]);
  }
  
}
