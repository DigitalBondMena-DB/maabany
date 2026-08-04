import { Component, input, signal, inject, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink],
  templateUrl: './cta-banner.component.html',
  styles: [`
    @keyframes blueprintDraw {
      0% { stroke-dashoffset: 1200; }
      30% { stroke-dashoffset: 1200; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes blueprintDot {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.5); opacity: 0.95; }
    }

    @keyframes blueprintFade {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.8; }
    }

    .bp-line-draw {
      stroke-dasharray: 1200;
      stroke-dashoffset: 1200;
      animation: blueprintDraw 9s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    }

    .bp-pulse-dot {
      transform-origin: center;
      animation: blueprintDot 4s ease-in-out infinite;
    }

    .bp-fade-slow {
      animation: blueprintFade 6s ease-in-out infinite;
    }
  `]
})
export class CtaBannerComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly languageService = inject(LanguageService);

  readonly lang = this.languageService.currentLang;
  readonly subtitle = input<string>('READY TO START?');
  readonly title = input<string>("Let's Build Your Next Project Together");
  readonly primaryBtnText = input<string>('Request a Quote');
  readonly secondaryBtnText = input<string>('Download Company Profile');
  readonly primaryLink = input<string>('request-quote');

  readonly computedPrimaryLink = computed(() => {
    const link = this.primaryLink();
    const cleanPath = link.startsWith('/') ? link.slice(1) : link;
    return ['/', this.lang(), cleanPath];
  });

  readonly downloadingProfile = signal<boolean>(false);
  readonly downloadSuccess = signal<boolean>(false);

  handleDownloadProfile(): void {
    if (this.downloadingProfile()) return;
    this.downloadingProfile.set(true);

    setTimeout(() => {
      this.downloadingProfile.set(false);
      this.downloadSuccess.set(true);

      if (isPlatformBrowser(this.platformId)) {
        // Trigger simulated file download or anchor link
        const link = document.createElement('a');
        link.href = '#';
        link.setAttribute('download', 'Maabany_Company_Profile.pdf');
      }

      setTimeout(() => {
        this.downloadSuccess.set(false);
      }, 3000);
    }, 1200);
  }
}
