import { Component, input, output, signal, computed } from '@angular/core';
import { HomeBranch } from '../../../models/home-api.model';

export type BranchCode = 'SA' | 'EG' | 'LY';

export interface RegionalBranchInfo {
  code: BranchCode;
  officeName: string;
  address: string;
  phone: string;
  phoneRaw: string;
  hours: string;
  directionsUrl: string;
  flag: string;
  coordinates: { x: number; y: number };
}

@Component({
  selector: 'app-contact-branches',
  imports: [],
  templateUrl: './contact-branches.component.html',
})
export class ContactBranchesComponent {
  readonly selectedBranch = input<BranchCode>('SA');
  readonly apiBranches = input<HomeBranch[]>();
  readonly selectBranch = output<BranchCode>();

  readonly hoveredBranch = signal<BranchCode | null>(null);

  readonly defaultBranches: RegionalBranchInfo[] = [
    {
      code: 'SA',
      officeName: 'Riyadh Headquarters',
      address: 'Tower B, 18th Floor, King Fahd Road, Al Olaya, Riyadh, KSA',
      phone: '+966 11 456 7890',
      phoneRaw: 'tel:+966114567890',
      hours: 'Sunday – Thursday: 08:00 AM – 05:00 PM (GMT +3)',
      directionsUrl: 'https://maps.google.com/?q=Tower+B,+18th+Floor,+King+Fahd+Road,+Al+Olaya,+Riyadh,+KSA',
      flag: '🇸🇦',
      coordinates: { x: 260, y: 55 },
    },
    {
      code: 'EG',
      officeName: 'Cairo Regional Branch',
      address: 'Plot 12, Sector 1, Fifth Settlement, New Cairo, Egypt',
      phone: '+20 2 2345 6789',
      phoneRaw: 'tel:+20223456789',
      hours: 'Sunday – Thursday: 08:30 AM – 05:30 PM (GMT +2)',
      directionsUrl: 'https://maps.google.com/?q=Plot+12,+Sector+1,+Fifth+Settlement,+New+Cairo,+Egypt',
      flag: '🇪🇬',
      coordinates: { x: 160, y: 58 },
    },
    {
      code: 'LY',
      officeName: 'Tripoli Regional Branch',
      address: 'Al Andalus District, Gargarish Road, Tripoli, Libya',
      phone: '+218 21 360 1234',
      phoneRaw: 'tel:+218213601234',
      hours: 'Sunday – Thursday: 08:00 AM – 04:30 PM (GMT +2)',
      directionsUrl: 'https://maps.google.com/?q=Al+Andalus+District,+Gargarish+Road,+Tripoli,+Libya',
      flag: '🇱🇾',
      coordinates: { x: 60, y: 65 },
    },
  ];

  readonly activeBranch = computed(() => {
    const api = this.apiBranches();
    const sel = this.selectedBranch();
    if (api && api.length > 0) {
      // Find matching branch by country
      const matched = api.find(b => {
        if (sel === 'SA' && b.country.toUpperCase().includes('SAUDI')) return true;
        if (sel === 'EG' && b.country.toUpperCase().includes('EGYPT')) return true;
        if (sel === 'LY' && b.country.toUpperCase().includes('LIBYA')) return true;
        return false;
      }) || api[0];

      if (matched && matched.address) {
        return {
          code: sel,
          officeName: matched.country,
          address: matched.address,
          phone: matched.phone || '',
          phoneRaw: matched.phone ? `tel:${matched.phone.replace(/\s+/g, '')}` : '#',
          hours: matched.working_hours || '',
          directionsUrl: matched.map_url || '#',
          flag: sel === 'SA' ? '🇸🇦' : sel === 'EG' ? '🇪🇬' : '🇱🇾',
          coordinates: sel === 'SA' ? { x: 260, y: 55 } : sel === 'EG' ? { x: 160, y: 58 } : { x: 60, y: 65 },
        };
      }
    }
    return this.defaultBranches.find((b) => b.code === sel) || this.defaultBranches[0];
  });

  onSelect(code: BranchCode): void {
    this.selectBranch.emit(code);
  }

  onHover(code: BranchCode | null): void {
    this.hoveredBranch.set(code);
  }
}
