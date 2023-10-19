import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { environment } from '../../environments/environment';
import { IRegisterResponse } from '../interfaces/responseInterfaces';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  public registerAPI = environment.restEndPoints.appBaseURL + environment.restEndPoints.registerUserURL;
  public httpHeaders = {
    headers: new HttpHeaders(environment.restEndPoints.appHeader)
  };

  constructor( private http: HttpClient ) { }

  registerUser(userObj:any): Observable<IRegisterResponse> {
    return this.http.post(this.registerAPI, userObj, this.httpHeaders).pipe(
      map( (response: any) => response )
    );
  }
}
