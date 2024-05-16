import { Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../../../entities/flight';
import { Subject, catchError, filter, interval, map, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss'
})
export class FlightEditComponent implements OnInit, OnDestroy {
  @Input() id: string | null = null;
  public flight: Flight | undefined;

  private destroy = new Subject<void>();

  public flight$ = this.activatedRoute.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => +params.get('id')!),
    filter(id => !isNaN(id)),
    tap(id => this.flightService.flightById(id)),
    switchMap(id => this.flightService.flightsMap$.pipe(
      map(flightsMap => flightsMap[id]),
      // catch inner observable error
      catchError(() => []),
    )),
  );

  public interval$ = interval(1000);

  constructor(
    private activatedRoute: ActivatedRoute,
    private flightService: FlightService,
    private destroyRef: DestroyRef,
  ) {
    this.interval$.pipe(
      // manually unsubscribe
      // takeUntil(this.destroy),
      // angular way to unsubscribe
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.flightService.flightById(+params.get('id')!);
      this.flightService.flightsMap$.pipe(
        map(flightsMap => flightsMap[+params.get('id')!]),
      ).subscribe(flight => {
        this.flight = flight;
        console.log(flight);
      });
    });

    this.activatedRoute.queryParamMap.subscribe(params => {
      console.log(params.get('from') + ' -> ' + params.get('to'));
    });

    this.activatedRoute.snapshot.queryParamMap.get('id');

    this.activatedRoute.data

    console.log('Input ID: ' + this.id);
  }
}
