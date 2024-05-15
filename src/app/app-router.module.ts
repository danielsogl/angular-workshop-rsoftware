import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, Route, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search/flight-search.component';
import { FlightEditComponent } from './flight-booking/flight-search/flight-edit/flight-edit.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home',
    canActivate: [],
  },
  // {
  //   path: 'flight-booking',
  //   component: FlightSearchComponent,
  //   title: 'Flight Search',
  // },
  // {
  //   path: 'flight-booking/:id/edit',
  //   component: FlightEditComponent,
  //   title: 'Flight Edit',
  // },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module').then(m => m.FlightBookingModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES, { bindToComponentInputs: true, preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
