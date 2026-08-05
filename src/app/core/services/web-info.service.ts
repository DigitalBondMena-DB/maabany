import { Service, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { WebInfoApiResponse } from '../models/web-info.model';
import { LanguageService } from './language.service';
import { environment } from '../../../environments/environment';

@Service()
export class WebInfoService {
  private readonly langService = inject(LanguageService);

  readonly infoResource = httpResource<WebInfoApiResponse>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.info,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly infoData = computed(() => (this.infoResource.hasValue() ? this.infoResource.value()?.data : undefined));
  readonly footerDescription = computed(() => this.infoData()?.footer_description ?? '');
  readonly socialLinks = computed(() => this.infoData()?.social_media_links);
  readonly email = computed(() => this.infoData()?.email ?? '');
  readonly workingHours = computed(() => this.infoData()?.working_hours ?? '');
  readonly companyProfile = computed(() => this.infoData()?.company_profile ?? '');
  readonly branches = computed(() => this.infoData()?.branches ?? []);
  readonly isLoading = computed(() => this.infoResource.isLoading());
  readonly error = computed(() => this.infoResource.error());
}
