import { Component, viewChild, ElementRef, output, afterNextRender } from '@angular/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { IconName } from '../../../../shared/models/icons.interface';
import { HeroBg } from "../hero-bg/hero-bg";

export interface HeroStat {
  icon: IconName;
  value: string;
  label: string;
}

import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero.component.html',
  imports: [IconsComponent, HeroBg, ButtonComponent],
})
export class HomeHeroComponent {
  readonly openQuote = output<void>();
  readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  readonly heroRef = viewChild<ElementRef<HTMLElement>>('heroRef');
  readonly bgVideoUrl = '/videos/Maabany-hero-video.mp4';

  readonly stats: HeroStat[] = [
    { icon: 'orangeClock', value: '25+', label: 'Years of Excellence' },
    { icon: 'orangeBuild', value: '450+', label: 'Megaprojects Completed' },
    { icon: 'orangeI18n', value: '3', label: 'Sovereign Countries' },
    { icon: 'orangeAvatar', value: '99%', label: 'Satisfaction Index' },
  ];




  scrollToNext(): void {
    const heroElement = this.heroRef()?.nativeElement;
    if (!heroElement) return;
    const parentContainer = heroElement.parentElement || heroElement;
    const targetY = parentContainer.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}