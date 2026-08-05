import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactFormComponent } from '../../../home/components/contact-section/contact-form/contact-form.component';
import { WhyChooseUsComponent } from '../../../home/components/why-choose-us/why-choose-us.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { SolutionDetailData } from '../../models/solution-types-api.model';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-solution-details',
  imports: [
    RouterLink,
    TranslatePipe,
    ContactFormComponent,
    WhyChooseUsComponent,
    ImageComponent,
    IconsComponent,
    SkeletonComponent,
  ],
  templateUrl: './solution-details.component.html',
})
export class SolutionDetailsComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly detail = input<SolutionDetailData | undefined>();
  readonly parentPath = input<string>('');
  readonly isLoading = input<boolean>(false);

  readonly standards = computed(() => this.detail()?.standards ?? []);
  readonly relatedSolutions = computed(() => this.detail()?.related_solutions ?? []);
}
