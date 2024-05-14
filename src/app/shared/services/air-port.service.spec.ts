import { TestBed } from '@angular/core/testing';

import { AirPortService } from './air-port.service';

describe('AirPortService', () => {
  let service: AirPortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirPortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
