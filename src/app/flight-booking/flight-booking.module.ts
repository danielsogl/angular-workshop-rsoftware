import { ModuleWithProviders, NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search/flight-search.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightService } from './flight-search/flight.service';
import { HttpClient } from '@angular/common/http';
import { DummyFlightService } from './flight-search/dummy-flight.service';
import { DefaultFlightService } from './flight-search/default-flight.service';
import { BASE_URL } from '../config/base-url.token';
import { FLIGHT_BOOKING_BASE_URL } from './config/config';
import { FlightCardComponent } from './flight-search/flight-card/flight-card.component';



@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: FlightService, useFactory: (http: HttpClient, baseUrl: string) => {
        if (isDevMode()) {
          return new DummyFlightService();
        }

        return new DefaultFlightService(http, baseUrl);
      },
      deps: [HttpClient, BASE_URL]
    }
  ],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {
  static forRoot({ baseUrl }: FlightBookingModuleConfig): ModuleWithProviders<FlightBookingModule> {
    return {
      ngModule: FlightBookingModule,
      providers: [
        { provide: FLIGHT_BOOKING_BASE_URL, useValue: baseUrl }
      ]
    }
  }
}

export interface FlightBookingModuleConfig {
  baseUrl: string;
}
