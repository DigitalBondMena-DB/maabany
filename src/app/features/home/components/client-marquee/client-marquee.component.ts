import { Component, computed, input } from '@angular/core';

export interface MarqueeItem {
  name: string;
  text: string;
}

@Component({
  selector: 'app-client-marquee',
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
  readonly customPartners = input<MarqueeItem[]>();
  readonly customClients = input<MarqueeItem[]>();

  readonly defaultPartners: MarqueeItem[] = [
    { name: 'Ministry of Housing', text: 'MINISTRY OF HOUSING' },
    { name: 'Diriyah Gate Development', text: 'DIRIYAH GATE' },
    { name: 'Royal Commission for Riyadh', text: 'RCRC RIYADH' },
    { name: 'MODON Industrial Cities', text: 'MODON CITIES' },
    { name: 'KAFD Financial District', text: 'KAFD RIYADH' },
    { name: 'SABIC Industrial', text: 'SABIC CORP' },
  ];

  readonly defaultClients: MarqueeItem[] = [
    { name: 'ROSHN Development', text: 'ROSHN' },
    { name: 'Red Sea Global', text: 'RED SEA GLOBAL' },
    { name: 'NEOM Smart Cities', text: 'NEOM' },
    { name: 'Saudi Aramco', text: 'SAUDI ARAMCO' },
    { name: 'Emaar Properties', text: 'EMAAR' },
  ];

  // Base speed factor: seconds per item to guarantee equal linear speed (pixels/sec)
  private readonly SECONDS_PER_ITEM = 1.3;

  // Safe minimum item threshold to prevent empty space gaps on 4K / ultra-wide screens
  private readonly SAFE_MIN_ITEMS = 24;

  private createSafeMarqueeTrack(items: MarqueeItem[]): MarqueeItem[] {
    if (!items || items.length === 0) return [];
    const reps = Math.ceil(this.SAFE_MIN_ITEMS / items.length);
    const evenReps = reps % 2 === 0 ? reps : reps + 1;
    const result: MarqueeItem[] = [];
    for (let i = 0; i < evenReps; i++) {
      result.push(...items);
    }
    return result;
  }

  readonly partnersList = computed(() => this.customPartners() || this.defaultPartners);
  readonly clientsList = computed(() => this.customClients() || this.defaultClients);

  readonly repeatedPartners = computed(() => this.createSafeMarqueeTrack(this.partnersList()));
  readonly repeatedClients = computed(() => this.createSafeMarqueeTrack(this.clientsList()));

  // Dynamically computed durations ensuring identical linear speed
  readonly partnersDuration = computed(() => `${(this.repeatedPartners().length * this.SECONDS_PER_ITEM).toFixed(1)}s`);
  readonly clientsDuration = computed(() => `${(this.repeatedClients().length * this.SECONDS_PER_ITEM).toFixed(1)}s`);
}
