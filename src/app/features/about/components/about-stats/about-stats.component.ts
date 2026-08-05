import { Component, computed, input } from '@angular/core';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { AboutCounter } from '../../models/about-api.model';

export interface StatItem {
  target: number;
  suffix: string;
  labelKey: string;
}

@Component({
  selector: 'app-about-stats',
  imports: [CountUpDirective],
  templateUrl: './about-stats.component.html',
})
export class AboutStatsComponent {
  readonly countersData = input<AboutCounter[] | undefined>(undefined);

  readonly parsedCounters = computed(() => {
    let data = this.countersData();
    if (!data || data.length === 0) return null;
    if (data.length > 4) {
      data = data.slice(0, 4);
    }

    return data.map((item) => {
      const numStr = (item.number || '').trim();
      const match = numStr.match(/^(\d+)(.*)$/);
      const target = match ? parseInt(match[1], 10) : 0;
      const suffix = match ? match[2] : '';
      return {
        id: item.id,
        target,
        suffix,
        title: item.title,
        icon: item.icon,
      };
    });
  });
}
