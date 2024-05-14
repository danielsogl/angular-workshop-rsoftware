import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AirPortService } from '../services/air-port.service';

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
