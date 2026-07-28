import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-modal',
  imports: [FormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl">
        <!-- Close Button -->
        <button (click)="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-2">
          ✕
        </button>

        <h3 class="text-2xl font-black mb-2 text-white">Request a Structural Quote</h3>
        <p class="text-slate-400 text-xs mb-6">Submit your project details to our Senior Engineering Committee.</p>

        @if (isSubmitted()) {
          <div class="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-bold mb-6">
            ✓ Quote request submitted! Our engineers will review your inquiry within 24 hours.
          </div>
        } @else {
          <form (submit)="onSubmit($event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                [value]="name()"
                (input)="name.set($any($event.target).value)"
                placeholder="Eng. Mohammed Al-Otaibi"
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                [value]="email()"
                (input)="email.set($any($event.target).value)"
                placeholder="m.otaibi@company.com"
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-400 mb-1">Project Scope & Location</label>
              <textarea
                rows="3"
                [value]="details()"
                (input)="details.set($any($event.target).value)"
                placeholder="High-rise commercial tower, Riyadh Olaya district..."
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              @if (isSubmitting()) {
                <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting Inquiry...
              } @else {
                Submit Quote Request →
              }
            </button>
          </form>
        }
      </div>
    </div>
  `
})
export class QuoteModalComponent {
  readonly close = output<void>();

  readonly name = signal<string>('');
  readonly email = signal<string>('');
  readonly details = signal<string>('');
  readonly isSubmitting = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (!this.name() || !this.email()) return;

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      setTimeout(() => {
        this.closeModal();
      }, 1800);
    }, 1200);
  }
}
