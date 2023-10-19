import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  public baseURL = environment.restEndPoints.appBaseURL;

  constructor( private http: HttpClient ) { }

  checkAuthentication(requestBody:any): Observable<any> {
    const headers:any = {};
    headers['Content-Type'] = 'application/json';
    const reqHeaders = {
      headers: new HttpHeaders(headers)
    };
    const apiURL = this.baseURL + environment.restEndPoints.userByEmailURL;
    return this.http.post(apiURL, requestBody, reqHeaders).pipe(
      map(res => {
        return res;
      })
    )
  }

  resetPassword(requestPayload:any) {
    console.log(requestPayload);
    const headers:any = {};
    headers['Content-Type'] = 'application/json';
    const reqHeaders = {
      headers: new HttpHeaders(headers)
    };
    const updateURL = environment.restEndPoints.updateUserURL;
    const putURL = this.baseURL + updateURL + requestPayload['_id'];
    return this.http.put(putURL, requestPayload, headers).pipe(
      map( resp => {
         return resp;
      })
    );
  }
}
