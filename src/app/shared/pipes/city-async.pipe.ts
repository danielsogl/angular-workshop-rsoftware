import { Pipe, PipeTransform } from '@angular/core';
import { AirPortService } from '../../flight-search/air-port.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'cityAsync'
})
export class CityAsyncPipe implements PipeTransform {
  constructor(private airPortService: AirPortService) { }

  transform(value: string, format: 'short' | 'long' = 'short'): Observable<string> {
    if (format === 'short') {
      return this.airPortService.getShortName(value);
    } else {
      return this.airPortService.getFullName(value);
    }
  }

}
