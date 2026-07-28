import { Service, signal } from '@angular/core';
import { Solution, Testimonial, ClientLogo, Branch, StatItem } from '../models/home.models';

@Service()
export class HomeDataService {
  readonly solutions = signal<Solution[]>([
    {
      id: 'infrastructure',
      title: 'Infrastructure Engineering',
      desc: 'Building modern highways, complex bridges, and smart transport hubs configured for sustainable metropolitan expansion.',
      details: 'Our infrastructure projects utilize carbon-negative concrete formulations, real-time sensory health arrays, and modern load analysis modeling to guarantee 100+ year lifespans.',
      stats: '45+ Public Projects Completed',
      features: ['Bridge & Tunnel Construction', 'Highway Expansion Systems', 'Smart Traffic Networks', 'Environmental Impact Mitigation'],
      icon: 'Building2',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-amber-500 to-orange-600'
    },
    {
      id: 'mep',
      title: 'MEP & Smart Automation',
      desc: 'Advanced mechanical, electrical, and plumbing engineering integrated with modern building automation.',
      details: 'Full spectrum MEP solutions covering HVAC systems, high-voltage power distribution, smart IoT sensor networks, and automated fire suppression arrays.',
      stats: '120+ Industrial Installations',
      features: ['HVAC & Climate Control', 'High-Voltage Distribution', 'Building Automation (BMS)', 'Fire & Life Safety Systems'],
      icon: 'Cpu',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'civil',
      title: 'Commercial & High-Rise Construction',
      desc: 'Architectural execution for commercial towers, luxury residential complexes, and mixed-use urban developments.',
      details: 'Precision steel framing, seismic dampening systems, smart facade glass, and certified sustainable building standards (LEED Platinum compliant).',
      stats: '$2.4B+ Asset Portfolio Executed',
      features: ['Seismic Resilient Framing', 'Curtain Wall Facades', 'LEED Platinum Integration', 'Structural BIM Modeling'],
      icon: 'HardHat',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-emerald-500 to-teal-600'
    }
  ]);

  readonly testimonials = signal<Testimonial[]>([
    {
      id: 1,
      name: 'Eng. Khalid Al-Mansoor',
      title: 'Chief Technical Officer',
      company: 'Riyadh Urban Developments',
      content: 'Maabany delivered our commercial tower ahead of schedule while adhering to extreme safety and seismic resiliency standards. Their MEP integration is flawless.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Client'
    },
    {
      id: 2,
      name: 'Dr. Tariq Al-Hassan',
      title: 'Infrastructure Program Director',
      company: 'Gulf Mega Projects Authority',
      content: 'The level of engineering precision and smart automation Maabany brought to our highway infrastructure project sets a new benchmark in the Middle East.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'Government Partner'
    }
  ]);

  readonly clients = signal<ClientLogo[]>([
    { name: 'ROSHN Development', text: 'ROSHN', icon: 'HomeIcon' },
    { name: 'Red Sea Global', text: 'RED SEA GLOBAL', icon: 'Shield' },
    { name: 'NEOM Smart Cities', text: 'NEOM', icon: 'Globe' },
    { name: 'Saudi Aramco', text: 'ARAMCO', icon: 'Factory' },
    { name: 'Emaar Properties', text: 'EMAAR', icon: 'Building2' }
  ]);

  readonly branches = signal<Branch[]>([
    {
      code: 'SA',
      name: 'Riyadh Headquarters',
      country: 'Saudi Arabia',
      phonePrefix: '+966',
      phone: '+966 11 456 7890',
      address: 'King Fahd Road, Olaya District, Riyadh',
      email: 'saudi@maabany.com'
    },
    {
      code: 'EG',
      name: 'Cairo Branch',
      country: 'Egypt',
      phonePrefix: '+20',
      phone: '+20 2 2790 1234',
      address: '90th Street North, New Cairo, Cairo',
      email: 'egypt@maabany.com'
    },
    {
      code: 'LY',
      name: 'Benghazi Branch',
      country: 'Libya',
      phonePrefix: '+218',
      phone: '+218 61 223 4567',
      address: 'Al-Dawael Street, Benghazi',
      email: 'libya@maabany.com'
    }
  ]);

  readonly stats = signal<StatItem[]>([
    { id: 'years', label: 'Years of Excellence', value: 25, suffix: '+', description: 'Established legacy in construction & engineering' },
    { id: 'projects', label: 'Projects Completed', value: 450, suffix: '+', description: 'Across commercial, industrial, & public sectors' },
    { id: 'countries', label: 'Regional Branches', value: 3, suffix: '', description: 'Saudi Arabia, Egypt, and Libya' },
    { id: 'satisfaction', label: 'Client Satisfaction', value: 99, suffix: '%', description: 'Guaranteed quality & strict deadline compliance' }
  ]);
}
