import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';
import { RequestQuoteService } from '../../services/request-quote.service';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-quote-services-section',
  imports: [
    RouterLink,
    TranslatePipe,
    ImageComponent,
    SkeletonComponent
  ],
  templateUrl: './quote-services-section.component.html',
})
export class QuoteServicesSectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly requestQuoteService = inject(RequestQuoteService);
  
  readonly currentLang = this.languageService.currentLang;
  readonly solutions = this.requestQuoteService.solutions;
  readonly isLoading = this.requestQuoteService.isLoading;
}
