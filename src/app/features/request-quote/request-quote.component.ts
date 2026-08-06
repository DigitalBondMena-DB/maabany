import { Component, inject } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { QuoteFormSectionComponent } from './components/quote-form-section/quote-form-section.component';
import { QuoteServicesSectionComponent } from './components/quote-services-section/quote-services-section.component';
import { RequestQuoteService } from './services/request-quote.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-request-quote',
  imports: [
    PageHeroComponent,
    CtaBannerComponent,
    QuoteFormSectionComponent,
    QuoteServicesSectionComponent,
    SkeletonComponent,
    TranslatePipe
  ],
  templateUrl: './request-quote.component.html',
})
export class RequestQuoteComponent {
  private readonly requestQuoteService = inject(RequestQuoteService);
  
  readonly banner = this.requestQuoteService.banner;
  readonly isLoading = this.requestQuoteService.isLoading;
}
