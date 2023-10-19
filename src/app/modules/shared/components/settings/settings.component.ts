import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  public editUser:any;
  public activeUser:any;
  public responseMsg: any;
  public userObj:any = {};

  constructor(private fb: FormBuilder, private loginService: LoginService, private dp: DatePipe, private ss: SharedService) {
    this.loginService.getToken().subscribe(apiResp => {
      Object.assign(this.userObj, apiResp);
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editUser = this.fb.group({
      firstName: [this.userObj['firstName'] ? this.userObj['firstName']: '', [Validators.required, Validators.pattern(/^[aA-zZ]+$/)]],
      lastName: [this.userObj['lastName'] ? this.userObj['lastName'] : '', [Validators.required, Validators.pattern(/^[aA-zZ]+$/)]],
      gender: [this.userObj['gender'] ? this.userObj['gender'] : '', null],
      dob: [this.userObj['dob'] ? this.dp.transform(this.userObj['dob']) : '', null],
      email: [this.userObj['email'] ? this.userObj['email'] : '', [Validators.required, Validators.email]],
      phone: [this.userObj['phone'] ? this.userObj['phone'] : '', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10)]],
      country: [this.userObj['country'] ? this.userObj['country'] : '', [Validators.required, Validators.pattern(/^[aA-zZ]+$/)]],
      city: [this.userObj['city'] ? this.userObj['city'] : '', [Validators.required, Validators.pattern(/^[aA-zZ ]+$/)]],
    });

    this.activeUser = this.fb.group({
      newPass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', null]
    });
    this.activeUser.controls.confirmPass.setValidators([Validators.required, (c:any) => this.matchPasswords(c.value)]);
  }

  matchPasswords(confirmPassValue:any) {
    const newPassField = this.activeUser.controls.newPass.value;
    const confirmPassField = confirmPassValue;
    if ( newPassField !== '' && confirmPassField !== '' && newPassField === confirmPassField ) {
      return null;
    } else {
      return { passWordMismatch: true };
    }
  }

  saveChange() {
    // for password updation
    if (this.activeUser.valid) {
      const formData = this.activeUser.controls;
      const reqObj = {
        _id: this.userObj['_id'] ? this.userObj['_id']: '',
        password: formData.newPass.value
      };
      this.updateUser(reqObj);
    }
  }

  saveEdits() {
    // for profile updation
    const formData = this.editUser.controls;
    if (this.editUser.valid) {
      const reqObj = {
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        city: formData.city.value,
        country: formData.country.value,
        dob: formData.dob.value,
        email: formData.email.value,
        gender: formData.gender.value,
        phone: formData.phone.value,
        _id: this.userObj['_id'] ? this.userObj['_id']: ''
      };
      this.updateUser(reqObj);
    }
  }

  updateUser(userData:any) {
    this.ss.updateUser(userData).subscribe({
      next: response => {
        this.responseMsg = 'Edit Successful';
      },
      error: err => {
        this.responseMsg = false;
      }
    });
  }

}
