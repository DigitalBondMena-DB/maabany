export interface SearchResultItem {
  id: number;
  type: 'blog' | 'solution' | 'industry' | 'project' | string;
  title: string;
  slug: string;
  other_slug?: string;
  description: string;
  image: string | null;
}

export interface SearchPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface SearchData {
  results: SearchResultItem[];
  pagination?: SearchPagination;
}

export interface SearchApiResponse {
  success: boolean;
  message: string;
  data: SearchData;
  errors?: any;
}
