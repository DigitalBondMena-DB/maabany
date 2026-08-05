import { Component, input, computed, inject, effect } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SolutionsGridComponent } from './components/solutions-grid/solutions-grid.component';
import { SolutionDetailsComponent } from './components/solution-details/solution-details.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { SolutionsService } from './services/solutions.service';
import { SeoService } from '../../core/services/seo.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-solutions',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    SolutionsGridComponent,
    SolutionDetailsComponent,
    CtaBannerComponent,
  ],
  templateUrl: './solutions.component.html',
})
export class SolutionsComponent {
  protected readonly solutionsService = inject(SolutionsService);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  readonly currentLang = this.languageService.currentLang;

  // Up to 3 levels of slugs from router path
  readonly slug1 = input<string>();
  readonly slug2 = input<string>();
  readonly slug3 = input<string>();

  // Current active leaf slug
  readonly leafSlug = computed(() => this.slug3() || this.slug2() || this.slug1() || null);

  constructor() {
    // Notify SolutionsService of current active slug
    effect(() => {
      const slug = this.leafSlug();
      this.solutionsService.setSlug(slug);
    });

    // Update SEO
    effect(() => {
      const isDetail = !!this.leafSlug();
      const seo = isDetail
        ? this.solutionsService.solutionDetail()?.seo
        : this.solutionsService.solutionsListData()?.seo;
      if (seo) {
        this.seoService.updateSeo(seo);
      }
    });
  }

  readonly solutionDetail = computed(() => this.solutionsService.solutionDetail());

  // Does current active solution have children?
  readonly hasChildren = computed<boolean>(() => {
    if (!this.leafSlug()) return true; // Root list mode
    const detail = this.solutionDetail();
    return !!(detail && detail.children && detail.children.length > 0);
  });

  // Calculate base parent path for links
  readonly parentPath = computed(() => {
    const lang = this.currentLang();
    const s1 = this.slug1();
    const s2 = this.slug2();
    const s3 = this.slug3();

    if (s3) return `/${lang}/solutions/${s1}/${s2}/${s3}`;
    if (s2) return `/${lang}/solutions/${s1}/${s2}`;
    if (s1) return `/${lang}/solutions/${s1}`;
    return `/${lang}/solutions`;
  });

  // Calculate back path for breadcrumb / back button
  readonly backPath = computed(() => {
    const lang = this.currentLang();
    const s1 = this.slug1();
    const s2 = this.slug2();
    const s3 = this.slug3();

    if (s3) return `/${lang}/solutions/${s1}/${s2}`;
    if (s2) return `/${lang}/solutions/${s1}`;
    if (s1) return `/${lang}/solutions`;
    return `/${lang}/solutions`;
  });

  readonly heroTitle = computed(() => {
    if (!this.leafSlug()) {
      return this.languageService.t('Engineering & Electromechanical', 'الهندسة والكهروميكانيك');
    }
    const detail = this.solutionDetail();
    if (detail?.title) return detail.title;
    return (this.leafSlug() || '').replace(/-/g, ' ');
  });

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const lang = this.currentLang();
    const items: BreadcrumbItem[] = [
      { label: 'NAV.HOME', url: ['/', lang] },
      { label: 'SOLUTIONS.TITLE_SUFFIX', url: ['/', lang, 'solutions'] }
    ];

    const detail = this.solutionDetail();
    if (detail?.parent_title && detail?.parent_slug) {
      items.push({
        label: detail.parent_title,
        url: ['/', lang, 'solutions', detail.parent_slug]
      });
    }

    if (this.leafSlug() && detail?.title) {
      items.push({
        label: detail.title
      });
    }

    return items;
  });
}
