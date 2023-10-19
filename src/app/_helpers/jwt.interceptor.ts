import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private ls: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.ls.getToken().subscribe((resp:any) => {
            if (resp['token']) {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + resp['token']
                    }
                });
            }
        });
        return next.handle(request);
    }
}