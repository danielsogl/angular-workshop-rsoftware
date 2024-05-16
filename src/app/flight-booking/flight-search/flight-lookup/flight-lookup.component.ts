import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, filter, debounceTime, takeUntil } from 'rxjs';
import { FlightLookupFactory } from '../flight-lookup.service';

@Component({
  selector: 'app-flight-lookup',
  templateUrl: './flight-lookup.component.html',
  styleUrl: './flight-lookup.component.scss'
})
export class FlightLookupComponent {
  control = new FormControl('', { nonNullable: true });

  // Source
  private close$ = new Subject<void>();

  from$ = this.control.valueChanges.pipe(
    filter((v) => v.length >= 3),
    debounceTime(300)
  );

  // Sink
  flights$ = this.flightService.flights$;
  error$ = this.flightService.error$;
  loading$ = this.flightService.loading$;
  online$ = this.flightService.online$;

  constructor(private flightService: FlightLookupFactory) { }

  ngOnInit(): void {
    this.from$.subscribe((value) => {
      this.flightService.lookup(value);
    });

    this.online$.pipe(takeUntil(this.close$)).subscribe((v) => {
      console.log('online', v);
    });
  }

  ngOnDestroy(): void {
    this.close$.next();
  }
}
