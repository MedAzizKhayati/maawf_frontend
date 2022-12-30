import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective {
  @Output() onReachedEnd = new EventEmitter();
  @Input() threshold = 100;
  constructor() { }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = Math.abs(event.target.scrollTop);
    const clientHeight = event.target.clientHeight;
    if (scrollHeight - scrollTop - clientHeight < this.threshold) {
      this.onReachedEnd.emit();
    }
  }
}
