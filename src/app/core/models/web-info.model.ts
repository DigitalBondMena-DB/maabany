export interface SocialMediaLinks {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface WebInfoBranch {
  id: number;
  country: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  map_url: string;
}

export interface WebInfoData {
  footer_description?: string;
  social_media_links?: SocialMediaLinks;
  email?: string;
  working_hours?: string;
  company_profile?: string;
  branches?: WebInfoBranch[];
}

export interface WebInfoApiResponse {
  success: boolean;
  message: string;
  data: WebInfoData;
  errors?: any;
}
