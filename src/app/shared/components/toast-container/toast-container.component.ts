import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
