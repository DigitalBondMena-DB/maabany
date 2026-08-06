import { SeoService } from '../../core/services/seo.service';
import { Component, computed, inject, effect } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { BlogsService } from './services/blogs.service';
import { LanguageService } from '../../core/services/language.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-blogs',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    BlogCardComponent,
    PaginationComponent,
    CtaBannerComponent,
    SkeletonComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './blogs.component.html',
})
export class BlogsComponent {
  private readonly seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const seoData = this.blogsService.seo();
      if (seoData) {
        this.seoService.updateSeo(seoData);
      }
    });
  }
  private readonly languageService = inject(LanguageService);
  private readonly blogsService = inject(BlogsService);

  readonly currentLang = this.languageService.currentLang;

  readonly displayedPosts = this.blogsService.blogs;
  readonly isLoading = this.blogsService.isListLoading;

  readonly currentPage = this.blogsService.currentPage;
  readonly totalPages = computed(() => this.blogsService.pagination()?.last_page || 1);

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.blogsService.setPage(page);
    }
  }
}
