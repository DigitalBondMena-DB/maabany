import { Component, input, computed, signal, inject, OnDestroy, effect, NgZone, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { ProjectMetricsComponent, MetricItem } from '../../../projects/components/project-metrics/project-metrics.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { ProjectLightboxComponent } from '../../../../shared/components/project-lightbox/project-lightbox.component';
import { CtaBannerComponent } from '../../../../shared/components/cta-banner/cta-banner.component';
import { TableOfContentsComponent, TocItem } from '../../../../shared/components/table-of-contents/table-of-contents.component';
import { LanguageService } from '../../../../core/services/language.service';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html-pipe';
import { ContactFormComponent } from '../../../home/components/contact-section/contact-form/contact-form.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { BlogsService } from '../../services/blogs.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface ParsedBlogContent {
  processedHtml: string;
  headings: TocHeading[];
}

@Component({
  selector: 'app-blog-details',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    ProjectMetricsComponent,
    BlogCardComponent,
    ProjectLightboxComponent,
    CtaBannerComponent,
    TableOfContentsComponent,
    SafeHtmlPipe,
    ContactFormComponent,
    ImageComponent,
    SkeletonComponent
  ],
  templateUrl: './blog-details.component.html',
})
export class BlogDetailsComponent implements OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly blogsService = inject(BlogsService);
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly currentLang = this.languageService.currentLang;

  readonly slug = input.required<string>();

  constructor() {
    // Set the active slug on the service whenever it changes
    effect(() => {
      this.blogsService.setSlug(this.slug());
    });

    effect(() => {
      const headings = this.tocHeadings();
      if (headings.length > 0) {
        setTimeout(() => this.initScrollSpy(), 100);
      }
    });
  }

  readonly isLoading = this.blogsService.isDetailLoading;
  readonly post = this.blogsService.blogDetailData;

  readonly blogMetrics = computed<MetricItem[]>(() => {
    const p = this.post();
    if (!p) return [];
    return [
      { label: 'Author', value: p.Author, icon: 'user' },
      { label: 'Published Date', value: p['Published Date'], icon: 'calendar' },
      { label: 'Last Updated', value: p['last update'] || p['Published Date'], icon: 'update' },
    ];
  });

  readonly relatedPosts = computed(() => this.post()?.related_articles ?? []);

  readonly isLightboxOpen = signal<boolean>(false);
  readonly activeHeadingId = signal<string>('');
  readonly copied = signal<boolean>(false);

  private parseHeadingInfo(attrs: string = '', innerText: string = ''): { id: string; text: string } {
    const safeText = (innerText || '').replace(/<[^>]+>/g, '').trim();
    const safeAttrs = attrs || '';
    const idMatch = safeAttrs.match(/id=["']([^"']+)["']/i);
    let id = idMatch ? idMatch[1] : '';
    if (!id) {
      id = safeText.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
    }
    return { id, text: safeText };
  }

  readonly parsedBlogData = computed<ParsedBlogContent>(() => {
    const p = this.post();
    if (!p || !p.content) return { processedHtml: '', headings: [] };

    const headings: TocHeading[] = [];
    const regex = /<h([23])([^>]*)>(.*?)<\/h[23]>/gi;

    let index = 0;
    const processedHtml = p.content.replace(regex, (_, levelStr, attrs, innerText) => {
      index++;
      const level = parseInt(levelStr, 10);
      const safeAttrs = attrs || '';
      const safeText = innerText || '';
      const { id, text } = this.parseHeadingInfo(safeAttrs, safeText);

      const generatedId = `heading-${index}-${id || 'section'}`;

      headings.push({
        id: generatedId,
        text,
        level
      });

      const cleanAttrs = safeAttrs
        .replace(/\s*id=["'][^"']*["']/gi, '')
        .replace(/\s*class=["'][^"']*["']/gi, '');

      const textClass = level === 2 
        ? 'text-2xl md:text-3xl mt-12 mb-6 pb-2.5 border-b border-neutral-100 text-neutral-900 font-bold uppercase font-mono tracking-tight' 
        : 'text-lg md:text-xl mt-8 mb-4 text-neutral-800 font-extrabold uppercase font-mono';

      return `<h${level} id="${generatedId}" ${cleanAttrs} class="scroll-mt-28 ${textClass}">${safeText}</h${level}>`;
    });

    return { processedHtml, headings };
  });

  readonly tocHeadings = computed<TocItem[]>(() => 
    this.parsedBlogData().headings.map(h => ({ id: h.id, title: h.text, level: h.level }))
  );
  readonly processedContent = computed(() => this.parsedBlogData().processedHtml);

  ngOnDestroy(): void {}

  private initScrollSpy(): void {
    if (typeof window === 'undefined') return;

    const headings = this.tocHeadings();
    if (headings.length === 0) return;

    if (!this.activeHeadingId() && headings.length > 0) {
      this.activeHeadingId.set(headings[0].id);
    }

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const scrollPos = window.scrollY + 160;
          let currentActiveId = headings[0]?.id || '';

          for (const h of headings) {
            const el = document.getElementById(h.id);
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              if (top <= scrollPos) {
                currentActiveId = h.id;
              } else {
                break;
              }
            }
          }

          if (currentActiveId && currentActiveId !== this.activeHeadingId()) {
            this.ngZone.run(() => {
              this.activeHeadingId.set(currentActiveId);
            });
          }
        });
    });
  }

  scrollToHeading(id: string): void {
    this.viewportScroller.setOffset([0, 110]);
    this.viewportScroller.scrollToAnchor(id);
    this.activeHeadingId.set(id);
  }

  copyShareLink(): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 3000);
    }
  }

  openLightbox(): void {
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }
}
