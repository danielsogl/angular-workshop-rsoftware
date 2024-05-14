import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirPortService {
  private readonly url = 'http://www.angular.at/api/airport';

  constructor(private http: HttpClient) { }

  getShortName(name: string): Observable<string> {
    const params = { name };
    return this.http.get<string>(this.url + '/code', { params });
  }

  getFullName(name: string): Observable<string> {
    const params = { name };
    return this.http.get<string>(this.url + '/fullName', { params });
  }
}
