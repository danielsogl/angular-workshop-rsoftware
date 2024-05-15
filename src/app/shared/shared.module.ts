import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { CityAsyncPipe } from './pipes/city-async.pipe';
import { CardComponent } from './components/card/card/card.component';
import { CardTitleComponent } from './components/card/card-title/card-title.component';
import { CardContentComponent } from './components/card/card-content/card-content.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { UserRoleDirective } from './directives/user-role.directive';

@NgModule({
  declarations: [
    CityPipe,
    StatusFilterPipe,
    CityAsyncPipe,
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    CardFooterComponent,
    HighlightDirective,
    TooltipDirective,
    UserRoleDirective
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
    HighlightDirective,
    TooltipDirective,
    UserRoleDirective,
  ]
})
export class SharedModule { }
