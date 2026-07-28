import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FloatingWireframeComponent } from '../../shared/components/floating-wireframe/floating-wireframe.component';
import { RightContentWatermarkComponent } from '../../shared/components/watermark/watermark.component';
import { QuoteModalComponent } from '../../shared/components/quote-modal/quote-modal.component';
import { HomeHeroComponent } from './components/hero/hero.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { SolutionsSliderComponent } from './components/solutions-slider/solutions-slider.component';
import { ClientMarqueeComponent } from './components/client-marquee/client-marquee.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BranchContactComponent } from './components/branch-contact/branch-contact.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    FloatingWireframeComponent,
    RightContentWatermarkComponent,
    QuoteModalComponent,
    HomeHeroComponent,
    WhyChooseUsComponent,
    SolutionsSliderComponent,
    ClientMarqueeComponent,
    TestimonialsComponent,
    BranchContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly quoteModalOpen = signal<boolean>(false);
  readonly projectFilter = signal<string>('All');

  readonly projects = [
    { name: 'Riyadh Financial Plaza II', category: 'Commercial', desc: '92-story commercial tower with high-efficiency MEP & seismic dampening.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
    { name: 'NEOM Metropolitan Link', category: 'Infrastructure', desc: 'High-speed transit hub and bridge infrastructure network.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Cairo Smart Tech Park', category: 'MEP', desc: 'Tier-4 data center & intelligent BMS automation.', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80' }
  ];

  openModal(): void {
    this.quoteModalOpen.set(true);
  }

  closeModal(): void {
    this.quoteModalOpen.set(false);
  }
}
