import { Component, input, signal, computed, linkedSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image',
  imports: [NgOptimizedImage],
  host: {
    '[class.relative]': 'true',
    '[class.overflow-hidden]': 'true',
    '[class.block]': 'isFill()',
    '[class.inline-block]': '!isFill()',
    '[style.width]': 'width() ? (width() + "px") : (isFill() ? "100%" : "auto")',
    '[style.height]': 'height() ? (height() + "px") : (isFill() ? "100%" : "auto")'

  },
  template: `
    @if (placeholder() && !isLoaded()) {
      <div
        class="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-300/80 animate-pulse z-10 pointer-events-none rounded-[inherit]"
      ></div>
    }

    @if (isFill()) {
      <img
        [ngSrc]="currentSrc()"
        [alt]="alt()"
        [priority]="priority()"
        [loading]="priority() ? undefined : loading()"
        [decoding]="priority() ? 'sync' : 'async'"
        fill
        [style.object-fit]="objectFitSignal()"
        [class.opacity-0]="!isLoaded()"
        [class.opacity-100]="isLoaded()"
        [class]="classes()"
        class="w-full h-full"
        (load)="onLoad()"
        (error)="onError()"
      />
    } @else {
      <img
        [ngSrc]="currentSrc()"
        [alt]="alt()"
        [priority]="priority()"
        [loading]="priority() ? undefined : loading()"
        [decoding]="priority() ? 'sync' : 'async'"
        [width]="width()"
        [height]="height()"
        [style.object-fit]="objectFitSignal()"
        [class.opacity-0]="!isLoaded()"
        [class.opacity-100]="isLoaded()"
        [style.width]="width() ? (width() + 'px') : '100%'"
        [style.height]="height() ? (height() + 'px') : '100%'"
        [class]="classes()"
        (load)="onLoad()"
        (error)="onError()"
      />
    }
  `,
})
export class ImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input<number>();
  readonly height = input<number>();
  readonly priority = input(false);
  readonly loading = input<'lazy' | 'eager'>('lazy');
  readonly decoding = input<'async' | 'sync' | 'auto'>('async');
  readonly placeholder = input(true);
  readonly fallback = input('/main-logo.png');
  readonly objectFit = input<'cover' | 'contain' | 'fill'>('cover');
  readonly classes = input<string>('');

  readonly isLoaded = signal(false);

  readonly objectFitSignal = linkedSignal(this.objectFit);
  readonly currentSrc = linkedSignal({
    source: this.src,
    computation: (src) => src,
  });

  readonly isFill = computed(() => !this.width() || !this.height());

  onLoad() {
    this.isLoaded.set(true);
  }

  onError() {
    if (this.currentSrc() !== this.fallback()) {
      this.currentSrc.set(this.fallback());
      this.objectFitSignal.set('contain');
    }
  }
}
