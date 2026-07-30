import { Component, viewChild, ElementRef, output, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { IconName } from '../../../../shared/models/icons.interface';
import { HeroBg } from "../hero-bg/hero-bg";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ViewportScroller } from '@angular/common';

export interface HeroStat {
  icon: IconName;
  valueKey: string;
  labelKey: string;
}

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero.component.html',
  imports: [IconsComponent, HeroBg, ButtonComponent, TranslatePipe],
})
export class HomeHeroComponent {
  private readonly position = inject(ViewportScroller)
  readonly bgVideoUrl = '/videos/Maabany-hero-video.mp4';

  readonly stats: HeroStat[] = [
    { icon: 'orangeClock', valueKey: 'HERO.STAT_1_NUMBER', labelKey: 'HERO.STAT_1_LABEL' },
    { icon: 'orangeBuild', valueKey: 'HERO.STAT_2_NUMBER', labelKey: 'HERO.STAT_2_LABEL' },
    { icon: 'orangeI18n', valueKey: 'HERO.STAT_3_NUMBER', labelKey: 'HERO.STAT_3_LABEL' },
    { icon: 'orangeAvatar', valueKey: 'HERO.STAT_4_NUMBER', labelKey: 'HERO.STAT_4_LABEL' },
  ];

  scrollToNext(): void {
    this.position.scrollToAnchor('about');
  }
}