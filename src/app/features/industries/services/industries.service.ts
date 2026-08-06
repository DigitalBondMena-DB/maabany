import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { IndustriesData, IndustryDetailData } from '../models/industries-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndustriesService {
  private readonly langService = inject(LanguageService);

  readonly activeSlug = signal<string | null>(null);

  // Central mapping of (slug <-> other_slug) across industries
  private readonly slugMap = new Map<string, string>();

  // 1. Industries List Resource: GET /api/industries
  readonly industriesListResource = httpResource<ApiResponse<IndustriesData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.industries,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  // 2. Industry Detail Resource: GET /api/industries/:slug
  readonly industryDetailResource = httpResource<ApiResponse<IndustryDetailData>>(() => {
    const slug = this.activeSlug();
    if (!slug) return undefined;

    return {
      url: `${environment.baseUrl}${API_ENDPOINTS.industries}/${slug}`,
      headers: {
        'Accept-Language': this.langService.currentLang(),
      },
    };
  });

  constructor() {
    effect(() => {
      if (this.industriesListResource.hasValue()) {
        const list = this.industriesListResource.value()?.data?.industries || [];
        for (const item of list) {
          this.registerMapping(item.slug, item.other_slug);
        }
      }
    });

    effect(() => {
      if (this.industryDetailResource.hasValue()) {
        const detail = this.industryDetailResource.value()?.data;
        if (detail && detail.slug && detail.other_slug) {
          this.registerMapping(detail.slug, detail.other_slug);
        }
      }
    });
  }

  private registerMapping(slug: string, otherSlug: string): void {
    if (slug && otherSlug) {
      const decodedSlug = decodeURIComponent(slug);
      const decodedOtherSlug = decodeURIComponent(otherSlug);

      this.slugMap.set(slug, decodedOtherSlug);
      this.slugMap.set(decodedSlug, decodedOtherSlug);
      this.slugMap.set(otherSlug, decodedSlug);
      this.slugMap.set(decodedOtherSlug, decodedSlug);
    }
  }

  getTranslatedSlug(slug: string): string {
    if (!slug) return slug;
    const raw = decodeURIComponent(slug);
    const detail = this.industryDetailData();
    
    if (detail) {
      const dSlug = detail.slug ? decodeURIComponent(detail.slug) : '';
      const dOtherSlug = detail.other_slug ? decodeURIComponent(detail.other_slug) : '';

      if ((raw === dSlug || slug === detail.slug) && dOtherSlug) {
        return dOtherSlug;
      }
      if ((raw === dOtherSlug || slug === detail.other_slug) && dSlug) {
        return dSlug;
      }
    }
    return this.slugMap.get(raw) || this.slugMap.get(slug) || slug;
  }

  getAlternatePathForUrl(pathname: string): string {
    const rawPathname = decodeURIComponent(pathname);
    const segments = rawPathname.split('?')[0].split('#')[0].split('/').filter(Boolean);
    const indIndex = segments.indexOf('industries');
    if (indIndex === -1) return pathname;

    for (let i = indIndex + 1; i < segments.length; i++) {
      const origSlug = segments[i];
      const translated = this.getTranslatedSlug(origSlug);
      segments[i] = translated;
    }

    return '/' + segments.join('/');
  }

  readonly industriesData = computed(() =>
    this.industriesListResource.hasValue() ? this.industriesListResource.value()?.data : undefined
  );

  readonly industries = computed(() => this.industriesData()?.industries ?? []);

  readonly industryDetailData = computed(() =>
    this.industryDetailResource.hasValue() ? this.industryDetailResource.value()?.data : undefined
  );

  readonly isListLoading = computed(() => this.industriesListResource.isLoading());
  readonly isDetailLoading = computed(() => this.industryDetailResource.isLoading());

  setSlug(slug: string | null): void {
    this.activeSlug.set(slug);
  }
}
