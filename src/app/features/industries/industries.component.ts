import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { MediaCardComponent } from '../../shared/components/media-card/media-card.component';
import { FloatingWireframeComponent } from '../../shared/components/floating-wireframe/floating-wireframe.component';
import { TelInputComponent } from '../home/components/contact-section/tel-input/tel-input.component';
import { validateInternationalPhone } from '../home/components/contact-section/contact-form/contact-form.component';
import { INDUSTRIES_DATA, IndustryItem } from './services/industries-data';
import { LanguageService } from '../../core/services/language.service';

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

@Component({
  selector: 'app-industries',
  imports: [
    TranslatePipe,
    PageHeroComponent,
    MediaCardComponent,
    FloatingWireframeComponent,
    TelInputComponent,
  ],
  templateUrl: './industries.component.html',
  styles: [`
    @keyframes bpDraw {
      0% { stroke-dashoffset: 1200; }
      30% { stroke-dashoffset: 1200; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes bpDot {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.5); opacity: 0.95; }
    }

    @keyframes bpFade {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.8; }
    }

    .bp-line-draw {
      stroke-dasharray: 1200;
      stroke-dashoffset: 1200;
      animation: bpDraw 9s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    }

    .bp-pulse-dot {
      transform-origin: center;
      animation: bpDot 4s ease-in-out infinite;
    }

    .bp-fade-slow {
      animation: bpFade 6s ease-in-out infinite;
    }
  `]
})
export class IndustriesComponent {
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly topPaddingClasses = [
    'lg:pt-0',
    'lg:pt-6',
    'lg:pt-12',
  ] as const;

  readonly industries: IndustryItem[] = INDUSTRIES_DATA;

  // Realtime Quote Form Signals
  readonly phoneCountryCode = signal<string>('+966');
  readonly formData = signal<QuoteFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Commercial Buildings',
    message: '',
  });

  readonly nameTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  // Realtime Computed Errors
  readonly nameError = computed(() => {
    const val = this.formData().name.trim();
    if (!val) return 'Full Name is required';
    if (val.length < 2) return 'Name must be at least 2 characters';
    return null;
  });

  readonly emailError = computed(() => {
    const val = this.formData().email.trim();
    if (!val) return 'Email Address is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) return 'Please enter a valid email address';
    return null;
  });

  readonly phoneError = computed(() => {
    return validateInternationalPhone(this.phoneCountryCode(), this.formData().phone);
  });

  readonly isFormValid = computed(() => {
    return !this.nameError() && !this.emailError() && !this.phoneError();
  });

  updateFormField(field: keyof QuoteFormData, value: string): void {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  onNameBlur(): void {
    this.nameTouched.set(true);
  }

  onEmailBlur(): void {
    this.emailTouched.set(true);
  }

  onPhoneBlur(): void {
    this.phoneTouched.set(true);
  }

  handleQuoteSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.phoneTouched.set(true);

    if (this.isFormValid()) {
      this.router.navigate(['/' + this.currentLang() + '/contact']);
    }
  }
}
