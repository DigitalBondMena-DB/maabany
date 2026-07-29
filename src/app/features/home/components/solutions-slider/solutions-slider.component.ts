import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MepSliderComponent } from '../mep-slider/mep-slider.component';

export interface SolutionCard {
  num: string;
  title: string;
  desc: string;
  link: string;
  items: string[];
}

@Component({
  selector: 'app-solutions-slider',
  imports: [RouterLink, FloatingWireframeComponent, ButtonComponent, MepSliderComponent, TranslatePipe],
  templateUrl: './solutions-slider.component.html',
})
export class SolutionsSliderComponent {
  readonly mepImages = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  ];

  readonly otherSolutions: SolutionCard[] = [
    {
      num: '02',
      title: 'Facility Management',
      desc: 'Preventive electromechanical maintenance, 24/7 technical emergency response, comprehensive energy audits, and structural lifecycle management to protect and maintain premium spaces.',
      link: '/solutions/facility-management',
      items: [
        'Preventive & Corrective MEP Maintenance',
        '24/7 Technical Response Desk',
        'Intelligent Building Energy Audits',
      ],
    },
    {
      num: '03',
      title: 'Civil Solutions',
      desc: 'Delivering turnkey structural concrete, heavy industrial foundations, and high-tensile prefabricated steel frameworks. We construct the robust, resilient physical structures that form the bedrock of national expansion.',
      link: '/solutions/civil-solutions',
      items: [
        'Commercial & Residential Towers',
        'Heavy Industrial & Foundation Works',
        'Prefabricated Steel Trusses & Cladding',
      ],
    },
    {
      num: '04',
      title: 'Fit-Out Solutions',
      desc: 'High-end commercial interior design, acoustic system integration, and bespoke architectural joinery engineered to elevate spatial luxury and human performance.',
      link: '/solutions/fit-out-solutions',
      items: [
        'Workplace Turnkey Designs',
        'Premium Acoustics & Partitioning',
        'Custom Joinery & Modern Finishes',
      ],
    },
  ];
}
