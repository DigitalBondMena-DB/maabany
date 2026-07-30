import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

export interface StatItem {
  target: number;
  suffix: string;
  labelKey: string;
}

@Component({
  selector: 'app-about-stats',
  imports: [TranslatePipe, CountUpDirective],
  templateUrl: './about-stats.component.html',
})
export class AboutStatsComponent {
  readonly stats: StatItem[] = [
    { target: 13, suffix: '+', labelKey: 'ABOUT_PAGE.STAT_1' },
    { target: 250, suffix: '+', labelKey: 'ABOUT_PAGE.STAT_2' },
    { target: 40, suffix: '+', labelKey: 'ABOUT_PAGE.STAT_3' },
    { target: 98, suffix: '%', labelKey: 'ABOUT_PAGE.STAT_4' },
  ];
}
