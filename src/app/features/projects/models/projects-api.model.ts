import { Pagination } from '../../../core/models/pagination.interface';
import { SeoData } from '../../../core/models/seo.interface';

export interface ProjectTypeItem {
  id: number | string;
  title: string;
  slug: string;
}

export interface ProjectsBanner {
  page_key: string;
  title: string;
  image: string | null;
}

export interface SelectedProjectType {
  id: number | string;
  title: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  other_slug?: string | null;
  small_description: string;
  cover_image: string;
  order: number;
  project_type: string;
}

export interface ProjectsData {
  banner: ProjectsBanner;
  company_profile_pdf: string | null;
  selected_type: SelectedProjectType;
  projects: ProjectItem[];
  pagination: Pagination;
  seo: SeoData;
}

export interface OtherProjectItem {
  title: string;
  industry_title: string;
  cover_image: string;
  small_description: string;
  slug: string;
  other_slug?: string | null;
}

export interface ProjectDetailsData {
  industry_title: string;
  title: string;
  slug: string;
  other_slug?: string | null;
  cover_image: string;
  Location?: string;
  'Completion Year'?: string;
  'Project Status'?: string;
  project_images: string[];
  full_description: string;
  other_projects: OtherProjectItem[];
  seo: SeoData;
}
