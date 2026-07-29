import { Component, signal, computed, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';

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
  styles: [`
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
  `]
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentIndex = signal<number>(0);
  readonly isAnimating = signal<boolean>(true);
  private timerId?: any;

  readonly testimonials: TestimonialItem[] = [
    {
      quote: 'Maabany delivered our premium enterprise headquarters 3 months ahead of schedule without sacrificing a single layer of architectural complexity. Their standard of execution is truly unprecedented.',
      name: 'Eng. Abdulrahman Al-Saud',
      role: 'VP of Urban Development',
      company: 'Riyadh Vision Group',
      initials: 'AA',
    },
    {
      quote: 'The engineering team at Maabany tackled our complex robotic facility constraints with outstanding ingenuity. Their digital twin models kept us informed of every load test.',
      name: 'Sarah Lindqvist',
      role: 'Operations Lead',
      company: 'Nexa Industrial Labs',
      initials: 'SL',
    },
    {
      quote: 'For high-scale public infrastructure, trust is non-negotiable. Maabany demonstrated unparalleled structural discipline and clean green-concrete compliance.',
      name: 'Marcus Thorne',
      role: 'Principal Director',
      company: 'Global Cities Consortium',
      initials: 'MT',
    },
  ];

  readonly activeItem = computed(() => this.testimonials[this.currentIndex()] || this.testimonials[0]);
  readonly words = computed(() => this.activeItem().quote.split(' '));

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.timerId = setInterval(() => {
      this.next();
    }, 7000);
  }

  private stopAutoSlide(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private triggerReanimation(action: () => void): void {
    this.isAnimating.set(false);
    action();
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.isAnimating.set(true);
      });
    } else {
      this.isAnimating.set(true);
    }
  }

  next(): void {
    this.triggerReanimation(() => {
      this.currentIndex.update((idx) => (idx + 1) % this.testimonials.length);
    });
  }

  prev(): void {
    this.triggerReanimation(() => {
      this.currentIndex.update((idx) => (idx - 1 + this.testimonials.length) % this.testimonials.length);
    });
  }

  select(idx: number): void {
    if (this.currentIndex() === idx) return;
    this.triggerReanimation(() => {
      this.currentIndex.set(idx);
    });
  }

  isHighlightedWord(word: string): boolean {
    const clean = word.toLowerCase();
    return ['unprecedented', 'ingenuity', 'unparalleled'].some((k) => clean.includes(k));
  }
}
