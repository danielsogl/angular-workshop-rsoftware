import { TestBed } from '@angular/core/testing';

import { FlightLookupService } from './flight-lookup.service';

describe('FlightLookupService', () => {
  let service: FlightLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
