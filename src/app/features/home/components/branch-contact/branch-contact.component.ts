import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeDataService } from '../../services/home-data.service';

import { ContactFormComponent } from '../contact-section/contact-form/contact-form.component';

@Component({
  selector: 'app-branch-contact',
  imports: [FormsModule, ContactFormComponent],
  templateUrl: './branch-contact.component.html'
})
export class BranchContactComponent {
  readonly dataService = inject(HomeDataService);

  readonly selectedBranchCode = signal<'EG' | 'SA' | 'LY'>('SA');
  readonly contactName = signal<string>('');
  readonly contactPhone = signal<string>('');
  readonly contactPhoneCountry = signal<string>('+966');
  readonly isSubmitting = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);

  readonly activeBranch = computed(() => {
    const branches = this.dataService.branches();
    return branches.find(b => b.code === this.selectedBranchCode()) || branches[0];
  });

  selectBranch(code: 'EG' | 'SA' | 'LY'): void {
    this.selectedBranchCode.set(code);
    if (code === 'SA') this.contactPhoneCountry.set('+966');
    else if (code === 'EG') this.contactPhoneCountry.set('+20');
    else if (code === 'LY') this.contactPhoneCountry.set('+218');
  }

  submitForm(event: Event): void {
    event.preventDefault();
    if (!this.contactName() || !this.contactPhone()) return;

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.contactName.set('');
      this.contactPhone.set('');
      setTimeout(() => this.isSuccess.set(false), 4000);
    }, 1200);
  }
}
