import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ClientMarqueeComponent } from '../home/components/client-marquee/client-marquee.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-clients-partners',
  imports: [
    PageHeroComponent,
    ClientMarqueeComponent,
    WhyChooseUsComponent,
    CtaBannerComponent,
  ],
  templateUrl: './clients-partners.component.html',
})
export class ClientsPartnersComponent {}
