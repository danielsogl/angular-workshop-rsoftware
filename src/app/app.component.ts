import { Component, OnInit } from '@angular/core';
import { FlightService } from './flight-search/flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hello World!';

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.search('Wien', 'Berlin').subscribe({
      next: flights => {
        console.log('flights', flights);
      },
      error: err => {
        console.error('err', err);
      }
    });
  }
}
