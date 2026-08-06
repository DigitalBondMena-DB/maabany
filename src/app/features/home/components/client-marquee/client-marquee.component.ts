import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { HomePartner, HomeClient } from '../../models/home-api.model';
import { isPlatformServer } from '@angular/common';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';

export interface MarqueeItem {
  name: string;
  text: string;
  logo?: string;
}

@Component({
  selector: 'app-client-marquee',
  imports: [TranslatePipe, ImageComponent, ScrollRevealDirective],
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
  readonly sliderPadding = input<string>('py-4');
  readonly sectionPadding = input<string>('py-12 md:py-20 lg:py-24');
  readonly title = input<string>('Our Partners & Clients');
  readonly subtitle = input<string>('AUTHORIZED ALLIANCES & TRUSTED RELATIONSHIPS');
  readonly headerClass = input<string>('text-center max-w-3xl mx-auto mb-16 space-y-2');
  readonly titleClass = input<string>('text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight');
  readonly subtitleClass = input<string>('text-[#142b52] font-mono text-xs uppercase font-bold tracking-widest block');

  readonly customPartners = input<MarqueeItem[]>();
  readonly customClients = input<MarqueeItem[]>();
  readonly apiPartners = input<HomePartner[]>();
  readonly apiClients = input<HomeClient[]>();
  readonly revealDirection = input<ScrollDirection>('bottom');
  readonly revealDelay = input<number>(0);


  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = isPlatformServer(this.platformId);

  readonly repeatedPartners = computed(() => {
    const list = (this.apiPartners()?.length ? this.apiPartners() : this.customPartners()) || [];
    if (list.length === 0) return [];
    if (this.isServer) return list;

    let copiesNeeded = Math.max(6, Math.ceil(40 / list.length));
    if (copiesNeeded % 2 !== 0) {
      copiesNeeded++;
    }

    const result = [];
    for (let i = 0; i < copiesNeeded; i++) {
      result.push(...list);
    }
    return result;
  });

  readonly repeatedClients = computed(() => {
    const list = (this.apiClients()?.length ? this.apiClients() : this.customClients()) || [];
    if (list.length === 0) return [];
    if (this.isServer) return list;

    let copiesNeeded = Math.max(6, Math.ceil(40 / list.length));
    if (copiesNeeded % 2 !== 0) {
      copiesNeeded++;
    }

    const result = [];
    for (let i = 0; i < copiesNeeded; i++) {
      result.push(...list);
    }
    return result;
  });

  readonly partnersDuration = computed(() => `${this.repeatedPartners().length * 2}s`);
  readonly clientsDuration = computed(() => `${this.repeatedClients().length * 2}s`);
}
