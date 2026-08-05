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
    <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-neutral-400">
      @for (item of breadcrumbItems(); track $index; let last = $last) {
        @if (!last && item.url) {
          <a [routerLink]="item.url" class="hover:text-primary transition-colors">{{ item.label | translate }}</a>
          <span>/</span>
        } @else {
          <span class="text-[#142b52] font-bold">{{ item.label | translate }}</span>
        }
      }
    </nav>
  `
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
