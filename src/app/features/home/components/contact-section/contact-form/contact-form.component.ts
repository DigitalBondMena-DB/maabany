import { Component, input, output, signal, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { form, FormField, required, email, minLength, validate } from '@angular/forms/signals';
import { TelInputComponent } from '../tel-input/tel-input.component';
import { BranchCode } from '../contact-branches/contact-branches.component';
import { LanguageService } from '../../../../../core/services/language.service';
import { SubmissionService } from '../../../../../core/services/submission.service';
import { SolutionsService } from '../../../../solutions/services/solutions.service';
import { PreventInputDirective } from '../../../../../shared/directives/prevent-input.directive';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { environment } from '../../../../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  solutionType: string;
  message: string;
}

export interface SolutionTypeOption {
  title: string;
  slug: string;
}

export function validateInternationalPhone(countryCode: string, phoneValue: string): string | null {
  const digits = phoneValue.replace(/\D/g, '');
  if (!digits) return 'VALIDATION.PHONE_REQUIRED';

  if (digits.length < 7 || digits.length > 15) {
    return 'VALIDATION.PHONE_INVALID_LENGTH';
  }

  if (countryCode === '+966') {
    if (digits.length !== 9) return 'VALIDATION.PHONE_SA_DIGITS';
    if (!digits.startsWith('5')) return 'VALIDATION.PHONE_SA_START';
  } else if (countryCode === '+20') {
    if (digits.length !== 10) return 'VALIDATION.PHONE_EG_DIGITS';
    if (!digits.startsWith('1')) return 'VALIDATION.PHONE_EG_START';
  } else if (countryCode === '+218') {
    if (digits.length !== 9 && digits.length !== 8) return 'VALIDATION.PHONE_LY_DIGITS';
  } else if (countryCode === '+971') {
    if (digits.length !== 9) return 'VALIDATION.PHONE_UAE_DIGITS';
    if (!digits.startsWith('5')) return 'VALIDATION.PHONE_UAE_START';
  } else if (countryCode === '+974') {
    if (digits.length !== 8) return 'VALIDATION.PHONE_QATAR_DIGITS';
  } else if (countryCode === '+965') {
    if (digits.length !== 8) return 'VALIDATION.PHONE_KUWAIT_DIGITS';
  } else if (countryCode === '+973') {
    if (digits.length !== 8) return 'VALIDATION.PHONE_BAHRAIN_DIGITS';
  } else if (countryCode === '+968') {
    if (digits.length !== 8) return 'VALIDATION.PHONE_OMAN_DIGITS';
  } else if (countryCode === '+962') {
    if (digits.length !== 9) return 'VALIDATION.PHONE_JORDAN_DIGITS';
    if (!digits.startsWith('7')) return 'VALIDATION.PHONE_JORDAN_START';
  } else if (countryCode === '+961') {
    if (digits.length < 7 || digits.length > 8) return 'VALIDATION.PHONE_LEBANON_DIGITS';
  } else if (countryCode === '+964') {
    if (digits.length !== 10) return 'VALIDATION.PHONE_IRAQ_DIGITS';
    if (!digits.startsWith('7')) return 'VALIDATION.PHONE_IRAQ_START';
  } else if (countryCode === '+1') {
    if (digits.length !== 10) return 'VALIDATION.PHONE_US_DIGITS';
  } else if (countryCode === '+44') {
    if (digits.length < 10 || digits.length > 11) return 'VALIDATION.PHONE_UK_DIGITS';
  } else if (countryCode === '+90') {
    if (digits.length !== 10) return 'VALIDATION.PHONE_TURKEY_DIGITS';
    if (!digits.startsWith('5')) return 'VALIDATION.PHONE_TURKEY_START';
  }

  return null;
}

@Component({
  selector: 'app-contact-form',
  imports: [FormField, TelInputComponent, TranslatePipe, PreventInputDirective],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly submissionService = inject(SubmissionService);
  private readonly solutionsService = inject(SolutionsService);

  readonly selectedBranch = input<BranchCode>('SA');
  readonly selectBranch = output<BranchCode>();

  readonly pageSlug = input<string>('');
  readonly showProjectType = input<boolean | undefined>(undefined);
  readonly presetProjectType = input<string>('', { alias: 'presetSolutionType' });
  readonly formTitle = input<string>('');
  readonly formSubtitle = input<string>('');
  readonly cardClasses = input<string>('');

  readonly shouldShowSolutionType = computed(() => {
    if (this.showProjectType() !== undefined) {
      return !!this.showProjectType();
    }
    return !this.pageSlug();
  });

  readonly phoneCountry = signal<string>('+966');
  readonly phoneTouched = signal<boolean>(false);

  readonly solutionTypes = computed<SolutionTypeOption[]>(() => {
    const apiSolutions = this.solutionsService.solutionTypes();
    if (apiSolutions && apiSolutions.length > 0) {
      return apiSolutions.map(s => ({ title: s.title, slug: s.slug }));
    }
    return [
      { title: 'Commercial Buildings & Offices', slug: 'commercial-buildings-offices' },
      { title: 'Infrastructure & Roads', slug: 'infrastructure-roads' },
      { title: 'Industrial & Warehouses', slug: 'industrial-warehouses' },
      { title: 'Residential & Housing', slug: 'residential-housing' },
    ];
  });

  readonly contactModel = signal<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    solutionType: '',
    message: '',
  });

  readonly contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.name, { message: 'VALIDATION.NAME_REQUIRED' });
    minLength(schemaPath.name, 2, { message: 'VALIDATION.NAME_MIN_LENGTH' });

    required(schemaPath.email, { message: 'VALIDATION.EMAIL_REQUIRED' });
    email(schemaPath.email, { message: 'VALIDATION.EMAIL_INVALID' });

    required(schemaPath.phone, { message: 'VALIDATION.PHONE_REQUIRED' });
    validate(schemaPath.phone, (ctx) => {
      const err = validateInternationalPhone(this.phoneCountry(), ctx.value());
      if (err) return { kind: 'phone_format', message: err };
      return undefined;
    });

    required(schemaPath.solutionType, {
      when: () => this.shouldShowSolutionType(),
      message: 'VALIDATION.SOLUTION_TYPE_REQUIRED',
    });

    required(schemaPath.message, {
      when: () => !this.pageSlug(),
      message: 'VALIDATION.MESSAGE_REQUIRED',
    });
    minLength(schemaPath.message, 5, {
      when: () => !this.pageSlug(),
      message: 'VALIDATION.MESSAGE_MIN_LENGTH',
    });
  });

  readonly phoneError = computed(() => {
    return validateInternationalPhone(this.phoneCountry(), this.contactModel().phone);
  });

  readonly isSubmitted = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);

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
        this.contactModel.update(m => ({ ...m, solutionType: preset }));
      } else {
        const types = this.solutionTypes();
        if (types.length > 0 && !this.contactModel().solutionType) {
          this.contactModel.update(m => ({ ...m, solutionType: types[0].slug }));
        }
      }
    });
  }

  onPhoneCountryChange(countryCode: string): void {
    this.phoneCountry.set(countryCode);
    if (countryCode === '+966') this.selectBranch.emit('SA');
    else if (countryCode === '+20') this.selectBranch.emit('EG');
    else if (countryCode === '+218') this.selectBranch.emit('LY');
  }

  onPhoneInput(val: string): void {
    this.contactModel.update(m => ({ ...m, phone: val }));
    this.phoneTouched.set(true);
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);
    this.phoneTouched.set(true);

    if (this.contactForm().invalid() || !!this.phoneError()) {
      return;
    }

    this.isSubmitting.set(true);

    const data = this.contactModel();
    const payload: Record<string, any> = {
      full_name: data.name.trim(),
      email: data.email.trim(),
      phone: (this.phoneCountry() + data.phone.trim()).trim(),
    };

    if (this.pageSlug()) {
      payload['page_slug'] = this.pageSlug();
      if (data.solutionType) {
        payload['solution_type'] = data.solutionType;
      }
      if (data.message.trim()) {
        payload['message'] = data.message.trim();
      }
    } else {
      payload['solution_type'] = data.solutionType || null;
      payload['message'] = data.message.trim() || null;
    }

    this.http.post(environment.baseUrl + API_ENDPOINTS.contact, payload).subscribe({
      next: () => {
        this.finishSubmission();
      },
      error: () => {
        this.finishSubmission();
      }
    });
  }

  private finishSubmission(): void {
    this.isSubmitting.set(false);
    this.isSuccess.set(true);

    const types = this.solutionTypes();
    this.contactModel.set({
      name: '',
      email: '',
      phone: '',
      solutionType: types.length > 0 ? types[0].slug : '',
      message: '',
    });
    this.phoneTouched.set(false);
    this.isSubmitted.set(false);

    this.submissionService.markSubmitted();
    this.router.navigate(['/', this.languageService.currentLang(), 'thank-you']);
  }
}
