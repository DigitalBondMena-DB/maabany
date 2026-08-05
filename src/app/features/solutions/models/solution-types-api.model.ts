import { SeoData } from '../../../core/models/seo.interface';

// Level 1 Solution Item from /api/solutions
export interface SolutionItem {
  id: number;
  title: string;
  description: string;
  main_image: string;
  slug: string;
  other_slug: string;
  children_count?: number;
}

// Child Solution Item inside a solution detail
export interface ChildSolutionItem {
  title: string;
  description: string;
  main_image: string;
  slug: string;
  other_slug: string;
  parent_slug?: string;
  other_parent_slug?: string;
  children_count?: number;
}

// Solution Standard Item
export interface SolutionStandard {
  title: string;
  description: string;
  icon?: string | null;
}

// Related Project Item
export interface RelatedProjectItem {
  title: string;
  slug: string;
  cover_image: string;
}

// Related Solution Item
export interface RelatedSolutionItem {
  title: string;
  description: string;
  main_image: string;
  slug: string;
  other_slug: string;
  parent_slug?: string;
  other_parent_slug?: string;
  children_count?: number;
}

// Solution Level 1 Response Data
export interface SolutionsListData {
  solutions: SolutionItem[];
  seo?: SeoData;
}

// Solution Detail Response Data (used when querying /api/solutions/:slug)
export interface SolutionDetailData {
  title: string;
  description: string;
  full_description?: string;
  main_image: string;
  slug: string;
  other_slug: string;
  parent_id?: number | null;
  parent_title?: string | null;
  parent_slug?: string | null;
  other_parent_slug?: string | null;
  children?: ChildSolutionItem[];
  standards?: SolutionStandard[];
  related_solutions?: RelatedSolutionItem[];
  related_projects?: RelatedProjectItem[];
  seo?: SeoData;
}
