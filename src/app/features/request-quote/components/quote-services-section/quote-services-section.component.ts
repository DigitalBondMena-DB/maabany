import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

export interface SolutionCapability {
  id: string;
  title: string;
  desc: string;
  image: string;
}

@Component({
  selector: 'app-quote-services-section',
  imports: [
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './quote-services-section.component.html',
})
export class QuoteServicesSectionComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly solutions: SolutionCapability[] = [
    {
      id: 'civil-solutions',
      title: 'Civil Solutions',
      desc: 'Construction and civil engineering services for commercial, residential, industrial, and infrastructure projects.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fit-out-solutions',
      title: 'Fit-Out Solutions',
      desc: 'Interior fit-out and finishing solutions that combine functionality with premium craftsmanship.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'infrastructure-earthworks',
      title: 'Infrastructure & Earthworks',
      desc: 'Heavy earthmoving, site preparation, and deep underground utility networks.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    }
  ];
}
