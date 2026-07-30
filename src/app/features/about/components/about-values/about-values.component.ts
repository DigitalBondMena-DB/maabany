import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html-pipe';

export interface ValuePanel {
  titleKey: string;
  descKey: string;
  iconSvg: string;
}

@Component({
  selector: 'app-about-values',
  imports: [TranslatePipe, SafeHtmlPipe],
  templateUrl: './about-values.component.html',
})
export class AboutValuesComponent {
  readonly panels: ValuePanel[] = [
    {
      titleKey: 'ABOUT_PAGE.MISSION_TITLE',
      descKey: 'ABOUT_PAGE.MISSION_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target w-6 h-6" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.VISION_TITLE',
      descKey: 'ABOUT_PAGE.VISION_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-6 h-6" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.VALUES_TITLE',
      descKey: 'ABOUT_PAGE.VALUES_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-6 h-6" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>'
    }
  ];
}
