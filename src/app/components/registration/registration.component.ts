import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { UserRegisterService } from 'src/app/services/user-register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public newUser:FormGroup = new FormGroup({});
  public formSubmitted = false;
  public submitClicked = false;
  public regSuccess = false;
  public regError = false;
  public responseMsg: string = "";

  constructor(private fb: FormBuilder, private route: Router, private datePipe: DatePipe, private register: UserRegisterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newUser = this.fb.group({
      fName: ['', [Validators.required, Validators.pattern(/^[aA-zZ]+$/)]],
      lName: ['', [Validators.required, Validators.pattern(/^[aA-zZ]+$/)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  registerUser() {
    this.submitClicked = true;
    const formData = this.newUser.controls;
    if (this.newUser.valid) {
      this.formSubmitted = true;
      const userData = {
        firstName: formData["fName"].value,
        lastName: formData["lName"].value,
        email: formData["email"].value,
        dob: this.datePipe.transform(formData["dob"].value, 'MM/dd/yyyy'),
        gender: formData["gender"].value,
        password: formData["pass"].value
      };
      this.submitData(userData);
    } else {
      return;
    }
  }

  submitData(formData:any) {
    this.register.registerUser(formData).subscribe({
      next: data => {
        this.formSubmitted = false;
        this.regError = false;
        this.regSuccess = true;
        this.responseMsg = data.message;

      },
      error: error => {
        this.formSubmitted = false;
        this.regSuccess = false;
        this.regError = true;
        this.responseMsg = error.message;
      }
    });
  }

  redirectUser() {
    this.route.navigate(['/login']);
  }

}
