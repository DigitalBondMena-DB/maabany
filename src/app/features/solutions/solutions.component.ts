import { Component, input, computed, inject, effect } from '@angular/core';
import { Location } from '@angular/common';
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
  private readonly location = inject(Location);

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

    // Sync alternate slug & canonical URL when solutionDetail updates
    effect(() => {
      const detail = this.solutionsService.solutionDetail();
      if (detail) {
        if (detail.other_slug) {
          this.languageService.alternateSlug.set(detail.other_slug);
        }

        const currentLang = this.languageService.currentLang();
        const s1 = this.slug1() ? decodeURIComponent(this.slug1()!) : '';
        const s2 = this.slug2() ? decodeURIComponent(this.slug2()!) : '';
        const s3 = this.slug3() ? decodeURIComponent(this.slug3()!) : '';

        const dSlug = detail.slug ? decodeURIComponent(detail.slug) : '';
        const dParentSlug = detail.parent_slug ? decodeURIComponent(detail.parent_slug) : '';

        let canonicalPath = `/${currentLang}/solutions`;

        if (s3) {
          const s2Slug = dParentSlug || s2;
          const s3Slug = dSlug || s3;
          canonicalPath += `/${s1}/${s2Slug}/${s3Slug}`;
        } else if (s2) {
          const s1Slug = dParentSlug || s1;
          const s2Slug = dSlug || s2;
          canonicalPath += `/${s1Slug}/${s2Slug}`;
        } else if (s1) {
          const s1Slug = dSlug || s1;
          canonicalPath += `/${s1Slug}`;
        }

        const currentPath = `/${currentLang}/solutions` +
          (s1 ? `/${s1}` : '') +
          (s2 ? `/${s2}` : '') +
          (s3 ? `/${s3}` : '');

        if (decodeURIComponent(currentPath) !== decodeURIComponent(canonicalPath)) {
          this.location.replaceState(canonicalPath);
        }
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

    if (s3) return `/${lang}/solutions/${s1}/${s2}`;
    if (s2) return `/${lang}/solutions/${s1}`;
    if (s1) return `/${lang}/solutions`;
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
    const s1 = this.slug1();
    const s2 = this.slug2();
    const s3 = this.slug3();

    const items: BreadcrumbItem[] = [
      { label: 'NAV.HOME', url: ['/', lang] },
      { label: 'SOLUTIONS.TITLE_SUFFIX', url: ['/', lang, 'solutions'] }
    ];

    const detail = this.solutionDetail();

    const extractStringTitle = (item: any): string => {
      if (!item) return '';
      if (typeof item === 'string') return item.trim();
      if (typeof item === 'object') {
        if (typeof item.title === 'string' && item.title.trim()) return item.title.trim();
        if (typeof item.name === 'string' && item.name.trim()) return item.name.trim();
        if (typeof item.label === 'string' && item.label.trim()) return item.label.trim();
      }
      return '';
    };

    let parentTitle = '';
    if (Array.isArray(detail?.parent_title)) {
      parentTitle = extractStringTitle(detail.parent_title[detail.parent_title.length - 1]);
    } else {
      parentTitle = extractStringTitle(detail?.parent_title);
    }

    if (s3 && s1 && s2) {
      // If we are at level 3, the immediate parent is level 2. 
      // We skip level 1 to keep breadcrumb short and avoid missing translations.
      const immediateParentTitle = parentTitle || s2.replace(/-/g, ' ');
      items.push({
        label: immediateParentTitle,
        url: ['/', lang, 'solutions', s1, s2]
      });
    } else if (s2 && s1) {
      // If we are at level 2, the immediate parent is level 1.
      const immediateParentTitle = parentTitle || (detail?.parent_slug ? detail.parent_slug.replace(/-/g, ' ') : s1.replace(/-/g, ' '));
      items.push({
        label: immediateParentTitle,
        url: ['/', lang, 'solutions', s1]
      });
    }

    return items;
  });
}
