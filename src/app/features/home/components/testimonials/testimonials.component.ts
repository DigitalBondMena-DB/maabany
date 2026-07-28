import { Component, inject, signal, computed } from '@angular/core';
import { HomeDataService } from '../../services/home-data.service';

@Component({
  selector: 'app-testimonials',
  imports: [],
  template: `
    <section class="py-24 bg-slate-900 text-white border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-amber-400 font-bold tracking-wider text-sm uppercase mb-3 block">Testimonials & Client Feedback</span>
          <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight">Endorsed By Regional Visionaries</h2>
        </div>

        <!-- Active Testimonial Card -->
        <div class="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-slate-950 border border-slate-800 relative">
          <div class="flex items-center gap-1 mb-6">
            @for (star of [1, 2, 3, 4, 5]; track star) {
              <span class="text-amber-400 text-xl">★</span>
            }
          </div>

          <blockquote class="text-xl md:text-2xl text-slate-200 font-light leading-relaxed mb-8">
            "{{ activeItem().content }}"
          </blockquote>

          <div class="flex items-center justify-between flex-wrap gap-4 border-t border-slate-800 pt-6">
            <div class="flex items-center gap-4">
              <img [src]="activeItem().avatar" [alt]="activeItem().name" class="w-14 h-14 rounded-full object-cover border-2 border-amber-500" />
              <div>
                <div class="font-bold text-lg text-white">{{ activeItem().name }}</div>
                <div class="text-slate-400 text-sm">{{ activeItem().title }} — <span class="text-amber-400">{{ activeItem().company }}</span></div>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center gap-3">
              <button (click)="prev()" class="w-12 h-12 rounded-xl bg-slate-800 hover:bg-amber-500 text-white flex items-center justify-center font-bold transition-colors">
                ←
              </button>
              <button (click)="next()" class="w-12 h-12 rounded-xl bg-slate-800 hover:bg-amber-500 text-white flex items-center justify-center font-bold transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  readonly dataService = inject(HomeDataService);
  readonly currentIndex = signal<number>(0);

  readonly activeItem = computed(() => {
    const list = this.dataService.testimonials();
    return list[this.currentIndex()] || list[0];
  });

  next(): void {
    this.currentIndex.update(idx => (idx + 1) % this.dataService.testimonials().length);
  }

  prev(): void {
    this.currentIndex.update(idx => (idx - 1 + this.dataService.testimonials().length) % this.dataService.testimonials().length);
  }
}
