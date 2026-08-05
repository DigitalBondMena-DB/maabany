import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { LanguageService } from '../../../../core/services/language.service';

export interface GridSolutionItem {
  id?: number | string;
  title: string;
  description: string;
  main_image: string;
  slug: string;
  other_slug?: string;
  children_count?: number;
}

@Component({
  selector: 'app-solutions-grid',
  imports: [
    RouterLink,
    TranslatePipe,
    FloatingWireframeComponent,
    ImageComponent,
    SkeletonComponent,
  ],
  templateUrl: './solutions-grid.component.html',
})
export class SolutionsGridComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly items = input<GridSolutionItem[]>([]);
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly parentPath = input<string>('');
  readonly isSubView = input<boolean>(false);
  readonly isLoading = input<boolean>(false);
  readonly parentTitle = input<string>('');
  readonly backPath = input<string>('');

  getCardLink(slug: string): string {
    const base = this.parentPath() || `/${this.currentLang()}/solutions`;
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${cleanBase}/${slug}`;
  }
}
