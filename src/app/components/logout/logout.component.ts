import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  public status: string = environment.appConstants.inAppVars.IS_LOGGEDOUT;

  constructor(private hs: HeaderService, private route: Router, private ls: LoginService) { }

  ngOnInit() {
    this.hs.getNames(this.status).subscribe( resp => {
      this.hs.setHeaderObs(resp);
      this.ls.setToken('');
      setTimeout(() => {
        this.route.navigate(['/' + environment.appConstants.routes.LOGIN]);
      }, 1000 );
    });
  }

}
