import { inject, signal, DOCUMENT, Service } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Direction, SupportedLanguage } from '../../shared/models/language.interface';
import { StorageService } from './storage.service';



@Service()
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly _DOCUMENT = inject(DOCUMENT);
  private readonly router = inject(Router);

  private readonly storageService = inject(StorageService);

  readonly currentLang = signal<SupportedLanguage>(this.getInitialLang());
  readonly dir = signal<Direction>(this.currentLang() === 'ar' ? 'rtl' : 'ltr');

  constructor() {
    this.initLang();
  }

  private getInitialLang(): SupportedLanguage {
    try {
      const doc = this._DOCUMENT;
      const rawUrl = doc.location?.href || doc.URL || doc.location?.pathname || '';
      if (rawUrl) {
        const parsedUrl = new URL(rawUrl, 'http://localhost');
        const segments = parsedUrl.pathname.split('/').filter(Boolean);
        const firstSegment = segments[0];
        if (firstSegment === 'ar' || firstSegment === 'en') {
          return firstSegment as SupportedLanguage;
        }
      }
    } catch (e) {
      // Graceful fallback for non-browser/non-standard environments
    }
    return this.getBrowserOrSavedLang();
  }

  initLang(): void {
    this.translate.addLangs(['ar', 'en']);
    const lang = this.currentLang();
    this.setLanguage(lang);
    this.listenToRouteChanges();
  }

  getBrowserOrSavedLang(): SupportedLanguage {
    const saved = this.storageService.getItem('app_lang');
    if (saved === 'ar' || saved === 'en') {
      return saved as SupportedLanguage;
    }
    const browserLang = this.translate.getBrowserLang();
    return browserLang?.match(/en|ar/) ? (browserLang as SupportedLanguage) : 'en';
  }

  setLanguage(lang: SupportedLanguage): void {
    this.translate.use(lang);
    this.storageService.setItem('app_lang', lang);
    if (this.currentLang() !== lang) {
      this.currentLang.set(lang);
    }
    const direction: Direction = lang === 'ar' ? 'rtl' : 'ltr';
    this.dir.set(direction);
    if (this._DOCUMENT.documentElement) {
      this._DOCUMENT.documentElement.dir = direction;
      this._DOCUMENT.documentElement.lang = lang;
    }
  }

  readonly alternateSlug = signal<string | null>(null);

  private listenToRouteChanges(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.alternateSlug.set(null);
        const url = event.urlAfterRedirects || event.url;
        if (!url) return;
        const segments = url.split('?')[0].split('#')[0].split('/').filter(Boolean);
        const firstSegment = segments[0];
        if (firstSegment === 'ar' || firstSegment === 'en') {
          if (this.currentLang() !== firstSegment) {
            this.setLanguage(firstSegment as SupportedLanguage);
          }
        }
      });
  }

  toggleLanguage(): void {
    const targetLang: SupportedLanguage = this.currentLang() === 'en' ? 'ar' : 'en';
    this.switchLanguage(targetLang);
  }

  switchLanguage(targetLang: SupportedLanguage): void {
    const currentUrl = this.router.url || '/en';
    const rawPath = currentUrl.split('?')[0].split('#')[0];
    const segments = rawPath.split('/').filter(Boolean);

    if (segments.includes('search')) {
      this.router.navigateByUrl(`/${targetLang}`);
      return;
    }

    const queryAndHash = currentUrl.substring(rawPath.length);

    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ar')) {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }

    const altSlug = this.alternateSlug();
    if (altSlug && segments.length >= 3) {
      segments[segments.length - 1] = altSlug;
    }

    const newUrl = '/' + segments.join('/') + queryAndHash;
    this.router.navigateByUrl(newUrl);
  }

  getLocalizedPath(path: string): string {
    const lang = this.currentLang();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
  }

  t(en: string, ar: string): string {
    return this.currentLang() === 'ar' ? ar : en;
  }
}
