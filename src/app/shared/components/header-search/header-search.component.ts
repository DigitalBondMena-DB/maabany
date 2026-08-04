import { Component, signal, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IconsComponent } from '../icons/icons.component';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header-search',
  imports: [IconsComponent, TranslatePipe],
  template: `
    <form (submit)="onSearchSubmit($event)" class="max-w-4xl mx-auto flex items-center gap-3">
      <app-icons icon="search" [width]="20" [height]="20" />
      <input
        type="text"
        [placeholder]="'SEARCH.INPUT_PLACEHOLDER' | translate"
        [value]="searchQuery()"
        (input)="searchQuery.set($any($event.target).value)"
        class="flex-1 bg-transparent border-none focus:outline-none text-sm text-neutral-900 placeholder-neutral-400"
        autoFocus
      />
      <button
        type="button"
        (click)="close.emit()"
        class="text-xs font-mono px-3 py-1.5 rounded-lg text-neutral-600 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
      >
        Close ESC
      </button>
    </form>
  `,
  styleUrl: './header-search.component.css'
})
export class HeaderSearchComponent {
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);

  readonly close = output<void>();
  readonly searchQuery = signal<string>('');

  onSearchSubmit(e: Event): void {
    e.preventDefault();
    const query = this.searchQuery().trim();
    if (query) {
      const lang = this.languageService.currentLang();
      this.router.navigate(['/', lang, 'search'], { queryParams: { q: query } });
      this.close.emit();
    }
  }
}
