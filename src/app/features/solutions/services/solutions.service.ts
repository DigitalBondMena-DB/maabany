import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { SolutionsListData, SolutionDetailData, SolutionItem } from '../models/solution-types-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  private readonly langService = inject(LanguageService);

  readonly activeSlug = signal<string | null>(null);

  // Central mapping of (slug <-> other_slug) across all solutions/parents/children
  private readonly slugMap = new Map<string, string>();

  // 1. Root Solutions List Resource: GET /api/solutions
  readonly solutionsListResource = httpResource<ApiResponse<SolutionsListData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.solutions,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  // 2. Solution Detail Resource: GET /api/solutions/:slug
  readonly solutionDetailResource = httpResource<ApiResponse<SolutionDetailData>>(() => {
    const slug = this.activeSlug();
    if (!slug) return undefined;

    const lang = this.langService.currentLang();
    return {
      url: `${environment.baseUrl}${API_ENDPOINTS.solutions}/${slug}`,
      headers: {
        'Accept-Language': lang,
      },
    };
  });

  constructor() {
    // Populate slug map from root solutions list
    effect(() => {
      if (this.solutionsListResource.hasValue()) {
        const list = this.solutionsListResource.value()?.data?.solutions || [];
        for (const item of list) {
          this.registerMapping(item.slug, item.other_slug);
        }
      }
    });

    // Populate slug map from solution detail response
    effect(() => {
      if (this.solutionDetailResource.hasValue()) {
        const detail = this.solutionDetailResource.value()?.data;
        if (detail) {
          if (detail.slug && detail.other_slug) {
            this.registerMapping(detail.slug, detail.other_slug);
          }
          if (detail.parent_slug && detail.other_parent_slug) {
            this.registerMapping(detail.parent_slug, detail.other_parent_slug);
          }
          if (detail.children) {
            for (const child of detail.children) {
              this.registerMapping(child.slug, child.other_slug);
            }
          }
          if (detail.related_solutions) {
            for (const rel of detail.related_solutions) {
              this.registerMapping(rel.slug, rel.other_slug);
            }
          }
        }
      }
    });
  }

  registerMapping(slug: string, otherSlug: string): void {
    if (slug && otherSlug) {
      this.slugMap.set(slug, otherSlug);
      this.slugMap.set(otherSlug, slug);
    }
  }

  getTranslatedSlug(slug: string): string {
    return this.slugMap.get(slug) || slug;
  }

  // Returns the alternate URL path for language switching
  getAlternatePathForUrl(pathname: string): string {
    const segments = pathname.split('?')[0].split('#')[0].split('/').filter(Boolean);
    const solutionsIndex = segments.indexOf('solutions');
    if (solutionsIndex === -1) return pathname;

    for (let i = solutionsIndex + 1; i < segments.length; i++) {
      const origSlug = segments[i];
      const translated = this.getTranslatedSlug(origSlug);
      segments[i] = translated;
    }

    return '/' + segments.join('/');
  }

  readonly solutionsListData = computed(() =>
    this.solutionsListResource.hasValue() ? this.solutionsListResource.value()?.data : undefined
  );

  readonly solutions = computed<SolutionItem[]>(
    () => this.solutionsListData()?.solutions ?? []
  );

  readonly solutionTypes = this.solutions;

  readonly solutionDetail = computed<SolutionDetailData | undefined>(() =>
    this.solutionDetailResource.hasValue() ? this.solutionDetailResource.value()?.data : undefined
  );

  readonly isListLoading = computed(() => this.solutionsListResource.isLoading());
  readonly isDetailLoading = computed(() => this.solutionDetailResource.isLoading());

  setSlug(slug: string | null): void {
    this.activeSlug.set(slug);
  }
}
