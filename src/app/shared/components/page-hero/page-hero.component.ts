import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageComponent } from "../image/image.component";
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink, TranslatePipe, ImageComponent],
  templateUrl: './page-hero.component.html',
})
export class PageHeroComponent {
  private readonly languageService = inject(LanguageService);
  readonly lang = computed(() => this.languageService.currentLang());
  readonly title = input<string>('');
  readonly titleHighlight = input<string>('');
  readonly highlightTitle = input<boolean>(true);
  readonly categoryBadge = input<string>('');
  readonly description = input<string>('');
  readonly heroImage = input<string>('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80');

  // Computed main title without the last word (if auto-highlight is active)
  readonly mainTitle = computed<string>(() => {
    const rawTitle = this.title().trim();
    if (!rawTitle) return '';

    // If explicit titleHighlight is provided OR highlightTitle is false, return full title
    if (this.titleHighlight() || !this.highlightTitle()) {
      return rawTitle;
    }

    const words = rawTitle.split(' ').filter(Boolean);
    if (words.length <= 1) {
      return rawTitle;
    }

    return words.slice(0, -1).join(' ');
  });

  // Computed highlighted word (either explicit titleHighlight OR auto-extracted last word)
  readonly activeHighlight = computed<string>(() => {
    const explicit = this.titleHighlight().trim();
    if (explicit) return explicit;

    if (!this.highlightTitle()) return '';

    const rawTitle = this.title().trim();
    const words = rawTitle.split(' ').filter(Boolean);
    if (words.length <= 1) return '';

    return words[words.length - 1];
  });
}
