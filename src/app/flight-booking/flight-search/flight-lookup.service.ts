import { Injectable } from '@angular/core';
import { FlightService } from './flight.service';
import { BehaviorSubject, interval, startWith, tap, map, distinctUntilChanged, shareReplay, combineLatest, filter, switchMap, Observable, of, catchError } from 'rxjs';
import { Flight } from '../../entities/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightLookupFactory {

  constructor(private flightService: FlightService) { }

  // Source
  private input$ = new BehaviorSubject<string>('');

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<unknown>({});

  // Sinks
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  readonly online$ = interval(2000).pipe(
    startWith(-1),
    tap((v) => console.log('counter', v)),
    map(() => Math.random() < 0.5),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly flights$ = combineLatest({
    input: this.input$,
    online: this.online$,
  }).pipe(
    filter((combined) => combined.online),
    tap(() => this.loadingSubject.next(true)),
    // higher order operator examples
    // https://blog.angular-university.io/rxjs-higher-order-mapping/
    switchMap((combined) => this.load(combined.input)),
    tap(() => this.loadingSubject.next(false))
  );

  private load(filter: string): Observable<Flight[]> {
    if (!filter) {
      return of([]);
    }

    return this.flightService.search(filter, '').pipe(
      catchError((err) => {
        this.errorSubject.next(err);
        return of([]);
      })
    );
  }

  lookup(filter: string): void {
    this.input$.next(filter);
  }
}
