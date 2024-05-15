import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]'
})
export class ClickWithWarningDirective {
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if (confirm(this.message)) {
      this.confirmed.emit();
    }
  }

  @HostBinding('class') classList = 'btn btn-danger';

  @Input() message = 'Are you sure?';
  @Output() confirmed = new EventEmitter<void>();
}
