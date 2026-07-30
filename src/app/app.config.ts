import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import enTranslations from '../../public/assets/i18n/en.json';
import arTranslations from '../../public/assets/i18n/ar.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions({ skipInitialTransition: true }), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setTranslation('en', enTranslations);
      translate.setTranslation('ar', arTranslations);
      return translate.use('en');
    }),
    provideTranslateService({
      fallbackLang: 'en'
    }),

  ],
};
