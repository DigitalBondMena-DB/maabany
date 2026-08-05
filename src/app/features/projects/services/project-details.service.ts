import { Injectable, computed, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { ProjectDetailsData } from '../models/projects-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private readonly langService = inject(LanguageService);

  readonly slug = signal<string>('');

  private readonly detailsCache = new Map<string, ProjectDetailsData>();

  readonly projectResource = httpResource<ApiResponse<ProjectDetailsData>>(() => {
    const s = this.slug();
    if (!s) return undefined;

    const lang = this.langService.currentLang();
    const cacheKey = `${lang}_${s}`;

    if (this.detailsCache.has(cacheKey)) {
      return undefined;
    }

    return {
      url: `${environment.baseUrl}/projects/${s}`,
      headers: {
        'Accept-Language': lang,
      },
    };
  });

  readonly projectData = computed<ProjectDetailsData | undefined>(() => {
    const s = this.slug();
    if (!s) return undefined;

    const lang = this.langService.currentLang();
    const cacheKey = `${lang}_${s}`;

    if (this.detailsCache.has(cacheKey)) {
      return this.detailsCache.get(cacheKey);
    }

    if (this.projectResource.hasValue()) {
      const data = this.projectResource.value()?.data;
      if (data) {
        this.detailsCache.set(cacheKey, data);
        return data;
      }
    }

    return undefined;
  });

  readonly project = computed(() => this.projectData());
  readonly seo = computed(() => this.projectData()?.seo);

  readonly isLoading = computed(() => {
    const s = this.slug();
    if (!s) return false;

    const lang = this.langService.currentLang();
    const cacheKey = `${lang}_${s}`;

    if (this.detailsCache.has(cacheKey)) {
      return false;
    }

    return this.projectResource.isLoading();
  });

  readonly error = computed(() => this.projectResource.error());

  setSlug(slug: string): void {
    this.slug.set(slug);
  }
}
