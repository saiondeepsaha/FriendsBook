import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pageName = 'Friends-Book';

  public headers:any;

  public status: string = environment.appConstants.inAppVars.IS_LOGGEDOUT;

  constructor(private hs: HeaderService) { }

  ngOnInit() {
    this.hs.getNames(this.status).subscribe( resp => {
      this.hs.setHeaderObs(resp);
    });
    this.hs.getHeaderObs().subscribe(resp => this.headers = resp );
  }
}
