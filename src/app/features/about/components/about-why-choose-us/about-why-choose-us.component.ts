import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html-pipe';

export interface AdvantageItem {
  titleKey: string;
  descKey: string;
  iconSvg: string;
}

@Component({
  selector: 'app-about-why-choose-us',
  imports: [TranslatePipe, FloatingWireframeComponent, ImageComponent, SafeHtmlPipe],
  templateUrl: './about-why-choose-us.component.html',
})
export class AboutWhyChooseUsComponent {
  readonly advantages: AdvantageItem[] = [
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_1_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_1_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-5 h-5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_2_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_2_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-5 h-5" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_3_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_3_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-5 h-5" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_4_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_4_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-5 h-5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_5_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_5_DESC',
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hard-hat w-5 h-5" aria-hidden="true"><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path><path d="M14 6a6 6 0 0 1 6 6v3"></path><path d="M4 15v-3a6 6 0 0 1 6-6"></path><rect x="2" y="15" width="20" height="4" rx="1"></rect></svg>'
    }
  ];
}
