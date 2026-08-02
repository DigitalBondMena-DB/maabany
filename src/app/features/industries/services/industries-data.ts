export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  images?: string[];
  category: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'commercial',
    name: 'Commercial Buildings',
    description: 'Modern office towers, mixed-use developments, retail centers, and commercial complexes built to international engineering standards.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Commercial',
  },
  {
    id: 'residential',
    name: 'Residential Developments',
    description: 'Luxury villas, residential compounds, apartment buildings, and integrated housing communities designed for long-term performance.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    category: 'Residential',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Hospitals, medical centers, laboratories, and healthcare facilities requiring advanced engineering systems and specialized infrastructure.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    category: 'Healthcare',
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Hotels, resorts, restaurants, and hospitality developments combining premium finishes with reliable engineering solutions.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    category: 'Hospitality',
  },
  {
    id: 'industrial',
    name: 'Industrial Facilities',
    description: 'Factories, warehouses, logistics centers, and manufacturing facilities engineered for efficiency, durability, and operational excellence.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    category: 'Industrial',
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    description: 'Government buildings, municipal facilities, and public infrastructure projects delivered according to strict engineering and quality standards.',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
    category: 'Public Sector',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Schools, universities, educational campuses, and research facilities that support modern learning environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    category: 'Education',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Infrastructure projects including roads, utility networks, public services, and large-scale civil engineering developments.',
    image: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=800&q=80',
    category: 'Infrastructure',
  },
];
