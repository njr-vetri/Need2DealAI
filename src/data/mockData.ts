export interface Provider {
  id: string;
  name: string;
  businessName: string;
  rating: number;
  reviewsCount: number;
  reliability: number;
  categories: string[];
  location: string;
  description: string;
  completedOrders: number;
  responseRate: number;
  typicalDelivery: string;
  verified: boolean;
  services: string[];
  badges: string[];
  contactEmail: string;
  phone: string;
}

export interface Offer {
  id: string;
  requirementId: string;
  providerId: string;
  price: number;
  deliveryDays: number;
  matchScore: number;
  status: 'pending' | 'shortlisted' | 'accepted' | 'declined';
  specs: string;
  warranty: string;
  terms: string;
  notes: string;
  submittedAt: string;
  riskAssessment: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  matchRationale?: string;
  isCheapest?: boolean;
  isFastest?: boolean;
  isBestMatch?: boolean;
}

export interface Requirement {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  budget: number;
  deadline: string;
  location: string;
  description: string;
  preferences: string[];
  status: 'draft' | 'active' | 'in_negotiation' | 'agreement_pending' | 'ordered' | 'completed' | 'closed';
  offersCount: number;
  postedAt: string;
  buyerName: string;
  buyerOrg: string;
  buyerLocation: string;
  lastUpdated: string;
  matchedProvidersCount?: number;
}

export interface Agreement {
  id: string;
  requirementId: string;
  offerId: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  buyerEmail: string;
  providerId: string;
  providerName: string;
  providerBusiness: string;
  productTitle: string;
  quantity: number;
  unit: string;
  agreedPrice: number;
  deadline: string;
  location: string;
  terms: string[];
  notes: string;
  status: 'awaiting_provider' | 'awaiting_buyer' | 'agreed' | 'cancelled';
  buyerSignedAt?: string;
  providerSignedAt?: string;
  createdAt: string;
}

export interface OrderMilestone {
  step: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
  note?: string;
}

export interface Order {
  id: string;
  agreementId: string;
  requirementId: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  providerId: string;
  providerName: string;
  title: string;
  quantity: number;
  unit: string;
  agreedPrice: number;
  deliveryDate: string;
  status: 'agreement_confirmed' | 'provider_started' | 'processing' | 'ready' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'completed';
  currentStepIndex: number;
  timeline: OrderMilestone[];
  lastUpdate: string;
  delayRisk: boolean;
  trackingNumber?: string;
  carrier?: string;
  latestProviderNote?: string;
}

export interface NotificationItem {
  id: string;
  role: 'buyer' | 'provider' | 'both';
  title: string;
  message: string;
  type: 'offer' | 'agreement' | 'order' | 'reminder' | 'message';
  read: boolean;
  timestamp: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  requirementId?: string;
  offerId?: string;
  senderRole: 'buyer' | 'provider';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface CatalogProduct {
  id: string;
  providerId: string;
  name: string;
  category: string;
  description: string;
  startingPrice: number;
  typicalDelivery: string;
  availability: 'In Stock' | 'Made to Order' | 'High Capacity';
  specifications: string[];
}

export interface CustomerRecord {
  id: string;
  providerId: string;
  buyerName: string;
  organization: string;
  email: string;
  location: string;
  totalSpent: number;
  ordersCount: number;
  activeAgreementsCount: number;
  lastActive: string;
}

// Initial verified providers
export const initialProviders: Provider[] = [
  {
    id: 'p1',
    name: 'Ramanathan K.',
    businessName: 'Chennai PrintWorks',
    rating: 4.9,
    reviewsCount: 142,
    reliability: 96,
    categories: ['Apparel', 'Print & Packaging'],
    location: 'Chennai, Tamil Nadu',
    description: 'Specialized in bulk screen printing, direct-to-garment apparel, promotional merchandise, and sustainable packaging for student fests and enterprises.',
    completedOrders: 184,
    responseRate: 98,
    typicalDelivery: '4-7 days',
    verified: true,
    services: ['220 GSM Cotton Tees', 'Embroidered Hoodies', 'Eco Tote Bags', 'High-Speed Screen Printing'],
    badges: ['Top Reliability', 'Speed Master', 'ISO Certified'],
    contactEmail: 'orders@chennaiprintworks.in',
    phone: '+91 94440 18239'
  },
  {
    id: 'p2',
    name: 'Dr. Arjun Rao',
    businessName: 'Apex Circuit Lab',
    rating: 4.8,
    reviewsCount: 78,
    reliability: 98,
    categories: ['Electronics', 'Custom Fabrication'],
    location: 'Bengaluru, Karnataka',
    description: 'Precision prototyping, custom IoT dev board assemblies, CNC aluminum enclosure fabrication, and rapid turnaround hardware runs.',
    completedOrders: 92,
    responseRate: 95,
    typicalDelivery: '7-12 days',
    verified: true,
    services: ['SMD PCB Assembly', 'ESP32 & STM32 Firmware Flashing', 'CNC Enclosure Milling', 'Quality Thermal Stress Testing'],
    badges: ['Hardware Pro', '100% On-Time', 'Clean Lab'],
    contactEmail: 'contact@apexcircuit.io',
    phone: '+91 80234 56781'
  },
  {
    id: 'p3',
    name: 'Priya Sundaram',
    businessName: 'CampusFab Solutions',
    rating: 4.6,
    reviewsCount: 52,
    reliability: 89,
    categories: ['Apparel', 'Custom Merchandise'],
    location: 'Coimbatore, Tamil Nadu',
    description: 'Direct manufacturer focusing on student-friendly pricing, festival merchandise, sports jerseys, and rapid turnaround event collateral.',
    completedOrders: 64,
    responseRate: 91,
    typicalDelivery: '5-10 days',
    verified: true,
    services: ['Sublimation Jerseys', 'Event Badges', 'Bulk Lanyards', 'Cotton Polos'],
    badges: ['Budget Friendly', 'Student Verified'],
    contactEmail: 'priya@campusfab.com',
    phone: '+91 98941 23450'
  },
  {
    id: 'p4',
    name: 'Vikram Joshi',
    businessName: 'Heritage Paper & Press',
    rating: 4.9,
    reviewsCount: 210,
    reliability: 97,
    categories: ['Print & Packaging'],
    location: 'Chennai, Tamil Nadu',
    description: 'Established offset and digital press for multi-page event journals, foil-stamped certificates, embossed ID cards, and rigid gift boxes.',
    completedOrders: 240,
    responseRate: 99,
    typicalDelivery: '3-6 days',
    verified: true,
    services: ['Offset Booklets', 'Foil Stamped Certificates', 'Hardcover Planners', 'Recycled Kraft Packaging'],
    badges: ['Master Printer', 'Zero Defect', 'Carbon Neutral'],
    contactEmail: 'vikram@heritagepress.co',
    phone: '+91 98400 99881'
  },
  {
    id: 'p5',
    name: 'Mohammed Farooq',
    businessName: 'Starlight Stage & AV',
    rating: 4.7,
    reviewsCount: 95,
    reliability: 93,
    categories: ['Event Services'],
    location: 'Hyderabad, Telangana',
    description: 'Complete concert and auditorium grade stage production, truss rigging, digital audio consoles, LED video walls, and certified technicians.',
    completedOrders: 115,
    responseRate: 94,
    typicalDelivery: 'Scheduled Event Date',
    verified: true,
    services: ['Line Array Sound Systems', 'P3 Indoor LED Walls', 'Intelligent Moving Lights', 'On-Site Sound Engineers'],
    badges: ['Concert Grade', 'Backup Redundancy'],
    contactEmail: 'farooq@starlightav.in',
    phone: '+91 99890 33411'
  }
];

// Initial requirements
export const initialRequirements: Requirement[] = [
  {
    id: 'req-1',
    title: '500 custom cotton T-shirts for college symposium',
    category: 'Apparel',
    quantity: 500,
    unit: 'Pieces',
    budget: 80000,
    deadline: '2026-10-18',
    location: 'Anna University Campus, Chennai',
    description: 'Need 500 premium 200-220 GSM combed cotton round-neck t-shirts in Navy Blue with 2-color screen print front logo and sponsor badges on right sleeve. Assorted sizes (S: 80, M: 180, L: 160, XL: 80). Pre-shrunk fabric required.',
    preferences: ['Organic / 100% Combed Cotton', 'Colorfast Guarantee', 'Delivery 2 days before event', 'Sample approval required before run'],
    status: 'active',
    offersCount: 3,
    postedAt: '2026-10-02',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerLocation: 'Chennai, TN',
    lastUpdated: '2 hours ago',
    matchedProvidersCount: 6
  },
  {
    id: 'req-2',
    title: '20 ESP32-S3 IoT dev kits with custom aluminum enclosure',
    category: 'Electronics',
    quantity: 20,
    unit: 'Kits',
    budget: 35000,
    deadline: '2026-10-25',
    location: 'IIT Madras Research Park, Chennai',
    description: 'Need 20 assembled modules with ESP32-S3-WROOM-1, onboard USB-C, 0.96 inch OLED display breakout, and CNC-milled matte black anodized aluminum enclosure with laser engraved port labels.',
    preferences: ['Thermal tested', 'Schematics provided upon bid acceptance', 'Individual anti-static packaging'],
    status: 'active',
    offersCount: 1,
    postedAt: '2026-10-04',
    buyerName: 'Divya Nambiar',
    buyerOrg: 'Autonomous Robotics Club',
    buyerLocation: 'Chennai, TN',
    lastUpdated: 'Yesterday',
    matchedProvidersCount: 3
  },
  {
    id: 'req-3',
    title: '2,500 Hardcover Spiral Student Planners & Lanyards',
    category: 'Print & Packaging',
    quantity: 2500,
    unit: 'Sets',
    budget: 125000,
    deadline: '2026-10-22',
    location: 'SRM Institute, Kattankulathur',
    description: 'Custom academic planners with hard bound matte laminated cover, twin-wire black spiral binding, 120 internal ruled pages (80 GSM natural shade), plus matching satin finish lanyards with metal trigger hooks.',
    preferences: ['Environment friendly paper', 'Foil embossed university crest on cover', 'Delivery to main admin gate'],
    status: 'in_negotiation',
    offersCount: 2,
    postedAt: '2026-09-28',
    buyerName: 'Dr. R. Venkataraman',
    buyerOrg: 'Student Affairs Directorate',
    buyerLocation: 'Kattankulathur, TN',
    lastUpdated: '1 day ago',
    matchedProvidersCount: 4
  },
  {
    id: 'req-4',
    title: 'Complete Auditorium Sound & LED Stage Rigging (2 Days)',
    category: 'Event Services',
    quantity: 1,
    unit: 'Service Package',
    budget: 95000,
    deadline: '2026-11-02',
    location: 'Music Academy Main Hall, Chennai',
    description: 'Two-day sound and lighting setup for national collegiate debate and cultural finals. 16x10ft P3 LED backdrop, 8 wireless lapel/handheld mics, 4-point monitor mix, and experienced live sound operator on-site.',
    preferences: ['Backup mixer on standby', 'Setup complete 6 hours prior to curtain call', 'Insurance coverage included'],
    status: 'agreement_pending',
    offersCount: 2,
    postedAt: '2026-09-25',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerLocation: 'Chennai, TN',
    lastUpdated: '3 hours ago',
    matchedProvidersCount: 5
  },
  {
    id: 'req-5',
    title: '1,000 Custom Eco-Friendly Jute Conference Bags',
    category: 'Apparel',
    quantity: 1000,
    unit: 'Bags',
    budget: 68000,
    deadline: '2026-10-10',
    location: 'Anna University Campus, Chennai',
    description: 'Heavy duty natural jute conference bags with zippered top closure, padded cotton tape handles, internal water bottle holder, and 1-color screen printed symposium emblem.',
    preferences: ['100% Biodegradable treated jute', 'Sample approved in advance', 'Packed in bundles of 50'],
    status: 'ordered',
    offersCount: 3,
    postedAt: '2026-09-20',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerLocation: 'Chennai, TN',
    lastUpdated: 'Just now',
    matchedProvidersCount: 5
  },
  {
    id: 'req-6',
    title: '10x10ft Modular Exhibition Display Booth with Backlit Graphic',
    category: 'Custom Fabrication',
    quantity: 2,
    unit: 'Booths',
    budget: 60000,
    deadline: '2026-11-15',
    location: 'Chennai Trade Centre, Nandambakkam',
    description: 'Lightweight aluminum extrusion frame system with dye-sublimation tension fabric graphic, integrated tool-free locking joints, and wheeled flight carry case.',
    preferences: ['Tool-free assembly in under 20 mins', 'Flame retardant B1 certified fabric'],
    status: 'draft',
    offersCount: 0,
    postedAt: '2026-10-05',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerLocation: 'Chennai, TN',
    lastUpdated: '30 mins ago',
    matchedProvidersCount: 3
  }
];

// Initial offers
export const initialOffers: Offer[] = [
  {
    id: 'off-1',
    requirementId: 'req-1',
    providerId: 'p1', // Chennai PrintWorks
    price: 72000,
    deliveryDays: 6,
    matchScore: 96,
    status: 'pending',
    specs: '210 GSM Super-combed Bio-washed Cotton, 2-color precision screen printing using phthalate-free Plastisol inks. Individual polybag packaging per size.',
    warranty: '100% wash-fastness guarantee (minimum 40 machine washes). Free replacement for any misprint defect.',
    terms: 'Sample piece provided within 48 hours for physical signoff before full batch is printed. Balance due upon delivery inspection.',
    notes: 'We have handled Anna University symposium apparel for 3 consecutive years. We will deliver directly to your campus committee room.',
    submittedAt: '2026-10-03 11:30 AM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Strongest overall fit: ₹8,000 under your ₹80,000 budget, delivers 6 days before your deadline, and holds a 96% reliability score across 180+ apparel runs.',
    isBestMatch: true
  },
  {
    id: 'off-2',
    requirementId: 'req-1',
    providerId: 'p3', // CampusFab Solutions
    price: 64500,
    deliveryDays: 9,
    matchScore: 84,
    status: 'pending',
    specs: '190 GSM 100% Cotton, standard pigment screen print. Bulk packed in boxes of 100.',
    warranty: 'Standard manufacturing defect return within 7 days.',
    terms: '50% advance upon contract confirmation, 50% on dispatch.',
    notes: 'Most economical option. We can keep costs low as we knit the fabric in-house in Tirupur.',
    submittedAt: '2026-10-03 04:15 PM',
    riskAssessment: 'Moderate Risk',
    matchRationale: 'Cheapest bid: Saves ₹15,500 compared to budget, but delivery takes 9 days (closer to deadline) and fabric is slightly lighter (190 GSM).',
    isCheapest: true
  },
  {
    id: 'off-3',
    requirementId: 'req-1',
    providerId: 'p4', // Heritage Paper & Press
    price: 79000,
    deliveryDays: 4,
    matchScore: 91,
    status: 'pending',
    specs: '220 GSM Heavyweight Combed Cotton, high-density screen print with metallic silver sleeve sponsor logos.',
    warranty: 'Full refund or express reprint guarantee.',
    terms: 'Commercial credit terms available for educational institutions.',
    notes: 'Fastest turnaround: We have pre-cut Navy Blue blanks ready in our Chennai warehouse. Can complete printing in 4 working days.',
    submittedAt: '2026-10-04 09:20 AM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Fastest delivery: Ready in just 4 days, highest GSM cotton fabric, but price sits right at your ₹80,000 budget cap.',
    isFastest: true
  },
  {
    id: 'off-4',
    requirementId: 'req-2',
    providerId: 'p2', // Apex Circuit Lab
    price: 31500,
    deliveryDays: 8,
    matchScore: 98,
    status: 'pending',
    specs: 'Original Espressif ESP32-S3 modules, JLC 4-layer PCB with ENIG gold finish, CNC black anodized 6061-T6 aluminum enclosure with laser-etched pinout diagram.',
    warranty: '1-year hardware warranty against component failure; firmware pre-tested with test bench scripts.',
    terms: 'Test sample video demonstration before bulk dispatch.',
    notes: 'We work frequently with IIT Madras incubators and have standard CAD tooling for ESP32 enclosure runs.',
    submittedAt: '2026-10-04 02:40 PM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Near perfect 98% match. Meets exact hardware tolerances, incorporates CNC laser etching, and is ₹3,500 below budget.',
    isBestMatch: true
  },
  {
    id: 'off-5',
    requirementId: 'req-3',
    providerId: 'p4', // Heritage Paper & Press
    price: 118000,
    deliveryDays: 10,
    matchScore: 95,
    status: 'shortlisted',
    specs: 'Hard bound 2.5mm kappa board cover with gold foil stamping, 80 GSM Maplitho acid-free paper, 20mm satin lanyards with quick-release safety clasp.',
    warranty: 'Zero missing page guarantee, inspected on automated collation line.',
    terms: 'Sample dummy delivered for physical approval prior to binding run.',
    notes: 'High volume specialist. We supply planners to 14 universities in South India.',
    submittedAt: '2026-09-30 01:10 PM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Best match for print volume. Meets luxury finish specs while remaining under the ₹1.25L budget.',
    isBestMatch: true
  },
  {
    id: 'off-6',
    requirementId: 'req-4',
    providerId: 'p5', // Starlight Stage & AV
    price: 88000,
    deliveryDays: 12,
    matchScore: 94,
    status: 'accepted',
    specs: '16x10ft P3.91 LED Wall, 2 x JBL VRX932 Line Array clusters, Soundcraft Si Impact 32-ch console, 8 x Sennheiser G4 wireless mics, 12 x LED Wash moving heads.',
    warranty: 'Redundant hot-standby audio console and spare wireless receiver channels on site at all times.',
    terms: 'Setup by 2:00 PM on Day 0. Rehearsal sound check supported. Breakdown immediately after closing ceremony.',
    notes: 'Includes 2 dedicated audio-video engineers and 1 lighting programmer for the entire duration of the symposium.',
    submittedAt: '2026-09-27 10:00 AM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Recommended choice: Comprehensive equipment rider with built-in hardware redundancy and sound engineers.',
    isBestMatch: true
  },
  {
    id: 'off-7',
    requirementId: 'req-5',
    providerId: 'p1', // Chennai PrintWorks
    price: 62000,
    deliveryDays: 8,
    matchScore: 97,
    status: 'accepted',
    specs: 'Laminated natural export-grade jute fabric, 12x14x4 inches, padded cotton webbing shoulder strap, single color front print with symposium date and logos.',
    warranty: 'Load-tested up to 8kg weight limit without stitch strain.',
    terms: 'Delivery scheduled directly to student coordinator.',
    notes: 'Agreement signed and order currently in active cutting & stitching production.',
    submittedAt: '2026-09-21 03:00 PM',
    riskAssessment: 'Low Risk',
    matchRationale: 'Optimal price-to-durability ratio with verified campus logistics history.',
    isBestMatch: true
  }
];

// Initial agreements
export const initialAgreements: Agreement[] = [
  {
    id: 'agr-101',
    requirementId: 'req-4',
    offerId: 'off-6',
    buyerId: 'b1',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerEmail: 'aditya.techfest@annauniv.edu',
    providerId: 'p5',
    providerName: 'Mohammed Farooq',
    providerBusiness: 'Starlight Stage & AV',
    productTitle: 'Complete Auditorium Sound & LED Stage Rigging (2 Days)',
    quantity: 1,
    unit: 'Service Package',
    agreedPrice: 88000,
    deadline: '2026-11-02',
    location: 'Music Academy Main Hall, Chennai',
    terms: [
      'Provider will deliver, rig, and test all AV equipment by 2:00 PM on November 1, 2026.',
      'A qualified sound technician and lighting operator will remain on-site throughout the two-day event.',
      'Equipment includes P3.91 LED Wall (16x10ft), 8 Sennheiser wireless mics, and backup audio mixer.',
      'Buyer guarantees hall access from 8:00 AM on November 1, 2026.',
      'No hidden labor or transport surcharges; agreed price of ₹88,000 is all-inclusive.'
    ],
    notes: 'Provider signed on Sept 28, 2026. Awaiting final Buyer confirmation sign-off.',
    status: 'awaiting_buyer',
    providerSignedAt: '2026-09-28 04:30 PM',
    createdAt: '2026-09-28 02:00 PM'
  },
  {
    id: 'agr-102',
    requirementId: 'req-5',
    offerId: 'off-7',
    buyerId: 'b1',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    buyerEmail: 'aditya.techfest@annauniv.edu',
    providerId: 'p1',
    providerName: 'Ramanathan K.',
    providerBusiness: 'Chennai PrintWorks',
    productTitle: '1,000 Custom Eco-Friendly Jute Conference Bags',
    quantity: 1000,
    unit: 'Bags',
    agreedPrice: 62000,
    deadline: '2026-10-10',
    location: 'Anna University Campus, Chennai',
    terms: [
      'Manufacture and deliver 1,000 export-grade jute tote bags with internal water bottle pocket.',
      'Screen printed with 1-color Tech Symposium crest on front face using non-toxic inks.',
      'Delivery deadline strictly on or before October 10, 2026.',
      'Inspected for 8kg carrying weight capacity before handover.',
      'Mutual cancellation requires 48-hour written notice prior to raw material cutting.'
    ],
    notes: 'Both parties executed the digital agreement on September 23, 2026. Transitioned to active production order.',
    status: 'agreed',
    buyerSignedAt: '2026-09-23 05:15 PM',
    providerSignedAt: '2026-09-23 03:40 PM',
    createdAt: '2026-09-22 11:00 AM'
  }
];

// Initial orders
export const initialOrders: Order[] = [
  {
    id: 'ord-801',
    agreementId: 'agr-102',
    requirementId: 'req-5',
    buyerId: 'b1',
    buyerName: 'Aditya Swaminathan',
    buyerOrg: 'College Tech Symposium Lead',
    providerId: 'p1',
    providerName: 'Chennai PrintWorks',
    title: '1,000 Custom Eco-Friendly Jute Conference Bags',
    quantity: 1000,
    unit: 'Bags',
    agreedPrice: 62000,
    deliveryDate: '2026-10-10',
    status: 'processing',
    currentStepIndex: 2,
    timeline: [
      { step: 'Agreement Confirmed', date: 'Sep 23, 2026', status: 'completed', note: 'Mutual contract digitally executed by Aditya & Ramanathan' },
      { step: 'Provider Started', date: 'Sep 25, 2026', status: 'completed', note: 'Raw natural jute fabric procured and batch cut into panel sizes' },
      { step: 'Processing / Production', date: 'Oct 02, 2026', status: 'current', note: 'Screen printing 1-color emblem in progress; 620/1000 bags completed' },
      { step: 'Quality Checked & Packed', date: 'Oct 07, 2026', status: 'pending', note: 'Batch stitch inspection & packaging into bundles of 50' },
      { step: 'Dispatched', date: 'Oct 08, 2026', status: 'pending', note: 'Loaded onto dedicated delivery van' },
      { step: 'Out for Delivery', date: 'Oct 09, 2026', status: 'pending', note: 'Driver assigned for college gate delivery' },
      { step: 'Delivered & Completed', date: 'Oct 10, 2026', status: 'pending', note: 'Physical handover & student committee signoff' }
    ],
    lastUpdate: 'Today at 09:15 AM',
    delayRisk: false,
    trackingNumber: 'CPW-26-801-JUTE',
    carrier: 'Direct Fleet Van (TN-09-BW-4821)',
    latestProviderNote: 'Printing is running ahead of schedule. We anticipate packing by Oct 6 and will deliver a day early if security gates allow.'
  }
];

// Initial notifications
export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    role: 'buyer',
    title: 'New Offer Received',
    message: 'Heritage Paper & Press submitted an offer of ₹79,000 for "500 custom cotton T-shirts" with 4-day express delivery.',
    type: 'offer',
    read: false,
    timestamp: '2 hours ago',
    link: '/buyer/requirements/req-1'
  },
  {
    id: 'notif-2',
    role: 'buyer',
    title: 'Agreement Awaiting Your Confirmation',
    message: 'Starlight Stage & AV has signed the agreement for "Auditorium Sound & LED Stage Rigging". Please review and confirm.',
    type: 'agreement',
    read: false,
    timestamp: '5 hours ago',
    link: '/buyer/agreements/agr-101'
  },
  {
    id: 'notif-3',
    role: 'buyer',
    title: 'Order Milestone Progress',
    message: 'Chennai PrintWorks advanced Order #ord-801 to "Processing / Production" — 62% printed.',
    type: 'order',
    read: true,
    timestamp: 'Yesterday',
    link: '/buyer/orders/ord-801'
  },
  {
    id: 'notif-4',
    role: 'provider',
    title: 'New Requirement Match (96%)',
    message: 'College Tech Symposium Lead posted "500 custom cotton T-shirts" fitting your Apparel capabilities.',
    type: 'offer',
    read: false,
    timestamp: '3 hours ago',
    link: '/provider/requirements'
  },
  {
    id: 'notif-5',
    role: 'provider',
    title: 'Offer Shortlisted',
    message: 'Your offer for "Hardcover Spiral Student Planners" was shortlisted by Student Affairs Directorate.',
    type: 'offer',
    read: true,
    timestamp: '1 day ago',
    link: '/provider/offers'
  },
  {
    id: 'notif-6',
    role: 'both',
    title: 'Upcoming Order Deadline',
    message: 'Order #ord-801 for 1,000 Jute Bags is due for delivery on Oct 10, 2026 (5 days remaining).',
    type: 'reminder',
    read: false,
    timestamp: 'Just now',
    link: '/buyer/orders/ord-801'
  }
];

// Initial contextual messages
export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    requirementId: 'req-1',
    offerId: 'off-1',
    senderRole: 'buyer',
    senderName: 'Aditya Swaminathan',
    text: 'Hello Ramanathan, we reviewed your offer for the 500 T-shirts. Can you confirm if the 210 GSM fabric is pre-shrunk?',
    timestamp: 'Oct 3, 2026 • 02:15 PM'
  },
  {
    id: 'msg-2',
    requirementId: 'req-1',
    offerId: 'off-1',
    senderRole: 'provider',
    senderName: 'Chennai PrintWorks',
    text: 'Hi Aditya! Yes, all our combed cotton fabric goes through a compaction and bio-wash treatment before cutting. Shrinkage is under 3% after warm washing.',
    timestamp: 'Oct 3, 2026 • 02:40 PM'
  },
  {
    id: 'msg-3',
    requirementId: 'req-1',
    offerId: 'off-1',
    senderRole: 'buyer',
    senderName: 'Aditya Swaminathan',
    text: 'That is great. Can we see a fabric swatch sample tomorrow at the campus tech desk?',
    timestamp: 'Oct 3, 2026 • 03:00 PM'
  },
  {
    id: 'msg-4',
    requirementId: 'req-1',
    offerId: 'off-1',
    senderRole: 'provider',
    senderName: 'Chennai PrintWorks',
    text: 'Certainly! Our delivery associate will drop off navy swatches in S and L sizes by 11:30 AM tomorrow.',
    timestamp: 'Oct 3, 2026 • 03:25 PM'
  }
];

// Provider catalog products
export const initialCatalog: CatalogProduct[] = [
  {
    id: 'cat-1',
    providerId: 'p1',
    name: 'Heavyweight Bio-Washed Cotton T-Shirt (220 GSM)',
    category: 'Apparel',
    description: '100% combed cotton blank ready for multi-color screen printing, DTG, or embroidery. Ideal for university events, clubs, and staff uniforms.',
    startingPrice: 135,
    typicalDelivery: '4-6 days',
    availability: 'High Capacity',
    specifications: ['220 GSM Combed Cotton', 'Pre-shrunk', 'Ribbed Lycra Collar', 'Colorfast bio-wash']
  },
  {
    id: 'cat-2',
    providerId: 'p1',
    name: 'Fleece Lined Pullover College Hoodie (340 GSM)',
    category: 'Apparel',
    description: 'Premium brushed fleece hoodie with double layered hood, kangaroo pocket, and heavy drawstring. Custom front crest embroidery.',
    startingPrice: 420,
    typicalDelivery: '6-8 days',
    availability: 'Made to Order',
    specifications: ['340 GSM Cotton-Poly Blend', 'Fleece Interior', 'YKK Metal Eyelets', 'Custom Sleeve Prints']
  },
  {
    id: 'cat-3',
    providerId: 'p1',
    name: 'Export Quality Laminated Jute Conference Tote',
    category: 'Print & Packaging',
    description: 'Eco-friendly promotional bag with padded handles, gusset bottom, and water-resistant internal lining.',
    startingPrice: 58,
    typicalDelivery: '5-7 days',
    availability: 'In Stock',
    specifications: ['100% Golden Jute', 'Cotton Rope Handle', '8kg Carrying Weight', 'Screen Print Ready']
  },
  {
    id: 'cat-4',
    providerId: 'p2',
    name: 'ESP32-S3 IoT Development Baseboard with OLED',
    category: 'Electronics',
    description: 'Modular prototyping kit with LiPo charger, dual USB-C, 0.96 inch I2C display, and STEMMA QT connectors.',
    startingPrice: 1250,
    typicalDelivery: '5-9 days',
    availability: 'Made to Order',
    specifications: ['ESP32-S3-WROOM-1', '16MB Flash / 8MB PSRAM', 'ESD Protection', 'Thermal Tested']
  }
];

// Provider customer relationships
export const initialCustomers: CustomerRecord[] = [
  {
    id: 'cust-1',
    providerId: 'p1',
    buyerName: 'Aditya Swaminathan',
    organization: 'College Tech Symposium Lead',
    email: 'aditya.techfest@annauniv.edu',
    location: 'Chennai, TN',
    totalSpent: 134000,
    ordersCount: 2,
    activeAgreementsCount: 1,
    lastActive: 'Today'
  },
  {
    id: 'cust-2',
    providerId: 'p1',
    buyerName: 'Dr. R. Venkataraman',
    organization: 'Student Affairs Directorate',
    email: 'venkat@srm.edu.in',
    location: 'Kattankulathur, TN',
    totalSpent: 285000,
    ordersCount: 4,
    activeAgreementsCount: 1,
    lastActive: '3 days ago'
  }
];

export const marketplaceCategories = [
  { name: 'Apparel', count: 18, desc: 'T-shirts, hoodies, lab coats, and jerseys', icon: 'Shirt' },
  { name: 'Print & Packaging', count: 24, desc: 'Brochures, ID cards, custom boxes, and planners', icon: 'FileText' },
  { name: 'Electronics', count: 12, desc: 'PCBs, sensor kits, microcontroller assemblies', icon: 'Cpu' },
  { name: 'Event Services', count: 9, desc: 'Sound systems, stage lighting, LED screens, trussing', icon: 'Volume2' },
  { name: 'Custom Fabrication', count: 7, desc: 'Acrylic trophies, CNC enclosures, exhibition stalls', icon: 'Hammer' },
  { name: 'Bulk Supplies', count: 15, desc: 'Stationery, conference kits, eco gifts, lanyards', icon: 'Package' }
];
