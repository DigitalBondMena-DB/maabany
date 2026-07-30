import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { AboutOverviewComponent } from './components/about-overview/about-overview.component';
import { AboutStatsComponent } from './components/about-stats/about-stats.component';
import { AboutValuesComponent } from './components/about-values/about-values.component';
import { ClientMarqueeComponent } from '../home/components/client-marquee/client-marquee.component';
import { AboutWhyChooseUsComponent } from './components/about-why-choose-us/about-why-choose-us.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-about',
  imports: [
    PageHeroComponent,
    AboutOverviewComponent,
    AboutStatsComponent,
    AboutValuesComponent,
    ClientMarqueeComponent,
    AboutWhyChooseUsComponent,
    CtaBannerComponent,
  ],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
