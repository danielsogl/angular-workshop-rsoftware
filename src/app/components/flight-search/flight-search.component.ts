import { Component, inject } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Paris';

  flights: Flight[] = [];

  constructor(private http: HttpClient) { }

  search(): void {
    const url = 'https://demo.angulararchitects.io/api/flights';
    const params = { from: this.from, to: this.to };
    const headers = { Accept: 'application/json' };

    this.http.get<Flight[]>(url, { params, headers }).subscribe({
      next: flights => {
        this.flights = flights;
      },
      error: err => {
        console.error('err', err);
      },
      complete: () => {
        console.debug('complete');
      }
    });
  }
}
