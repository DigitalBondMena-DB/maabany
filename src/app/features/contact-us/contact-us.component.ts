import { Component, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { TelInputComponent } from '../home/components/contact-section/tel-input/tel-input.component';
import { LanguageService } from '../../core/services/language.service';
import { SubmissionService } from '../../core/services/submission.service';
import { ContactUsService } from './services/contact-us.service';
import { SeoService } from '../../core/services/seo.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ContactFormComponent } from '../home/components/contact-section/contact-form/contact-form.component';

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
    ContactFormComponent,
    SkeletonComponent
  ],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly submissionService = inject(SubmissionService);
  private readonly contactUsService = inject(ContactUsService);
  private readonly seoService = inject(SeoService);

  readonly currentLang = this.languageService.currentLang;

  readonly banner = this.contactUsService.banner;
  readonly branches = this.contactUsService.branches;
  readonly isLoading = this.contactUsService.isLoading;

  constructor() {
    effect(() => {
      const data = this.contactUsService.data();
      if (data?.seo) {
        this.seoService.updateSeo(data.seo);
      }
    });
  }

  readonly heroCards = [
    { value: '12h Response', label: 'Maximum Reply Time' },
    { value: '3 Branches', label: 'Egypt, KSA & Libya' },
    { value: 'ISO Certified', label: 'Design & Engineering' },
  ];

  // Dynamic zoom levels for maps
  readonly zoomLevels = signal<Record<number, number>>({});

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

  getFlag(country: string): string {
    const c = (country || '').toLowerCase();
    if (c.includes('saudi')) return '🇸🇦';
    if (c.includes('egypt')) return '🇪🇬';
    if (c.includes('libya')) return '🇱🇾';
    return '🌍';
  }

  encodeUrl(str: string): string {
    return encodeURIComponent(str);
  }

  getZoom(id: number): number {
    return this.zoomLevels()[id] || 14;
  }

  handleZoomIn(id: number): void {
    this.zoomLevels.update(levels => ({
      ...levels,
      [id]: Math.min((levels[id] || 14) + 1, 19)
    }));
  }

  handleZoomOut(id: number): void {
    this.zoomLevels.update(levels => ({
      ...levels,
      [id]: Math.max((levels[id] || 14) - 1, 10)
    }));
  }

  getSanitizedMapUrl(mapUrl: string, zoom: number): SafeResourceUrl {
    let q = 'Jeddah'; // fallback
    try {
      const urlObj = new URL(mapUrl);
      q = urlObj.searchParams.get('q') || urlObj.searchParams.get('query') || mapUrl;
    } catch {
      q = mapUrl;
    }
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
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
