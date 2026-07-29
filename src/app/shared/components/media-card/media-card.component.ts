import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink],
  template: `
  <article>
    <a
      [routerLink]="link()"
      class="bg-white border border-neutral-200 rounded-3xl overflow-hidden group hover:border-[#EA8A22]/40 hover:shadow-2xl hover:shadow-[#EA8A22]/5 transition-all duration-300 flex flex-col h-full cursor-pointer">
      <div [class]="'overflow-hidden relative block shrink-0 ' + imageHeight()">
        <img
          [src]="image()"
          [alt]="title()"
          class="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105"
        />

        @if (badge()) {
          <div
            [class]="'text-[10px] font-mono text-[#142b52] font-bold uppercase tracking-wider absolute z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/80 shadow-xs ' +
              (badgePosition() === 'bottom-left' ? 'bottom-4 left-4' : 'top-4 left-4')">
              {{ badge() }}
          </div>
        }
      </div>
      <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div class="space-y-2">
          <h3 class="text-lg font-bold text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase leading-snug line-clamp-2">
            {{ title() }}
          </h3>
          <p class="text-xs text-neutral-600 leading-relaxed font-light line-clamp-2">
            {{ desc() }}
          </p>
        </div>
      </div>
    </a>
  </article>
  `
})
export class MediaCardComponent {
  readonly title = input.required<string>();
  readonly desc = input.required<string>();
  readonly image = input.required<string>();
  readonly link = input.required<string>();
  readonly badge = input<string>();
  readonly badgePosition = input<'top-left' | 'bottom-left'>('top-left');
  readonly imageHeight = input<string>('h-64');
}
