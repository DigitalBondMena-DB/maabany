import { Injectable, computed, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { BlogsData, BlogDetailData } from '../models/blogs-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private readonly langService = inject(LanguageService);

  readonly currentPage = signal<number>(1);
  readonly activeSlug = signal<string | null>(null);

  // 1. Blogs List Resource: GET /api/blogs?page=:page
  readonly blogsListResource = httpResource<ApiResponse<BlogsData>>(() => ({
    url: `${environment.baseUrl}${API_ENDPOINTS.blogs}?page=${this.currentPage()}&homepage=0`,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  // 2. Blog Detail Resource: GET /api/blogs/:slug
  readonly blogDetailResource = httpResource<ApiResponse<BlogDetailData>>(() => {
    const slug = this.activeSlug();
    if (!slug) return undefined;

    return {
      url: `${environment.baseUrl}${API_ENDPOINTS.blogs}/${slug}`,
      headers: {
        'Accept-Language': this.langService.currentLang(),
      },
    };
  });

  readonly blogsData = computed(() =>
    this.blogsListResource.hasValue() ? this.blogsListResource.value()?.data : undefined
  );

  readonly blogs = computed(() => this.blogsData()?.blogs ?? []);
  readonly pagination = computed(() => this.blogsData()?.pagination);
  readonly seo = computed(() => this.blogsData()?.seo);

  readonly blogDetailData = computed(() =>
    this.blogDetailResource.hasValue() ? this.blogDetailResource.value()?.data : undefined
  );

  readonly isListLoading = computed(() => this.blogsListResource.isLoading());
  readonly isDetailLoading = computed(() => this.blogDetailResource.isLoading());

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  setSlug(slug: string | null): void {
    this.activeSlug.set(slug);
  }
}
