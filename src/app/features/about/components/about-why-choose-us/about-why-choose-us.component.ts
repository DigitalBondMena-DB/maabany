import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';

export interface AdvantageItem {
  titleKey: string;
  descKey: string;
  iconSvg: string;
}

@Component({
  selector: 'app-about-why-choose-us',
  imports: [TranslatePipe, FloatingWireframeComponent],
  templateUrl: './about-why-choose-us.component.html',
})
export class AboutWhyChooseUsComponent {
  readonly advantages: AdvantageItem[] = [
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_1_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_1_DESC',
      iconSvg: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_2_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_2_DESC',
      iconSvg: 'M12 15l-2 5l9-11h-7l2-5l-9 11h7z'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_3_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_3_DESC',
      iconSvg: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_4_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_4_DESC',
      iconSvg: 'M9 18h6m-5 3h4a2 2 0 0 0 2-2v-1.1a9 9 0 1 0-8 0V19a2 2 0 0 0 2 2z'
    },
    {
      titleKey: 'ABOUT_PAGE.ADVANTAGE_5_TITLE',
      descKey: 'ABOUT_PAGE.ADVANTAGE_5_DESC',
      iconSvg: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z'
    }
  ];
}
