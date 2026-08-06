import { SeoData } from '../../../core/models/seo.interface';

export interface ContactBranch {
  id: number;
  country: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  map_url: string;
}

export interface ContactBanner {
  page_key: string;
  title: string;
  image: string;
}

export interface ContactUsData {
  banner: ContactBanner;
  branches: ContactBranch[];
  seo: SeoData;
}
