import { Component } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, filter, map, of, skip, tap, AsyncSubject, combineLatest, merge, zip, catchError } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private counter = 0;
  private subject = new Subject<number>();
  private behaviorSubject = new BehaviorSubject<number>(0);
  private behaviorSubjectB = new BehaviorSubject<number>(0);

  private replaySubject = new ReplaySubject<number>(2);
  private asyncSubject = new AsyncSubject<number>();

  constructor() {
    // combineLatest({
    //   a: of(1),
    //   b: of(2),
    //   c: this.subject,
    // }).subscribe((obs) => {
    //   console.log('Combine Latest:', obs);
    // });

    // setTimeout(() => {
    //   this.subject.next(3);
    // }, 1000);

    // of(1, 2, 3, 4).pipe(
    //   filter((value) => value % 2 === 0),
    //   map((value) => value * 2),
    //   tap((value) => console.log('Value:', value)),
    // ).subscribe(console.log);

    this.behaviorSubject.pipe(
      catchError((error) => {
        console.log('Error:', error);
        return of(5);
      }),
    ).subscribe(() => {
      this.behaviorSubjectB.subscribe(console.log);
    });

    setInterval(() => {
      if (this.behaviorSubject.value === 5) {
        this.behaviorSubject.error(new Error('Counter is 5'));
      }
      this.behaviorSubject.next(this.behaviorSubject.value + 1);
      this.behaviorSubjectB.next(this.behaviorSubjectB.value + 1);
    }, 1000);
  }


  // Subject demo

  // this.subject.subscribe({
  //   next: (value) => console.log('Subject:', value),
  //   complete: () => console.log('Subject: Completed'),
  //   error: (error) => console.error('Subject: Error', error),
  // });

  // setInterval(() => {
  //   this.counter++;
  //   if (this.counter === 5) {
  //     // this.subject.error(new Error('Counter is 5'));
  //     this.subject.complete();
  //   }
  //   this.subject.next(this.counter);
  // }, 1000);


  // BehaviorSubject demo

  // this.behaviorSubject.subscribe(console.log);

  // setInterval(() => {
  //   this.behaviorSubject.next(this.behaviorSubject.value + 1);
  // }, 1000);

  // ReplaySubject demo

  // this.replaySubject.next(1);
  // this.replaySubject.next(2);
  // this.replaySubject.next(3);
  // this.replaySubject.next(4);

  // this.replaySubject.subscribe(console.log);

  // AsyncSubject demo

  // this.asyncSubject.subscribe(console.log);
  // setInterval(() => {
  //   this.counter++;
  //   if (this.counter === 5) {
  //     this.asyncSubject.complete();
  //   }
  //   this.asyncSubject.next(this.counter);
  // }, 1000);
}
