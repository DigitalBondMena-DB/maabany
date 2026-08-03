import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { QuoteFormSectionComponent } from './components/quote-form-section/quote-form-section.component';
import { QuoteServicesSectionComponent } from './components/quote-services-section/quote-services-section.component';

@Component({
  selector: 'app-request-quote',
  imports: [
    PageHeroComponent,
    CtaBannerComponent,
    QuoteFormSectionComponent,
    QuoteServicesSectionComponent,
  ],
  templateUrl: './request-quote.component.html',
})
export class RequestQuoteComponent {}
