import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageComponent } from "../image/image.component";

@Component({
  selector: 'app-media-card',
  imports: [RouterLink, ImageComponent],
  templateUrl: './media-card.component.html'
})
export class MediaCardComponent {
  readonly title = input.required<string>();
  readonly desc = input.required<string>();
  readonly image = input<string>();
  readonly images = input<string[]>();
  readonly link = input.required<string>();
  readonly badge = input<string>();
  readonly badgePosition = input<'top-left' | 'bottom-left'>('top-left');
  readonly imageHeight = input<string>('h-64');

  readonly displayImages = computed(() => {
    const imgs = this.images();
    if (imgs && imgs.length > 0) return imgs;
    const single = this.image();
    return single ? [single] : [];
  });

  readonly isCarousel = computed(() => this.displayImages().length > 1);
  readonly currentIdx = signal(0);

  prevSlide(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const total = this.displayImages().length;
    if (total <= 1) return;
    this.currentIdx.update(idx => (idx - 1 + total) % total);
  }

  nextSlide(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const total = this.displayImages().length;
    if (total <= 1) return;
    this.currentIdx.update(idx => (idx + 1) % total);
  }

  setSlide(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.currentIdx.set(index);
  }
}
