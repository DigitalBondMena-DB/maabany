import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../../../shared/components/cta-banner/cta-banner.component';
import { LanguageService } from '../../../../core/services/language.service';

interface ChallengeItem {
  title: string;
  desc: string;
}

interface IndustryDetailData {
  id: string;
  name: string;
  heroImage: string;
  aboutHeading: string;
  aboutDesc: string;
  aboutImage: string;
  challenges: ChallengeItem[];
  relatedSolutions: { slug: string; title: string; desc: string; image: string }[];
  featuredProjects: { slug: string; name: string; location: string; year: string; desc: string; image: string }[];
}

const INDUSTRY_DETAILS_POOL: Record<string, IndustryDetailData> = {
  commercial: {
    id: 'commercial',
    name: 'Commercial Buildings',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    aboutHeading: 'Erecting Corporate Landmarks of the Future',
    aboutDesc: 'The modern commercial building is more than physical space—it is an engine of economic productivity, collaboration, and resource efficiency. Maabany partners with leading real estate funds, corporations, and developers to construct state-of-the-art office towers.',
    aboutImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    challenges: [
      { title: 'High-Rise Structural Stability', desc: 'Addressing lateral wind loads, seismic shears, and deep foundation pressures in dense urban clusters using high-density concrete shear cores.' },
      { title: 'Zoned Indoor Comfort', desc: 'Installing highly zoned VRF air-conditioning networks paired with intelligent acoustic insulation to foster focus-driven office suites.' },
      { title: 'Clash Resolution via 3D BIM', desc: 'Solving complex spatial conflicts between structural framing, HVAC ducts, and plumbing runs digitally during design.' },
      { title: 'High-Density Smart Backbones', desc: 'Constructing optical fibers, security monitoring, and localized environmental sensors under a unified smart building management system.' },
    ],
    relatedSolutions: [
      { slug: 'civil-solutions', title: 'Civil & Structural Solutions', desc: 'Turnkey structural engineering, high-rise concrete core pouring, and foundation engineering.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { slug: 'mep-solutions', title: 'MEP Engineering', desc: 'Comprehensive mechanical, electrical, and plumbing engineering systems.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
      { slug: 'fit-out-solutions', title: 'Interior Fit-Out', desc: 'Bespoke corporate interior architectural finishes and premium acoustic partitions.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    ],
    featuredProjects: [
      { slug: 'commercial-tower-development', name: 'Commercial Tower Development', location: 'Riyadh, KSA', year: '2024', desc: '45-story commercial skyscraper with LEED Platinum energy efficiency.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
      { slug: 'the-oryx-tower', name: 'The Oryx Financial Tower', location: 'Dubai, UAE', year: '2023', desc: 'Corporate headquarters featuring smart solar facades and column-free floor plates.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  residential: {
    id: 'residential',
    name: 'Residential Developments',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    aboutHeading: 'Crafting Exquisite Havens of Modern Living',
    aboutDesc: 'A home is a highly personal space demanding a flawless synthesis of family privacy, acoustic isolation, thermal comfort, and premium craftsmanship. Maabany works with premier developers to construct residential estates.',
    aboutImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    challenges: [
      { title: 'Flawless Architectural Finishes', desc: 'Ensuring seamless drywall joints, perfectly flush floor transitions, and high-precision wood paneling using hand-finished techniques.' },
      { title: 'Thermal Mass Optimization', desc: 'Deploying insulated concrete forms and triple-glazed window blocks to reduce air conditioning load by 40%.' },
      { title: 'Intelligent Home Networks', desc: 'Integrating surround sound, biometric smart locks, automated window shades, and landscape irrigation.' },
      { title: 'Acoustic Soundproofing Isolation', desc: 'Installing floating floor membranes and specialized multi-layer acoustic drywalls to block sound transfer.' },
    ],
    relatedSolutions: [
      { slug: 'civil-solutions', title: 'Civil & Structural Solutions', desc: 'Foundation engineering and reinforced concrete structures.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { slug: 'fit-out-solutions', title: 'Interior Fit-Out', desc: 'Custom residential joinery, stone flooring, and smart lighting.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    ],
    featuredProjects: [
      { slug: 'luxury-residential-compound', name: 'Luxury Residential Compound', location: 'Jeddah, KSA', year: '2023', desc: 'Exclusive community of 42 luxury villas with private gardens and smart home automation.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    aboutHeading: 'Integrating Engineering Integrity with Lifesaving Care',
    aboutDesc: 'Healthcare environments require the most complex engineering coordination of any building type. Medical infrastructure requires constant operational uptime, surgical-grade sterile conditions, and heavy electrical redundancies.',
    aboutImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    challenges: [
      { title: 'Clinical Infection Control', desc: 'Installing laminar airflow ceilings in operating suites, negative-pressure wards, and zero-gap anti-microbial wall paneling.' },
      { title: 'Ultra-Pure Air Filtration', desc: 'Constructing multi-stage HEPA filtration units that cycle clean air 25+ times per hour, trapping pathogens.' },
      { title: 'Uninterruptible Utility Redundancy', desc: 'Designing dual electrical feeds, automated diesel generators, and surgical-theater UPS systems.' },
      { title: 'Specialized Gas Piping', desc: 'Installing degreased copper pipes for oxygen, medical vacuum, and nitrous oxide distribution.' },
    ],
    relatedSolutions: [
      { slug: 'mep-solutions', title: 'MEP Engineering', desc: 'Specialized medical gas piping, HEPA ventilation, and backup generators.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
      { slug: 'light-current-solutions', title: 'Light Current & Security', desc: 'Nurse call systems, clinical access control, and telemetry backbones.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
    ],
    featuredProjects: [
      { slug: 'healthcare-facility', name: 'Al-Madinah Medical Complex', location: 'Madinah, KSA', year: '2024', desc: '300-bed specialized surgical hospital and diagnostic center.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
    ],
  },
};

@Component({
  selector: 'app-industry-details',
  imports: [
    RouterLink,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
  ],
  templateUrl: './industry-details.component.html',
})
export class IndustryDetailsComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly slug = input.required<string>();

  readonly currentIndustry = computed<IndustryDetailData>(() => {
    const s = this.slug();
    return INDUSTRY_DETAILS_POOL[s] || INDUSTRY_DETAILS_POOL['commercial'];
  });
}
