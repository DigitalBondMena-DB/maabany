import { SeoData } from '../../../core/models/seo.interface';
import { HomePartner, HomeClient } from '../../home/models/home-api.model';

export interface ClientsPartnersData {
  banner: {
    title: string;
    image: string;
  } | null;
  clients: HomeClient[];
  partners: HomePartner[];
  why_choose_us?: any;
  seo: SeoData;
}
