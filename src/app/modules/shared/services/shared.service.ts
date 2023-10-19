import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetAllPostResponse } from 'src/app/interfaces/responseInterfaces';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  // to store and update the type of user logged in (used in replace of session storage)
  private userType$: BehaviorSubject<string> = new BehaviorSubject('');

  private baseURL = environment.restEndPoints.appBaseURL;

  constructor(private ls: LoginService, private http: HttpClient) { }

  setType(userType:any) {
    this.userType$.next(userType);
  }

  getType() {
    return this.userType$.asObservable();
  }

  updateUser(userPayload:any) {
    const updateURL = environment.restEndPoints.updateUserURL;
    const putURL = this.baseURL + updateURL + userPayload['_id'];
    return this.http.put(putURL, userPayload).pipe(
      map( resp => {
         return resp;
      })
    );
  }

  getAllPosts(): Observable<IGetAllPostResponse[]> {
    const getPostsURL = this.baseURL + environment.restEndPoints.getAllPostsURL;
    return this.http.get<IGetAllPostResponse[]>(getPostsURL).pipe(
      map((res:any) => { 
        const resArr:any = [];
        res.forEach(function(entry:any) {
          // filtering the response to separate posts with null and empty value
          if (entry.post !== null && entry.post !== undefined && entry.post.length > 0) {
            resArr.push(entry);
          }
        })
        return resArr.reverse();
      })
    );
  }

  createPost(post:any):Observable<any> {
    const createPostsURL = this.baseURL + environment.restEndPoints.createPostURL;
    return this.http.post<any>(createPostsURL, post).pipe(
      map(res => { return res; })
    );
  }

  findPostByUserId(userId:any): Observable<any> {
    const fetchPostsURL = this.baseURL + environment.restEndPoints.getPostsURL;
    return this.http.post<any>(fetchPostsURL, userId).pipe(
      map(res => { return res; })
    );
  }

}
