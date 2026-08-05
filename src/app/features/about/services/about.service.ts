import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { AboutData, ApiResponse } from '../models/about-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly langService = inject(LanguageService);
  readonly aboutResource = httpResource<ApiResponse<AboutData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.about,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly aboutData = computed(() => (this.aboutResource.hasValue() ? this.aboutResource.value()?.data : undefined));
  readonly about = computed(() => this.aboutData()?.about);
  readonly counters = computed(() => this.aboutData()?.counters ?? []);
  readonly clients = computed(() => this.aboutData()?.clients ?? []);
  readonly partners = computed(() => this.aboutData()?.partners ?? []);
  readonly whyChooseUs = computed(() => this.aboutData()?.why_choose_us);
  readonly seo = computed(() => this.aboutData()?.seo);
  readonly isLoading = computed(() => this.aboutResource.isLoading());
  readonly error = computed(() => this.aboutResource.error());
}
