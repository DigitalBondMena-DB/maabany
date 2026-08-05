import { Injectable, computed, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { ProjectItem, ProjectTypeItem, ProjectsData } from '../models/projects-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly langService = inject(LanguageService);

  readonly selectedType = signal<string>('all');
  readonly currentPage = signal<number>(1);

  // InMemory Map Cache for ProjectsData (Key: `${lang}_${type}_${page}`)
  private readonly projectsCache = new Map<string, ProjectsData>();

  readonly projectTypesResource = httpResource<ApiResponse<ProjectTypeItem[]>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.projectTypes,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly projectsResource = httpResource<ApiResponse<ProjectsData>>(() => {
    const lang = this.langService.currentLang();
    const type = this.selectedType();
    const page = this.currentPage();
    const cacheKey = `${lang}_${type}_${page}`;

    // Skip HTTP request if already cached in memory
    if (this.projectsCache.has(cacheKey)) {
      return undefined;
    }

    const queryParams = new URLSearchParams();
    if (page) {
      queryParams.set('page', page.toString());
    }
    if (type && type !== 'all') {
      queryParams.set('type', type);
    }

    const queryString = queryParams.toString();
    const url = `${environment.baseUrl}${API_ENDPOINTS.projects}${queryString ? `?${queryString}` : ''}`;

    return {
      url,
      headers: {
        'Accept-Language': lang,
      },
    };
  });

  readonly projectTypes = computed<ProjectTypeItem[]>(() => {
    const apiTypes = this.projectTypesResource.hasValue()
      ? this.projectTypesResource.value()?.data || []
      : [];
    return [{ id: 'all', title: 'All', slug: 'all' }, ...apiTypes];
  });

  readonly projectsData = computed<ProjectsData | undefined>(() => {
    const lang = this.langService.currentLang();
    const type = this.selectedType();
    const page = this.currentPage();
    const cacheKey = `${lang}_${type}_${page}`;

    // Return cached data immediately if available
    if (this.projectsCache.has(cacheKey)) {
      return this.projectsCache.get(cacheKey);
    }

    // Otherwise read from HTTP resource and store in cache
    if (this.projectsResource.hasValue()) {
      const resData = this.projectsResource.value()?.data;
      if (resData) {
        this.projectsCache.set(cacheKey, resData);
        return resData;
      }
    }

    return undefined;
  });

  readonly banner = computed(() => this.projectsData()?.banner);
  readonly projects = computed<ProjectItem[]>(() => this.projectsData()?.projects ?? []);
  readonly pagination = computed(() => this.projectsData()?.pagination);
  readonly seo = computed(() => this.projectsData()?.seo);

  readonly isLoading = computed(() => {
    const lang = this.langService.currentLang();
    const type = this.selectedType();
    const page = this.currentPage();
    const cacheKey = `${lang}_${type}_${page}`;

    if (this.projectsCache.has(cacheKey)) {
      return false;
    }

    return this.projectsResource.isLoading();
  });

  readonly isTypesLoading = computed(() => this.projectTypesResource.isLoading());
  readonly error = computed(() => this.projectsResource.error());

  setType(typeSlugOrId: string): void {
    this.selectedType.set(typeSlugOrId);
    this.currentPage.set(1);
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  clearCache(): void {
    this.projectsCache.clear();
  }
}
