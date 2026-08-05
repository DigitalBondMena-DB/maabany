import { Component, effect, inject, ElementRef, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { InteractiveBlueprintComponent } from './components/interactive-blueprint/interactive-blueprint.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { LanguageService } from '../../core/services/language.service';
import { ProjectsService } from './services/projects.service';
import { SeoService } from '../../core/services/seo.service';
import { ProjectTypeItem } from './models/projects-api.model';

@Component({
  selector: 'app-projects',
  imports: [
    RouterLink,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
    ImageComponent,
    InteractiveBlueprintComponent,
    PaginationComponent,
    SkeletonComponent,
  ],
  templateUrl: './projects.component.html',
  styles: `
  .enter-animation {
    animation: slide-fade 0.6s ease-out;
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
  protected readonly projectsService = inject(ProjectsService);
  private readonly languageService = inject(LanguageService);
  private readonly seoService = inject(SeoService);

  readonly currentLang = this.languageService.currentLang;
  readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  constructor() {
    effect(() => {
      const seo = this.projectsService.seo();
      if (seo) {
        this.seoService.updateSeo(seo);
      }
    });
  }

  selectType(typeItem: ProjectTypeItem): void {
    const slugOrId = typeItem.slug || typeItem.id.toString();
    this.projectsService.setType(slugOrId);
  }

  goToPage(page: number): void {
    const lastPage = this.projectsService.pagination()?.last_page ?? 1;
    if (page >= 1 && page <= lastPage) {
      this.projectsService.setPage(page);
      const el = document.getElementById('projects-section');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 0) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  onTabKeyDown(event: KeyboardEvent, index: number): void {
    const types = this.projectsService.projectTypes();
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % types.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + types.length) % types.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = types.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.selectType(types[nextIndex]);
    const buttons = this.tabButtons();
    if (buttons[nextIndex]) {
      buttons[nextIndex].nativeElement.focus();
    }
  }
}
