import { Component, OnInit, ViewChild } from '@angular/core';
import { FlightService } from '../flight.service';
import { DefaultFlightService } from '../default-flight.service';
import { Flight } from '../../../entities/flight';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CityValidators } from '../../../shared/validators/city.validator';

export interface SearchForm {
  from: FormControl<string>;
  to: FormControl<string>;
  withValidators: FormControl<boolean>;
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
  providers: [
    { provide: FlightService, useClass: DefaultFlightService }
  ],
})
export class FlightSearchComponent implements OnInit {
  // @ViewChild('form', { static: true }) form!: NgForm;

  private readonly validators = [
    Validators.required,
    Validators.minLength(3),
    CityValidators.validateCity(['Graz', 'Hamburg', 'Wien', 'Zürich', 'Foo'])
  ];
  private readonly asyncValidators = [CityValidators.asyncValidateCity(this.flightService)];

  from = 'London';
  to = 'Wien';

  // flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  // message = '';

  basket: Record<number, boolean> = {};

  form = new FormGroup<SearchForm>({
    from: new FormControl('London', {
      validators: this.validators,
      asyncValidators: this.asyncValidators,
      nonNullable: true,
    }),
    to: new FormControl('Wien', {
      validators: this.validators,
      asyncValidators: this.asyncValidators,
      nonNullable: true,
    }),
    withValidators: new FormControl(true, { nonNullable: true }),
  }, {
    validators: [CityValidators.roundTrip]
  });

  constructor(protected flightService: FlightService) { }

  ngOnInit(): void {
    this.form.controls.withValidators.valueChanges.subscribe((withValidators) => {
      ;
      if (withValidators) {
        this.form.controls.from.setValidators(this.validators);
        this.form.controls.to.setValidators(this.validators);
      } else {
        this.form.controls.from.clearValidators();
        this.form.controls.to.clearValidators();
      }
      this.form.updateValueAndValidity();
    });
  }

  search(): void {
    const { from, to } = this.form.getRawValue();

    // this.flightService.search(from, to).subscribe({
    //   next: flights => {
    //     this.flights = flights;
    //   },
    //   error: err => {
    //     console.error('err', err);
    //   },
    // });
    this.flightService.search(from, to);
  }

  selectFlight(f: Flight): void {
    this.selectedFlight = { ...f };
  }

  save(): void {
    if (!this.selectedFlight) return;

    // this.flightService.save(this.selectedFlight).subscribe({
    //   next: flight => {
    //     this.selectedFlight = flight;
    //     this.message = 'Update successful!';
    //   },
    //   error: err => {
    //     this.message = 'Error on updating the Flight';
    //     console.error(this.message, err);
    //   },
    // });
    this.flightService.save(this.selectedFlight);
  }
}
