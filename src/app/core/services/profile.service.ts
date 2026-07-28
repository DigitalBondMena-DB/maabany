import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class ProfileService {
  private readonly platformId = inject(PLATFORM_ID);
  
  readonly isDownloading = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);

  downloadProfile(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isDownloading.set(true);
    setTimeout(() => {
      this.isDownloading.set(false);
      this.isSuccess.set(true);

      // Trigger download
      const link = document.createElement('a');
      link.href = '/docs/Company-Profile.pdf';
      link.download = 'Maabany-Company-Profile.pdf';
      link.click();

      setTimeout(() => this.isSuccess.set(false), 3000);
    }, 1500);
  }
}
