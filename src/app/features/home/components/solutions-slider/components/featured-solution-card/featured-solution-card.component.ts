import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MepSliderComponent } from '../../../mep-slider/mep-slider.component';
import { HomeSolution } from '../../../../models/home-api.model';
import { LanguageService } from '../../../../../../core/services/language.service';

@Component({
  selector: 'app-featured-solution-card',
  imports: [RouterLink, MepSliderComponent],
  templateUrl: './featured-solution-card.component.html',
})
export class FeaturedSolutionCardComponent {
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly solution = input.required<HomeSolution>();
  readonly mepImages = input<string[]>([]);
}
