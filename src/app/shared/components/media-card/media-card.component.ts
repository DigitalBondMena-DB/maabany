import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink],
  template: `
  <article class="h-full">
    <a
      [routerLink]="link()"
      class="bg-white border border-neutral-200 rounded-3xl overflow-hidden group hover:border-[#EA8A22]/40 hover:shadow-2xl hover:shadow-[#EA8A22]/5 transition-all duration-300 flex flex-col h-full cursor-pointer relative">
      <div [class]="'overflow-hidden relative block shrink-0 ' + imageHeight()">
        @if (isCarousel()) {
          <img
            [src]="displayImages()[currentIdx()]"
            [alt]="title() + ' slide ' + currentIdx()"
            class="w-full h-full object-cover transition-opacity duration-300"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none"></div>

          <!-- Carousel Navigation buttons -->
          <button
            type="button"
            (click)="prevSlide($event)"
            aria-label="Previous Image"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-neutral-100 cursor-pointer z-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            (click)="nextSlide($event)"
            aria-label="Next Image"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-neutral-100 cursor-pointer z-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Carousel Pagination Dots -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            @for (img of displayImages(); track $index) {
              <button
                type="button"
                (click)="setSlide($event, $index)"
                [attr.aria-label]="'Go to slide ' + ($index + 1)"
                [class]="'h-1.5 rounded-full transition-all duration-300 cursor-pointer ' + ($index === currentIdx() ? 'bg-[#EA8A22] w-3' : 'bg-white/60 w-1.5')">
              </button>
            }
          </div>
        } @else {
          <img
            [src]="displayImages()[0] || image()"
            [alt]="title()"
            class="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none"></div>
        }

        @if (badge()) {
          <div
            [class]="'text-[10px] font-mono text-[#142b52] font-bold uppercase tracking-wider absolute z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/80 shadow-xs ' +
              (badgePosition() === 'bottom-left' ? 'bottom-4 left-4' : 'top-4 left-4')">
              {{ badge() }}
          </div>
        }
      </div>
      <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div class="space-y-2">
          <h3 class="text-lg font-bold text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase leading-snug line-clamp-2">
            {{ title() }}
          </h3>
          <p class="text-xs text-neutral-600 leading-relaxed font-light line-clamp-2">
            {{ desc() }}
          </p>
        </div>
      </div>
    </a>
  </article>
  `
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
