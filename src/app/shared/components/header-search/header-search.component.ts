import { Component, signal, inject, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  template: `
    <form (submit)="onSearchSubmit($event)" class="max-w-4xl mx-auto flex items-center gap-3">
      <span class="text-neutral-500">🔍</span>
      <input
        type="text"
        placeholder="Search solutions, projects, cities..."
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

  readonly close = output<void>();
  readonly searchQuery = signal<string>('');

  onSearchSubmit(e: Event): void {
    e.preventDefault();
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      this.close.emit();
    }
  }
}
