import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../../entities/flight';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(value: Flight[], delayed: boolean): Flight[] {
    return (value || []).filter(f => f.delayed === delayed);
  }

}
