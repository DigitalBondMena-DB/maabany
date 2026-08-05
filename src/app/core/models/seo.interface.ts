export interface SeoData {
    page_key: string;
    meta_title: string;
    meta_description: string;
    robots: string;
    canonical_url: string | null;
    og: SeoSocial;
    schema_markup: string | any | null;
}

export interface SeoSocial {
    title: string;
    description: string;
    image: string;
}
