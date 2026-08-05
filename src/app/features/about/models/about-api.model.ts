import { SeoData } from "../../../core/models/seo.interface";
import { ApiResponse } from "../../home/models/home-api.model";

export interface AboutMissionVisionValue {
  title: string;
  description: string;
  image: string | null;
}

export interface AboutWhyChooseUsPoint {
  title: string;
  description: string | null;
  icon: string | null;
}

export interface AboutInfoWhyChooseUs {
  title: string;
  description: string;
  image: string | null;
  points: AboutWhyChooseUsPoint[];
}

export interface AboutInfo {
  title: string;
  description: string;
  banner_title: string;
  banner_image: string | null;
  about_image: string | null;
  points: string[];
  mission: AboutMissionVisionValue;
  vision: AboutMissionVisionValue;
  values: AboutMissionVisionValue;
  why_choose_us: AboutInfoWhyChooseUs;
}

export interface AboutCounter {
  id: number;
  title: string;
  number: string;
  icon: string | null;
  order: number;
}

export interface AboutClient {
  id: number;
  logo: string;
  order: number;
}

export interface AboutPartner {
  id: number;
  logo: string;
  order: number;
}

export interface WhyChooseUsCard {
  subtitle: string | null;
  title: string;
  description: string;
  image: string | null;
  icon: string | null;
}

export interface WhyChooseUsSection {
  subtitle: string | null;
  title: string;
  description: string;
  image: string | null;
  cards: WhyChooseUsCard[];
}

export interface AboutData {
  about: AboutInfo;
  counters: AboutCounter[];
  clients: AboutClient[];
  partners: AboutPartner[];
  why_choose_us: WhyChooseUsSection;
  seo: SeoData;
}

export type { ApiResponse };
