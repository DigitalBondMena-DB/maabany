export interface BlogPostItem {
  slug: string;
  title: string;
  desc: string;
  content: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  isFeatured?: boolean;
}

export const BLOGS_DATA: BlogPostItem[] = [
  {
    slug: 'decarbonizing-massive-structural-frameworks',
    title: 'Decarbonizing Massive Structural Frameworks',
    desc: 'How Maabany is pioneering the use of eco-efficient materials to cut construction carbon loads by 42%.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">The global construction industry is responsible for nearly 40% of energy-related carbon emissions. At Maabany, we believe that sustainable engineering is no longer an optional luxury—it is an absolute technical imperative.</p>
      
      <h3 class="text-2xl font-bold font-mono text-neutral-900 mt-8 mb-4">Pioneering Carbon-Negative Formulations</h3>
      <p class="text-sm text-neutral-600 font-light leading-relaxed mb-6">Historically, reinforced concrete has been the primary contributor to a building's embodied carbon footprint. To tackle this challenge directly, Maabany's materials science team has partnered with leading research institutes to deploy low-carbon and carbon-negative concrete formulations.</p>
    `,
    date: '12 July 2026',
    lastUpdated: '14 July 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    category: 'Sustainability',
    author: 'Eng. Khalid Al-Faisal',
    isFeatured: true
  },
  {
    slug: 'integrating-real-time-ai-in-heavy-metrology',
    title: 'Integrating Real-time AI in Heavy Metrology',
    desc: 'Using laser-guided sensory arrays during foundation pours to detect microscopic alignment variations.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">When constructing skyscrapers exceeding 50 stories, there is absolutely zero margin for error. A variance of even a few millimeters at the foundation level can escalate into significant structural deviations at the crown.</p>
    `,
    date: '10 July 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    author: 'Sarah Lindqvist'
  },
  {
    slug: 'the-future-of-hybrid-wood-steel-skyscraper-design',
    title: 'The Future of Hybrid Wood-Steel Skyscraper design',
    desc: 'Reviewing recent safety and structural stress evaluations of our Riyadh structural towers.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">Skyscrapers have long been defined by steel and concrete. However, a new architectural revolution is underway: mass timber hybrid structures that combine the organic beauty of wood with the rigid stability of structural steel.</p>
    `,
    date: '08 July 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Engineering',
    author: 'Dr. Ameena Al-Jamil'
  },
  {
    slug: 'smart-city-infrastructure-and-mep-integration',
    title: 'Smart City Infrastructure & MEP Integration',
    desc: 'Connecting automated municipal grids with high-density building management systems across KSA developments.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">Smart cities demand seamless infrastructure integration between civil grids, power sub-stations, and individual building management networks.</p>
    `,
    date: '02 July 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Infrastructure',
    author: 'Eng. Tariq Mansoor'
  },
  {
    slug: 'modular-prefabrication-in-heavy-industrial-projects',
    title: 'Modular Prefabrication in Heavy Industrial Projects',
    desc: 'Accelerating logistics hub construction timelines by 35% using off-site steel assembly.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">Off-site prefabrication reduces site congestions, ensures strict factory quality control, and accelerates project schedules dramatically.</p>
    `,
    date: '25 June 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    category: 'Engineering',
    author: 'Eng. Omar Al-Hassan'
  },
  {
    slug: 'leed-platinum-standards-for-commercial-towers',
    title: 'LEED Platinum Standards for Commercial Towers',
    desc: 'Key architectural and MEP strategies to achieve highest green building ratings in desert climates.',
    content: `
      <p class="text-base font-light leading-relaxed mb-6">Achieving LEED Platinum status in extreme desert heat requires advanced double-skin shading facades, solar energy arrays, and greywater recovery loops.</p>
    `,
    date: '18 June 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    category: 'Sustainability',
    author: 'Eng. Khalid Al-Faisal'
  }
];
