import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, booleanAttribute } from '@angular/core';
import { Flight } from '../../../entities/flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input({ alias: 'flight', required: true }) item!: Flight;
  @Input({
    transform: booleanAttribute,
  }) selected = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  toggleSelect(): void {
    this.selectedChange.emit(!this.selected);
  }

  constructor(private router: Router) {
    console.log('FlightCardComponent.constructor', this.item);
  }

  ngOnInit(): void {
    console.log('FlightCardComponent.ngOnInit', this.item);
  }

  ngOnDestroy(): void {
    console.log('FlightCardComponent.ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FlightCardComponent.ngOnChanges', changes);
  }

  openEditPage(): void {
    this.router.navigate(['/flight-booking', this.item.id, 'edit'], {
      queryParams: {
        from: this.item.from,
        to: this.item.to,
      },
    });
  }
}
