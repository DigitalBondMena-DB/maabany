import { Component, signal, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { BLOGS_DATA, BlogPostItem } from './services/blogs-data';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blogs',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    BlogCardComponent,
    PaginationComponent,
    CtaBannerComponent,
  ],
  templateUrl: './blogs.component.html',
})
export class BlogsComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly posts = signal<BlogPostItem[]>(BLOGS_DATA);
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(6);

  readonly totalPages = computed(() => {
    return Math.ceil(this.posts().length / this.pageSize()) || 1;
  });

  readonly displayedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.posts().slice(start, start + this.pageSize());
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
