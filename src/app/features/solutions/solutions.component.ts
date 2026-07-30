import { Component, input, computed } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SolutionsGridComponent } from './components/solutions-grid/solutions-grid.component';
import { SolutionDetailsComponent } from './components/solution-details/solution-details.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { SOLUTIONS_DATA } from './services/solutions-data';

@Component({
  selector: 'app-solutions',
  imports: [
    PageHeroComponent,
    SolutionsGridComponent,
    SolutionDetailsComponent,
    CtaBannerComponent,
  ],
  templateUrl: './solutions.component.html',
})
export class SolutionsComponent {
  readonly slug = input<string>();

  readonly hasSubcategories = computed<boolean>(() => {
    const s = this.slug();
    if (!s) return true;
    const cat = SOLUTIONS_DATA.categories.find(c => c.slug === s);
    return !!(cat && cat.subcategories.length > 0);
  });

  readonly heroTitle = computed(() => {
    const s = this.slug();
    if (!s) return 'Engineering';
    const detail = SOLUTIONS_DATA.details.find(d => d.slug === s);
    if (detail) return detail.title;
    return s.replace(/-/g, ' ').toUpperCase();
  });
}
