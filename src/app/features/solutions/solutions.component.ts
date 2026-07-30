import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SolutionsGridComponent } from './components/solutions-grid/solutions-grid.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-solutions',
  imports: [
    PageHeroComponent,
    SolutionsGridComponent,
    CtaBannerComponent,
  ],
  templateUrl: './solutions.component.html',
})
export class SolutionsComponent {}
