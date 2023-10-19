import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserList } from '../../../interfaces/responseInterfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = environment.restEndPoints.appBaseURL;

  constructor(private ls: LoginService, private http: HttpClient) { }

  getUsers(): Observable<IUserList[]>{
    const requestURL = this.baseURL + environment.restEndPoints.updateUserURL;
    return this.http.get<IUserList[]>(requestURL).pipe(
      map(res => {
        return res;
      })
    );
  }

  blockUnblock(userPayload:any): Observable<any> {
    const updateURL = environment.restEndPoints.updateUserURL;
    const putURL = this.baseURL + updateURL + userPayload['_id'];
    for (const key of Object.keys(userPayload)) {
      if (key === 'isActive') {
        userPayload['isActive'] = !userPayload['isActive'];
      }
    }
    // console.log(userPayload);
    return this.http.put(putURL, userPayload).pipe(
      map( resp => {
         return resp;
      })
    );
  }

  getUserById(userId:any){
    const updateURL = environment.restEndPoints.updateUserURL;
    const reqURL = this.baseURL + updateURL + userId;
    return this.http.get(reqURL).pipe(
      map( resp => {
        return resp;
     })
    );
  }

}
