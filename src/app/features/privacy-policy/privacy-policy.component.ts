import { Component, signal, inject, NgZone, DestroyRef, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { TableOfContentsComponent, TocItem } from '../../shared/components/table-of-contents/table-of-contents.component';
import { LanguageService } from '../../core/services/language.service';

import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    TableOfContentsComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentLang = this.languageService.currentLang;
  readonly activeSection = signal<string>('introduction');

  readonly sections: TocItem[] = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'info-collect', title: '2. Information We Collect' },
    { id: 'how-use', title: '3. How We Use Your Information' },
    { id: 'cookies', title: '4. Cookies & Analytics' },
    { id: 'protection', title: '5. Data Protection' },
    { id: 'third-party', title: '6. Third-Party Services' },
    { id: 'rights', title: '7. Your Rights' },
    { id: 'contact', title: '8. Contact Information' }
  ];

  ngOnInit(): void {
    this.initScrollSpy();
  }

  ngOnDestroy(): void {}

  private initScrollSpy(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const scrollPos = window.scrollY + 160;
          let currentActiveId = this.sections[0].id;

          for (const sec of this.sections) {
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              if (top <= scrollPos) {
                currentActiveId = sec.id;
              } else {
                break;
              }
            }
          }

          if (currentActiveId !== this.activeSection()) {
            this.ngZone.run(() => {
              this.activeSection.set(currentActiveId);
            });
          }
        });
    });
  }

  scrollToSection(id: string): void {
    this.viewportScroller.setOffset([0, 110]);
    this.viewportScroller.scrollToAnchor(id);
    this.activeSection.set(id);
  }
}
