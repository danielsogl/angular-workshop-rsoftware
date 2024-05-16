import { Inject, Injectable } from '@angular/core';
import { FlightService } from './flight.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { BASE_URL } from '../../config/base-url.token';
import { Flight } from '../../entities/flight';

interface FlightState {
  flights: Record<number, Flight>;
  loading: boolean;
  error: string;
  message: string;
}

@Injectable()
export class DefaultFlightService implements FlightService {
  private state = new BehaviorSubject<FlightState>({
    flights: {},
    loading: false,
    error: '',
    message: '',
  });

  // solution with multiple BehaviorSubjects
  // private flightsMap = new BehaviorSubject<Record<number, Flight>>({});
  // private loading = new BehaviorSubject<boolean>(false);
  // private error = new BehaviorSubject<string>('');
  // private message = new BehaviorSubject<string>('');

  // readonly flightsMap$ = this.flightsMap.asObservable();
  readonly flightsMap$ = this.state.pipe(map((state) => state.flights));
  // readonly flights$ = this.flightsMap$.pipe(
  //   map((flightsMap) => Object.values(flightsMap))
  // );
  readonly flights$ = this.state.pipe(
    map((state) => Object.values(state.flights))
  );
  // readonly loading$ = this.loading.asObservable();
  readonly loading$ = this.state.pipe(map((state) => state.loading));
  // readonly error$ = this.error.asObservable();
  readonly error$ = this.state.pipe(map((state) => state.error));
  // readonly message$ = this.message.asObservable();
  readonly message$ = this.state.pipe(map((state) => state.message));

  // private readonly url = 'https://demo.angulararchitects.io/api/flight';

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) { }

  private updateState(state: Partial<FlightState>): void {
    this.state.next({ ...this.state.value, ...state });
  }

  search(from: string, to: string): void {
    const params = { from, to };
    const headers = { Accept: 'application/json' };

    this.updateState({ error: '', message: '', loading: true });
    this.http
      .get<Flight[]>(this.baseUrl, { params, headers })
      .pipe(
        map((flights) =>
          flights.reduce<Record<number, Flight>>((flightsMap, flight) => {
            flightsMap[flight.id] = flight;
            return flightsMap;
          }, {})
        )
      )
      .subscribe({
        next: (flightsMap) => {
          this.updateState({ flights: flightsMap, loading: false });
          // this.flightsMap.next(flightsMap);
          // this.loading.next(false);
        },
        error: (error) => {
          this.updateState({ error: error.message, loading: false });
          // this.error.next(error.message);
          // this.loading.next(false);
        },
      });
  }

  save(flight: Flight): void {
    const headers = { Accept: 'application/json' };
    // this.loading.next(true);
    this.updateState({ error: '', message: '', loading: true });
    this.http.post<Flight>(this.baseUrl, flight, { headers }).subscribe({
      next: (flight) => {
        // const flightMap = { ...this.flightsMap.value, [flight.id]: flight };
        // this.flightsMap.next(flightMap);
        // this.loading.next(false);
        // this.message.next('Flight saved successfully');
        const flights = { ...this.state.value.flights, [flight.id]: flight };
        this.updateState({ loading: false, message: 'Flight saved successfully', flights });

      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // this.error.next(error.message);
          // this.message.next(error.message);
          this.updateState({ error: error.error.message, loading: false });
        }
        // this.loading.next(false);
        this.updateState({ loading: false });
      },
    });
  }

  flightById(id: number): void {
    // this.loading.next(true);
    this.updateState({ error: '', loading: true });
    this.http.get<Flight>(this.baseUrl + '/' + id).subscribe({
      next: (flight) => {
        // const flightMap = { ...this.flightsMap.value, [flight.id]: flight };
        // this.flightsMap.next(flightMap);
        // this.loading.next(false);
        const flights = { ...this.state.value.flights, [flight.id]: flight };
        this.updateState({ loading: false, flights });
      },
      error: (error) => {
        // this.error.next(error.message);
        // this.loading.next(false);
        this.updateState({ error: error.message, loading: false });
      },
    });
  }
}
