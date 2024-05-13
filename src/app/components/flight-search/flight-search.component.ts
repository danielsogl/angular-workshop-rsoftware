import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Wien';

  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';

  constructor(private http: HttpClient) { }

  search(): void {
    const url = 'https://demo.angulararchitects.io/api/flight';
    const params = { from: this.from, to: this.to };
    const headers = { Accept: 'application/json' };

    this.http.get<Flight[]>(url, { params, headers }).subscribe({
      next: flights => {
        this.flights = flights;
      },
      error: err => {
        console.error('err', err);
      },
    });
  }

  selectFlight(f: Flight): void {
    this.selectedFlight = { ...f };
  }

  save(): void {
    if (!this.selectedFlight) return;

    const url = 'https://demo.angulararchitects.io/api/flight';
    const headers = { Accept: 'application/json' };

    this.http
      .post<Flight>(url, this.selectedFlight, { headers })
      .subscribe({
        next: flight => {
          this.selectedFlight = flight;
          this.message = 'Update successful!';
        },
        error: err => {
          this.message = 'Error on updating the Flight';
          console.error(this.message, err);
        },
      });
  }
}
