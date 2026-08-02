import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'handshake' | 'cpu' | 'shield';
}

@Component({
  selector: 'app-clients-why-choose-us',
  imports: [TranslatePipe],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly featureCards: FeatureCard[] = [
    {
      id: 'f-1',
      title: 'Engineering Excellence',
      description: 'Delivering mega scale works that meet rigorous international ISO, ANSI, and regional construction standards with peerless finishing.',
      icon: 'award',
    },
    {
      id: 'f-2',
      title: 'Trusted Partnerships',
      description: 'Building transparent, multi-decade collaboration networks across Saudi Arabia, Egypt, and Libya through clear financial parameters.',
      icon: 'handshake',
    },
    {
      id: 'f-3',
      title: 'Integrated Solutions',
      description: 'Unified operational blueprints providing architectural planning, structural MEP layouts, fit-outs, and long-term facility management.',
      icon: 'cpu',
    },
    {
      id: 'f-4',
      title: 'Proven Track Record',
      description: 'Successfully delivering tight deadlines under complex, dense metropolitan layouts and remote, hyper-sensitive ecological regions.',
      icon: 'shield',
    },
  ];
}
