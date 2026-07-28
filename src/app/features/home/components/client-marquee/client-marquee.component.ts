import { Component, inject } from '@angular/core';
import { HomeDataService } from '../../services/home-data.service';

@Component({
  selector: 'app-client-marquee',
  imports: [],
  template: `
    <section class="py-12 bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span class="text-slate-400 text-xs uppercase font-bold tracking-widest">Trusted By Government Entities & Industry Leaders</span>
      </div>

      <!-- Infinite Marquee Track -->
      <div class="flex whitespace-nowrap overflow-hidden relative">
        <div class="flex items-center gap-12 animate-marquee">
          @for (client of dataService.clients(); track client.name) {
            <div class="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300 font-bold tracking-wider hover:border-amber-500/40 hover:text-amber-400 transition-all">
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>{{ client.text }}</span>
            </div>
          }
          <!-- Duplicated set for smooth infinite loop -->
          @for (client of dataService.clients(); track 'dup-' + client.name) {
            <div class="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300 font-bold tracking-wider hover:border-amber-500/40 hover:text-amber-400 transition-all">
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>{{ client.text }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: 200%;
      animation: marquee 25s linear infinite;
    }
  `]
})
export class ClientMarqueeComponent {
  readonly dataService = inject(HomeDataService);
}
