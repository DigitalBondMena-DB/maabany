import { Component, input, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PROJECTS_DATA, ProjectItem } from '../../services/projects-data';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-other-projects',
  imports: [TranslatePipe, MediaCardComponent],
  templateUrl: './other-projects.component.html',
})
export class OtherProjectsComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly currentSlug = input<string>('');

  readonly otherProjects = computed<ProjectItem[]>(() => {
    const slug = this.currentSlug();
    return PROJECTS_DATA.filter(p => p.slug !== slug).slice(0, 3);
  });
}
