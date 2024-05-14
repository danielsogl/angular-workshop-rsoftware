import { Injectable } from '@angular/core';
import { FlightService } from './flight.service';
import { Observable, of } from 'rxjs';
import { Flight } from '../entities/flight';

@Injectable()
export class DummyFlightService implements FlightService {
  search(_from: string, _to: string): Observable<Flight[]> {
    return of(
      [
        {
          "id": 1264,
          "from": "London",
          "to": "Wien",
          "date": "2024-06-04T15:18:09.6981637+00:00",
          "delayed": true,
          "flightBookings": []
        },
        {
          "id": 1265,
          "from": "London",
          "to": "Wien",
          "date": "2024-06-05T15:18:09.698164+00:00",
          "delayed": true,
          "flightBookings": []
        },
        {
          "id": 1271,
          "from": "London",
          "to": "Wien",
          "date": "2024-06-01T15:18:09.698166+00:00",
          "delayed": true,
          "flightBookings": []
        }
      ]
    );
  }

  save(flight: Flight): Observable<Flight> {
    return of(flight);
  }
}
