import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TelInputComponent } from '../../../home/components/contact-section/tel-input/tel-input.component';
import { LanguageService } from '../../../../core/services/language.service';
import { SubmissionService } from '../../../../core/services/submission.service';

import { ContactFormComponent } from '../../../home/components/contact-section/contact-form/contact-form.component';

@Component({
  selector: 'app-quote-form-section',
  imports: [
    FormsModule,
    TranslatePipe,
    ContactFormComponent,
  ],
  templateUrl: './quote-form-section.component.html',
})
export class QuoteFormSectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly submissionService = inject(SubmissionService);

  readonly currentLang = this.languageService.currentLang;

  // Form Signals & Real-time Validation State
  readonly phoneCountryCode = signal<string>('+966');
  readonly formData = signal({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  readonly formSubmitted = signal<boolean>(false);

  readonly nameTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);

  readonly isNameValid = computed(() => this.formData().fullName.trim().length >= 3);
  readonly isPhoneValid = computed(() => {
    const cleanPhone = this.formData().phone.replace(/\D/g, '');
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  });
  readonly isEmailValid = computed(() => /\S+@\S+\.\S+/.test(this.formData().email.trim()));

  readonly errors = computed(() => {
    const data = this.formData();
    const errs = { fullName: '', phone: '', email: '' };

    if (this.nameTouched() || this.formSubmitted()) {
      if (!data.fullName.trim()) {
        errs.fullName = 'Full Name is required';
      } else if (data.fullName.trim().length < 3) {
        errs.fullName = 'Full Name must be at least 3 characters';
      }
    }

    if (this.phoneTouched() || this.formSubmitted()) {
      const cleanPhone = data.phone.replace(/\D/g, '');
      if (!cleanPhone) {
        errs.phone = 'Phone Number is required';
      } else if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        errs.phone = 'Please enter a valid phone number';
      }
    }

    if (this.emailTouched() || this.formSubmitted()) {
      if (!data.email.trim()) {
        errs.email = 'Email Address is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    return errs;
  });

  updateField(field: 'fullName' | 'email' | 'phone' | 'message', value: string): void {
    this.formData.update(prev => ({ ...prev, [field]: value }));
    if (field === 'fullName') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
  }

  onBlurField(field: 'fullName' | 'phone' | 'email'): void {
    if (field === 'fullName') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
  }

  onSubmitForm(event: Event): void {
    event.preventDefault();
    this.formSubmitted.set(true);
    this.nameTouched.set(true);
    this.phoneTouched.set(true);
    this.emailTouched.set(true);

    const errs = this.errors();
    if (!errs.fullName && !errs.phone && !errs.email) {
      this.submissionService.markSubmitted();
      this.router.navigate(['/', this.currentLang(), 'thank-you']);
    }
  }
}
