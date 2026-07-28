import { Component, viewChild, ElementRef, output, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HomeHeroComponent {
  readonly openQuote = output<void>();
  readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  readonly bgVideoUrl = '/hero/videos/Maabany-hero-video.mp4';
  constructor() {
    afterNextRender(() => {
      this.startVideo()
    })
  }

  startVideo(): void {
    const video = this.videoRef()?.nativeElement;
    if (!video) return;
    video.play();
    video.muted = true;
  }


}
