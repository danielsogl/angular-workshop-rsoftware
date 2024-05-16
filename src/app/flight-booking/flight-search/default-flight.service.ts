import { Inject, Injectable, inject } from '@angular/core';
import { FlightService } from './flight.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config/base-url.token';
import { Flight } from '../../entities/flight';

@Injectable()
export class DefaultFlightService implements FlightService {

  // private readonly url = 'https://demo.angulararchitects.io/api/flight';

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }


  search(from: string, to: string): Observable<Flight[]> {
    const params = { from, to };
    const headers = { Accept: 'application/json' };

    return this.http.get<Flight[]>(this.baseUrl, { params, headers });
  }

  save(flight: Flight): Observable<Flight> {
    const headers = { Accept: 'application/json' };

    return this.http
      .post<Flight>(this.baseUrl, flight, { headers })
  }

  flightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(this.baseUrl + '/' + id);
  }
}
