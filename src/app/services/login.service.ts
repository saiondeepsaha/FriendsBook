import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { environment } from '../../environments/environment';
import { ILoginResponse } from '../interfaces/responseInterfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token$: BehaviorSubject<object> = new BehaviorSubject({});

  public loginAPI = environment.restEndPoints.appBaseURL + environment.restEndPoints.loginURL;

  constructor( private http: HttpClient ) { }

  isAuthenticated(userData:any): Observable<ILoginResponse> {
    return this.http.post(this.loginAPI, userData).pipe(
      map( (response: any) => {
        if (response.token !== null && response.token !== undefined && response.token.length > 0) {
          this.setToken(response);
          return response;
        } else {
          return this.handleError(response);
        }
      })
    );
  }

  setToken(apiResponse:any) {
    console.log(apiResponse);
    this.token$.next(apiResponse);
  }

  getToken() {
    return this.token$.asObservable();
  }

  handleError(error:any) {
    return error.message;
  }
}
