import { Injectable, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiResponse, HomeData } from '../models/home-api.model';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly langService = inject(LanguageService);
  readonly homeResource = httpResource<ApiResponse<HomeData>>(() => ({
    url: environment.baseUrl + API_ENDPOINTS.home,
    headers: {
      "Accept-Language": this.langService.currentLang()
    }
  }));

  readonly homeData = computed(() => (this.homeResource.hasValue() ? this.homeResource.value()?.data : undefined));
  readonly hero = computed(() => this.homeData()?.hero);
  readonly counters = computed(() => this.homeData()?.counters ?? []);
  readonly about = computed(() => this.homeData()?.about);
  readonly standards = computed(() => this.homeData()?.standards ?? []);
  readonly solutions = computed(() => this.homeData()?.solutions ?? []);
  readonly partners = computed(() => this.homeData()?.partners ?? []);
  readonly clients = computed(() => this.homeData()?.clients ?? []);
  readonly projects = computed(() => this.homeData()?.projects ?? []);
  readonly testimonials = computed(() => this.homeData()?.testimonials ?? []);
  readonly blogs = computed(() => this.homeData()?.blogs ?? []);
  readonly branches = computed(() => this.homeData()?.branches ?? []);
  readonly seo = computed(() => this.homeData()?.seo);
  readonly isLoading = computed(() => this.homeResource.isLoading());
  readonly error = computed(() => this.homeResource.error());
}
