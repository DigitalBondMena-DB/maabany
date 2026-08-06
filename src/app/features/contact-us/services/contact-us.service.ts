import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { ContactUsData } from '../models/contact-us-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private readonly langService = inject(LanguageService);

  readonly resource = httpResource<ApiResponse<ContactUsData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.contact,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly data = computed(() =>
    this.resource.hasValue() ? this.resource.value()?.data : undefined
  );

  readonly banner = computed(() => this.data()?.banner);
  readonly branches = computed(() => this.data()?.branches ?? []);
  readonly isLoading = computed(() => this.resource.isLoading());
}
