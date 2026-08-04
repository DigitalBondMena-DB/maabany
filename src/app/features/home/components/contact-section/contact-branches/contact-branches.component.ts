import { Component, input, output, signal, computed } from '@angular/core';
import { HomeBranch } from '../../../models/home-api.model';

export type BranchCode = 'SA' | 'EG' | 'LY';

export interface RegionalBranchInfo {
  id: number;
  code: BranchCode;
  officeName: string;
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  hours: string;
  directionsUrl: string;
  flag: string;
  coordinates: { x: number; y: number };
}

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-branches',
  imports: [TranslatePipe],
  templateUrl: './contact-branches.component.html',
})
export class ContactBranchesComponent {
  readonly selectedBranch = input<BranchCode>('SA');
  readonly apiBranches = input<HomeBranch[]>();
  readonly selectBranch = output<BranchCode>();

  readonly hoveredBranch = signal<BranchCode | null>(null);

  readonly branches = computed<RegionalBranchInfo[]>(() => {
    const api = this.apiBranches();
    if (!api || api.length === 0) {
      return [];
    }

    return api.map((b) => {
      const countryUpper = (b.country || '').toUpperCase();
      let code: BranchCode = 'SA';
      let coordinates = { x: 260, y: 55 };

      if (countryUpper.includes('EGYPT') || countryUpper.includes('EG') || countryUpper.includes('مصر')) {
        code = 'EG';
        coordinates = { x: 160, y: 58 };
      } else if (countryUpper.includes('LIBYA') || countryUpper.includes('LY') || countryUpper.includes('ليبيا')) {
        code = 'LY';
        coordinates = { x: 60, y: 65 };
      } else if (countryUpper.includes('SAUDI') || countryUpper.includes('KSA') || countryUpper.includes('SA') || countryUpper.includes('السعودية')) {
        code = 'SA';
        coordinates = { x: 260, y: 55 };
      }

      return {
        id: b.id,
        code,
        officeName: b.country,
        address: b.address || '',
        phone: b.phone || '',
        phoneRaw: b.phone ? `tel:${b.phone.replace(/\s+/g, '')}` : '#',
        email: b.email || '',
        hours: b.working_hours || '',
        directionsUrl: b.map_url || '#',
        flag: code === 'SA' ? '🇸🇦' : code === 'EG' ? '🇪🇬' : '🇱🇾',
        coordinates,
      };
    });
  });

  readonly activeBranch = computed<RegionalBranchInfo | null>(() => {
    const list = this.branches();
    if (list.length === 0) return null;
    const sel = this.selectedBranch();
    return list.find((b) => b.code === sel) || list[0];
  });

  readonly hoveredBranchInfo = computed<RegionalBranchInfo | null>(() => {
    const code = this.hoveredBranch();
    if (!code) return null;
    return this.branches().find((b) => b.code === code) || null;
  });

  onSelect(code: BranchCode): void {
    this.selectBranch.emit(code);
  }

  onHover(code: BranchCode | null): void {
    this.hoveredBranch.set(code);
  }
}
