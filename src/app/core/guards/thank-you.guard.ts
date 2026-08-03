import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SubmissionService } from '../services/submission.service';
import { LanguageService } from '../services/language.service';

export const thankYouGuard: CanActivateFn = () => {
  const submissionService = inject(SubmissionService);
  const router = inject(Router);
  const languageService = inject(LanguageService);

  if (submissionService.hasSubmitted()) {
    return true;
  }

  const currentLang = languageService.getBrowserOrSavedLang();
  return router.createUrlTree(['/', currentLang]);
};
