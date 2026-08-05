import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly toastService = inject(ToastService);

  handleError(error: unknown): void {
    // Log full error to console for debugging
    console.error('Unhandled Application Error:', error);

    // Ignore HttpErrorResponse as HTTP errors are handled via interceptors
    if (error instanceof HttpErrorResponse) {
      return;
    }

    // Extract message if present
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

    // Show toast for uncaught runtime errors if critical
    // Avoid spamming user for minor non-breaking background errors
    if (message.includes('ExpressionChangedAfterItHasBeenCheckedError')) {
      return;
    }
  }
}
