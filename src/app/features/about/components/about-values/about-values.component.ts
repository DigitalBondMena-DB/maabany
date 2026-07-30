import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface ValuePanel {
  titleKey: string;
  descKey: string;
  iconSvg: string;
}

@Component({
  selector: 'app-about-values',
  imports: [TranslatePipe],
  templateUrl: './about-values.component.html',
})
export class AboutValuesComponent {
  readonly panels: ValuePanel[] = [
    {
      titleKey: 'ABOUT_PAGE.MISSION_TITLE',
      descKey: 'ABOUT_PAGE.MISSION_DESC',
      iconSvg: 'M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z'
    },
    {
      titleKey: 'ABOUT_PAGE.VISION_TITLE',
      descKey: 'ABOUT_PAGE.VISION_DESC',
      iconSvg: 'M9 18h6m-5 3h4a2 2 0 0 0 2-2v-1.1a9 9 0 1 0-8 0V19a2 2 0 0 0 2 2z'
    },
    {
      titleKey: 'ABOUT_PAGE.VALUES_TITLE',
      descKey: 'ABOUT_PAGE.VALUES_DESC',
      iconSvg: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z'
    }
  ];
}
