import { Component, input, signal } from '@angular/core';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-project-slider',
  imports: [ImageComponent],
  templateUrl: './project-slider.component.html',
})
export class ProjectSliderComponent {
  readonly images = input.required<string[]>();
  readonly projectName = input<string>('');

  readonly currentImgIndex = signal<number>(0);
  readonly isLightboxOpen = signal<boolean>(false);

  prevImage(event?: Event): void {
    if (event) event.stopPropagation();
    const len = this.images().length;
    if (len === 0) return;
    this.currentImgIndex.update(prev => (prev - 1 + len) % len);
  }

  nextImage(event?: Event): void {
    if (event) event.stopPropagation();
    const len = this.images().length;
    if (len === 0) return;
    this.currentImgIndex.update(prev => (prev + 1) % len);
  }

  setIndex(index: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.currentImgIndex.set(index);
  }
}
