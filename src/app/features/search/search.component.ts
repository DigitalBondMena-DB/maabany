import { Component, signal, computed, inject, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HighlightPipe } from '../../shared/pipes/highlight-pipe';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { SearchService } from './services/search.service';
import { SearchResultItem, SearchPagination } from './models/search-api.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-search',
  imports: [
    RouterLink,
    TranslatePipe,
    HighlightPipe,
    PageHeroComponent,
    PaginationComponent,
    CtaBannerComponent,
    ImageComponent,
    SkeletonComponent,
  ],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchService = inject(SearchService);
  private readonly languageService = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  readonly currentLang = this.languageService.currentLang;
  readonly searchQuery = signal<string>('');
  readonly inputQuery = signal<string>('');
  readonly currentPage = signal<number>(1);
  readonly isLoading = signal<boolean>(false);
  readonly results = signal<SearchResultItem[]>([]);
  readonly pagination = signal<SearchPagination | null>(null);

  readonly totalResults = computed(() => this.pagination()?.total ?? this.results().length);
  readonly totalPages = computed(() => this.pagination()?.last_page ?? 1);

  readonly heroDescription = computed(() => {
    const q = this.searchQuery();
    const lang = this.currentLang();
    if (!q) {
      return this.translate.instant('SEARCH.HERO_DESC');
    }
    const count = this.totalResults();
    const countText = this.translate.instant('SEARCH.RESULTS_FOUND', { count });
    return `${countText} "${q}"`;
  });

  ngOnInit(): void {
    const parentRoute = this.route.parent ?? this.route;

    combineLatest([
      this.route.queryParams,
      parentRoute.paramMap
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(([queryParams, paramMap]) => {
          const q = (queryParams['q'] || '').trim();
          const page = parseInt(queryParams['page'] || '1', 10);
          const lang = paramMap.get('lang') || this.currentLang();

          this.searchQuery.set(q);
          this.inputQuery.set(q);
          this.currentPage.set(isNaN(page) ? 1 : page);

          if (!q) {
            this.results.set([]);
            this.pagination.set(null);
            this.isLoading.set(false);
            return of(null);
          }

          this.isLoading.set(true);
          return this.searchService.search(q, lang, isNaN(page) ? 1 : page).pipe(
            catchError(() => {
              this.isLoading.set(false);
              this.results.set([]);
              this.pagination.set(null);
              return of(null);
            })
          );
        })
      )
      .subscribe((res) => {
        if (res) {
          this.isLoading.set(false);
          if (res.success && res.data) {
            this.results.set(res.data.results || []);
            this.pagination.set(res.data.pagination || null);
          } else {
            this.results.set([]);
            this.pagination.set(null);
          }
        }
      });
  }

  onSearchSubmit(e: Event): void {
    e.preventDefault();
    const query = this.inputQuery().trim();
    if (query) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: query, page: 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge',
      });
    }
  }

  getItemSlug(item: SearchResultItem): string {
    return item.slug || item.other_slug || '';
  }

  getItemLink(item: SearchResultItem): string[] {
    const slug = this.getItemSlug(item);
    const lang = this.currentLang();
    const type = (item.type || '').toLowerCase();

    if (type.includes('blog')) {
      return ['/', lang, 'blogs', slug];
    } else if (type.includes('solution')) {
      return ['/', lang, 'solutions', slug];
    } else if (type.includes('industry')) {
      return ['/', lang, 'industries', slug];
    } else if (type.includes('project')) {
      return ['/', lang, 'projects', slug];
    }

    return ['/', lang, 'solutions', slug];
  }
}
