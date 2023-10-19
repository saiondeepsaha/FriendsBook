import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {

  public consts = environment.appConstants;
  public isAdmin = environment.appConstants.inAppVars.FOR_ADMIN;
  public status?: string;
  public passedData?: string;

  constructor(private hs: HeaderService, private router: Router, private ls: LoginService, private ss: SharedService) {
    this.ls.getToken().subscribe( (resp:any)  => {
      if (resp[this.isAdmin]) {
        this.passedData = environment.appConstants.routes.LANDING.ADMIN;
        this.status = this.consts.inAppVars.FOR_ADMIN;
      } else {
        this.passedData = environment.appConstants.routes.LANDING.USER;
        this.status = this.consts.inAppVars.IS_LOGGEDIN;
      }
      this.ss.setType(this.passedData);
    });
  }

  ngOnInit() {
    this.hs.getNames(this.status).subscribe( resp => {
      this.setHeaderNames(resp);
    });
  }

  setHeaderNames(names:any) {
    const headerObjArr = [];
    const userVar = this.passedData;
    const logout = this.consts.routes.LOGOUT;
    for (const name of names) {
      const headerTextKey = Object.keys(name)[0];
      const linkTextKey = Object.keys(name)[1];
      const modifiedObj:any = {};
      modifiedObj[headerTextKey] = name[headerTextKey];
      modifiedObj[linkTextKey] = name[linkTextKey] !== logout ? userVar + '/' + name[linkTextKey] : name[linkTextKey];
      headerObjArr.push(modifiedObj);
    }
    this.hs.setHeaderObs(headerObjArr);
    this.router.navigate([ '/' + userVar + '/' + this.consts.routes.USER.HOME ]);
  }

}
