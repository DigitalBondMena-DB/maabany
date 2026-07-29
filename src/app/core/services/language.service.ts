import { Injectable, inject, signal, DOCUMENT } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type SupportedLanguage = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentLang = signal<SupportedLanguage>('en');
  readonly dir = signal<Direction>('ltr');

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    let savedLang: SupportedLanguage = 'en';

    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('user_lang') as SupportedLanguage;
      if (stored === 'en' || stored === 'ar') {
        savedLang = stored;
      }
    }

    this.setLanguage(savedLang);
  }

  setLanguage(lang: SupportedLanguage): void {
    this.currentLang.set(lang);
    const direction: Direction = lang === 'ar' ? 'rtl' : 'ltr';
    this.dir.set(direction);

    this.translateService.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_lang', lang);
    }

    const htmlElement = this.document.documentElement;
    if (htmlElement) {
      htmlElement.setAttribute('lang', lang);
      htmlElement.setAttribute('dir', direction);
    }
  }

  toggleLanguage(): void {
    const nextLang: SupportedLanguage = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }
}
