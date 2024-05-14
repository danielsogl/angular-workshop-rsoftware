import { Component, ViewChild } from '@angular/core';
import { FlightService } from '../flight.service';
import { DefaultFlightService } from '../default-flight.service';
import { Flight } from '../../../entities/flight';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
  providers: [
    { provide: FlightService, useClass: DefaultFlightService }
  ],
})
export class FlightSearchComponent {
  @ViewChild('form', { static: true }) form!: NgForm;

  from = 'London';
  to = 'Wien';

  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';

  basket: Record<number, boolean> = {};

  constructor(private flightService: FlightService) { }

  search(): void {
    const { from, to } = this.form.value as { from: string, to: string };

    this.flightService.search(from, to).subscribe({
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
