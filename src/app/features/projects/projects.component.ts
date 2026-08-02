import { Component, signal, computed, inject, ElementRef, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { InteractiveBlueprintComponent } from './components/interactive-blueprint/interactive-blueprint.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PROJECTS_DATA, ProjectItem } from './services/projects-data';
import { LanguageService } from '../../core/services/language.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-projects',
  imports: [
    RouterLink,
    LowerCasePipe,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
    ImageComponent,
    InteractiveBlueprintComponent,
    PaginationComponent,
  ],
  templateUrl: './projects.component.html',
  styles: `
  .enter-animation {
  animation: slide-fade 1s;
}
@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  `
})
export class ProjectsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly profileService = inject(ProfileService);
  readonly currentLang = this.languageService.currentLang;

  readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  readonly projects = signal<ProjectItem[]>(PROJECTS_DATA);
  readonly selectedCategory = signal<string>('All');
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(6);

  readonly categories = computed(() => {
    const cats = new Set(this.projects().map(p => p.category));
    return ['All', ...Array.from(cats)];
  });

  readonly filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.projects();
    return this.projects().filter(p => p.category === cat);
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredProjects().length / this.pageSize()) || 1;
  });

  readonly displayedProjects = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredProjects().slice(start, start + this.pageSize());
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onTabKeyDown(event: KeyboardEvent, index: number): void {
    const cats = this.categories();
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % cats.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + cats.length) % cats.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = cats.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.selectCategory(cats[nextIndex]);
    const buttons = this.tabButtons();
    if (buttons[nextIndex]) {
      buttons[nextIndex].nativeElement.focus();
    }
  }

  downloadProfile(): void {
    this.profileService.downloadProfile();
  }
}
