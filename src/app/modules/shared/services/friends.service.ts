import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { IFriend } from 'src/app/interfaces/responseInterfaces';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {

  private apiBaseURL = environment.restEndPoints.appBaseURL;

  constructor(private ls: LoginService, private us: UsersService, private http: HttpClient) {}

  createRequest(reqObj:any): Observable<any> {
    const reqURL = this.apiBaseURL + environment.restEndPoints.sendFriendReqURL;
    return this.http.post<any>(reqURL, reqObj).pipe(
      map(res => { return res; })
    );
  }

  getFriends(): Observable<IFriend[]> {
    const reqURL = this.apiBaseURL + environment.restEndPoints.getFriendsURL;
    return this.http.get<IFriend[]>(reqURL).pipe(
      map(res => { return res; })
    );
  }

  getMyFriends(): Observable<any> {
    const users = this.us.getUsers();
    const friends = this.getFriends();
    return forkJoin([users, friends]); // returns both the array responses in a single observable
  }

  getFriendById(id:any): Observable<IFriend[]> {
    const reqURL = this.apiBaseURL + environment.restEndPoints.getFriendsURL;
    return this.http.get<IFriend[]>(reqURL + id).pipe(
      map(res => { return res; })
    );
  }

  updatefriend(reqObj:any, reqStat:any):Observable<IFriend>{
    const reqURL = this.apiBaseURL + environment.restEndPoints.getFriendsURL;
    const userUpdate = {
      userId: reqObj['userId'],
      friendId: reqObj['friendId'],
      status: "Friend Request " + reqStat
    }
    console.log(userUpdate);
    console.log(reqObj);
    return this.http.put<IFriend>(reqURL + reqObj.id, userUpdate).pipe(
      map(res => { return res; })
    );
  }
}
