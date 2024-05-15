import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DemoApiService, DemoService } from './demo.service';
import { Observable, of } from 'rxjs';

class MockApiService {
  getComments(): Observable<unknown[]> {
    return of([]);
  }
}

fdescribe('DemoService', () => {
  let service: DemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: DemoApiService, useClass: MockApiService },
      ]
    });
    service = TestBed.inject(DemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('increment', () => {
    it('should increment counter', () => {
      // Arrange
      service.counter = 0;
      // Act
      service.increment();
      // Assert
      expect(service.counter).toBe(1);
    });
  });

  describe('decrement', () => {
    it('should decrement counter', () => {
      // Arrange
      service.counter = 1;
      // Act
      service.decrement();
      // Assert
      expect(service.counter).toBe(0);
    });

    it('should not decrement counter if counter is 0', () => {
      // Arrange
      service.counter = 0;
      // Act
      service.decrement();
      // Assert
      expect(service.counter).toBe(0);
    });
  });

  describe('incrementAsync', () => {
    it('should increment counter after 1 second',
      fakeAsync(() => {
        service.counter = 0;
        service.incrementAsync();
        tick(1000);
        expect(service.counter).toBe(1);
      })
    );
  });

  describe('loadComments', () => {
    it('should load comments', () => {
      const apiService = TestBed.inject(DemoApiService);
      spyOn(apiService, 'getComments').and.returnValue(of([]));
      service.loadComments();
      expect(apiService.getComments).toHaveBeenCalledTimes(1);
    });
  });
});
