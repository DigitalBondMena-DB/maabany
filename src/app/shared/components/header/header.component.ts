import { Component, signal, inject, DestroyRef, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconsComponent } from '../icons/icons.component';
import { HeaderSearchComponent } from '../header-search/header-search.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { ImageComponent } from "../image/image.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconsComponent, HeaderSearchComponent, MobileNavComponent, ImageComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly menuOpen = signal<boolean>(false);
  readonly searchOpen = signal<boolean>(false);
  readonly currentLang = signal<'EN' | 'AR'>('EN');
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
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Projects', path: '/projects' },
    { label: 'Industries We Serve', path: '/industries' },
    { label: 'Clients & Partners', path: '/clients-partners' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' }
  ];

  toggleMenu(): void {
    this.menuOpen.update(val => !val);
  }

  toggleSearch(): void {
    this.searchOpen.update(val => !val);
  }

  toggleLang(): void {
    this.currentLang.update(l => l === 'EN' ? 'AR' : 'EN');
  }
}
