import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';
import { HomeAbout } from '../../models/home-api.model';
import { LanguageService } from '../../../../core/services/language.service';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-about',
  imports: [RouterLink, FloatingWireframeComponent, ImageComponent, ButtonComponent, ScrollRevealDirective, TranslatePipe],
  templateUrl: './about.component.html'
})
export class HomeAboutComponent {
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly aboutData = input<HomeAbout>();
  readonly revealDirection = input<ScrollDirection>('left');
  readonly revealDelay = input<number>(500);
}

