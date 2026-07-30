import { Component, input, output, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, schema, required, minLength, email } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { TelInputComponent } from '../tel-input/tel-input.component';
import { BranchCode } from '../contact-branches/contact-branches.component';

export interface ContactFormData {
  name: string;
  email: string;
  phoneCountry: string;
  phone: string;
  projectType: string;
  message: string;
  privacyAgreed: boolean;
}

export function validateInternationalPhone(countryCode: string, phoneValue: string): string | null {
  const digits = phoneValue.replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';

  if (digits.length < 7 || digits.length > 15) {
    return 'Phone number must be between 7 and 15 digits.';
  }

  if (countryCode === '+966') {
    if (digits.length !== 9) return 'Saudi phone number must be 9 digits (e.g. 50 123 4567).';
    if (!digits.startsWith('5')) return 'Saudi mobile number must start with 5.';
  } else if (countryCode === '+20') {
    if (digits.length !== 10) return 'Egyptian phone number must be 10 digits (e.g. 10 1234 5678).';
    if (!digits.startsWith('1')) return 'Egyptian mobile number must start with 1.';
  } else if (countryCode === '+218') {
    if (digits.length !== 9 && digits.length !== 8) return 'Libyan phone number must be 8-9 digits.';
  } else if (countryCode === '+971') {
    if (digits.length !== 9) return 'UAE phone number must be 9 digits (e.g. 50 123 4567).';
    if (!digits.startsWith('5')) return 'UAE mobile number must start with 5.';
  } else if (countryCode === '+974') {
    if (digits.length !== 8) return 'Qatar phone number must be 8 digits.';
  } else if (countryCode === '+965') {
    if (digits.length !== 8) return 'Kuwait phone number must be 8 digits.';
  } else if (countryCode === '+973') {
    if (digits.length !== 8) return 'Bahrain phone number must be 8 digits.';
  } else if (countryCode === '+968') {
    if (digits.length !== 8) return 'Oman phone number must be 8 digits.';
  } else if (countryCode === '+962') {
    if (digits.length !== 9) return 'Jordanian phone number must be 9 digits.';
    if (!digits.startsWith('7')) return 'Jordanian mobile number must start with 7.';
  } else if (countryCode === '+961') {
    if (digits.length < 7 || digits.length > 8) return 'Lebanese phone number must be 7-8 digits.';
  } else if (countryCode === '+964') {
    if (digits.length !== 10) return 'Iraqi phone number must be 10 digits.';
    if (!digits.startsWith('7')) return 'Iraqi mobile number must start with 7.';
  } else if (countryCode === '+1') {
    if (digits.length !== 10) return 'US/Canada phone number must be 10 digits.';
  } else if (countryCode === '+44') {
    if (digits.length < 10 || digits.length > 11) return 'UK phone number must be 10-11 digits.';
  } else if (countryCode === '+90') {
    if (digits.length !== 10) return 'Turkish phone number must be 10 digits.';
    if (!digits.startsWith('5')) return 'Turkish mobile number must start with 5.';
  }

  return null;
}

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, TelInputComponent, TranslatePipe],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  readonly selectedBranch = input<BranchCode>('SA');
  readonly selectBranch = output<BranchCode>();

  // Configurable inputs for reuse across Home and Solution Details
  readonly showProjectType = input<boolean>(true);
  readonly presetProjectType = input<string>('');
  readonly formTitle = input<string>('');
  readonly formSubtitle = input<string>('');
  readonly cardClasses = input<string>('');

  readonly formData = signal<ContactFormData>({
    name: '',
    email: '',
    phoneCountry: '+966',
    phone: '',
    projectType: 'Commercial Buildings & Offices',
    message: '',
    privacyAgreed: false
  });

  readonly contactForm = form(
    this.formData,
    schema<ContactFormData>((s) => {
      required(s.name);
      minLength(s.name, 2);
      required(s.email);
      email(s.email);
      required(s.phone);
      required(s.message);
      minLength(s.message, 10);
      required(s.privacyAgreed);
    })
  );

  readonly name = signal<string>('');
  readonly email = signal<string>('');
  readonly phoneCountry = signal<string>('+966');
  readonly phone = signal<string>('');
  readonly projectType = signal<string>('Commercial Buildings & Offices');
  readonly message = signal<string>('');
  readonly privacyAgreed = signal<boolean>(false);

  readonly nameTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly messageTouched = signal<boolean>(false);
  readonly privacyTouched = signal<boolean>(false);

  readonly isSubmitted = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);

  readonly projectTypes: string[] = [
    'Commercial Buildings & Offices',
    'Infrastructure & Roads',
    'Industrial & Warehouses',
    'Residential & Housing',
  ];

  constructor() {
    effect(() => {
      const branch = this.selectedBranch();
      if (branch === 'SA') this.phoneCountry.set('+966');
      else if (branch === 'EG') this.phoneCountry.set('+20');
      else if (branch === 'LY') this.phoneCountry.set('+218');
    });

    effect(() => {
      const preset = this.presetProjectType();
      if (preset) {
        this.projectType.set(preset);
      }
    });
  }

  onPhoneCountryChange(countryCode: string): void {
    this.phoneCountry.set(countryCode);
    if (countryCode === '+966') this.selectBranch.emit('SA');
    else if (countryCode === '+20') this.selectBranch.emit('EG');
    else if (countryCode === '+218') this.selectBranch.emit('LY');
  }

  onNameInput(val: string): void {
    this.name.set(val);
    this.nameTouched.set(true);
  }

  onEmailInput(val: string): void {
    this.email.set(val);
    this.emailTouched.set(true);
  }

  onPhoneInput(val: string): void {
    this.phone.set(val);
    this.phoneTouched.set(true);
  }

  onMessageInput(val: string): void {
    this.message.set(val);
    this.messageTouched.set(true);
  }

  onPrivacyChange(checked: boolean): void {
    this.privacyAgreed.set(checked);
    this.privacyTouched.set(true);
  }

  readonly nameError = computed(() => {
    const val = this.name().trim();
    if (!val) return 'Name is required.';
    if (val.length < 2) return 'Name must be at least 2 characters.';
    return null;
  });

  readonly emailError = computed(() => {
    const val = this.email().trim();
    if (!val) return 'Email address is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) return 'Please enter a valid email address.';
    return null;
  });

  readonly phoneError = computed(() => {
    return validateInternationalPhone(this.phoneCountry(), this.phone());
  });

  readonly projectTypeError = computed(() => {
    if (!this.showProjectType()) return null;
    if (!this.projectType()) return 'Please select a project type.';
    return null;
  });

  readonly messageError = computed(() => {
    const val = this.message().trim();
    if (!val) return 'Message detail is required.';
    if (val.length < 10) return 'Message must be at least 10 characters.';
    return null;
  });

  readonly privacyError = computed(() => {
    if (!this.privacyAgreed()) return 'You must agree to the privacy policy.';
    return null;
  });

  readonly isFormValid = computed(() => {
    return (
      !this.nameError() &&
      !this.emailError() &&
      !this.phoneError() &&
      !this.projectTypeError() &&
      !this.messageError() &&
      !this.privacyError()
    );
  });

  submitForm(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.phoneTouched.set(true);
    this.messageTouched.set(true);
    this.privacyTouched.set(true);

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);

      this.name.set('');
      this.email.set('');
      this.phone.set('');
      this.message.set('');
      this.privacyAgreed.set(false);

      this.nameTouched.set(false);
      this.emailTouched.set(false);
      this.phoneTouched.set(false);
      this.messageTouched.set(false);
      this.privacyTouched.set(false);
      this.isSubmitted.set(false);

      setTimeout(() => this.isSuccess.set(false), 5000);
    }, 1200);
  }
}
