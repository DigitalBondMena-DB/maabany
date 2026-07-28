import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeDataService } from '../../services/home-data.service';

@Component({
  selector: 'app-stats-counter',
  imports: [],
  template: `
    <section class="py-16 bg-slate-900 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          @for (stat of dataService.stats(); track stat.id) {
            <div class="p-6 rounded-2xl bg-slate-800/40 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300">
              <div class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                {{ getCounterValue(stat.id) }}{{ stat.suffix }}
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
export class StatsCounterComponent implements OnInit, OnDestroy {
  readonly dataService = inject(HomeDataService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly yearsCounter = signal<number>(0);
  readonly projectsCounter = signal<number>(0);
  readonly countriesCounter = signal<number>(0);
  readonly satisfactionCounter = signal<number>(0);

  private timer: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateCounters();
    } else {
      // In SSR, display final values directly
      this.yearsCounter.set(25);
      this.projectsCounter.set(450);
      this.countriesCounter.set(3);
      this.satisfactionCounter.set(99);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  getCounterValue(id: string): number {
    switch (id) {
      case 'years': return this.yearsCounter();
      case 'projects': return this.projectsCounter();
      case 'countries': return this.countriesCounter();
      case 'satisfaction': return this.satisfactionCounter();
      default: return 0;
    }
  }

  private animateCounters(): void {
    let step = 0;
    const maxSteps = 50;
    this.timer = setInterval(() => {
      step++;
      const progress = step / maxSteps;
      this.yearsCounter.set(Math.floor(25 * progress));
      this.projectsCounter.set(Math.floor(450 * progress));
      this.countriesCounter.set(Math.floor(3 * progress));
      this.satisfactionCounter.set(Math.floor(99 * progress));

      if (step >= maxSteps) {
        this.yearsCounter.set(25);
        this.projectsCounter.set(450);
        this.countriesCounter.set(3);
        this.satisfactionCounter.set(99);
        clearInterval(this.timer);
      }
    }, 30);
  }
}
