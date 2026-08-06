import { Component, inject } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ClientMarqueeComponent } from '../home/components/client-marquee/client-marquee.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ClientsPartnersService } from './services/clients-partners.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clients-partners',
  imports: [
    PageHeroComponent,
    ClientMarqueeComponent,
    WhyChooseUsComponent,
    CtaBannerComponent,
    SkeletonComponent,
    TranslatePipe
  ],
  templateUrl: './clients-partners.component.html',
})
export class ClientsPartnersComponent {
  private readonly clientsPartnersService = inject(ClientsPartnersService);
  
  readonly data = this.clientsPartnersService.data;
  readonly clients = this.clientsPartnersService.clients;
  readonly partners = this.clientsPartnersService.partners;
  readonly isLoading = this.clientsPartnersService.isLoading;
}
