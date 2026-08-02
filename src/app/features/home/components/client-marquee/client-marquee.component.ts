import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageComponent } from "../../../../shared/components/image/image.component";

export interface MarqueeItem {
  name: string;
  text: string;
}

@Component({
  selector: 'app-client-marquee',
  imports: [TranslatePipe, ImageComponent],
  templateUrl: './client-marquee.component.html',
  styles: [`
    @keyframes marquee-left {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    @keyframes marquee-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }

    .animate-marquee-left {
      display: flex;
      width: max-content;
      animation: marquee-left 30s linear infinite;
    }

    .animate-marquee-right {
      display: flex;
      width: max-content;
      animation: marquee-right 30s linear infinite;
    }

    .animate-marquee-left:hover,
    .animate-marquee-right:hover {
      animation-play-state: paused;
    }
  `]
})
export class ClientMarqueeComponent {
  readonly showHeading = input<boolean>(true);
  readonly showPartners = input<boolean>(true);
  readonly showClients = input<boolean>(true);
  readonly sliderPadding = input<string>('py-4');
  readonly sectionPadding = input<string>('py-12 md:py-20 lg:py-24');
  readonly title = input<string>('Our Partners & Clients');
  readonly subtitle = input<string>('AUTHORIZED ALLIANCES & TRUSTED RELATIONSHIPS');
  readonly headerClass = input<string>('text-center max-w-3xl mx-auto mb-16 space-y-2');
  readonly titleClass = input<string>('text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight');
  readonly subtitleClass = input<string>('text-[#142b52] font-mono text-xs uppercase font-bold tracking-widest block');

  readonly customPartners = input<MarqueeItem[]>();
  readonly customClients = input<MarqueeItem[]>();

  readonly defaultPartners: MarqueeItem[] = [
    { name: 'Ministry of Housing', text: 'MINISTRY OF HOUSING' },
    { name: 'Diriyah Gate Development', text: 'DIRIYAH GATE' },
    { name: 'Royal Commission for Riyadh', text: 'RCRC RIYADH' },
    { name: 'MODON Industrial Cities', text: 'MODON CITIES' },
    { name: 'KAFD Financial District', text: 'KAFD RIYADH' },
  ];

  readonly defaultClients: MarqueeItem[] = [
    { name: 'Aramco', text: 'ARAMCO' },
    { name: 'NEOM', text: 'NEOM' },
    { name: 'Red Sea Global', text: 'RED SEA GLOBAL' },
    { name: 'Qiddiya', text: 'QIDDIYA' },
    { name: 'ROSHN', text: 'ROSHN' },
  ];

  readonly partners = computed(() => this.customPartners() || this.defaultPartners);
  readonly clients = computed(() => this.customClients() || this.defaultClients);

  readonly repeatedPartners = computed(() => {
    const list = this.partners();
    return [...list, ...list, ...list, ...list, ...list, ...list];
  });

  readonly repeatedClients = computed(() => {
    const list = this.clients();
    return [...list, ...list, ...list, ...list, ...list, ...list];
  });

  readonly partnersDuration = computed(() => `${this.partners().length * 6}s`);
  readonly clientsDuration = computed(() => `${this.clients().length * 6}s`);
}
