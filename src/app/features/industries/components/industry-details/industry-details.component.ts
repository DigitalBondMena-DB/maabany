import { Component, input, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../../../shared/components/cta-banner/cta-banner.component';
import { LanguageService } from '../../../../core/services/language.service';
import { IndustriesService } from '../../services/industries.service';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-industry-details',
  imports: [
    RouterLink,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
    ImageComponent,
    SkeletonComponent
  ],
  templateUrl: './industry-details.component.html',
})
export class IndustryDetailsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly industriesService = inject(IndustriesService);
  readonly currentLang = this.languageService.currentLang;

  readonly slug = input.required<string>();

  constructor() {
    effect(() => {
      this.industriesService.setSlug(this.slug());
    });
  }

  readonly currentIndustry = this.industriesService.industryDetailData;
  readonly isLoading = this.industriesService.isDetailLoading;
}
