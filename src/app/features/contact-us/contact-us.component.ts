import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { TelInputComponent } from '../home/components/contact-section/tel-input/tel-input.component';
import { LanguageService } from '../../core/services/language.service';
import { SubmissionService } from '../../core/services/submission.service';

export interface OfficeBranch {
  id: string;
  country: string;
  flag: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  embedQuery: string;
}

export interface TrustIndicator {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [
    FormsModule,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
    TelInputComponent,
  ],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly submissionService = inject(SubmissionService);

  readonly currentLang = this.languageService.currentLang;

  readonly heroCards = [
    { value: '12h Response', label: 'Maximum Reply Time' },
    { value: '3 Branches', label: 'Egypt, KSA & Libya' },
    { value: 'ISO Certified', label: 'Design & Engineering' },
  ];

  readonly offices: OfficeBranch[] = [
    {
      id: 'ksa',
      country: 'Kingdom of Saudi Arabia',
      flag: '🇸🇦',
      city: 'Jeddah',
      address: '2923 Al-Sharif Ahmed bin Abdul Muttalib, Al-Salhiya District, Jeddah, Saudi Arabia',
      phone: '+966 54 231 4500',
      email: 'Amir.yahia@maabany.com',
      hours: 'Eng. Amir Yahia\nSunday – Thursday\n8:00 AM – 5:00 PM',
      embedQuery: '2923 Al-Sharif Ahmed bin Abdul Muttalib, Al-Salhiya District, Jeddah, Saudi Arabia'
    },
    {
      id: 'egypt',
      country: 'Egypt',
      flag: '🇪🇬',
      city: 'Cairo',
      address: '53 Hassan El Sherif Street, Nasr City, Cairo, Egypt',
      phone: '+20 10 4422 7666',
      email: 'Mohamed.youssef@maabany.com',
      hours: 'Eng. Mohamed Youssef\nSunday – Thursday\n9:00 AM – 5:00 PM',
      embedQuery: '53 Hassan El Sherif Street, Nasr City, Cairo, Egypt'
    },
    {
      id: 'libya',
      country: 'Libya',
      flag: '🇱🇾',
      city: 'Tripoli',
      address: 'Tripoli Operations Branch, Tripoli, Libya',
      phone: '+218 91 000 0000 (Via Sales)',
      email: 'sales@maabany.com',
      hours: 'General Operations\nSunday – Thursday\n8:00 AM – 4:00 PM',
      embedQuery: 'Tripoli, Libya'
    }
  ];

  // Dynamic zoom levels for maps
  readonly zoomLevels = signal<Record<string, number>>({
    ksa: 14,
    egypt: 14,
    libya: 14,
  });

  readonly trustIndicators: TrustIndicator[] = [
    { icon: 'clock', title: 'Fast Response', desc: 'Consultants respond within 12 business hours' },
    { icon: 'users', title: 'Professional Engineering Team', desc: 'ISO certified design & structural planning' },
    { icon: 'award', title: 'Customized Solutions', desc: 'Tailored construction and MEP specifications' },
    { icon: 'globe', title: 'Multi-country Support', desc: 'Operating seamlessly in Egypt, Saudi Arabia, & Libya' },
  ];

  // Form Signals & Real-time Validation State
  readonly phoneCountryCode = signal<string>('+966');
  readonly formData = signal({
    name: '',
    email: '',
    phone: '',
    projectType: 'Commercial Buildings & Offices',
    message: ''
  });
  readonly formSubmitted = signal<boolean>(false);

  readonly nameTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);

  readonly isNameValid = computed(() => this.formData().name.trim().length >= 3);
  readonly isPhoneValid = computed(() => {
    const cleanPhone = this.formData().phone.replace(/\D/g, '');
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  });
  readonly isEmailValid = computed(() => /\S+@\S+\.\S+/.test(this.formData().email.trim()));

  readonly errors = computed(() => {
    const data = this.formData();
    const errs = { name: '', phone: '', email: '' };

    if (this.nameTouched() || this.formSubmitted()) {
      if (!data.name.trim()) {
        errs.name = 'Full Name is required';
      } else if (data.name.trim().length < 3) {
        errs.name = 'Full Name must be at least 3 characters';
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

  encodeUrl(str: string): string {
    return encodeURIComponent(str);
  }

  getZoom(id: string): number {
    return this.zoomLevels()[id] || 14;
  }

  handleZoomIn(id: string): void {
    this.zoomLevels.update(levels => ({
      ...levels,
      [id]: Math.min((levels[id] || 14) + 1, 19)
    }));
  }

  handleZoomOut(id: string): void {
    this.zoomLevels.update(levels => ({
      ...levels,
      [id]: Math.max((levels[id] || 14) - 1, 10)
    }));
  }

  getSanitizedMapUrl(embedQuery: string, zoom: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updateField(field: 'name' | 'email' | 'phone' | 'projectType' | 'message', value: string): void {
    this.formData.update(prev => ({ ...prev, [field]: value }));
    if (field === 'name') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
  }

  onBlurField(field: 'name' | 'phone' | 'email'): void {
    if (field === 'name') this.nameTouched.set(true);
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
    if (!errs.name && !errs.phone && !errs.email) {
      this.submissionService.markSubmitted();
      this.router.navigate(['/', this.currentLang(), 'thank-you']);
    }
  }
}
