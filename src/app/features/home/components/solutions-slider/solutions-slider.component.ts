import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeDataService } from '../../services/home-data.service';

@Component({
  selector: 'app-solutions-slider',
  imports: [RouterLink],
  templateUrl: './solutions-slider.component.html'
})
export class SolutionsSliderComponent {
  readonly dataService = inject(HomeDataService);

  readonly activeSolutionIndex = signal<number>(0);
  readonly isCivilExpanded = signal<boolean>(false);

  readonly mepSlideIdx = signal<number>(0);
  readonly mepImages = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
  ];

  readonly activeSolution = computed(() => {
    const list = this.dataService.solutions();
    return list[this.activeSolutionIndex()] || list[0];
  });

  selectSolution(index: number): void {
    this.activeSolutionIndex.set(index);
  }

  toggleCivilExpand(): void {
    this.isCivilExpanded.update(val => !val);
  }

  nextMepSlide(): void {
    this.mepSlideIdx.update(idx => (idx + 1) % this.mepImages.length);
  }

  prevMepSlide(): void {
    this.mepSlideIdx.update(idx => (idx - 1 + this.mepImages.length) % this.mepImages.length);
  }
}
