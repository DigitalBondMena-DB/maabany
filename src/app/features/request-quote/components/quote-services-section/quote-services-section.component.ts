import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';
import { RequestQuoteService } from '../../services/request-quote.service';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-quote-services-section',
  imports: [
    RouterLink,
    TranslatePipe,
    ImageComponent,
    SkeletonComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './quote-services-section.component.html',
})
export class QuoteServicesSectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly requestQuoteService = inject(RequestQuoteService);
  
  readonly currentLang = this.languageService.currentLang;
  readonly solutions = this.requestQuoteService.solutions;
  readonly isLoading = this.requestQuoteService.isLoading;
  readonly revealDirection = input<ScrollDirection>('left');
  readonly revealDelay = input<number>(0);
}

