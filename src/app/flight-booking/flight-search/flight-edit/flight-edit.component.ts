import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss'
})
export class FlightEditComponent implements OnInit {
  @Input() id: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });

    this.activatedRoute.queryParamMap.subscribe(params => {
      console.log(params.get('from') + ' -> ' + params.get('to'));
    });

    this.activatedRoute.snapshot.queryParamMap.get('id');

    this.activatedRoute.data

    console.log('Input ID: ' + this.id);
  }
}
