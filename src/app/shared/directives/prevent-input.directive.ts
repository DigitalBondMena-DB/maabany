import { Directive, input } from '@angular/core';

export type PreventType = 'numbers' | 'number' | 'letters' | 'text';

@Directive({
  selector: '[preventInput]',
  host: {
    '(keydown)': 'onKeyDown($event)',
    '(beforeinput)': 'onBeforeInput($event)',
    '(paste)': 'onPaste($event)',
  },
})
export class PreventInputDirective {
  /**
   * Type of input to prevent:
   * - 'numbers' | 'number': Prevents typing numbers (0-9).
   * - 'letters' | 'text': Prevents typing letters (Arabic & English).
   */
  readonly preventType = input<PreventType>('numbers');
  readonly preventInput = input<PreventType>();

  private get activePreventType(): PreventType {
    return this.preventInput() || this.preventType() || 'numbers';
  }

  onKeyDown(event: KeyboardEvent): void {
    // Allow control and navigation keys
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Tab' ||
      event.key === 'Escape' ||
      event.key === 'Enter' ||
      event.key.startsWith('Arrow') ||
      event.key === 'Home' ||
      event.key === 'End' ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    if (event.key.length === 1) {
      const type = this.activePreventType;
      if ((type === 'numbers' || type === 'number') && /\d/.test(event.key)) {
        event.preventDefault();
      } else if (
        (type === 'letters' || type === 'text') &&
        /[a-zA-Z\u0600-\u06FF]/.test(event.key)
      ) {
        event.preventDefault();
      }
    }
  }

  onBeforeInput(event: InputEvent): void {
    if (!event.data) return;

    const type = this.activePreventType;
    if ((type === 'numbers' || type === 'number') && /\d/.test(event.data)) {
      event.preventDefault();
    } else if (
      (type === 'letters' || type === 'text') &&
      /[a-zA-Z\u0600-\u06FF]/.test(event.data)
    ) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text');
    if (!pastedText) return;

    const type = this.activePreventType;
    if ((type === 'numbers' || type === 'number') && /\d/.test(pastedText)) {
      event.preventDefault();
    } else if (
      (type === 'letters' || type === 'text') &&
      /[a-zA-Z\u0600-\u06FF]/.test(pastedText)
    ) {
      event.preventDefault();
    }
  }
}
