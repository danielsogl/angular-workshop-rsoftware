import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FlightService } from '../../flight-booking/flight-search/flight.service';
import { Observable, map } from 'rxjs';
import { SearchForm } from '../../flight-booking/flight-search/flight-search/flight-search.component';

export class CityValidators {
  static staticValidateCity(control: AbstractControl): ValidationErrors | null {
    const cities = ['Graz', 'Hamburg', 'Wien', 'Zürich'];
    return cities.includes(control.value) ? null : {
      city: {
        currentValue: control.value,
        allowedCities: cities,
      }
    };
  }


  static validateCity(allowedCities: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      return allowedCities.includes(control.value) ? null : {
        city: {
          currentValue: control.value,
          allowedCities,
        }
      };
    }
  }

  static roundTrip(fromGroup: AbstractControl<SearchForm>): ValidationErrors | null {
    const from = fromGroup.get('from')?.value;
    const to = fromGroup.get('to')?.value;

    return from === to ? {
      roundtrip: true
    } : null;
  }

  static asyncValidateCity(flightService: FlightService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      flightService.search(control.value, '');
      return flightService.flights$.pipe(
        map((flight) => flight.length === 0 ? {
          asyncCity: {
            currentValue: control.value,
            response: flight,
          }
        } : null)
      );
    }
  }
}
