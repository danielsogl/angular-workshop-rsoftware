import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
})
export class CityPipe implements PipeTransform {
  transform(value: string, format: 'short' | 'long' = 'short'): string {
    console.log('CityPipe', value, format);
    switch (value) {
      case 'London':
        return format === 'short' ? 'LHR' : 'London';
      case 'New York':
        return format === 'short' ? 'JFK' : 'New York';
      case 'Wien':
        return format === 'short' ? 'VIE' : 'Wien';
      default:
        return value;
    }
  }

}
