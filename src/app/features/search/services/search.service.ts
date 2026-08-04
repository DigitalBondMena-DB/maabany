import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { SearchApiResponse } from '../models/search-api.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  search(query: string, lang: string, page: number = 1): Observable<SearchApiResponse> {
    const headers = new HttpHeaders({
      'Accept-Language': lang,
    });
    return this.http.get<SearchApiResponse>(
      `${environment.baseUrl}${API_ENDPOINTS.search}`,
      {
        params: { q: query, page: page.toString() },
        headers,
      }
    );
  }
}
