import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { SolutionTypesApiResponse } from '../models/solution-types-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  private readonly langService = inject(LanguageService);

  readonly solutionTypesResource = httpResource<SolutionTypesApiResponse>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.solutionTypes,
    headers: {
      'Accept-Language': this.langService.currentLang(),
    },
  }));

  readonly solutionTypesData = computed(() => (this.solutionTypesResource.hasValue() ? this.solutionTypesResource.value()?.data : undefined));
  readonly solutionTypes = computed(() => this.solutionTypesData()?.solutions ?? []);
  readonly isLoading = computed(() => this.solutionTypesResource.isLoading());
  readonly error = computed(() => this.solutionTypesResource.error());
}
