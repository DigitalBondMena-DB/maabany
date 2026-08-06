import { Component, effect, inject } from '@angular/core';
import { HomeHeroComponent } from './components/hero/hero.component';
import { HomeAboutComponent } from './components/about/about.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { SolutionsSliderComponent } from './components/solutions-slider/solutions-slider.component';
import { ClientMarqueeComponent } from './components/client-marquee/client-marquee.component';
import { FeaturedProjectsComponent } from './components/featured-projects/featured-projects.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { HomeBlogsComponent } from './components/home-blogs/home-blogs.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { HomeService } from './services/home.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeroComponent,
    HomeAboutComponent,
    WhyChooseUsComponent,
    SolutionsSliderComponent,
    ClientMarqueeComponent,
    FeaturedProjectsComponent,
    TestimonialsComponent,
    HomeBlogsComponent,
    CtaBannerComponent,
    ContactSectionComponent,
    SkeletonComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly homeService = inject(HomeService);
  private readonly seoService = inject(SeoService);
  constructor() {
    effect(() => {
      const response = this.homeService;
      if (response?.seo()) {
        this.seoService.updateSeo(response.seo()!);
      }
    });
  }
}
