import { Component, signal, computed, inject, ElementRef, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { InteractiveBlueprintComponent } from './components/interactive-blueprint/interactive-blueprint.component';
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
  readonly profileService = inject(ProfileService);
  readonly currentLang = this.languageService.currentLang;

  readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  readonly projects: ProjectItem[] = PROJECTS_DATA;

  readonly categories = computed<string[]>(() => {
    const rawCategories = Array.from(new Set(this.projects.map(p => p.category)));
    return ['All', ...rawCategories];
  });

  readonly selectedCategory = signal<string>('All');
  readonly currentPage = signal<number>(1);
  readonly itemsPerPage = signal<number>(6);

  readonly filteredProjects = computed<ProjectItem[]>(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.projects;
    return this.projects.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  });

  readonly totalPages = computed<number>(() => {
    return Math.ceil(this.filteredProjects().length / this.itemsPerPage());
  });

  readonly displayedProjects = computed<ProjectItem[]>(() => {
    const page = this.currentPage();
    const perPage = this.itemsPerPage();
    const start = (page - 1) * perPage;
    return this.filteredProjects().slice(start, start + perPage);
  });

  readonly paginationRange = computed<(number | string)[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const range: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push('...');
        range.push(total);
      } else if (current > total - 3) {
        range.push(1);
        range.push('...');
        for (let i = total - 3; i <= total; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        range.push(current - 1);
        range.push(current);
        range.push(current + 1);
        range.push('...');
        range.push(total);
      }
    }
    return range;
  });

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Accessibility: Keyboard Navigation for Tabs (WAI-ARIA Tablist Pattern)
  onTabKeyDown(event: KeyboardEvent, index: number): void {
    const cats = this.categories();
    const buttons = this.tabButtons();
    if (!buttons || buttons.length === 0) return;

    let targetIndex = index;
    const isRtl = this.languageService.dir() === 'rtl';

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      targetIndex = isRtl ? (index - 1 + cats.length) % cats.length : (index + 1) % cats.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      targetIndex = isRtl ? (index + 1) % cats.length : (index - 1 + cats.length) % cats.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      targetIndex = cats.length - 1;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectCategory(cats[index]);
      return;
    } else {
      return;
    }

    const targetButton = buttons[targetIndex]?.nativeElement;
    if (targetButton) {
      targetButton.focus();
      this.selectCategory(cats[targetIndex]);
    }
  }
}
