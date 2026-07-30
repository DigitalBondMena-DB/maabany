export interface SolutionDetail {
  slug: string;
  title: string;
  desc: string;
  aboutTitle: string;
  aboutDesc: string;
  image: string;
}

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

export const SOLUTIONS_DATA = {
  categories: [
    {
      title: "Civil Solutions",
      slug: "civil-solutions",
      desc: "Delivering comprehensive civil construction services for residential, commercial, and industrial projects with a focus on quality, safety, and long-term durability.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Commercial Buildings", slug: "commercial-buildings", desc: "State-of-the-art office towers, retail complexes, and commercial facilities.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
        { title: "Residential Buildings", slug: "residential-buildings", desc: "Luxury residential estates, modern multi-family complexes, and sustainable communities.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
        { title: "Industrial Buildings & Warehouses", slug: "industrial-buildings-warehouses", desc: "Robotic gigafactories, logistics centers, and heavy-duty industrial warehouses.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" },
        { title: "Prefabricated Steel Structures", slug: "prefabricated-steel-structures", desc: "High-precision pre-engineered and prefabricated steel frame systems.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Fit-Out Solutions",
      slug: "fit-out-solutions",
      desc: "Creating functional and premium interior spaces through complete fit-out solutions, from structural finishes to high-quality architectural detailing.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    },
    {
      title: "Infrastructure & Earthworks",
      slug: "infrastructure-earthworks",
      desc: "Delivering heavy earthmoving, site preparation, and deep underground utility networks to lay the robust groundwork for mega-projects and urban expansions.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Site Grading & Excavation", slug: "grading-excavation", desc: "Precision land clearing, deep excavation, and massive earthmoving.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" },
        { title: "Underground Utilities", slug: "underground-utilities", desc: "Complete piping networks, water mains, and deep drainage systems.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" },
        { title: "Roadworks & Paving", slug: "roadworks-paving", desc: "Heavy-duty asphalt paving, highway access roads, and infrastructure networks.", image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "MEP Solutions",
      slug: "mep-solutions",
      desc: "Providing integrated Mechanical, Electrical, and Plumbing (MEP) systems that ensure efficient, reliable, and sustainable building performance.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Fire Fighting Systems", slug: "fire-fighting-systems", desc: "Active fire suppression, smart sprinklers, and early warning alarm networks.", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80" },
        { title: "HVAC Systems", slug: "hvac-systems", desc: "High-performance heating, ventilation, and air conditioning systems.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" },
        { title: "Plumbing", slug: "plumbing", desc: "Comprehensive plumbing engineering, water loops, and smart drainage.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Low Current Solutions",
      slug: "low-current-solutions",
      desc: "Delivering intelligent low-current systems including security, surveillance, networking, access control, parking management, and smart automation to create safer, smarter, and more connected buildings.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "CCTV Systems", slug: "cctv-systems", desc: "High-definition video surveillance and intelligent analytics for physical spaces.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" },
        { title: "Data Network Solutions", slug: "data-network-solutions", desc: "Fast, secure, and robust enterprise networking backbones.", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" },
        { title: "Access Control Systems", slug: "access-control-systems", desc: "Comprehensive entry management featuring biometrics and RFID tracking.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
        { title: "Parking Management Systems", slug: "parking-management-systems", desc: "Automated entry barriers, smart payment kiosks, and guidance lasers.", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80" },
        { title: "Smart Home Solutions", slug: "smart-home-solutions", desc: "Seamless smart home systems unifying climate, lighting, and audio.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Facility Management",
      slug: "facility-management",
      desc: "Providing comprehensive facility management services that maximize building performance through preventive maintenance, technical operations, and efficient asset management.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    }
  ],
  details: [
    {
      slug: 'civil-solutions',
      title: 'Civil Solutions',
      desc: 'Building strong foundations through comprehensive civil construction services for residential, commercial, and industrial developments.',
      aboutTitle: 'About Civil Solutions',
      aboutDesc: 'Maabany delivers comprehensive civil engineering and construction services tailored to residential, commercial, and industrial developments. From structural works and site preparation to reinforced concrete and infrastructure projects, our experienced team ensures every project is executed with precision, quality, and the highest safety standards.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'commercial-buildings',
      title: 'Commercial Buildings',
      desc: 'Designing and constructing state-of-the-art office towers, retail complexes, and commercial facilities.',
      aboutTitle: 'About Commercial Buildings',
      aboutDesc: 'Our Commercial Buildings division focuses on creating modern, highly functional, and architecturally striking commercial spaces. We utilize advanced materials, high-performance structural systems, and sustainable construction practices to deliver commercial real estate that drives productivity and enhances urban landscapes.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'residential-buildings',
      title: 'Residential Buildings',
      desc: 'Crafting luxury residential estates, modern multi-family complexes, and sustainable communities.',
      aboutTitle: 'About Residential Buildings',
      aboutDesc: 'We construct premium residential environments that prioritize comfort, aesthetic brilliance, and long-term durability. From high-end private villas to multi-story luxury apartments, our work integrates smart technologies and eco-efficient architectural elements designed for exceptional contemporary living.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'industrial-buildings-warehouses',
      title: 'Industrial Buildings & Warehouses',
      desc: 'Constructing robotic gigafactories, logistics centers, and heavy-duty industrial warehouses.',
      aboutTitle: 'About Industrial Buildings & Warehouses',
      aboutDesc: 'Industrial projects require a deep understanding of technical parameters, structural loads, and precise climate constraints. We design and construct industrial spaces featuring large spans, high-load concrete floor plates, vibration-isolated foundation beds, and advanced facility ventilation.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'prefabricated-steel-structures',
      title: 'Prefabricated Steel Structures',
      desc: 'Engineering high-precision pre-engineered and prefabricated steel frame systems for rapid deployment.',
      aboutTitle: 'About Prefabricated Steel Structures',
      aboutDesc: 'Maabany engineered prefabricated steel systems enable fast-track project schedules without sacrificing load capacities or architectural expression. We manage the entire lifecycle from detailed structural engineering and precision shop detailing to on-site robotic lifting and bolting.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'fit-out-solutions',
      title: 'Fit-Out Solutions',
      desc: 'We transform interior environments into modern, functional, and visually refined spaces through complete fit-out solutions.',
      aboutTitle: 'About Fit-Out Solutions',
      aboutDesc: 'We transform interior environments into modern, functional, and visually refined spaces through complete fit-out solutions. Our expertise includes architectural finishes, ceilings, flooring, partitions, lighting, and custom interior detailing for commercial, hospitality, healthcare, and office projects.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'infrastructure-earthworks',
      title: 'Infrastructure & Earthworks',
      desc: 'Delivering heavy earthmoving, site preparation, and deep underground utility networks to lay the robust groundwork for mega-projects.',
      aboutTitle: 'About Infrastructure & Earthworks',
      aboutDesc: 'Our Infrastructure and Earthworks division specializes in major land development, site grading, deep excavation, and the installation of complex underground utility networks. We prepare the critical foundation for all major structural developments and urban expansions.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'grading-excavation',
      title: 'Site Grading & Excavation',
      desc: 'Precision land clearing, deep excavation, and massive earthmoving for large-scale development.',
      aboutTitle: 'About Site Grading & Excavation',
      aboutDesc: 'Our grading and excavation operations utilize heavy machinery and laser-guided topographical mapping to prepare sites accurately and efficiently, handling millions of cubic meters of earth for foundations and landscaping.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'underground-utilities',
      title: 'Underground Utilities',
      desc: 'Complete piping networks, water mains, and deep drainage systems.',
      aboutTitle: 'About Underground Utilities',
      aboutDesc: 'We construct deep underground infrastructure connecting clean water supplies, storm drainage networks, high-pressure gas conduits, and electrical duct banks designed for long-term urban stability.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'roadworks-paving',
      title: 'Roadworks & Paving',
      desc: 'Heavy-duty asphalt paving, highway access roads, and infrastructure networks.',
      aboutTitle: 'About Roadworks & Paving',
      aboutDesc: 'Engineering smooth, durable, high-load asphalt and concrete pavements. Our roadworks team builds highway interchanges, industrial access arterials, and urban streetscapes engineered for high traffic resilience.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'mep-solutions',
      title: 'MEP Solutions',
      desc: 'Our Mechanical, Electrical, and Plumbing services integrate advanced building systems that maximize efficiency, sustainability, and long-term operational performance.',
      aboutTitle: 'About MEP Solutions',
      aboutDesc: 'Our Mechanical, Electrical, and Plumbing services integrate advanced building systems that maximize efficiency, sustainability, and long-term operational performance. We deliver complete MEP solutions designed to support modern infrastructure and smart buildings.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'fire-fighting-systems',
      title: 'Fire Fighting Systems',
      desc: 'Installing world-class active fire suppression, smart sprinklers, and early warning alarm networks.',
      aboutTitle: 'About Fire Fighting Systems',
      aboutDesc: 'Maabany designs and installs premium life safety and active fire fighting configurations. Our services span wet/dry pipe sprinkler systems, clean agent gas suppressants for server rooms, smart smoke control, and highly intelligent, addressable fire alarm panel integrations.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'hvac-systems',
      title: 'HVAC Systems',
      desc: 'Deploying high-performance heating, ventilation, and premium air conditioning systems.',
      aboutTitle: 'About HVAC Systems',
      aboutDesc: 'We design and construct high-performance, energy-efficient HVAC networks. Our specialists build custom chilled water loops, VRF (Variable Refrigerant Flow) systems, air handling layouts, and computerized ventilation controls customized for healthcare and industrial facilities.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'plumbing',
      title: 'Plumbing Solutions',
      desc: 'Delivering comprehensive plumbing engineering, high-efficiency water loops, and smart drainage.',
      aboutTitle: 'About Plumbing Solutions',
      aboutDesc: 'Our plumbing division manages design, load calculation, and structural installation of high-efficiency water supply networks, sanitary drainage circuits, and graywater treatment units for enterprise and residential megaprojects.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'low-current-solutions',
      title: 'Low Current Solutions',
      desc: 'Delivering intelligent low-current systems including security, surveillance, networking, access control, parking management, and smart automation.',
      aboutTitle: 'About Low Current Solutions',
      aboutDesc: 'Maabany provides intelligent low-current systems that enhance security, connectivity, and automation. Our integrated solutions include surveillance systems, structured cabling, access control, parking management, and smart building technologies designed for today\'s connected environments.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'cctv-systems',
      title: 'CCTV Systems',
      desc: 'High-definition video surveillance and intelligent analytics to monitor and secure physical spaces.',
      aboutTitle: 'About CCTV Systems',
      aboutDesc: 'Our CCTV Systems integrate advanced hardware and software to deliver round-the-clock visual security. With high-definition IP cameras, thermal imaging, automated object tracking, and smart behavior analysis, we ensure comprehensive spatial oversight.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'data-network-solutions',
      title: 'Data Network Solutions',
      desc: 'Fast, secure, and robust networking backbones designed for high-capacity corporate communication.',
      aboutTitle: 'About Data Network Solutions',
      aboutDesc: 'We engineer state-of-the-art corporate IT networks. Our structured cabling layouts, high-bandwidth optical backbones, enterprise routers, and secure campus switching layers establish the flawless data infrastructure modern businesses depend on.',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'access-control-systems',
      title: 'Access Control Systems',
      desc: 'Comprehensive entry management featuring biometrics, RFID tracking, and digital access logs.',
      aboutTitle: 'About Access Control Systems',
      aboutDesc: 'Maabany biometric and card access controls offer multi-tier security mapping. We deploy facial detection, advanced fingerprint terminals, rapid smart turnstiles, and automated doors integrated with local fire alarms for ultimate emergency egress safety.',
      image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'parking-management-systems',
      title: 'Parking Management Systems',
      desc: 'Automated entry, smart payment structures, and dynamic car guidance networks.',
      aboutTitle: 'About Parking Management Systems',
      aboutDesc: 'We transform vehicle access into an ultra-convenient process. Our solutions feature dynamic ANPR (Automatic Number Plate Recognition) cameras, fast automatic rising barriers, ticket-issuing kiosks, and real-time guidance displays mapping open bays.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'smart-home-solutions',
      title: 'Smart Home Solutions',
      desc: 'Seamless smart home systems unifying climate control, lighting, and audio networks.',
      aboutTitle: 'About Smart Home Solutions',
      aboutDesc: 'Create a fully responsive smart home. We integrate voice interfaces, automated light dimming arrays, occupancy-based climate profiles, motorized curtain tracking, and remote security views, easily managed on a unified screen.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      slug: 'facility-management',
      title: 'Facility Management',
      desc: 'Providing comprehensive facility management services that maximize building performance through preventive maintenance, technical operations, and efficient asset management.',
      aboutTitle: 'About Facility Management',
      aboutDesc: 'Providing comprehensive facility management services that maximize building performance through preventive maintenance, technical operations, and efficient asset management across Saudi Arabia.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
    }
  ]
};
