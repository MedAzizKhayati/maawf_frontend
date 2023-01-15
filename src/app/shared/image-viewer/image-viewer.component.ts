import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html'
})
export class ImageViewerComponent {
  @Input()
  isVisible = false;

  @Input()
  src: string;

  @Input()
  alt?: string;

  @Output()
  onClose = new EventEmitter<void>();

  onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  ngOnInit() {
    document.addEventListener('keydown', this.onKeyUp);
  }

  close() {
    this.onClose.emit();
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.onKeyUp);
  }
}
