export interface Solution {
  id: string;
  title: string;
  desc: string;
  details: string;
  stats: string;
  features: string[];
  icon: string;
  image: string;
  accentColor: string;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  badge: string;
}

export interface ClientLogo {
  name: string;
  text: string;
  icon: string;
}

export interface Branch {
  code: 'EG' | 'SA' | 'LY';
  name: string;
  country: string;
  phonePrefix: string;
  phone: string;
  address: string;
  email: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}
