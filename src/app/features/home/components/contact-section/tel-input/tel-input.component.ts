import { Component, input, output, signal, computed, ElementRef, HostListener, inject } from '@angular/core';
import { WORLD_COUNTRIES, WorldCountry } from './countries.data';

@Component({
  selector: 'app-tel-input',
  imports: [],
  template: `
    <div
      [class]="containerClasses() ? containerClasses() : ('relative flex items-center bg-neutral-50/50 border rounded-xl transition-all w-full focus-within:ring-2 ' +
        (isTouched() && hasError()
          ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15 bg-red-50/10'
          : isTouched() && isValid()
          ? 'border-emerald-500/80 focus-within:border-emerald-500 focus-within:ring-emerald-500/15 bg-emerald-50/10'
          : 'border-neutral-200/80 focus-within:border-primary focus-within:bg-white focus-within:ring-primary/15'))"
    >
      <!-- Country Selector Button -->
      <div class="relative border-r border-neutral-200 select-none shrink-0">
        <button
          type="button"
          (click)="toggleDropdown()"
          class="flex items-center gap-2 px-3 py-3.5 bg-transparent border-none text-xs font-mono text-neutral-800 font-bold focus:outline-none cursor-pointer"
          [attr.aria-expanded]="isDropdownOpen()"
          aria-label="Select country phone prefix"
        >
          <img
            [src]="'https://flagcdn.com/w40/' + currentCountry().country.toLowerCase() + '.png'"
            [alt]="currentCountry().name"
            class="w-5 h-3.5 object-cover rounded-2xs border border-neutral-200/80 shrink-0 shadow-2xs"
            loading="lazy"
          />
          <span>{{ currentCountry().code }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-neutral-400 transition-transform" [class.rotate-180]="isDropdownOpen()">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        <!-- Dropdown Popup -->
        @if (isDropdownOpen()) {
          <div
            class="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-200/90 rounded-2xl shadow-xl z-50 overflow-hidden animate-fadeIn py-2"
          >
            <!-- Search Bar -->
            <div class="px-3 pb-2 border-b border-neutral-100">
              <input
                type="text"
                placeholder="Search country, name or code (مثال: مصر / +966)..."
                [value]="searchQuery()"
                (input)="updateSearch($event)"
                class="w-full bg-neutral-50 border border-neutral-200/80 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-primary"
              />
            </div>

            <!-- Country List -->
            <div class="max-h-60 overflow-y-auto py-1">
              @for (item of filteredCountries(); track item.code + item.country) {
                <button
                  type="button"
                  (click)="selectCountry(item)"
                  [class]="'w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono transition-colors text-left cursor-pointer ' + (item.code === countryCode() && item.country === currentCountry().country ? 'bg-orange-50 text-primary font-bold' : 'hover:bg-neutral-50 text-neutral-700')"
                >
                  <div class="flex items-center gap-2.5 truncate max-w-[190px]">
                    <img
                      [src]="'https://flagcdn.com/w40/' + item.country.toLowerCase() + '.png'"
                      [alt]="item.name"
                      class="w-5 h-3.5 object-cover rounded-2xs border border-neutral-200/80 shrink-0 shadow-2xs"
                      loading="lazy"
                    />
                    <div class="flex flex-col truncate">
                      <span class="truncate font-semibold">{{ item.name }}</span>
                      <span class="text-[10px] text-neutral-400 truncate">{{ item.nameAr }}</span>
                    </div>
                  </div>
                  <span class="font-bold text-neutral-500 shrink-0">{{ item.code }}</span>
                </button>
              } @empty {
                <div class="px-3.5 py-4 text-xs text-neutral-400 text-center font-mono">
                  No country found matching search
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Phone Number Input -->
      <input
        type="tel"
        [placeholder]="currentCountry().placeholder"
        [value]="phoneValue()"
        (input)="onPhoneInput($event)"
        (blur)="onBlur()"
        class="flex-1 bg-transparent text-left rtl:text-right p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none font-mono"
      />

      <!-- Realtime Validation Indicator Icon -->
      <div class="pr-3.5 flex items-center pointer-events-none">
        @if (isTouched() && isValid()) {
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
        } @else if (isTouched() && hasError()) {
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        }
      </div>
    </div>
  `
})
export class TelInputComponent {
  private readonly elementRef = inject(ElementRef);

  readonly containerClasses = input<string>('');
  readonly phoneValue = input<string>('');
  readonly countryCode = input<string>('+966');
  readonly hasError = input<boolean>(false);
  readonly isValid = input<boolean>(false);
  readonly isTouched = input<boolean>(false);

  readonly phoneValueChange = output<string>();
  readonly countryCodeChange = output<string>();
  readonly blur = output<void>();

  readonly isDropdownOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  readonly countries = WORLD_COUNTRIES;

  readonly currentCountry = computed(() => {
    const matched = this.countries.find((c) => c.code === this.countryCode());
    return matched || this.countries[0];
  });

  readonly filteredCountries = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.countries;
    return this.countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameAr.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  });

  toggleDropdown(): void {
    this.isDropdownOpen.update((v) => !v);
    if (!this.isDropdownOpen()) {
      this.searchQuery.set('');
    }
  }

  selectCountry(item: WorldCountry): void {
    this.countryCodeChange.emit(item.code);
    this.isDropdownOpen.set(false);
    this.searchQuery.set('');
  }

  updateSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '');
    this.phoneValueChange.emit(digitsOnly);
  }

  onBlur(): void {
    this.blur.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isDropdownOpen.set(false);
  }
}
