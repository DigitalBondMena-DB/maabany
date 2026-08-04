import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeSolution } from '../../../../models/home-api.model';
import { PadZeroPipe } from '../../../../../../shared/pipes/pad-zero-pipe';
import { LanguageService } from '../../../../../../core/services/language.service';

@Component({
  selector: 'app-solution-card',
  imports: [RouterLink, PadZeroPipe],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly solution = input.required<HomeSolution>();
  readonly index = input<number>(0);
}
