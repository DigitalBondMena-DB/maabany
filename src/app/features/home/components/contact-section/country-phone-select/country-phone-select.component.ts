import { Component, input, output, signal, computed, ElementRef, HostListener, inject } from '@angular/core';

export interface CountryCodeItem {
  code: string;
  country: string;
  flag: string;
  name: string;
}

@Component({
  selector: 'app-country-phone-select',
  imports: [],
  template: `
    <div class="relative w-full">
      <!-- Trigger Button -->
      <button
        type="button"
        (click)="toggleOpen()"
        class="flex items-center gap-2 pl-3.5 pr-2 py-3.5 bg-transparent border-none text-xs font-mono text-neutral-800 font-bold focus:outline-none cursor-pointer select-none"
        [attr.aria-expanded]="isOpen()"
        aria-label="Select country phone code">
        <span class="text-base leading-none">{{ selectedCountry().flag }}</span>
        <span>{{ selectedCountry().code }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-neutral-400 transition-transform" [class.rotate-180]="isOpen()">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <!-- Dropdown Popup -->
      @if (isOpen()) {
        <div
          class="absolute top-full left-0 mt-2 w-64 bg-white border border-neutral-200/90 rounded-2xl shadow-xl z-50 overflow-hidden animate-fadeIn py-2">
          <!-- Search Input -->
          <div class="px-3 pb-2 border-b border-neutral-100">
            <input
              type="text"
              placeholder="Search country or code..."
              [value]="searchQuery()"
              (input)="updateSearch($event)"
              class="w-full bg-neutral-50 border border-neutral-200/80 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-[#EA8A22]"
            />
          </div>

          <!-- Country List -->
          <div class="max-h-52 overflow-y-auto py-1">
            @for (item of filteredCountries(); track item.code + item.country) {
              <button
                type="button"
                (click)="selectCountry(item)"
                [class]="'w-full flex items-center justify-between px-3.5 py-2 text-xs font-mono transition-colors text-left cursor-pointer ' + (item.code === value() ? 'bg-orange-50 text-[#EA8A22] font-bold' : 'hover:bg-neutral-50 text-neutral-700')"
              >
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ item.flag }}</span>
                  <span class="truncate max-w-[120px]">{{ item.name }}</span>
                </div>
                <span class="font-bold text-neutral-500">{{ item.code }}</span>
              </button>
            } @empty {
              <div class="px-3.5 py-3 text-xs text-neutral-400 text-center font-mono">
                No countries found
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class CountryPhoneSelectComponent {
  private readonly elementRef = inject(ElementRef);

  readonly value = input<string>('+966');
  readonly valueChange = output<string>();

  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  readonly countries: CountryCodeItem[] = [
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
    { code: '+218', country: 'LY', flag: '🇱🇾', name: 'Libya' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
    { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  ];

  readonly selectedCountry = computed(() => {
    return this.countries.find((c) => c.code === this.value()) || this.countries[0];
  });

  readonly filteredCountries = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.countries;
    return this.countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );
  });

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.searchQuery.set('');
    }
  }

  selectCountry(item: CountryCodeItem): void {
    this.valueChange.emit(item.code);
    this.isOpen.set(false);
    this.searchQuery.set('');
  }

  updateSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpen.set(false);
  }
}
