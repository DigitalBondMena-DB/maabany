import {
  Directive,
  ElementRef,
  inject,
  input,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealService } from '../services/scroll-reveal.service';

export type ScrollDirection = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective {
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollRevealService = inject(ScrollRevealService);

  /** Direction from which the element enters ('top' | 'bottom' | 'left' | 'right') */
  readonly appScrollReveal = input<ScrollDirection>('bottom');

  /** Delay before animation starts (in ms) */
  readonly delay = input<number>(0);

  /** Animation duration (in ms) */
  readonly duration = input<number>(1000);

  /** Distance to travel (e.g. '40px', '2rem', '100%') */
  readonly distance = input<string>('40px');

  /** IntersectionObserver threshold (0.0 to 1.0) */
  readonly threshold = input<number>(0.15);

  /** IntersectionObserver root element */
  readonly root = input<Element | Document | null>(null);

  /** IntersectionObserver rootMargin */
  readonly rootMargin = input<string>('0px');

  /** Whether to animate only once or repeat on scroll */
  readonly once = input<boolean>(true);

  private cachedInitialTransform = '';
  private revealAnimation?: Animation;
  private hideAnimation?: Animation;
  private unregisterFn?: () => void;
  private isRevealed = false;

  constructor() {
    // Delay initialization until after the first render (Angular 20+)
    afterNextRender(() => {
      this.init();
    });
  }

  private init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Accessibility Check: Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      this.el.style.opacity = '1';
      this.el.style.transform = 'none';
      return;
    }

    // Store initial transform only once during initialization
    this.cachedInitialTransform = this.computeInitialTransform();
    this.el.style.opacity = '0';
    this.el.style.transform = this.cachedInitialTransform;

    // Register element with shared ScrollRevealService
    const observerOptions = {
      root: this.root(),
      rootMargin: this.rootMargin(),
      threshold: this.threshold(),
    };

    this.unregisterFn = this.scrollRevealService.register(
      this.el,
      observerOptions,
      (entry) => {
        if (entry.isIntersecting && !this.isRevealed) {
          this.isRevealed = true;
          this.reveal();
          if (this.once()) {
            this.cleanupObserver();
          }
        } else if (!entry.isIntersecting && this.isRevealed && !this.once()) {
          this.isRevealed = false;
          this.hide();
        }
      }
    );

    // Automatic cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.cleanupObserver();
      this.cancelCurrentAnimations();
    });
  }

  private reveal(): void {
    // Prevent animation accumulation
    this.cancelCurrentAnimations();

    // Set will-change only before animation starts
    this.el.style.willChange = 'transform, opacity';

    const animation = this.getOrCreateRevealAnimation();
    animation.play();
  }

  private hide(): void {
    // Prevent animation accumulation
    this.cancelCurrentAnimations();

    // Set will-change only before animation starts
    this.el.style.willChange = 'transform, opacity';

    const animation = this.getOrCreateHideAnimation();
    animation.play();
  }

  private getOrCreateRevealAnimation(): Animation {
    if (!this.revealAnimation) {
      const effect = new KeyframeEffect(
        this.el,
        [
          { opacity: 0, transform: this.cachedInitialTransform },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: this.duration(),
          delay: this.delay(),
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        }
      );
      this.revealAnimation = new Animation(effect, document.timeline);
      this.revealAnimation.onfinish = () => {
        // Apply final inline styles manually after animation finishes
        this.el.style.opacity = '1';
        this.el.style.transform = '';
        // Remove will-change after animation finishes
        this.el.style.willChange = 'auto';
      };
    }
    return this.revealAnimation;
  }

  private getOrCreateHideAnimation(): Animation {
    if (!this.hideAnimation) {
      const effect = new KeyframeEffect(
        this.el,
        [
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          { opacity: 0, transform: this.cachedInitialTransform },
        ],
        {
          duration: this.duration(),
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        }
      );
      this.hideAnimation = new Animation(effect, document.timeline);
      this.hideAnimation.onfinish = () => {
        // Apply final inline styles manually after animation finishes
        this.el.style.opacity = '0';
        this.el.style.transform = this.cachedInitialTransform;
        // Remove will-change after animation finishes
        this.el.style.willChange = 'auto';
      };
    }
    return this.hideAnimation;
  }

  private cancelCurrentAnimations(): void {
    if (typeof this.el.getAnimations === 'function') {
      this.el.getAnimations().forEach((animation) => animation.cancel());
    }
  }

  private computeInitialTransform(): string {
    const dist = this.distance();
    switch (this.appScrollReveal()) {
      case 'top':
        return `translate3d(0, -${dist}, 0)`;
      case 'bottom':
        return `translate3d(0, ${dist}, 0)`;
      case 'left':
        return `translate3d(-${dist}, 0, 0)`;
      case 'right':
        return `translate3d(${dist}, 0, 0)`;
      default:
        return `translate3d(0, ${dist}, 0)`;
    }
  }

  private cleanupObserver(): void {
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = undefined;
    }
  }
}
