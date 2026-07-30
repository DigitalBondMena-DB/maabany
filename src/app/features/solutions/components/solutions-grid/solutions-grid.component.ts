import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SOLUTIONS_DATA, SolutionCategory } from '../../services/solutions-data';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-solutions-grid',
  imports: [RouterLink, TranslatePipe, FloatingWireframeComponent, ImageComponent],
  templateUrl: './solutions-grid.component.html',
})
export class SolutionsGridComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly activeSlug = input<string>();

  readonly solutions: SolutionCategory[] = SOLUTIONS_DATA.categories;

  readonly selectedCategory = computed<SolutionCategory | null>(() => {
    const slug = this.activeSlug();
    if (!slug) return null;
    const cat = this.solutions.find(s => s.slug === slug);
    return (cat && cat.subcategories.length > 0) ? cat : null;
  });
}
