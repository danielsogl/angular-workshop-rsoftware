import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BASE_URL } from './config/base-url.token';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig } from '@angular/common';
import { FlightBookingModule, FlightBookingModuleConfig } from './flight-booking/flight-booking.module';
import { CoreModule } from './core/core.module';

@NgModule({
   imports: [
      BrowserModule,
      CoreModule,
      FlightBookingModule.forRoot({
         baseUrl: 'https://demo.angulararchitects.io/api/flight'
      } satisfies FlightBookingModuleConfig),
   ],
   declarations: [
      AppComponent,
   ],
   providers: [
      { provide: BASE_URL, useValue: 'https://demo.angulararchitects.io/api/flight' },
      { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd.MM.yyyy' } satisfies DatePipeConfig },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
