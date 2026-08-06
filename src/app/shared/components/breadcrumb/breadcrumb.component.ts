import { Component, input, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { SeoService } from '../../../core/services/seo.service';

export interface BreadcrumbItem {
  label: string;
  url?: string | any[];
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, TranslatePipe],
  template: `
    <nav aria-label="Breadcrumb"
         class="breadcrumb-nav flex flex-wrap items-center gap-y-1.5 gap-x-2 font-mono tracking-wider uppercase font-semibold text-neutral-500">
      @for (item of breadcrumbItems(); track $index; let last = $last) {
        @if (item.url) {
          <a [routerLink]="item.url"
             [title]="item.label | translate"
             class="hover:text-primary transition-colors max-w-[140px] sm:max-w-[200px] md:max-w-[280px] truncate inline-block shrink-0 align-middle">
            {{ item.label | translate }}
          </a>
        } @else {
          <span [title]="item.label | translate"
                class="text-[#142b52] font-bold max-w-[180px] sm:max-w-[260px] md:max-w-[340px] truncate inline-block shrink-0 align-middle">
            {{ item.label | translate }}
          </span>
        }
        @if (!last) {
          <span class="text-neutral-400 select-none shrink-0 font-normal">/</span>
        }
      }
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      --item-count: 2;
      font-size: clamp(0.55rem, calc(0.92rem - (var(--item-count) * 0.05rem)), 0.85rem);
    }
    /* Total elements = items + separators = 2N - 1 */
    .breadcrumb-nav:has(> *:nth-child(5)) { --item-count: 3; }
    .breadcrumb-nav:has(> *:nth-child(7)) { --item-count: 4; }
    .breadcrumb-nav:has(> *:nth-child(9)) { --item-count: 5; }
    .breadcrumb-nav:has(> *:nth-child(11)) { --item-count: 6; }
  `]
})
export class BreadcrumbComponent {
  private readonly languageService = inject(LanguageService);
  private readonly seoService = inject(SeoService);

  readonly lang = computed(() => this.languageService.currentLang());

  /** Optional explicit breadcrumb items array */
  readonly items = input<BreadcrumbItem[]>();

  /** Category badge shorthand (e.g. "Solutions", "Projects") */
  readonly categoryBadge = input<string>('');

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const explicit = this.items();
    if (explicit && explicit.length > 0) {
      return explicit;
    }

    const badge = this.categoryBadge();
    if (badge) {
      return [
        { label: 'NAV.HOME', url: ['/', this.lang()] },
        { label: badge }
      ];
    }

    return [
      { label: 'NAV.HOME', url: ['/', this.lang()] }
    ];
  });

  constructor() {
    effect(() => {
      const items = this.breadcrumbItems();
      this.seoService.setBreadcrumbSchema(items);
    });
  }
}
