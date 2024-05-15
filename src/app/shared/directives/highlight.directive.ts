import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  // scoped to h2 elements with the appHighlight attribute
  selector: 'h2[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string | undefined;
  @Input() appDefaultColor: string = 'yellow';

  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    console.log(event);
    this.backgroundColor = 'red';
    this.appHighlightChange.emit('red');
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    console.log(event);
    this.backgroundColor = 'transparent';
    this.appHighlightChange.emit('transparent');
  }

  @Output() appHighlightChange = new EventEmitter<string>();

  constructor(private element: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    // console.log(this.appHighlight);
    // this.backgroundColor = this.appHighlight !== '' ? this.appHighlight! : this.appDefaultColor;
    // this.element.nativeElement.style.backgroundColor = this.appHighlight !== '' ? this.appHighlight! : this.appDefaultColor;
  }

}
