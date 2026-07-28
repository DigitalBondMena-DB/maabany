/**
 * Dynamic Corporate PDF Profile Generator for Maabany Construction & Engineering
 * Generates and downloads a valid, high-fidelity PDF document directly in the browser.
 * Fully aligned with the real Maabany Company Profile PDF.
 */

export function downloadCompanyProfile() {
  const encoder = new TextEncoder();
  
  // Helper to generate text drawing operations
  function escapePdfText(text: string): string {
    return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Define PDF pages and contents
  const pagesData = [
    // --- PAGE 1: COVER PAGE ---
    {
      title: "MAABANY",
      subtitle: "INTEGRATED BUILDING SOLUTIONS",
      sections: [
        { type: "rect", x: 0, y: 780, w: 595, h: 62, r: 0.917, g: 0.541, b: 0.133 }, // Orange top bar
        { type: "rect", x: 0, y: 0, w: 45, h: 842, r: 0.118, g: 0.227, b: 0.541 },   // Blue left bar
        { type: "rect", x: 45, y: 0, w: 550, h: 120, r: 0.118, g: 0.227, b: 0.541 }, // Blue bottom bar
        { type: "text", font: "H1", size: 36, x: 80, y: 560, color: "0.118 0.227 0.541", text: "MAABANY" },
        { type: "text", font: "H2", size: 14, x: 80, y: 535, color: "0.917 0.541 0.133", text: "INTEGRATED BUILDING SOLUTIONS" },
        { type: "text", font: "H1", size: 28, x: 80, y: 440, color: "0.2 0.2 0.2", text: "COMPANY PROFILE" },
        { type: "text", font: "H2", size: 12, x: 80, y: 390, color: "0.4 0.4 0.4", text: "EPC - Fit out - MEP - Fire Protection - HVAC - Low Current" },
        { type: "text", font: "H2", size: 11, x: 80, y: 360, color: "0.5 0.5 0.5", text: "Delivering top-quality solutions across KSA, Egypt, and Libya." },
        { type: "text", font: "H2", size: 10, x: 80, y: 200, color: "0.4 0.4 0.4", text: "Established in 2013" },
        { type: "text", font: "H1", size: 11, x: 80, y: 80, color: "1.0 1.0 1.0", text: "BUILDING BEYOND EXPECTATIONS" },
        { type: "text", font: "H2", size: 9, x: 80, y: 60, color: "0.8 0.8 0.8", text: "Website: www.maabany.com" }
      ]
    },
    // --- PAGE 2: ABOUT US, MISSION, VISION, VALUES ---
    {
      title: "ABOUT US",
      subtitle: "Mabany Engineering Services",
      sections: [
        { type: "rect", x: 45, y: 810, w: 505, h: 3, r: 0.917, g: 0.541, b: 0.133 }, // Orange line
        { type: "text", font: "H1", size: 18, x: 45, y: 770, color: "0.118 0.227 0.541", text: "ABOUT US - MAABANY ENGINEERING" },
        
        { type: "text", font: "H2", size: 10, x: 45, y: 730, color: "0.2 0.2 0.2", text: "MAABANY established in 2013, is a leading engineering firm specializing in EPC" },
        { type: "text", font: "H2", size: 10, x: 45, y: 712, color: "0.2 0.2 0.2", text: "(Engineering, Procurement, and Construction) focusing on Fit out, M E P, fire protection," },
        { type: "text", font: "H2", size: 10, x: 45, y: 694, color: "0.2 0.2 0.2", text: "H V A C, Electricity Low Current and full finishing services including new construction" },
        { type: "text", font: "H2", size: 10, x: 45, y: 676, color: "0.2 0.2 0.2", text: "retrofit and maintenance projects." },
        
        { type: "text", font: "H2", size: 10, x: 45, y: 640, color: "0.2 0.2 0.2", text: "With branches in Egypt, Saudi Arabia, and Libya, we deliver top-quality solutions" },
        { type: "text", font: "H2", size: 10, x: 45, y: 622, color: "0.2 0.2 0.2", text: "(End to End) that meet the highest industry standards, driven by a team of experienced" },
        { type: "text", font: "H2", size: 10, x: 45, y: 604, color: "0.2 0.2 0.2", text: "professionals and a commitment to advanced technology." },

        { type: "text", font: "H1", size: 12, x: 45, y: 550, color: "0.917 0.541 0.133", text: "MISSION" },
        { type: "text", font: "H2", size: 10, x: 45, y: 530, color: "0.3 0.3 0.3", text: "To provide innovative, sustainable, and cost-effective engineering solutions that enhance" },
        { type: "text", font: "H2", size: 10, x: 45, y: 515, color: "0.3 0.3 0.3", text: "operational efficiency and meet the highest standards of quality." },

        { type: "text", font: "H1", size: 12, x: 45, y: 465, color: "0.917 0.541 0.133", text: "VISION" },
        { type: "text", font: "H2", size: 10, x: 45, y: 445, color: "0.3 0.3 0.3", text: "To be recognized as a leading provider of MEP (Mechanical, Electrical, and Plumbing)" },
        { type: "text", font: "H2", size: 10, x: 45, y: 430, color: "0.3 0.3 0.3", text: "engineering designs and comprehensive 360 degree project solutions in the MENA region." },

        { type: "text", font: "H1", size: 12, x: 45, y: 380, color: "0.917 0.541 0.133", text: "VALUES" },
        { type: "text", font: "H1", size: 10, x: 45, y: 360, color: "0.118 0.227 0.541", text: "Sustainability:" },
        { type: "text", font: "H2", size: 10, x: 130, y: 360, color: "0.3 0.3 0.3", text: "Commitment to reducing environmental impact through energy-efficient designs." },
        
        { type: "text", font: "H1", size: 10, x: 45, y: 340, color: "0.118 0.227 0.541", text: "Cost-efficiency:" },
        { type: "text", font: "H2", size: 10, x: 130, y: 340, color: "0.3 0.3 0.3", text: "Delivering solutions that optimize operational costs." },
        
        { type: "text", font: "H1", size: 10, x: 45, y: 320, color: "0.118 0.227 0.541", text: "Excellence:" },
        { type: "text", font: "H2", size: 10, x: 130, y: 320, color: "0.3 0.3 0.3", text: "Providing tailored, high-quality engineering and construction solutions." },

        { type: "text", font: "H1", size: 12, x: 45, y: 260, color: "0.917 0.541 0.133", text: "ORGANIZATIONAL STRUCTURE" },
        { type: "text", font: "H2", size: 9, x: 45, y: 240, color: "0.2 0.2 0.2", text: "1. Operations Unit (Fitout Projects, MEP Contracting, Low Current Engineering)" },
        { type: "text", font: "H2", size: 9, x: 45, y: 225, color: "0.2 0.2 0.2", text: "2. Business Support Unit (IT Department, HR, Finance, Procurement)" },
        { type: "text", font: "H2", size: 9, x: 45, y: 210, color: "0.2 0.2 0.2", text: "3. Technical Unit (Pre-office Sales, Cost Estimations, Technical Engineers)" },
        { type: "text", font: "H2", size: 9, x: 45, y: 195, color: "0.2 0.2 0.2", text: "4. Quality and Safety Unit (QHSE Standards Management)" },
        { type: "text", font: "H2", size: 9, x: 45, y: 180, color: "0.2 0.2 0.2", text: "5. Sales Unit (Account Managers and Business Development)" },

        { type: "rect", x: 45, y: 80, w: 505, h: 1, r: 0.8, g: 0.8, b: 0.8 },
        { type: "text", font: "H2", size: 9, x: 45, y: 60, color: "0.5 0.5 0.5", text: "Maabany Integrated Building Solutions" },
        { type: "text", font: "H2", size: 9, x: 520, y: 60, color: "0.5 0.5 0.5", text: "Page 2" }
      ]
    },
    // --- PAGE 3: OUR INTEGRATED SOLUTIONS ---
    {
      title: "SOLUTIONS",
      subtitle: "Core Technical Divisions",
      sections: [
        { type: "rect", x: 45, y: 810, w: 505, h: 3, r: 0.917, g: 0.541, b: 0.133 },
        { type: "text", font: "H1", size: 18, x: 45, y: 770, color: "0.118 0.227 0.541", text: "OUR INTEGRATED SOLUTIONS" },

        { type: "text", font: "H1", size: 11, x: 45, y: 730, color: "0.917 0.541 0.133", text: "1. CIVIL SOLUTIONS" },
        { type: "text", font: "H2", size: 9, x: 55, y: 715, color: "0.3 0.3 0.3", text: "- Commercial & Residential Buildings (Houses, Villas, Offices, Malls)" },
        { type: "text", font: "H2", size: 9, x: 55, y: 702, color: "0.3 0.3 0.3", text: "- Prefabricated Steel Structures (Sheds, Warehouses, Industrial structures)" },
        { type: "text", font: "H2", size: 9, x: 55, y: 689, color: "0.3 0.3 0.3", text: "- Infrastructure Rehabilitation & Service Buildings" },

        { type: "text", font: "H1", size: 11, x: 45, y: 655, color: "0.917 0.541 0.133", text: "2. FITOUT SOLUTIONS" },
        { type: "text", font: "H2", size: 9, x: 55, y: 640, color: "0.3 0.3 0.3", text: "- Bespoke Interior Fit-Out & Space Optimization (Aesthetic and Functional designs)" },
        { type: "text", font: "H2", size: 9, x: 55, y: 627, color: "0.3 0.3 0.3", text: "- Custom Joinery, MEP Integration, and architectural styling" },

        { type: "text", font: "H1", size: 11, x: 45, y: 593, color: "0.917 0.541 0.133", text: "3. MEP (ELECTROMECHANICAL) SOLUTIONS" },
        { type: "text", font: "H2", size: 9, x: 55, y: 578, color: "0.3 0.3 0.3", text: "- Firefighting Solutions: Wet sprinklers, Water Mist, Foam, CO2, FM200, Novec Suppression" },
        { type: "text", font: "H2", size: 9, x: 55, y: 565, color: "0.3 0.3 0.3", text: "- HVAC Solutions: High-efficiency heating, ventilation systems, cooling & maintenance" },
        { type: "text", font: "H2", size: 9, x: 55, y: 552, color: "0.3 0.3 0.3", text: "- Plumbing Solutions: Sewerage, Lift stations, Septic/Aeration tanks, Effluent pumping" },

        { type: "text", font: "H1", size: 11, x: 45, y: 518, color: "0.917 0.541 0.133", text: "4. LIGHT CURRENT SOLUTIONS" },
        { type: "text", font: "H2", size: 9, x: 55, y: 503, color: "0.3 0.3 0.3", text: "- Data Network Solution: Active/Passive LAN/WAN, optical fiber, network maintenance" },
        { type: "text", font: "H2", size: 9, x: 55, y: 490, color: "0.3 0.3 0.3", text: "- Closed Circuit Television (CCTV): Camera layouts, configuration, video metrics" },
        { type: "text", font: "H2", size: 9, x: 55, y: 477, color: "0.3 0.3 0.3", text: "- Access Control Systems: Card/Biometric entry, keypad locks, hotel smart integration" },
        { type: "text", font: "H2", size: 9, x: 55, y: 464, color: "0.3 0.3 0.3", text: "- Parking Management Systems: Auto rising barriers, guidance loops, license plate recognition" },
        { type: "text", font: "H2", size: 9, x: 55, y: 451, color: "0.3 0.3 0.3", text: "- Smart Home Solutions: Multi-tier automation, smart metering, IPTV systems, energy monitors" },

        { type: "text", font: "H1", size: 11, x: 45, y: 417, color: "0.917 0.541 0.133", text: "5. FACILITY MANAGEMENT" },
        { type: "text", font: "H2", size: 10, x: 55, y: 402, color: "0.3 0.3 0.3", text: "Reactive and planned preventative maintenance across market sectors including banking," },
        { type: "text", font: "H2", size: 10, x: 55, y: 387, color: "0.3 0.3 0.3", text: "industrial, commercial, pharmaceutical, and retail environments." },
        { type: "text", font: "H2", size: 9, x: 55, y: 372, color: "0.4 0.4 0.4", text: "HVAC systems, Fire suppression, Electrical power systems, Back-up Generators, UPS" },

        { type: "rect", x: 45, y: 80, w: 505, h: 1, r: 0.8, g: 0.8, b: 0.8 },
        { type: "text", font: "H2", size: 9, x: 45, y: 60, color: "0.5 0.5 0.5", text: "Maabany Integrated Building Solutions" },
        { type: "text", font: "H2", size: 9, x: 520, y: 60, color: "0.5 0.5 0.5", text: "Page 3" }
      ]
    },
    // --- PAGE 4: OUR CO-PARTNERS & TOP CLIENTS ---
    {
      title: "PARTNERS & CLIENTS",
      subtitle: "Ecosystem of trust",
      sections: [
        { type: "rect", x: 45, y: 810, w: 505, h: 3, r: 0.917, g: 0.541, b: 0.133 },
        { type: "text", font: "H1", size: 18, x: 45, y: 770, color: "0.118 0.227 0.541", text: "OUR VALUED PARTNERS & CLIENTS" },

        { type: "text", font: "H1", size: 12, x: 45, y: 730, color: "0.917 0.541 0.133", text: "STRATEGIC CO-PARTNERS (TECHNOLOGY & EQUIPMENT)" },
        { type: "text", font: "H2", size: 10, x: 45, y: 710, color: "0.2 0.2 0.2", text: "We collaborate with the world's leading hardware and systems providers:" },
        
        { type: "text", font: "H2", size: 9, x: 45, y: 685, color: "0.3 0.3 0.3", text: "- Viking, Tyco, Ansul, Notifier Fire Systems, SFFECO, Bavaria, Honeywell" },
        { type: "text", font: "H2", size: 9, x: 45, y: 670, color: "0.3 0.3 0.3", text: "- Schneider Electric, ABB, Bosch, Hikvision, Axis Communications, Huawei" },
        { type: "text", font: "H2", size: 9, x: 45, y: 655, color: "0.3 0.3 0.3", text: "- Carrier, Hochiki, Leviton, Hub, Optima, Sika, Potter, Samsung, Vivotek, FAAC" },
        { type: "text", font: "H2", size: 9, x: 45, y: 640, color: "0.3 0.3 0.3", text: "- LG Electronics, Elsewedy Electric, Salto Systems, LDA Audio Tech, Fonestar" },

        { type: "text", font: "H1", size: 12, x: 45, y: 580, color: "0.917 0.541 0.133", text: "PRESTIGIOUS CORPORATE CLIENTS" },
        { type: "text", font: "H2", size: 10, x: 45, y: 560, color: "0.2 0.2 0.2", text: "Trusted by top developers, pharmaceutical leaders, and global entities:" },

        { type: "text", font: "H2", size: 9, x: 45, y: 535, color: "0.3 0.3 0.3", text: "- SANOFI, EVA PHARMA, SERVIER, Pfizer, Jamjoom Pharma, Apex Pharma" },
        { type: "text", font: "H2", size: 9, x: 45, y: 520, color: "0.3 0.3 0.3", text: "- Hyundai Engineering, Mars, JICA (Japan International Cooperation Agency)" },
        { type: "text", font: "H2", size: 9, x: 45, y: 505, color: "0.3 0.3 0.3", text: "- Nippon Koei, SOMA Hotel, Angkor Eye, SOMA Group, Tamer Group, Savola" },
        { type: "text", font: "H2", size: 9, x: 45, y: 490, color: "0.3 0.3 0.3", text: "- Vinci Construction, Makani, KAFD (King Abdullah Financial District), Aedas" },
        { type: "text", font: "H2", size: 9, x: 45, y: 475, color: "0.3 0.3 0.3", text: "- SOMA Farm, Crown, Particular, TCC (Thrustboring), Tamimi Group" },

        { type: "text", font: "H1", size: 11, x: 45, y: 410, color: "0.118 0.227 0.541", text: "REACH & PRESENCE" },
        { type: "text", font: "H2", size: 10, x: 45, y: 390, color: "0.3 0.3 0.3", text: "With more than 100 successful engineering and construction projects delivered" },
        { type: "text", font: "H2", size: 10, x: 45, y: 375, color: "0.3 0.3 0.3", text: "seamlessly across Egypt, Kingdom of Saudi Arabia, and Libya." },

        { type: "rect", x: 45, y: 80, w: 505, h: 1, r: 0.8, g: 0.8, b: 0.8 },
        { type: "text", font: "H2", size: 9, x: 45, y: 60, color: "0.5 0.5 0.5", text: "Maabany Integrated Building Solutions" },
        { type: "text", font: "H2", size: 9, x: 520, y: 60, color: "0.5 0.5 0.5", text: "Page 4" }
      ]
    },
    // --- PAGE 5: CONTACT INFORMATION ---
    {
      title: "CONTACT US",
      subtitle: "Global Leadership & Branch Offices",
      sections: [
        { type: "rect", x: 45, y: 810, w: 505, h: 3, r: 0.917, g: 0.541, b: 0.133 },
        { type: "text", font: "H1", size: 18, x: 45, y: 770, color: "0.118 0.227 0.541", text: "CONTACT OUR OFFICES & EXECUTIVE LEADER" },

        { type: "text", font: "H1", size: 12, x: 45, y: 710, color: "0.917 0.541 0.133", text: "EGYPT - CAIRO EXECUTIVE OFFICE" },
        { type: "text", font: "H1", size: 11, x: 45, y: 690, color: "0.2 0.2 0.2", text: "Eng. Mohamed Youssef" },
        { type: "text", font: "H2", size: 10, x: 45, y: 672, color: "0.3 0.3 0.3", text: "Email: Mohamed.youssef@maabany.com" },
        { type: "text", font: "H2", size: 10, x: 45, y: 656, color: "0.3 0.3 0.3", text: "Phone: +20 10 4422 7666" },
        { type: "text", font: "H2", size: 9, x: 45, y: 640, color: "0.4 0.4 0.4", text: "Address: 53 Hassan El Sherif Street, Nasr City, Cairo, Egypt." },

        { type: "text", font: "H1", size: 12, x: 45, y: 570, color: "0.917 0.541 0.133", text: "KINGDOM OF SAUDI ARABIA - JEDDAH OFFICE" },
        { type: "text", font: "H1", size: 11, x: 45, y: 550, color: "0.2 0.2 0.2", text: "Eng. Amir Yahia" },
        { type: "text", font: "H2", size: 10, x: 45, y: 532, color: "0.3 0.3 0.3", text: "Email: Amir.yahia@maabany.com" },
        { type: "text", font: "H2", size: 10, x: 45, y: 516, color: "0.3 0.3 0.3", text: "Phone: +966 54 231 4500" },
        { type: "text", font: "H2", size: 9, x: 45, y: 500, color: "0.4 0.4 0.4", text: "Address: 2923 Al-Sharif Ahmed bin Abdul Muttalib, Al-Salhiya District, Jeddah, KSA." },

        { type: "text", font: "H1", size: 12, x: 45, y: 430, color: "0.917 0.541 0.133", text: "LIBYA - TRIPOLI OFFICE" },
        { type: "text", font: "H2", size: 10, x: 45, y: 410, color: "0.3 0.3 0.3", text: "Email: sales@maabany.com | General Operations Branch" },
        { type: "text", font: "H2", size: 9, x: 45, y: 395, color: "0.4 0.4 0.4", text: "Address: Tripoli Operations Branch, Tripoli, Libya." },

        { type: "text", font: "H1", size: 12, x: 45, y: 330, color: "0.118 0.227 0.541", text: "CENTRAL CHANNELS" },
        { type: "text", font: "H2", size: 10, x: 45, y: 310, color: "0.2 0.2 0.2", text: "General Enquiries: sales@maabany.com" },
        { type: "text", font: "H2", size: 10, x: 45, y: 295, color: "0.2 0.2 0.2", text: "Primary Corporate Portal: www.maabany.com" },

        { type: "text", font: "H1", size: 14, x: 45, y: 220, color: "0.118 0.227 0.541", text: "THANK YOU!" },
        { type: "text", font: "H2", size: 10, x: 45, y: 200, color: "0.3 0.3 0.3", text: "We look forward to enabling your high-scale engineering visions." },

        { type: "rect", x: 45, y: 80, w: 505, h: 1, r: 0.8, g: 0.8, b: 0.8 },
        { type: "text", font: "H2", size: 9, x: 45, y: 60, color: "0.5 0.5 0.5", text: "Maabany Integrated Building Solutions" },
        { type: "text", font: "H2", size: 9, x: 520, y: 60, color: "0.5 0.5 0.5", text: "Page 5" }
      ]
    }
  ];

  // We compile the dynamic PDF bytes array using exact structural boundaries
  const pdfParts: Uint8Array[] = [];
  
  // Keep track of our objects
  const objects: { id: number; data: Uint8Array }[] = [];
  let nextObjId = 1;

  function createObject(content: string | Uint8Array): number {
    const id = nextObjId++;
    const data = typeof content === "string" ? encoder.encode(content) : content;
    objects.push({ id, data });
    return id;
  }

  // Define objects we need
  // 1. Catalog -> Pages list (2 0 R)
  // 2. Pages -> kids list (3.. N)
  // Page objects will start at index 3, let's keep references

  const pageCount = pagesData.length;
  const pageObjIds: number[] = [];
  const pageStreamIds: number[] = [];

  // Pre-allocate page IDs so they can reference Catalog/Pages and streams
  for (let i = 0; i < pageCount; i++) {
    pageObjIds.push(0); // filled later
    pageStreamIds.push(0); // filled later
  }

  // 1. Catalog
  const catalogId = nextObjId++; // we know it is 1
  // 2. Pages
  const pagesListId = nextObjId++; // we know it is 2

  // Create stream contents for pages and assign IDs
  for (let i = 0; i < pageCount; i++) {
    const page = pagesData[i];
    
    // Generate text/graphic operations for the page content
    const ops: string[] = [];
    page.sections.forEach((sec) => {
      if (sec.type === "rect") {
        // Draw rectangle: x y w h re f
        ops.push(`${sec.r} ${sec.g} ${sec.b} rg`);
        ops.push(`${sec.x} ${sec.y} ${sec.w} ${sec.h} re f`);
      } else if (sec.type === "text") {
        // Draw text
        ops.push(`q`);
        ops.push(`${sec.color} rg`);
        ops.push(`BT`);
        ops.push(`/${sec.font} ${sec.size} Tf`);
        ops.push(`1 0 0 1 ${sec.x} ${sec.y} Tm`);
        ops.push(`(${escapePdfText(sec.text || "")}) Tj`);
        ops.push(`ET`);
        ops.push(`Q`);
      }
    });

    const contentStream = ops.join("\n");
    const streamBytes = encoder.encode(contentStream);
    const streamObjContent = encoder.encode(
      `<< /Length ${streamBytes.length} >>\nstream\n`
    );
    const streamEndContent = encoder.encode(`\nendstream`);
    
    // Combine to full stream object bytes
    const totalBytes = new Uint8Array(
      streamObjContent.length + streamBytes.length + streamEndContent.length
    );
    totalBytes.set(streamObjContent, 0);
    totalBytes.set(streamBytes, streamObjContent.length);
    totalBytes.set(streamEndContent, streamObjContent.length + streamBytes.length);

    // Save stream object
    const streamObjId = nextObjId++;
    pageStreamIds[i] = streamObjId;
    objects.push({ id: streamObjId, data: totalBytes });
  }

  // Create Page objects and resource dictionary
  const resourcesId = nextObjId++;
  const resourcesContent = 
    `<< /Font << \n` +
    `/H1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n` +
    `/H2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n` +
    `>> >>`;
  objects.push({ id: resourcesId, data: encoder.encode(resourcesContent) });

  for (let i = 0; i < pageCount; i++) {
    const pageId = nextObjId++;
    pageObjIds[i] = pageId;
    
    const pageContent = 
      `<< /Type /Page\n` +
      `/Parent ${pagesListId} 0 R\n` +
      `/Resources ${resourcesId} 0 R\n` +
      `/MediaBox [0 0 595 842]\n` +
      `/Contents ${pageStreamIds[i]} 0 R\n` +
      `>>`;
    
    objects.push({ id: pageId, data: encoder.encode(pageContent) });
  }

  // Now create Catalog and Pages list contents
  const catalogContent = `<< /Type /Catalog /Pages ${pagesListId} 0 R >>`;
  const pagesListContent = 
    `<< /Type /Pages\n` +
    `/Kids [${pageObjIds.map(id => `${id} 0 R`).join(" ")}]\n` +
    `/Count ${pageCount}\n` +
    `>>`;

  // Insert catalog and pages objects in the correct slots (Catalog = 1, Pages = 2)
  objects.unshift({ id: pagesListId, data: encoder.encode(pagesListContent) });
  objects.unshift({ id: catalogId, data: encoder.encode(catalogContent) });

  // Sort objects by ID just to be clean
  objects.sort((a, b) => a.id - b.id);

  // Now we compute the offsets of each object to construct the xref table
  // Headers first
  const headerContent = encoder.encode(`%PDF-1.5\n%\n`);
  let currentOffset = headerContent.length;
  
  const xrefOffsets: number[] = [];
  
  // Pre-calculate positions
  const formattedObjects: Uint8Array[] = [];
  
  objects.forEach((obj) => {
    xrefOffsets[obj.id] = currentOffset;
    
    const prefix = encoder.encode(`${obj.id} 0 obj\n`);
    const suffix = encoder.encode(`\nendobj\n`);
    
    const fullObjBytes = new Uint8Array(
      prefix.length + obj.data.length + suffix.length
    );
    fullObjBytes.set(prefix, 0);
    fullObjBytes.set(obj.data, prefix.length);
    fullObjBytes.set(suffix, prefix.length + obj.data.length);
    
    formattedObjects.push(fullObjBytes);
    currentOffset += fullObjBytes.length;
  });

  // Construct xref table
  const xrefHeader = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  const xrefEntries = objects.map((obj) => {
    const padOffset = String(xrefOffsets[obj.id]).padStart(10, "0");
    return `${padOffset} 00000 n \n`;
  }).join("");

  const trailer = 
    `trailer\n` +
    `<< /Size ${objects.length + 1}\n` +
    `/Root ${catalogId} 0 R\n` +
    `>>\n` +
    `startxref\n` +
    `${currentOffset}\n` +
    `%%EOF`;

  const xrefBytes = encoder.encode(xrefHeader + xrefEntries + trailer);

  // Compile final array of Uint8Arrays
  const finalPdfParts: Uint8Array[] = [headerContent];
  formattedObjects.forEach(b => finalPdfParts.push(b));
  finalPdfParts.push(xrefBytes);

  // Create Blob and trigger file download
  const blob = new Blob(finalPdfParts, { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Maabany_Company_Profile.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
