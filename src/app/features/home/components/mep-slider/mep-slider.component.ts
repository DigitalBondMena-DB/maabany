import { Component, input, signal } from '@angular/core';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-mep-slider',
  imports: [ImageComponent],
  templateUrl: './map-slider.component.html',
  host: {
    'class': 'block size-full'
  }
})
export class MepSliderComponent {
  readonly images = input<string[]>([]);
  readonly activeIdx = signal<number>(0);
  prev(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const len = this.images().length;
    if (len > 0) {
      this.activeIdx.update((i) => (i - 1 + len) % len);
    }
  }

  next(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const len = this.images().length;
    if (len > 0) {
      this.activeIdx.update((i) => (i + 1) % len);
    }
  }

  select(idx: number, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.activeIdx.set(idx);
  }
}
