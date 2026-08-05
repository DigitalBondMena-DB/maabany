import { Component, input, computed, signal, inject, effect } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../../../shared/components/cta-banner/cta-banner.component';
import { ProjectMetricsComponent } from '../project-metrics/project-metrics.component';
import { ProjectSliderComponent } from '../project-slider/project-slider.component';
import { OtherProjectsComponent } from '../other-projects/other-projects.component';
import { ProjectGalleryButtonComponent } from '../../../../shared/components/project-gallery-button/project-gallery-button.component';
import { ProjectLightboxComponent } from '../../../../shared/components/project-lightbox/project-lightbox.component';
import { ContactFormComponent } from '../../../../features/home/components/contact-section/contact-form/contact-form.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ProjectDetailsService } from '../../services/project-details.service';
import { SeoService } from '../../../../core/services/seo.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-project-details',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    PageHeroComponent,
    CtaBannerComponent,
    ProjectMetricsComponent,
    ProjectSliderComponent,
    OtherProjectsComponent,
    ProjectGalleryButtonComponent,
    ProjectLightboxComponent,
    ContactFormComponent,
    SkeletonComponent,
  ],
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent {
  protected readonly projectDetailsService = inject(ProjectDetailsService);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);
  private readonly location = inject(Location);
  private readonly fb = inject(FormBuilder);

  readonly slug = input.required<string>();

  constructor() {
    effect(() => {
      const s = this.slug();
      if (s) {
        this.projectDetailsService.setSlug(s);
      }
    });

    effect(() => {
      const seo = this.projectDetailsService.seo();
      if (seo) {
        this.seoService.updateSeo(seo);
      }
    });

    effect(() => {
      const p = this.projectDetailsService.project();
      if (p) {
        // other_slug contains the localized slug for the alternate language
        const altSlug = p.other_slug || null;
        this.languageService.alternateSlug.set(altSlug);

        // Keep URL in sync with p.slug for current language
        const currentLang = this.languageService.currentLang();
        const currentSlug = this.slug();
        if (p.slug && p.slug !== currentSlug) {
          this.location.replaceState(`/${currentLang}/projects/${p.slug}`);
        }
      }
    });
  }

  readonly projectData = computed(() => this.projectDetailsService.project());

  readonly projectImages = computed<string[]>(() => {
    const p = this.projectData();
    if (!p) return [];
    if (p.project_images && p.project_images.length > 0) {
      return p.project_images;
    }
    return p.cover_image ? [p.cover_image] : [];
  });

  readonly isGalleryOpen = signal<boolean>(false);

  readonly inquiryForm = this.fb.nonNullable.group({
    formName: ['', [Validators.required, Validators.minLength(2)]],
    formEmail: ['', [Validators.required, Validators.email]],
    formTopic: ['General Consultation'],
    formSpecs: [''],
  });

  readonly isSubmitted = signal<boolean>(false);
  readonly formSubmitting = signal<boolean>(false);
  readonly formSuccess = signal<boolean>(false);

  isFieldInvalid(fieldName: 'formName' | 'formEmail'): boolean {
    const field = this.inquiryForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.isSubmitted()));
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);

    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      return;
    }

    this.formSubmitting.set(true);
    setTimeout(() => {
      this.formSubmitting.set(false);
      this.formSuccess.set(true);
      this.isSubmitted.set(false);
      this.inquiryForm.reset({
        formName: '',
        formEmail: '',
        formTopic: 'General Consultation',
        formSpecs: '',
      });
      setTimeout(() => this.formSuccess.set(false), 4000);
    }, 1200);
  }

  openGallery(): void {
    this.isGalleryOpen.set(true);
  }

  closeGallery(): void {
    this.isGalleryOpen.set(false);
  }
}
