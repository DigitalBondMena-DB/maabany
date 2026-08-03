import { Component, input } from '@angular/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { IconName } from '../../../../shared/models/icons.interface';
import { HomeStandard } from '../../models/home-api.model';

export interface WhyChooseUsReason {
  num: string;
  title: string;
  desc: string;
  icon: IconName;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [IconsComponent, FloatingWireframeComponent],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly standardsData = input<HomeStandard[]>();

  readonly defaultReasons: WhyChooseUsReason[] = [
    {
      num: '01',
      title: '3D Laser Metrology',
      desc: 'Using advanced millimetric scanners during foundation phases to avoid structural shifting or tilt propagation.',
      icon: 'orangeBuild',
    },
    {
      num: '02',
      title: 'LEED Certified Builds',
      desc: 'Specializing in carbon-capture concrete formulations, thermal insulation shells, and active solar arrays.',
      icon: 'orangeTrophy',
    },
    {
      num: '03',
      title: 'Total Risk Containment',
      desc: 'Unmatched site safety algorithms with zero fatal records over millions of consecutive structural hours.',
      icon: 'orangeShild',
    },
    {
      num: '04',
      title: 'Saudi Tier-1 Delivery',
      desc: 'Accredited for heavy state industrial tenders, smart smart-city horizons, and national defense hubs.',
      icon: 'orangeI18n',
    },
  ];
}
