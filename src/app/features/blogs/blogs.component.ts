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
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('All');
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(6);

  readonly categories = computed(() => {
    const cats = new Set(this.posts().map(p => p.category));
    return ['All', ...Array.from(cats)];
  });

  readonly filteredPosts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const cat = this.selectedCategory();

    return this.posts().filter(p => {
      const matchesSearch = !query || p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.author.toLowerCase().includes(query);
      const matchesCat = cat === 'All' || p.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredPosts().length / this.pageSize()) || 1;
  });

  readonly displayedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredPosts().slice(start, start + this.pageSize());
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  updateSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
    this.currentPage.set(1);
  }
}
