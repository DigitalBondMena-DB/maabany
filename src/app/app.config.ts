import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import arTranslations from '../../public/assets/i18n/ar.json';
import enTranslations from '../../public/assets/i18n/en.json';
import { routes } from './app.routes';
import { timeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { GlobalErrorHandler } from './core/services/global-error-handler';
import { LanguageService } from './core/services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([timeoutInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeNonCacheableRequests: true,
      })
    ),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setTranslation('en', enTranslations);
      translate.setTranslation('ar', arTranslations);
      const langService = inject(LanguageService);
      return translate.use(langService.currentLang());
    }),
    provideTranslateService({
      fallbackLang: 'en',
    }),
  ],
};
