import { Component, viewChild, ElementRef, inject, AfterViewInit, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { IconName } from '../../../../shared/models/icons.interface';
import { HeroBg } from "../hero-bg/hero-bg";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ViewportScroller } from '@angular/common';
import { HomeHero, HomeCounter } from '../../models/home-api.model';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { LanguageService } from '../../../../core/services/language.service';

export interface HeroStat {
  icon: IconName;
  valueKey: string;
  labelKey: string;
}

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero.component.html',
  imports: [HeroBg, ButtonComponent, TranslatePipe, ImageComponent],
})
export class HomeHeroComponent implements AfterViewInit {
  private readonly languageService = inject(LanguageService);
  lang = this.languageService.currentLang;
  readonly heroData = input<HomeHero>();
  readonly countersData = input<HomeCounter[]>();

  private readonly position = inject(ViewportScroller);
  private readonly videoEl = viewChild<ElementRef<HTMLVideoElement>>('video');
  readonly fallbackVideoUrl = '/videos/Maabany-hero-video.mp4';

  ngAfterViewInit(): void {
    this.videoConf();
  }

  videoConf(): void {
    const el = this.videoEl()?.nativeElement;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
    }
  }



  scrollToNext(): void {
    this.position.scrollToAnchor('about');
  }
}