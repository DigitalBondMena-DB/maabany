import { Component, inject } from '@angular/core';
import { HomeDataService } from '../../services/home-data.service';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-stats-counter',
  imports: [CountUpDirective],
  template: `
    <section class="py-16 bg-slate-900 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          @for (stat of dataService.stats(); track stat.id) {
            <div class="p-6 rounded-2xl bg-slate-800/40 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300">
              <div 
                class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2"
                [appCountUp]="stat.value"
                [appCountUpSuffix]="stat.suffix"
                [appCountUpDuration]="2000"
              >
                0{{ stat.suffix }}
              </div>
              <div class="text-white font-semibold text-lg mb-1">{{ stat.label }}</div>
              <p class="text-slate-400 text-sm font-light leading-relaxed">{{ stat.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class StatsCounterComponent {
  readonly dataService = inject(HomeDataService);
}
