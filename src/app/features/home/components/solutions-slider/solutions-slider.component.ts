import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HomeSolution } from '../../models/home-api.model';
import { FeaturedSolutionCardComponent } from './components/featured-solution-card/featured-solution-card.component';
import { SolutionCardComponent } from './components/solution-card/solution-card.component';
import { LanguageService } from '../../../../core/services/language.service';

export interface SolutionCard {
  num: string;
  title: string;
  desc: string;
  link: string;
  items: string[];
}

@Component({
  selector: 'app-solutions-slider',
  imports: [
    RouterLink,
    FloatingWireframeComponent,
    ButtonComponent,
    TranslatePipe,
    FeaturedSolutionCardComponent,
    SolutionCardComponent,
  ],
  templateUrl: './solutions-slider.component.html',
})
export class SolutionsSliderComponent {
  private readonly langService = inject(LanguageService);
  readonly lang = this.langService.currentLang;
  readonly solutionsData = input<HomeSolution[]>();

  readonly mepImages = computed(() => this.solutionsData()?.[0]?.images || []);
}
