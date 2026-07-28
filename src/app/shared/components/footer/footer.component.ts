import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly profileService = inject(ProfileService);
  readonly openQuoteModal = output<void>();

  readonly quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Projects', path: '/projects' },
    { label: 'Industries', path: '/industries' },
    { label: 'Clients & Partners', path: '/clients-partners' },
    { label: 'Blogs', path: '/blogs' }
  ];

  readonly resourceLinks = [
    { label: 'Company Profile', path: '/about' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Contact', path: '/contact' }
  ];

  downloadProfile(): void {
    this.profileService.downloadProfile();
  }

  triggerQuote(): void {
    this.openQuoteModal.emit();
  }
}
