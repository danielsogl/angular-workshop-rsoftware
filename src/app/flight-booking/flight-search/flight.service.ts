import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../entities/flight';

@Injectable({
  providedIn: 'root',
})
export abstract class FlightService {
  abstract readonly flightsMap$: Observable<Record<number, Flight>>;
  abstract readonly flights$: Observable<Flight[]>;
  abstract readonly loading$: Observable<boolean>;
  abstract readonly error$: Observable<string>;
  abstract readonly message$: Observable<string>;

  abstract search(from: string, to: string): void;
  abstract save(flight: Flight): void;
  abstract flightById(id: number): void;
}

