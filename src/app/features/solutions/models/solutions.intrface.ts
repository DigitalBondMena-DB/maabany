export interface SubcategoryItem {
    title: string;
    slug: string;
    desc: string;
    image?: string;
}

export interface SolutionCategory {
    title: string;
    slug: string;
    desc: string;
    image: string;
    subcategories: SubcategoryItem[];
}
