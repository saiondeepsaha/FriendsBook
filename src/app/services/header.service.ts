import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private headerNames$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getHeaderObs(): Observable<any> {
      return this.headerNames$.asObservable();
  }

  setHeaderObs(headers:any) {
      this.headerNames$.next(headers);
  }

  getNames(status:any): Observable<any> {
    return this.http.get('/assets/jsons/headers.json').pipe(
      map((res:any) => res[status])
    );
  }
}
