import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconsComponent } from "../../../../shared/components/icons/icons.component";
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { HomeAbout } from '../../models/home-api.model';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-home-about',
  imports: [RouterLink, FloatingWireframeComponent, ImageComponent, ButtonComponent, IconsComponent, ScrollRevealDirective],
  templateUrl: './about.component.html'
})
export class HomeAboutComponent {
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly aboutData = input<HomeAbout>();
}
