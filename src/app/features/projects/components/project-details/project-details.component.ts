import { Component, input, computed, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { CtaBannerComponent } from '../../../../shared/components/cta-banner/cta-banner.component';
import { ProjectMetricsComponent } from '../project-metrics/project-metrics.component';
import { ProjectSliderComponent } from '../project-slider/project-slider.component';
import { OtherProjectsComponent } from '../other-projects/other-projects.component';
import { ProjectGalleryButtonComponent } from '../../../../shared/components/project-gallery-button/project-gallery-button.component';
import { ProjectLightboxComponent } from '../../../../shared/components/project-lightbox/project-lightbox.component';
import { PROJECTS_DATA, ProjectItem } from '../../services/projects-data';

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
  ],
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent {
  private readonly fb = inject(FormBuilder);

  readonly slug = input.required<string>();

  readonly inquiryForm = this.fb.nonNullable.group({
    formName: ['', [Validators.required, Validators.minLength(2)]],
    formEmail: ['', [Validators.required, Validators.email]],
    formTopic: ['General Consultation'],
    formSpecs: [''],
  });

  readonly isSubmitted = signal<boolean>(false);
  readonly formSubmitting = signal<boolean>(false);
  readonly formSuccess = signal<boolean>(false);
  readonly isGalleryOpen = signal<boolean>(false);

  readonly currentProject = computed<ProjectItem>(() => {
    const s = this.slug();
    const found = PROJECTS_DATA.find(p => p.slug === s);
    if (found) return found;

    return {
      slug: s,
      name: s.replace(/-/g, ' ').toUpperCase(),
      location: 'Riyadh, KSA',
      category: 'Commercial',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      desc: 'Engineering and construction project delivered according to international quality and safety standards.',
    };
  });

  readonly projectImages = computed<string[]>(() => {
    const p = this.currentProject();
    return [
      p.image,
      p.category === 'Commercial'
        ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
        : p.category === 'Residential'
        ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      p.category === 'Industrial'
        ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    ];
  });

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
