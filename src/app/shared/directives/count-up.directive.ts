import {
  Directive,
  ElementRef,
  input,
  OnInit,
  OnDestroy,
  inject,
  NgZone,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  readonly targetNumber = input.required<number | string>({ alias: 'appCountUp' });
  readonly duration = input<number>(2000, { alias: 'appCountUpDuration' });
  readonly prefix = input<string>('', { alias: 'appCountUpPrefix' });
  readonly suffix = input<string>('', { alias: 'appCountUpSuffix' });
  readonly decimals = input<number>(0, { alias: 'appCountUpDecimals' });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private animId = signal<number | undefined>(undefined);
  private hasAnimated = signal<boolean>(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.renderValue(this.numericTarget);
      return;
    }

    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private get numericTarget(): number {
    const raw = this.targetNumber();
    if (typeof raw === 'number') return raw;
    const parsed = parseFloat(String(raw).replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.hasAnimated()) {
          this.hasAnimated.set(true);
          this.startCountUp();
          if (this.observer) {
            this.observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private startCountUp(): void {
    const endValue = this.numericTarget;
    const duration = Math.max(200, this.duration());
    const element = this.el.nativeElement;

    // Run completely OUTSIDE Angular Zone to avoid triggering Change Detection on every frame
    this.ngZone.runOutsideAngular(() => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic easeOut easing
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = endValue * easeProgress;

        element.textContent = this.formatValue(currentValue);

        if (progress < 1) {
          this.animId.set(requestAnimationFrame(step));
        } else {
          // Guarantee exact target number on final frame
          element.textContent = this.formatValue(endValue);
          this.stopAnimation();
        }
      };

      this.animId.set(requestAnimationFrame(step));
    });
  }

  private stopAnimation(): void {
    if (this.animId()) {
      cancelAnimationFrame(this.animId()!);
      this.animId.set(undefined);
    }
  }

  private renderValue(val: number): void {
    this.el.nativeElement.textContent = this.formatValue(val);
  }

  private formatValue(val: number): string {
    const dec = this.decimals();
    const formattedNum = dec > 0
      ? val.toFixed(dec)
      : Math.floor(val).toLocaleString();
    return `${this.prefix()}${formattedNum}${this.suffix()}`;
  }
}
