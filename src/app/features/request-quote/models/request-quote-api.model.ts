import { SeoData } from '../../../core/models/seo.interface';

export interface QuoteSolution {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface RequestQuoteData {
  banner: {
    title: string;
    image: string;
  } | null;
  solutions: QuoteSolution[];
  seo: SeoData;
}
