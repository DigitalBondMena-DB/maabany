export interface ProjectItem {
  slug: string;
  name: string;
  location: string;
  category: string;
  year: string;
  image: string;
  desc: string;
  isFeatured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    slug: 'commercial-tower-development',
    name: 'Commercial Tower Development',
    location: 'Riyadh, KSA',
    category: 'Commercial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction of a modern commercial office tower designed to meet international quality and sustainability standards.',
    isFeatured: true
  },
  {
    slug: 'luxury-residential-compound',
    name: 'Luxury Residential Compound',
    location: 'Dubai, UAE',
    category: 'Residential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    desc: 'Complete construction of premium residential buildings featuring modern architecture and high-end finishing.',
    isFeatured: true
  },
  {
    slug: 'industrial-warehouse-complex',
    name: 'Industrial Warehouse Complex',
    location: 'Dammam, KSA',
    category: 'Industrial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    desc: 'Design and construction of large-scale industrial warehouses with advanced structural engineering solutions.',
    isFeatured: true
  },
  {
    slug: 'government-facility',
    name: 'Government Facility',
    location: 'Riyadh, KSA',
    category: 'Government',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction of a government administration facility delivered according to strict engineering and security standards.',
    isFeatured: true
  },
  {
    slug: 'healthcare-facility',
    name: 'Healthcare Facility',
    location: 'Jeddah, KSA',
    category: 'Healthcare',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction and engineering works for a modern healthcare facility equipped with advanced infrastructure systems.',
    isFeatured: true
  },
  {
    slug: 'educational-campus',
    name: 'Educational Campus',
    location: 'Manama, Bahrain',
    category: 'Educational',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    desc: 'Development of educational buildings providing modern learning environments and sustainable infrastructure.',
    isFeatured: true
  },
  {
    slug: 'the-oryx-tower',
    name: 'The Oryx Tower',
    location: 'Riyadh, KSA',
    category: 'Commercial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    desc: 'A 78-story landmark featuring a kinetic wind-harvesting exterior design.',
    isFeatured: false
  },
  {
    slug: 'skyline-viaduct-expansion',
    name: 'Skyline Viaduct Expansion',
    location: 'Dubai, UAE',
    category: 'Infrastructure',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    desc: 'Seamless structural extension of high-speed transit networks over busy corridors.',
    isFeatured: false
  }
];
