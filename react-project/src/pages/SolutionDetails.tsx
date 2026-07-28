import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Download, 
  Layers, 
  ShieldCheck, 
  Shield,
  Globe,
  Activity, 
  Award, 
  HardHat,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  Send,
  CheckCircle2,
  FileText,
  Building2
} from 'lucide-react';
import { detailSolutions, DetailSolution } from '../data';
import { downloadCompanyProfile } from '../utils/profileDownloader';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { FloatingWireframe } from '../components/FloatingWireframe';
import { CountryFlag } from '../components/CountryFlag';

export function SolutionDetails() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const setQuoteModalOpen = useQuoteModal();
  
  // Find current solution
  const currentSolution = detailSolutions.find(s => s.slug === slug);

  // Gallery simulation states
  // Scenario can be: 'default' (uses multiple images), 'single' (uses 1 image), 'none' (uses 0 images/fallback)
  
  
  // Slider states
  
  
  
  
  // Parallax / mouse states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Profile download status
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Solution Quote Form State
  const [fullName, setFullName] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please provide a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const dateStr = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const saved = safeGetItem('maabany_quote_submissions');
    const existing = saved ? JSON.parse(saved) : [];

    const newSub = {
      id: 'q-' + Date.now(),
      fullName,
      phone: `${phoneCountryCode} ${phone}`,
      email,
      message: message ? `[Solution: ${currentSolution?.title}] ${message}` : `[Solution: ${currentSolution?.title}] Direct solution quote request`,
      submittedAt: dateStr
    };

    safeSetItem('maabany_quote_submissions', JSON.stringify([newSub, ...existing]));
    navigate('/thank-you');
  };

  // Auto-play timer ref
  

  // Scroll to top on page or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Mouse Parallax Coordinate Generator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      downloadCompanyProfile();
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  // Get other solutions to show in the recommendations grid
  const otherSolutions = React.useMemo(() => {
    // Groups definitions
    const civilGroup = ['civil-solutions', 'commercial-buildings', 'residential-buildings', 'industrial-buildings-warehouses', 'prefabricated-steel-structures'];
    const infraGroup = ['infrastructure-earthworks', 'grading-excavation', 'underground-utilities', 'roadworks-paving'];
    const fitOutGroup = ['fit-out-solutions'];
    const mepGroup = ['mep-solutions', 'fire-fighting-systems', 'hvac-systems', 'plumbing'];
    const lowCurrentGroup = ['low-current-solutions', 'light-current-solutions', 'cctv-systems', 'data-network-solutions', 'access-control-systems', 'parking-management-systems', 'smart-home-solutions'];
    const fmGroup = ['facility-management'];

    // Determine current active group
    let currentGroup: string[] = [];
    if (civilGroup.includes(slug || '')) currentGroup = civilGroup;
    else if (infraGroup.includes(slug || '')) currentGroup = infraGroup;
    else if (mepGroup.includes(slug || '')) currentGroup = mepGroup;
    else if (lowCurrentGroup.includes(slug || '')) currentGroup = lowCurrentGroup;
    else if (fitOutGroup.includes(slug || '')) currentGroup = fitOutGroup;
    else if (fmGroup.includes(slug || '')) currentGroup = fmGroup;

    // Filter detailSolutions
    // If the active solution is part of a multi-item group, show other items in that same group first
    let related = detailSolutions.filter(s => s.slug !== slug && currentGroup.includes(s.slug));

    // Exclude duplicates or aliases from recommendations
    related = related.filter(s => {
      if (s.slug === 'light-current-solutions' && slug !== 'low-current-solutions') return false;
      return true;
    });

    // If we have fewer than 4 related items, pad with the main solution categories
    if (related.length < 4) {
      const mainSlugs = ['civil-solutions', 'fit-out-solutions', 'infrastructure-earthworks', 'low-current-solutions', 'facility-management'];
      const mains = detailSolutions.filter(s => 
        s.slug !== slug && 
        mainSlugs.includes(s.slug) && 
        !currentGroup.includes(s.slug)
      );
      related = [...related, ...mains];
    }

    return related.slice(0, 4);
  }, [slug]);

  // Swipe gesture tracking variables
  let touchStartX = 0;
  let touchEndX = 0;



  const handleSwipe = () => {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      // Swipe Left (Next Image)
    } else if (touchEndX - touchStartX > threshold) {
      // Swipe Right (Previous Image)
    }
  };

  if (!currentSolution) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2">Solution Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6 max-w-sm">
          The engineering solution you are looking for does not exist or has been relocated in our dynamic repository.
        </p>
        <Link 
          to="/solutions" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#EA8A22] hover:bg-[#EA8A22]/90 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Solutions
        </Link>
      </div>
    );
  }

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={currentSolution.title}
        categoryBadge="Solutions"
        heroImage={currentSolution.image}
        breadcrumbs={
          <>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/solutions">Solutions</Link>
            <span>/</span>
            <span>{currentSolution.title}</span>
          </>
        }
      />

      {/* 2. Scenario Interactive Selector Panel (UX Detail for Testing) */}

      {/* 3. Image Gallery Component (REMOVED AS PER USER REQUEST) */}

      {/* 4. Solution Description & Side-by-Side Inquiry Form (Matches Design Image) */}
      <section className="py-12 md:py-20 lg:py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Overview & Description */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#EA8A22]" />
                <span className="text-xs font-mono font-bold text-[#EA8A22] uppercase tracking-widest">
                  OVERVIEW
                </span>
              </div>
               
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase leading-tight font-mono">
                {currentSolution.aboutTitle ? currentSolution.aboutTitle : `ABOUT ${currentSolution.title}`}
              </h2>
               
              <div className="space-y-6 text-neutral-600 font-normal leading-relaxed text-base md:text-lg">
                <p>
                  {currentSolution.aboutDesc}
                </p>
                <p>
                  At Maabany, we utilize state-of-the-art technologies and robust engineering methodologies to ensure that every stage of our work complies with the highest international protocols of quality, safety, and modern performance standards.
                </p>
              </div>
            </div>

            {/* Right Column: Floating Inquiry Card (Matching exact UI in attached image) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
                {/* Top-Right Soft Orange Ambient Glow */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#EA8A22]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Form Header */}
                <div className="space-y-1.5 pb-6 border-b border-neutral-100 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase font-mono tracking-tight">
                      ASK ABOUT THIS SOLUTION
                    </h3>
                    <div className="p-2.5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22]">
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                    We're here to help. Complete the form and our experts will contact you soon.
                  </p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-5 relative z-10">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Khalid Al-Otaibi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-neutral-50/70 border p-3.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400/80 transition-all ${
                        formErrors.fullName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15' 
                          : 'border-neutral-200/90 focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Two Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-neutral-50/70 border p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400/80 transition-all ${
                          formErrors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15' 
                            : 'border-neutral-200/90 focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                        PHONE NUMBER *
                      </label>
                      <div className={`relative flex items-center bg-neutral-50/70 border rounded-xl transition-all w-full ${
                        formErrors.phone 
                          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15' 
                          : 'border-neutral-200/90 focus-within:border-[#EA8A22] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#EA8A22]/15'
                      }`}>
                        <div className="flex items-center gap-1.5 pl-3 pr-2 border-r border-neutral-200 select-none shrink-0">
                          <CountryFlag countryCode={phoneCountryCode} />
                          <select
                            value={phoneCountryCode}
                            onChange={(e) => setPhoneCountryCode(e.target.value)}
                            className="bg-transparent border-none text-xs font-mono text-neutral-700 focus:ring-0 focus:outline-none cursor-pointer p-0 pr-2 font-bold"
                            aria-label="Country phone code"
                          >
                            <option value="+966">+966</option>
                            <option value="+20">+20</option>
                            <option value="+218">+218</option>
                            <option value="+971">+971</option>
                          </select>
                        </div>
                        <input
                          type="tel"
                          placeholder="50 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 bg-transparent p-3 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400/80 focus:outline-none"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* How Can We Help? (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                      HOW CAN WE HELP? (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you'd like to know or discuss..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-neutral-50/70 border border-neutral-200/90 p-3.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15 text-neutral-800 placeholder-neutral-400/80 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#EA8A22] hover:bg-[#d97c19] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/35 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    SEND MESSAGE &rarr;
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 The Maabany Standard Section */}
      <section 
        id="why-us" 
        className="bg-white border-t border-neutral-200/60 relative z-10 py-12 md:py-20 lg:py-24 overflow-hidden"
      >
        {/* Floating 3D Hyperboloid / Wireframe Dome */}
        <div className="absolute -right-8 top-8 w-64 h-64 opacity-25 pointer-events-none hidden lg:block">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#EA8A22" />
        </div>

        <div className="absolute inset-0 bg-blueprint opacity-[0.06] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#142b52] font-mono text-xs uppercase font-bold tracking-widest block">
              THE MAABANY STANDARD
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight font-mono">
              ENGINEERED FOR SUPREMACY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: '3D LASER METROLOGY',
                desc: 'Using advanced millimetric scanners during foundation phases to avoid structural shifting or tilt propagation.',
                icon: HardHat
              },
              {
                num: '02',
                title: 'LEED CERTIFIED BUILDS',
                desc: 'Specializing in carbon-capture concrete formulations, thermal insulation shells, and active solar arrays.',
                icon: Award
              },
              {
                num: '03',
                title: 'TOTAL RISK CONTAINMENT',
                desc: 'Unmatched site safety algorithms with zero fatal records over millions of consecutive structural hours.',
                icon: Shield
              },
              {
                num: '04',
                title: 'SAUDI TIER-1 DELIVERY',
                desc: 'Accredited for heavy state industrial tenders, smart smart-city horizons, and national defense hubs.',
                icon: Globe
              },
            ].map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.01, 
                    boxShadow: "0 20px 40px -15px rgba(234, 138, 34, 0.15)" 
                  }}
                  className="bg-white border border-neutral-200/80 p-8 rounded-[28px] relative overflow-hidden transition-all duration-300 group hover:border-[#EA8A22] cursor-pointer flex flex-col justify-between"
                >
                  {/* Diagonal sweep glow */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-25 -translate-x-[150%] group-hover-sweep pointer-events-none z-20" />

                  {/* Top row: Icon + Number */}
                  <div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 transition-all duration-300 shadow-xs group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[#EA8A22]/20">
                        <IconComponent className="w-6 h-6 transition-transform duration-300" />
                      </div>
                      
                      <span className="text-4xl font-extrabold text-neutral-200/80 font-mono transition-all duration-500 group-hover:text-[#EA8A22]/30 group-hover:-translate-y-1 group-hover:translate-x-1 block">
                        {reason.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 mb-3 tracking-tight uppercase font-mono group-hover:text-[#EA8A22] transition-colors duration-300 relative z-10">
                      {reason.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 leading-relaxed font-normal group-hover:text-neutral-700 transition-colors duration-300 relative z-10">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Bottom Accent Orange Bar */}
                  <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-gradient-to-r from-[#EA8A22] to-[#ffaa44] transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Other Services Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#142b52] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">DISCOVER MORE</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-none font-mono">
                Explore Related Solutions
              </h2>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherSolutions.map((sol, index) => (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#EA8A22] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative"
              >
                {/* Trigger entire card click */}
                <Link to={`/solutions/${sol.slug}`} className="absolute inset-0 z-20" />
                
                {/* Thin orange border and lighting on hover */}
                <div className="absolute inset-0 border-2 border-[#EA8A22]/0 group-hover:border-[#EA8A22] transition-colors duration-500 rounded-3xl pointer-events-none z-30" />
                
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={sol.image} 
                    alt={sol.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 uppercase font-mono transition-colors group-hover:text-[#EA8A22] line-clamp-1 mb-2">
                      {sol.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-4">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-neutral-50 overflow-hidden mt-12 z-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="bg-[#0a0f1d] border border-neutral-800/80 p-10 md:p-16 rounded-[32px] shadow-2xl relative overflow-hidden group">
            {/* Premium Construction & Engineering Background Image */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80" 
                alt="Construction and Engineering" 
                className="w-full h-full object-cover opacity-[0.28] mix-blend-luminosity scale-[1.03] group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/75 via-[#0a0f1d]/40 to-[#0a0f1d]/20" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1d]/30" />
            </div>
            <div className="absolute inset-0 translate-x-[-150%] skew-x-[-25deg] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#EA8A22]/15 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Redesigned Architectural & Engineering Blueprint Background */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] pointer-events-none select-none overflow-hidden opacity-[0.22] lg:opacity-[0.28]">
              {/* Subtle pulsing/drawing animation styles */}
              <style>{`
                @keyframes blueprintDraw {
                  0% { stroke-dashoffset: 1200; }
                  30% { stroke-dashoffset: 1200; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes blueprintDot {
                  0%, 100% { transform: scale(1); opacity: 0.3; }
                  50% { transform: scale(1.5); opacity: 0.95; }
                }
                @keyframes blueprintFade {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 0.8; }
                }
                .bp-line-draw {
                  stroke-dasharray: 1200;
                  stroke-dashoffset: 1200;
                  animation: blueprintDraw 9s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
                }
                .bp-pulse-dot {
                  transform-origin: center;
                  animation: blueprintDot 4s ease-in-out infinite;
                }
                .bp-fade-slow {
                  animation: blueprintFade 6s ease-in-out infinite;
                }
              `}</style>

              {/* Layer 1: Additional Technical Grid Tick-marks */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid-ticks" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <line x1="0" y1="20" x2="4" y2="20" stroke="white" strokeWidth="0.5" opacity="0.15" />
                    <line x1="20" y1="0" x2="20" y2="4" stroke="white" strokeWidth="0.5" opacity="0.15" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid-ticks)" />
              </svg>

              {/* Layer 2: Drawing Content */}
              <div className="absolute inset-0 flex items-center justify-end pr-4">
                <svg
                  viewBox="0 0 700 600"
                  className="w-full h-full max-w-none transform translate-x-12 translate-y-8 scale-105"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Structural Steel Frame & Diagonal Bracing */}
                  <g className="bp-line-draw" strokeWidth="1" stroke="white">
                    {/* Horizontal Girders / Beams */}
                    <line x1="50" y1="140" x2="650" y2="140" strokeWidth="1.5" />
                    <line x1="50" y1="150" x2="650" y2="150" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="50" y1="130" x2="650" y2="130" strokeWidth="0.75" />
                    
                    <line x1="50" y1="380" x2="650" y2="380" strokeWidth="1.5" />
                    <line x1="50" y1="390" x2="650" y2="390" strokeWidth="0.5" strokeDasharray="2,2" />
                    
                    {/* Vertical Truss Columns */}
                    <rect x="180" y="80" width="30" height="440" strokeDasharray="4,4" strokeWidth="0.75" />
                    <rect x="480" y="80" width="30" height="440" strokeDasharray="4,4" strokeWidth="0.75" />
                    
                    {/* Cross Structural Steel Framing (X-Bracing) */}
                    <line x1="180" y1="140" x2="480" y2="380" strokeWidth="1.2" />
                    <line x1="480" y1="140" x2="180" y2="380" strokeWidth="1.2" />
                    
                    {/* Minor Truss lines */}
                    <line x1="180" y1="260" x2="480" y2="260" strokeWidth="0.75" strokeDasharray="4,2" />
                    <line x1="330" y1="140" x2="330" y2="380" strokeWidth="0.75" strokeDasharray="8,4" />
                    
                    {/* Isometric Building Structure Outlines */}
                    <path d="M 400,430 L 520,380 L 640,430 L 520,480 Z" strokeWidth="1" />
                    <path d="M 400,310 L 520,260 L 640,310 L 520,360 Z" strokeWidth="1" />
                    <line x1="400" y1="310" x2="400" y2="430" strokeWidth="1" />
                    <line x1="520" y1="260" x2="520" y2="380" strokeWidth="1.5" />
                    <line x1="640" y1="310" x2="640" y2="430" strokeWidth="1" />
                  </g>

                  {/* Layer 3: Floor Plan details */}
                  <g className="bp-fade-slow" stroke="white" strokeWidth="0.75" opacity="0.7">
                    {/* Interior Wall partitions */}
                    <path d="M 80,180 L 220,180 L 220,290 L 360,290 L 360,420" />
                    
                    {/* Door Arc and Swing Indicator */}
                    <path d="M 220,250 A 40,40 0 0,1 260,210" strokeDasharray="3,3" />
                    <line x1="220" y1="250" x2="220" y2="210" />
                    
                    {/* Foundation / Pillar Blocks */}
                    <rect x="75" y="175" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="215" y="175" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="215" y="285" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="355" y="285" width="10" height="10" fill="white" fillOpacity="0.25" />
                  </g>

                  {/* Layer 4: Engineering Annotations & Dimensions */}
                  <g stroke="#EA8A22" strokeWidth="0.75" opacity="0.9">
                    {/* Horizontal dimension bounds */}
                    <line x1="180" y1="60" x2="480" y2="60" />
                    <line x1="180" y1="54" x2="180" y2="66" />
                    <line x1="480" y1="54" x2="480" y2="66" />
                    
                    {/* Vertical dimension bounds */}
                    <line x1="120" y1="140" x2="120" y2="380" />
                    <line x1="114" y1="140" x2="126" y2="140" />
                    <line x1="114" y1="380" x2="126" y2="380" />
                    
                    {/* Annotation text markings */}
                    <text x="330" y="50" fill="#EA8A22" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1" stroke="none">
                      L = 12.00 m
                    </text>
                    <text x="95" y="265" fill="#EA8A22" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1" stroke="none" transform="rotate(-90 95 265)">
                      H = 6.40 m
                    </text>
                    
                    {/* Section Cut Line Indicator */}
                    <path d="M 60,200 L 640,200" strokeDasharray="14,4,2,4" strokeWidth="1" />
                    <path d="M 60,192 L 60,208 M 640,192 L 640,208" strokeWidth="1.5" />
                    <text x="50" y="204" fill="#EA8A22" fontSize="11" fontFamily="monospace" fontWeight="bold" stroke="none">S-01</text>
                    <text x="652" y="204" fill="#EA8A22" fontSize="11" fontFamily="monospace" fontWeight="bold" stroke="none">S-01</text>

                    {/* Angular slope annotation */}
                    <path d="M 230,140 A 50,50 0 0,1 265,175" fill="none" strokeWidth="0.75" />
                    <text x="280" y="160" fill="#EA8A22" fontSize="9" fontFamily="monospace" stroke="none">38.6°</text>
                  </g>

                  {/* Pulsing blueprint nodes */}
                  <g fill="#EA8A22" opacity="0.85">
                    <circle cx="180" cy="140" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '180px 140px' }} />
                    <circle cx="480" cy="140" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '480px 140px' }} />
                    <circle cx="330" cy="140" r="2.5" className="bp-pulse-dot" style={{ transformOrigin: '330px 140px' }} />
                    <circle cx="180" cy="380" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '180px 380px' }} />
                    <circle cx="480" cy="380" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '480px 380px' }} />
                    <circle cx="330" cy="380" r="2.5" className="bp-pulse-dot" style={{ transformOrigin: '330px 380px' }} />
                  </g>
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-7">
                <span className="text-[#EA8A22] font-mono text-xs tracking-[0.25em] font-bold uppercase block mb-3">READY TO START?</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                  Let's Build Your <br />Next Project Together
                </h2>
              </div>
              
              {/* Right buttons column */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full px-8 py-5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/40 flex items-center justify-center gap-2 font-mono group cursor-pointer"
                >
                  Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={handleDownloadProfile}
                  disabled={downloadingProfile}
                  className="w-full px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-mono group backdrop-blur-sm disabled:opacity-55 cursor-pointer"
                >
                  {downloadingProfile ? (
                    <span className="animate-pulse">Preparing file...</span>
                  ) : downloadSuccess ? (
                    <span className="text-[#EA8A22]">Profile Downloaded ✔</span>
                  ) : (
                    <>
                      Download Company Profile 
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(300%) skewX(-25deg); }
        }
      `}</style>
    </div>
  );
}
