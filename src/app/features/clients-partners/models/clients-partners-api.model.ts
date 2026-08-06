import { SeoData } from '../../../core/models/seo.interface';
import { HomePartner, HomeClient } from '../../home/models/home-api.model';

export interface WhyChooseUsCard {
  subtitle: string | null;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface WhyChooseUsSection {
  subtitle: string | null;
  title: string;
  description: string;
  image: string;
  cards: WhyChooseUsCard[];
}

export interface ClientsPartnersData {
  banner: {
    title: string;
    image: string;
  } | null;
  clients: HomeClient[];
  partners: HomePartner[];
  why_choose_us: WhyChooseUsSection | null;
  seo: SeoData;
}
