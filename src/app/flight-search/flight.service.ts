import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Flight } from '../entities/flight';
import { Observable } from 'rxjs';
import { DefaultFlightService } from './default-flight.service';
import { DummyFlightService } from './dummy-flight.service';
import { BASE_URL } from '../config/base-url.token';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient, baseUrl: string) => {
    if (isDevMode()) {
      return new DummyFlightService();
    }

    return new DefaultFlightService(http, baseUrl);
  },
  deps: [HttpClient, BASE_URL]
})
export abstract class FlightService {
  abstract search(from: string, to: string): Observable<Flight[]>;
  abstract save(flight: Flight): Observable<Flight>;
}

