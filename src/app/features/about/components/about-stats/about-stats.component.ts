import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface StatItem {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-about-stats',
  imports: [TranslatePipe],
  templateUrl: './about-stats.component.html',
})
export class AboutStatsComponent {
  readonly stats: StatItem[] = [
    { value: '13+', labelKey: 'ABOUT_PAGE.STAT_1' },
    { value: '250+', labelKey: 'ABOUT_PAGE.STAT_2' },
    { value: '40+', labelKey: 'ABOUT_PAGE.STAT_3' },
    { value: '98%', labelKey: 'ABOUT_PAGE.STAT_4' },
  ];
}
