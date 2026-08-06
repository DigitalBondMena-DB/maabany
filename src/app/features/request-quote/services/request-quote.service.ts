import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { RequestQuoteData } from '../models/request-quote-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestQuoteService {
  private readonly langService = inject(LanguageService);

  readonly resource = httpResource<ApiResponse<RequestQuoteData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.requestQuote,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly data = computed(() =>
    this.resource.hasValue() ? this.resource.value()?.data : undefined
  );

  readonly banner = computed(() => this.data()?.banner);
  readonly solutions = computed(() => this.data()?.solutions ?? []);
  readonly isLoading = computed(() => this.resource.isLoading());
}
