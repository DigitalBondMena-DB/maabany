import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { ClientsPartnersData } from '../models/clients-partners-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsPartnersService {
  private readonly langService = inject(LanguageService);

  readonly resource = httpResource<ApiResponse<ClientsPartnersData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.clientsPartner,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly data = computed(() =>
    this.resource.hasValue() ? this.resource.value()?.data : undefined
  );

  readonly clients = computed(() => this.data()?.clients ?? []);
  readonly partners = computed(() => this.data()?.partners ?? []);
  readonly banner = computed(() => this.data()?.banner);
  readonly whyChooseUs = computed(() => this.data()?.why_choose_us);
  readonly isLoading = computed(() => this.resource.isLoading());
}
