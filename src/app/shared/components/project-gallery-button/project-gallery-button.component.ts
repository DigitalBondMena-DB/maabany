import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-gallery-button',
  imports: [TranslatePipe],
  template: `
    <button
      type="button"
      (click)="buttonClick.emit()"
      [attr.aria-label]="label() + (imageCount() ? ' (' + imageCount() + ' photos)' : '')"
      class="group relative inline-flex items-center gap-3 bg-white text-primary border border-primary hover:bg-primary hover:text-white font-mono text-xs md:text-sm font-bold uppercase tracking-[0.18em] px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 cursor-pointer"
    >
      <span class="relative z-10">{{ label() | translate }}</span>

      @if (imageCount() && imageCount()! > 0) {
        <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white font-mono text-[10px] font-bold tracking-normal transition-colors">
          {{ imageCount() }}
        </span>
      }

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  `
})
export class ProjectGalleryButtonComponent {
  readonly label = input<string>('View Project Gallery');
  readonly imageCount = input<number>(0);

  readonly buttonClick = output<void>();
}
