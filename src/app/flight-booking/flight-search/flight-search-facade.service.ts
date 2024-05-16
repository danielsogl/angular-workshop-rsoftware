import { Injectable } from '@angular/core';
import { FlightService } from './flight.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchFacadeService {
  readonly flights$ = this.flightService.flights$;
  readonly loading$ = this.flightService.loading$;
  readonly error$ = this.flightService.error$;
  readonly message$ = this.flightService.message$;

  readonly vm$ = combineLatest({
    flights: this.flights$,
    loading: this.loading$,
    error: this.error$,
    message: this.message$
  });

  constructor(private flightService: FlightService) { }

  search(from: string, to: string) {
    this.flightService.search(from, to);
  }
}
