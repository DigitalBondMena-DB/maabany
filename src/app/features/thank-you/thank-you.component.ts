import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { SubmissionService } from '../../core/services/submission.service';

import { ImageComponent } from '../../shared/components/image/image.component';

@Component({
  selector: 'app-thank-you',
  imports: [
    RouterLink,
    TranslatePipe,
    ImageComponent,
  ],
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent implements OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly submissionService = inject(SubmissionService);

  readonly currentLang = this.languageService.currentLang;

  ngOnDestroy(): void {
    this.submissionService.reset();
  }
}
