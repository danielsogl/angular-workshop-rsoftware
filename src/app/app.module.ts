import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search/flight-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from './config/base-url.token';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig } from '@angular/common';
import { CityPipe } from './shared/pipes/city.pipe';
import { StatusFilterPipe } from './shared/pipes/status-filter.pipe';
import { CityAsyncPipe } from './shared/pipes/city-async.pipe';

@NgModule({
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent,
      FlightSearchComponent,
      CityPipe,
      StatusFilterPipe,
      CityAsyncPipe
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
