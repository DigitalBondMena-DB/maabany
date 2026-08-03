import {
  Component,
  signal,
  computed,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ElementRef,
  NgZone,
  DestroyRef,
  afterNextRender,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ScrollRevealService } from '../../../../shared/services/scroll-reveal.service';
import { HomeTestimonial } from '../../models/home-api.model';

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [FloatingWireframeComponent],
  templateUrl: './testimonials.component.html',
  styles: [
    `
      @keyframes wordFadeIn {
        0% {
          opacity: 0;
          transform: translateY(8px) scale(0.96);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .animate-word {
        display: inline-block;
        opacity: 0;
        animation: wordFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: calc(var(--i, 0) * 32ms);
        will-change: transform, opacity;
      }
    `,
  ],
})
export class TestimonialsComponent implements OnDestroy {
  readonly testimonialsData = input<HomeTestimonial[]>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollRevealService = inject(ScrollRevealService);

  readonly currentIndex = signal<number>(0);

  private timerId?: any;
  private isVisibleInViewport = false;
  private unregisterObserver?: () => void;



  readonly testimonialsList = computed<TestimonialItem[]>(() => {
    const api = this.testimonialsData();
    if (api && api.length > 0) {
      return api.map((t) => {
        const parts = (t.client_name || 'Client').trim().split(' ');
        const initials =
          parts.length > 1
            ? `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase()
            : (parts[0][0] || 'C').toUpperCase();
        return {
          quote: t.text,
          name: t.client_name,
          role: t.position,
          company: '',
          initials,
        };
      });
    }
    return []
  });

  readonly activeItem = computed(
    () => this.testimonialsList()[this.currentIndex()] || this.testimonialsList()[0]
  );
  readonly words = computed(() => (this.activeItem()?.quote || '').split(' '));

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      // Observe component visibility in the viewport
      this.unregisterObserver = this.scrollRevealService.register(
        this.el,
        { threshold: 0.15 },
        (entry) => {
          this.isVisibleInViewport = entry.isIntersecting;
          if (entry.isIntersecting) {
            this.startAutoSlide();
          } else {
            this.stopAutoSlide();
          }
        }
      );

      // Pause auto-slide when browser tab is hidden
      const handleVisibilityChange = () => {
        if (document.hidden) {
          this.stopAutoSlide();
        } else if (this.isVisibleInViewport) {
          this.startAutoSlide();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      this.destroyRef.onDestroy(() => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        if (this.unregisterObserver) {
          this.unregisterObserver();
        }
        this.stopAutoSlide();
      });
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();

    if (!this.isVisibleInViewport || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.timerId = setInterval(() => {
        if (this.isVisibleInViewport && !document.hidden) {
          this.ngZone.run(() => {
            this.next();
          });
        }
      }, 7000);
    });
  }

  private stopAutoSlide(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  next(): void {
    const list = this.testimonialsList();
    if (list.length === 0) return;
    this.currentIndex.update((idx) => (idx + 1) % list.length);
  }

  prev(): void {
    const list = this.testimonialsList();
    if (list.length === 0) return;
    this.currentIndex.update(
      (idx) => (idx - 1 + list.length) % list.length
    );
  }

  select(idx: number): void {
    if (this.currentIndex() === idx) return;
    this.currentIndex.set(idx);
  }

  isHighlightedWord(word: string): boolean {
    const clean = word.toLowerCase();
    return ['unprecedented', 'ingenuity', 'unparalleled'].some((k) =>
      clean.includes(k)
    );
  }
}
