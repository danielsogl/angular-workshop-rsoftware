import { TestBed } from '@angular/core/testing';

import { FlightSearchFacadeService } from './flight-search-facade.service';

describe('FlightSearchFacadeService', () => {
  let service: FlightSearchFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSearchFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
