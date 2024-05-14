import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../flight.service';
import { DefaultFlightService } from '../default-flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
  providers: [
    { provide: FlightService, useClass: DefaultFlightService }
  ],
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Wien';

  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';

  constructor(private flightService: FlightService) { }

  search(): void {
    this.flightService.search(this.from, this.to).subscribe({
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

    this.flightService.save(this.selectedFlight).subscribe({
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
