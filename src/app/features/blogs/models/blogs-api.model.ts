import { SeoData } from '../../../core/models/seo.interface';
import { Pagination } from '../../../core/models/pagination.interface';

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  reading_time: number;
  author: string;
}

export interface BlogsData {
  banner: string | null;
  blogs: BlogItem[];
  pagination: Pagination;
  seo: SeoData;
}

export interface BlogDetailData {
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  'Published Date': string;
  'last update': string;
  Author: string;
  related_articles: BlogItem[];
  seo: SeoData;
}
