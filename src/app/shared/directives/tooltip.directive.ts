import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit {
  viewContainer = inject(ViewContainerRef);
  viewRef: EmbeddedViewRef<unknown> | undefined;

  @Input('appTooltip') template: TemplateRef<unknown> | undefined;

  setHidden(hidden: boolean): void {
    this.viewRef?.rootNodes.forEach((nativeElement) => {
      nativeElement.hidden = hidden;
    });
  }

  ngOnInit(): void {
    if (!this.template) {
      return;
    }
    this.viewRef = this.viewContainer.createEmbeddedView(this.template);
    console.log(this.template);

    this.setHidden(true);
  }

  @HostListener('mouseover')
  mouseover() {
    this.setHidden(false);
  }

  @HostListener('mouseout')
  mouseout() {
    this.setHidden(true);
  }
}
