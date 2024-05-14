import { InjectionToken, inject } from '@angular/core';
import { FlightService } from '../flight-search/flight.service';
import { HttpClient } from '@angular/common/http';
import { DefaultFlightService } from '../flight-search/default-flight.service';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const FLIGHT_SERVICE = new InjectionToken<FlightService>('FLIGHT_SERVICE', {
  providedIn: 'root',
  factory() {
    return new DefaultFlightService(inject(HttpClient), inject(BASE_URL));
  },
});
