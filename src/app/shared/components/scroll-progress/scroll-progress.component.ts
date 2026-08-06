import {
  Component,
  ElementRef,
  inject,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  DestroyRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  template: `
    <div
      class="fixed top-0 inset-x-0 h-1 bg-primary z-50 transition-transform duration-75 ease-out origin-left pointer-events-none"
      style="transform: scaleX(0)"
    ></div>
  `,
})
export class ScrollProgressComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const progressBar = this.el.nativeElement.firstElementChild as HTMLElement;
      if (!progressBar) return;

      let ticking = false;

      const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      };

      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        // Initial measurement
        updateProgress();
      });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
