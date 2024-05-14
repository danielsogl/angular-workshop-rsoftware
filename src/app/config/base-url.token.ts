import { InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightService } from '../flight-booking/flight-search/flight.service';
import { DefaultFlightService } from '../flight-booking/flight-search/default-flight.service';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const FLIGHT_SERVICE = new InjectionToken<FlightService>('FLIGHT_SERVICE', {
  providedIn: 'root',
  factory() {
    return new DefaultFlightService(inject(HttpClient), inject(BASE_URL));
  },
});
