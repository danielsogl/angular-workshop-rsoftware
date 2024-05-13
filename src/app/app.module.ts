import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
      FlightSearchComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
