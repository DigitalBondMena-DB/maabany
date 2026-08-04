export interface SolutionTypeItem {
  id: number;
  title: string;
  slug: string;
  other_slug: string;
}

export interface SolutionTypesData {
  solutions: SolutionTypeItem[];
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface SolutionTypesApiResponse {
  success: boolean;
  message: string;
  data: SolutionTypesData;
  errors: any;
}
