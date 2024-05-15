import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoApiService {
  constructor(private http: HttpClient) { }

  getComments(): Observable<unknown[]> {
    return this.http.get<unknown[]>('https://jsonplaceholder.typicode.com/comments');
  }
}

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public counter = 0;

  constructor(private apiService: DemoApiService) { }

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    if (this.counter === 0) {
      return;
    }
    this.counter--;
  }

  incrementAsync() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.counter++;
        resolve();
      }, 1000);
    });
  }

  loadComments(): void {
    this.apiService.getComments().subscribe((comments) => {
      console.log(comments);
    });
  }
}
