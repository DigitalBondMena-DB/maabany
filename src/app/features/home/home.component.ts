import { Component } from '@angular/core';
import { HomeHeroComponent } from './components/hero/hero.component';
import { HomeAboutComponent } from './components/about/about.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { SolutionsSliderComponent } from './components/solutions-slider/solutions-slider.component';
import { ClientMarqueeComponent } from './components/client-marquee/client-marquee.component';
import { FeaturedProjectsComponent } from './components/featured-projects/featured-projects.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BranchContactComponent } from './components/branch-contact/branch-contact.component';

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
    BranchContactComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent { }
