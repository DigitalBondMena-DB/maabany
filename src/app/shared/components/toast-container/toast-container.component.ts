import { Component, inject } from '@angular/core';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <aside 
      class="fixed top-5 end-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none p-4"
      aria-label="Notifications"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          class="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0"
          [class.bg-red-950/90]="toast.type === 'error'"
          [class.border-red-500/40]="toast.type === 'error'"
          [class.text-red-100]="toast.type === 'error'"
          [class.bg-emerald-950/90]="toast.type === 'success'"
          [class.border-emerald-500/40]="toast.type === 'success'"
          [class.text-emerald-100]="toast.type === 'success'"
          [class.bg-amber-950/90]="toast.type === 'warning'"
          [class.border-amber-500/40]="toast.type === 'warning'"
          [class.text-amber-100]="toast.type === 'warning'"
          [class.bg-slate-900/95]="toast.type === 'info'"
          [class.border-slate-700]="toast.type === 'info'"
          [class.text-slate-100]="toast.type === 'info'"
        >
          <div class="flex items-start gap-3 me-2">
            @switch (toast.type) {
              @case ('error') {
                <svg class="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('success') {
                <svg class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('warning') {
                <svg class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              @default {
                <svg class="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            }
            <p class="text-sm font-medium leading-relaxed">{{ toast.message }}</p>
          </div>
          <button
            type="button"
            class="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20"
            (click)="dismiss(toast.id)"
            aria-label="Dismiss notification"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </aside>
  `,
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
