import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { CityAsyncPipe } from './pipes/city-async.pipe';

@NgModule({
  declarations: [
    CityPipe,
    StatusFilterPipe,
    CityAsyncPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CityPipe,
    StatusFilterPipe,
    CityAsyncPipe
  ]
})
export class SharedModule { }
