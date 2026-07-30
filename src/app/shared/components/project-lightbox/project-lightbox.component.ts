import { Component, input, output, signal, HostListener, effect } from '@angular/core';

@Component({
  selector: 'app-project-lightbox',
  imports: [],
  templateUrl: './project-lightbox.component.html',
})
export class ProjectLightboxComponent {
  readonly isOpen = input<boolean>(false);
  readonly images = input<string[]>([]);
  readonly initialIndex = input<number>(0);
  readonly projectTitle = input<string>('');

  readonly close = output<void>();

  readonly currentIndex = signal<number>(0);
  readonly zoomScale = signal<number>(1);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.currentIndex.set(this.initialIndex());
        this.zoomScale.set(1);
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
      } else {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'Escape') {
      this.onClose();
    }
  }

  prevImage(event?: Event): void {
    if (event) event.stopPropagation();
    this.zoomScale.set(1);
    const len = this.images().length;
    if (len === 0) return;
    this.currentIndex.update(prev => (prev - 1 + len) % len);
  }

  nextImage(event?: Event): void {
    if (event) event.stopPropagation();
    this.zoomScale.set(1);
    const len = this.images().length;
    if (len === 0) return;
    this.currentIndex.update(prev => (prev + 1) % len);
  }

  selectImage(index: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.zoomScale.set(1);
    this.currentIndex.set(index);
  }

  toggleZoom(event?: Event): void {
    if (event) event.stopPropagation();
    this.zoomScale.update(scale => (scale > 1 ? 1 : 1.8));
  }

  onClose(): void {
    this.zoomScale.set(1);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    this.close.emit();
  }
}
