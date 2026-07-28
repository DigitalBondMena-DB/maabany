import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconsComponent } from "../icons/icons.component";

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink, RouterLinkActive, IconsComponent],
  templateUrl: './mobile-nav.component.html',
})
export class MobileNavComponent {
  readonly isOpen = input<boolean>(false);
  readonly navLinks = input.required<NavLink[]>();
  readonly currentLang = input<'EN' | 'AR'>('EN');

  readonly close = output<void>();
  readonly toggleLang = output<void>();
}
