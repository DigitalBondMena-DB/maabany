export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
}

export interface HomeHero {
  title: string;
  description: string;
  video: string | null;
}

export interface HomeCounter {
  id: number;
  title: string;
  number: string;
  icon: string | null;
  order: number;
}

export interface HomeAboutUnderway {
  title: string | null;
  description: string | null;
}

export interface HomeAbout {
  title: string;
  description: string;
  home_image_1: string | null;
  home_image_2: string | null;
  points: string[];
  currently_underway?: HomeAboutUnderway | null;
}

export interface HomeStandard {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  order: number;
}

export interface HomeSolution {
  id: number;
  parent_id: number | null;
  parent_slug: string | null;
  title: string;
  slug: string;
  description: string;
  images: string[];
  points: string[];
  order: number;
}

export interface HomePartner {
  id: number;
  logo: string;
  order: number;
}

export interface HomeClient {
  id: number;
  logo: string;
  order: number;
}

export interface HomeProject {
  id: number;
  title: string;
  slug: string;
  small_description: string;
  cover_image: string;
  project_type: string;
  order: number;
}

export interface HomeTestimonial {
  id: number;
  client_name: string;
  position: string;
  text: string;
  order: number;
}

export interface HomeBlog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
}

export interface HomeBranch {
  id: number;
  country: string;
  address: string;
  phone: string | null;
  email: string | null;
  working_hours: string | null;
  map_url: string | null;
}

export interface HomeData {
  hero: HomeHero;
  counters: HomeCounter[];
  about: HomeAbout;
  standards: HomeStandard[];
  solutions: HomeSolution[];
  partners: HomePartner[];
  clients: HomeClient[];
  projects: HomeProject[];
  testimonials: HomeTestimonial[];
  blogs: HomeBlog[];
  company_profile: any;
  branches: HomeBranch[];
}
