import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HomeProject } from '../../models/home-api.model';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink, FloatingWireframeComponent, ButtonComponent, MediaCardComponent, EmptyStateComponent, TranslatePipe],
  templateUrl: './featured-projects.component.html',
})
export class FeaturedProjectsComponent {
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly projectsData = input<HomeProject[]>();
}
