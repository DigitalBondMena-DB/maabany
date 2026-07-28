import { Component, input } from '@angular/core';

@Component({
  selector: 'app-right-content-watermark',
  imports: [],
  template: `
    <div class="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 rounded-3xl" aria-hidden="true">
      <!-- Watermark emblem pattern -->
      <div class="absolute -right-20 -bottom-20 w-[450px] h-[450px] opacity-[0.06] transform rotate-12">
        <svg viewBox="0 0 520 460" fill="none" class="w-full h-full text-slate-800">
          <circle cx="150" cy="150" r="90" stroke="currentColor" stroke-width="12" fill="none" />
          <path d="M172 82 L108 162 H152 L128 222 L192 142 H148 Z" fill="currentColor" />
          <circle cx="380" cy="180" r="72" stroke="currentColor" stroke-width="10" fill="none" />
          <path d="M380 128 C380 128 350 162 350 188 C350 205 363 218 380 218 C397 218 410 205 410 188 C410 162 380 128 380 128 Z" fill="currentColor" />
          <circle cx="180" cy="350" r="62" stroke="currentColor" stroke-width="9" fill="none" />
        </svg>
      </div>
    </div>
  `
})
export class RightContentWatermarkComponent {}
