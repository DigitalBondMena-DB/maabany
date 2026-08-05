import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconsComponent } from "../icons/icons.component";
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink, RouterLinkActive, IconsComponent, TranslatePipe],
  templateUrl: './mobile-nav.component.html',
})
export class MobileNavComponent {
  private readonly languageService = inject(LanguageService);
  readonly lang = computed(() => this.languageService.currentLang());

  readonly isOpen = input<boolean>(false);
  readonly navLinks = input.required<NavLink[]>();
  readonly currentLang = input<'EN' | 'AR'>('EN');

  readonly close = output<void>();
  readonly toggleLang = output<void>();
}
