import { SeoData } from '../../../core/models/seo.interface';

export interface IndustryItem {
  id: number;
  title: string;
  slug: string;
  other_slug: string;
  description: string;
  image: string;
}

export interface IndustriesData {
  banner: {
    title: string;
    image: string;
  } | null;
  industries: IndustryItem[];
  why_choose_us?: any;
  seo: SeoData;
}

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryDetailData {
  title: string;
  slug: string;
  other_slug: string;
  image: string;
  description: string;
  related_solutions: any[];
  related_projects: any[];
  industry_challenges: IndustryChallenge[];
  industry_images: string[];
  seo: SeoData;
}
