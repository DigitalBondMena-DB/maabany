import { Component, effect, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { AboutOverviewComponent } from './components/about-overview/about-overview.component';
import { AboutStatsComponent } from './components/about-stats/about-stats.component';
import { AboutValuesComponent } from './components/about-values/about-values.component';
import { AboutWhyChooseUsComponent } from './components/about-why-choose-us/about-why-choose-us.component';
import { ClientMarqueeComponent } from '../home/components/client-marquee/client-marquee.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { AboutService } from './services/about.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    AboutOverviewComponent,
    AboutStatsComponent,
    AboutValuesComponent,
    AboutWhyChooseUsComponent,
    ClientMarqueeComponent,
    CtaBannerComponent,
    SkeletonComponent,
  ],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly aboutService = inject(AboutService);
  private readonly seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const seo = this.aboutService.seo();
      if (seo) {
        this.seoService.updateSeo(seo);
      }
    });
  }
}
