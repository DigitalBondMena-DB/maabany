import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import enTranslations from '../../public/assets/i18n/en.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions({ skipInitialTransition: true }), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setTranslation('en', enTranslations);
      return translate.use('en');
    }),
  ],
};
