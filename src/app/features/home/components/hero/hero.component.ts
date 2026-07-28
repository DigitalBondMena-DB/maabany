import { Component, viewChild, ElementRef, output, afterNextRender } from '@angular/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { IconName } from '../../../../shared/models/icons.interface';

export interface HeroStat {
  icon: IconName;
  value: string;
  label: string;
}

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero.component.html',
  imports: [IconsComponent],
})
export class HomeHeroComponent {
  readonly openQuote = output<void>();
  readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  readonly bgVideoUrl = '/hero/videos/Maabany-hero-video.mp4';

  readonly stats: HeroStat[] = [
    { icon: 'orangeClock', value: '25+', label: 'Years of Excellence' },
    { icon: 'orangeBuild', value: '450+', label: 'Megaprojects Completed' },
    { icon: 'orangeI18n', value: '3', label: 'Sovereign Countries' },
    { icon: 'orangeAvatar', value: '99%', label: 'Satisfaction Index' },
  ];

  constructor() {
    afterNextRender(() => {
      this.startVideo();
    });
  }

  startVideo(): void {
    const video = this.videoRef()?.nativeElement;
    if (!video) return;
    video.play();
    video.muted = true;
  }
}
