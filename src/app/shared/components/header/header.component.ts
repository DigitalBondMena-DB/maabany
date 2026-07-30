import { Component, signal, inject, computed, DestroyRef, afterNextRender } from '@angular/core';
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
import { navLinks } from '../../constants/navigation-links.constant';

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
  readonly lang = computed(() => this.languageService.currentLang());
  readonly menuOpen = signal<boolean>(false);
  readonly searchOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);

  readonly links = navLinks;

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
