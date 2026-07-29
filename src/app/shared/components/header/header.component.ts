import { Component, signal, inject, DestroyRef, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { IconsComponent } from '../icons/icons.component';
import { HeaderSearchComponent } from '../header-search/header-search.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { ImageComponent } from "../image/image.component";
import { ButtonComponent } from '../button/button.component';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    IconsComponent,
    HeaderSearchComponent,
    MobileNavComponent,
    ImageComponent,
    ButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly languageService = inject(LanguageService);

  readonly menuOpen = signal<boolean>(false);
  readonly searchOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.scrollTrigger();
    });
  }

  scrollTrigger() {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(100, asyncScheduler, { leading: true, trailing: true }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const scrolled = window.scrollY > 20;
        if (this.isScrolled() !== scrolled) {
          this.isScrolled.set(scrolled);
        }
      });
  }

  readonly navLinks = [
    { label: 'NAV.HOME', path: '/' },
    { label: 'NAV.ABOUT', path: '/about' },
    { label: 'NAV.SOLUTIONS', path: '/solutions' },
    { label: 'NAV.PROJECTS', path: '/projects' },
    { label: 'NAV.INDUSTRIES', path: '/industries' },
    { label: 'NAV.CLIENTS_PARTNERS', path: '/clients-partners' },
    { label: 'NAV.BLOGS', path: '/blogs' },
    { label: 'NAV.CONTACT', path: '/contact' }
  ];

  toggleMenu(): void {
    this.menuOpen.update(val => !val);
  }

  toggleSearch(): void {
    this.searchOpen.update(val => !val);
  }

  toggleLang(): void {
    this.languageService.toggleLanguage();
  }
}
