import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../entities/flight';

@Injectable({
  providedIn: 'root',
})
export abstract class FlightService {
  abstract search(from: string, to: string): Observable<Flight[]>;
  abstract save(flight: Flight): Observable<Flight>;
  abstract flightById(id: number): Observable<Flight>;
}

