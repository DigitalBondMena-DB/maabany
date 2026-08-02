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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">The global construction industry is responsible for nearly 40% of energy-related carbon emissions. At Maabany, we believe that sustainable engineering is no longer an optional luxury—it is an absolute technical imperative.</p>

      <h2>Pioneering Carbon-Negative Formulations</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Historically, reinforced concrete has been the primary contributor to a building's embodied carbon footprint. To tackle this challenge directly, Maabany’s materials science team has partnered with leading research institutes to deploy low-carbon and carbon-negative concrete formulations. By substituting traditional Portland cement with industrial byproducts like fly ash, slag, and silica fume, we have successfully reduced concrete-associated emissions by up to 45% without sacrificing tensile strength or curing times.</p>

      <blockquote class="my-8 p-6 bg-neutral-50 border-l-4 border-primary rounded-r-2xl font-mono text-sm text-neutral-800 italic">
        "Our mission is to achieve structural permanence while leaving the absolute minimum carbon footprint on our planet."
        <span class="block mt-2 font-bold font-sans not-italic text-xs text-primary">— Eng. Khalid Al-Faisal, Chief Materials Engineer</span>
      </blockquote>

      <h2>Advanced Structural Optimization</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Beyond material composition, structural optimization plays a critical role in decarbonization. Utilizing generative design algorithms, our civil engineers can analyze millions of structural configurations to identify the most material-efficient pathways. This approach allows us to reduce the volume of steel and concrete required for large columns, beams, and slabs by up to 15%, lowering both material costs and transport emissions.</p>

      <h3>Key Decarbonization Milestones</h3>
      <ul class="list-disc pl-6 space-y-2 text-base md:text-lg text-neutral-600 font-light mb-6">
        <li>42% net reduction in structural embodied carbon footprint.</li>
        <li>100% compliance with Saudi Green Initiative environmental standards.</li>
        <li>Integration of dynamic thermal breaks and high-performance insulation.</li>
      </ul>

      <h2>Lifetime Operational Efficiency</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Embodied carbon is only half the equation. Our decarbonization strategy also targets the operational lifespan of the structure. By integrating high-performance thermal breaks, smart double-skin facades, and automated climate control systems, we ensure that Maabany-engineered developments operate with net-zero ready efficiency from day one.</p>
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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">When constructing skyscrapers exceeding 50 stories, there is absolutely zero margin for error. A variance of even a few millimeters at the foundation level can escalate into significant structural deviations at the crown.</p>

      <h2>The Advent of AI-Powered Metrology</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Traditional survey methods rely on periodic manual checks that occur after significant concrete pours are completed. While highly precise, these audits are retrospective and can lead to costly remediation if variations are discovered. To address this, Maabany has deployed a live, AI-guided metrology framework across our high-rise construction portfolio.</p>

      <h2>Corrective Automation and Precision Pours</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">When the system detects a micro-deviation due to wind loads, temperature changes, or concrete curing shrinkage, it alerts the pouring crew and offers immediate structural adjustments. This real-time feedback loop ensures that heavy columns are aligned with sub-millimeter precision, maximizing structural safety and speeding up the overall erection timeline by 18%.</p>

      <h3>Spatial Accuracy Standards</h3>
      <ul class="list-disc pl-6 space-y-2 text-base md:text-lg text-neutral-600 font-light mb-6">
        <li>Sub-millimeter laser scanner arrays transmitting at 100Hz.</li>
        <li>Instant spatial coordinate mapping against BIM Digital Twins.</li>
        <li>Automated alert protocols for column pouring crews.</li>
      </ul>
    `,
    date: '10 July 2026',
    lastUpdated: '12 July 2026',
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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">Skyscrapers have long been defined by steel and concrete. However, a new architectural revolution is underway: mass timber hybrid structures that combine the organic beauty of wood with the rigid stability of structural steel.</p>

      <h2>Why Hybrid Mass Timber?</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Mass timber products, such as Cross-Laminated Timber (CLT) and Glued Laminated Timber (Glulam), are engineered wood panels that offer exceptional strength-to-weight ratios. When paired strategically with a structural steel skeleton, mass timber can support high-load high-rises while sequestering carbon inside the very fabric of the building.</p>

      <h2>Rigorous Safety and Fire Testing</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">One of the most frequent questions regarding wood skyscrapers is fire safety. Contrary to popular belief, mass timber behaves highly predictably in fire conditions. When exposed to extreme temperatures, the outer layer of engineered wood chars, forming a natural protective barrier that insulates the inner structural core.</p>
    `,
    date: '08 July 2026',
    lastUpdated: '10 July 2026',
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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">Smart cities demand seamless infrastructure integration between civil grids, power sub-stations, and individual building management networks.</p>

      <h2>Grid Interoperability</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Our MEP systems communicate dynamically with municipal power and water grids to balance energy consumption during peak periods and minimize waste.</p>
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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">Off-site prefabrication reduces site congestions, ensures strict factory quality control, and accelerates project schedules dramatically.</p>

      <h2>Factory-Controlled Precision</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">By manufacturing heavy steel structural modules in controlled indoor facilities, we eliminate weather delays and achieve zero-defect tolerances.</p>
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
      <p class="lead text-lg md:text-xl text-neutral-800 font-normal leading-relaxed mb-6">Achieving LEED Platinum status in extreme desert heat requires advanced double-skin shading facades, solar energy arrays, and greywater recovery loops.</p>

      <h2>Desert Climate Adaptation</h2>
      <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">Our HVAC and façade engineering teams collaborate to reduce solar heat gain while maximizing natural daylight distribution.</p>
    `,
    date: '18 June 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    category: 'Sustainability',
    author: 'Eng. Khalid Al-Faisal'
  }
];
