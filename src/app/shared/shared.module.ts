import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { CityAsyncPipe } from './pipes/city-async.pipe';
import { CardComponent } from './components/card/card/card.component';
import { CardTitleComponent } from './components/card/card-title/card-title.component';
import { CardContentComponent } from './components/card/card-content/card-content.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';

@NgModule({
  declarations: [
    CityPipe,
    StatusFilterPipe,
    CityAsyncPipe,
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CityPipe,
    StatusFilterPipe,
    CityAsyncPipe,
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    CardFooterComponent,
  ]
})
export class SharedModule { }
