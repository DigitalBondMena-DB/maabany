import { Service, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ToastMessage {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Service()
export class ToastService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly toasts = signal<ToastMessage[]>([]);

  show(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'info', duration: number = 5000): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastMessage = { id, type, message, duration };

    this.toasts.update((current) => [...current, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  success(message: string, duration: number = 4000): void {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration: number = 4500): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration: number = 4000): void {
    this.show(message, 'info', duration);
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}

