import { Component, computed, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconsComponent } from "../icons/icons.component";

export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'a[app-button], button[app-button], app-button',
  host: {
    '[class]': 'buttonClasses()',
    '[attr.type]': 'isNativeButton() ? type() : null',
    '[attr.href]': 'href() || null',
    '[attr.disabled]': 'disabled() ? true : null',
    '(click)': 'handleClick($event)',
  },
  templateUrl: './button.component.html',
  imports: [IconsComponent],
})
export class ButtonComponent {
  private readonly router = inject(Router, { optional: true });

  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly showArrow = input<boolean>(false);
  readonly href = input<string | undefined>(undefined);
  readonly routerLink = input<string | any[] | undefined>(undefined);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly label = input<string | undefined>(undefined);

  readonly btnClick = output<MouseEvent>();

  readonly isNativeButton = computed(() => !this.href() && !this.routerLink());

  readonly buttonClasses = computed(() => {
    const base = 'group inline-flex items-center justify-center gap-2 rounded-full font-mono font-bold uppercase transition-all duration-300 transform active:scale-95 shrink-0 whitespace-nowrap cursor-pointer select-none';

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-[#EA8A22] hover:bg-[#EA8A22]/90 text-white shadow-lg shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/30 hover:-translate-y-0.5',
      outline: 'border border-[#EA8A22] text-[#EA8A22] hover:bg-[#EA8A22] hover:text-white shadow-sm hover:shadow-lg shadow-[#EA8A22]/20',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-5 py-2.5 text-xs tracking-wider',
      md: 'px-7 py-3.5 text-xs tracking-widest',
      lg: 'px-8 py-4 text-sm tracking-widest',
    };

    const width = this.fullWidth() ? 'w-full' : '';
    const disabledState = this.disabled() ? 'opacity-50 pointer-events-none' : '';

    return `${base} ${variants[this.variant()]} ${sizes[this.size()]} ${width} ${disabledState} ${this.customClass()}`.trim();
  });

  handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.btnClick.emit(event);

    const link = this.routerLink();
    if (link && this.router) {
      event.preventDefault();
      if (Array.isArray(link)) {
        this.router.navigate(link);
      } else {
        this.router.navigateByUrl(link);
      }
    }
  }
}
