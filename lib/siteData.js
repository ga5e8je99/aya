// Centralized Site Data & Storage Management for Aya Adel Portfolio
// Allows live management via LocalStorage / API with instant reflection on the website.

export const STORAGE_KEYS = {
  PROFILE: "aya_portfolio_profile",
  PROJECTS: "aya_portfolio_projects",
  SKILLS: "aya_portfolio_skills",
  SERVICES: "aya_portfolio_services",
  CODESIGNERS: "aya_portfolio_codesigners",
  APPOINTMENTS: "aya_portfolio_appointments",
  MESSAGES: "aya_portfolio_messages",
  SETTINGS: "aya_portfolio_settings"
};

export const INITIAL_PROFILE = {
  name: "Aya Adel",
  nameAr: "آية عادل",
  roleTitle: "Senior Graphic Designer & Brand Specialist",
  roleTitleAr: "مصممة جرافيك متخصصة في الهويات البصرية والتغليف",
  subtitle: "Branding • Packaging • Social Media • UI/UX • Typography",
  shortBio:
    "I craft emotionally resonant visual identities, luxury packaging, and digital experiences that make brands unforgettable. Passionate about color harmony, typography, and feline companions.",
  shortBioAr:
    "أصمم هويات بصرية ساحرة، وتغليف فاخر، وتجارب رقمية تخلد العلامات التجارية في الأذهان. شغوفة بتناغم الألوان، فن الخط والتايبوغرافي، ومرافقة القطط الأليفة.",
  fullBio: [
    "Hello! I'm Aya Adel, a Senior Graphic Designer & Visual Identity Specialist with over 5 years of experience bringing brands, publications, and digital products to life with elegance and strategy.",
    "My creative journey began with traditional art and illustration, evolving into masteries in Adobe Creative Cloud (Illustrator, Photoshop, InDesign, After Effects) and Figma. I specialize in complete brand identity systems—from logo suites and typography to tactile packaging die-lines and high-conversion social media campaigns.",
    "Design philosophy: 'Every pixel should tell a story, and every detail deserves devotion.' When I'm not designing in Figma or Illustrator, I'm finding inspiration in nature, art museums, and cuddling my three beloved cats—Milo, Oliver, and Luna."
  ],
  yearsExperience: "5+",
  projectsCompleted: "60+",
  clientsSatisfied: "100%",
  email: "aya.adel.creatives@gmail.com",
  phone: "+20 102 345 6789",
  whatsapp: "+201023456789",
  location: "Ismailia, Egypt / Worldwide",
  locationAr: "الإسماعيلية، مصر / متاح عالمياً",
  avatarImage: "/aya-adel.png",
  profileImage: "/aya-adel.png",
  originalImage: "/aya-original.jpg",
  resumeUrl: "/Aya_Adel_Resume.pdf",
  socials: {
    behance: "https://behance.net/ayaadel",
    dribbble: "https://dribbble.com/ayaadel",
    instagram: "https://instagram.com/ayaadel.designs",
    linkedin: "https://linkedin.com/in/aya-adel",
    whatsapp: "https://wa.me/201023456789"
  }
};

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    slug: "lumina-botanicals",
    aliases: ["lumina", "skincare-branding"],
    title: "Lumina Botanicals – Luxury Organic Skincare",
    tagline: "Comprehensive Visual Identity, Frosted Glass Packaging & Minimalist Editorial Art",
    category: "branding",
    description:
      "A complete organic luxury skincare brand identity featuring custom serif typography, foil-stamped cosmetic boxes, and tactile botanical patterns.",
    overview:
      "Lumina Botanicals is an organic luxury beauty house crafted for clean, sustainable skincare. The project encompassed brand positioning, custom hand-lettered logotype, secondary monograms, packaging die-lines for 8 product SKUs, embossed box textures, and art direction for launch campaign photography.",
    problem:
      "The clean beauty market is saturated with sterile, generic minimalist designs that fail to convey warm organic craftsmanship and premium tactile luxury.",
    solution:
      "Developed an earthy yet regal pastel palette (rose blush, warm gold, and sage cream) combined with refined bespoke typography and sustainable embossed paperboard packaging that commands shelf presence.",
    role:
      "Lead Brand & Packaging Designer. Directed brand identity, color theory formulation, package die-line engineering, 3D bottle rendering, and social launch collateral.",
    impact:
      "Product launch sold out within 72 hours; featured in prestigious design galleries and elevated the brand to boutique retailers across Europe and the Middle East.",
    duration: "6 Weeks",
    client: "Lumina London Ltd.",
    image: "/projectImage/lumina.webp",
    technologies: ["Adobe Illustrator", "Photoshop", "Packaging Die-lines", "3D Mockups", "Print Pre-Press"],
    features: [
      {
        title: "Bespoke Logotype & Submarks",
        desc: "Custom-crafted editorial typography with responsive brand marks for micro-cosmetic caps."
      },
      {
        title: "Sustainable Packaging Suite",
        desc: "Print-ready CMYK + gold foil stamp die-lines for glass droppers, cream jars, and gift unboxing sets."
      },
      {
        title: "Brand Bible & Guidelines",
        desc: "A 48-page brand manual detailing color ratios, typography hierarchy, imagery direction, and packaging rules."
      }
    ]
  },
  {
    id: "proj-2",
    slug: "purr-and-pour",
    aliases: ["purr-pour", "cat-cafe-branding"],
    title: "Purr & Pour – Artisan Cat Café & Bakery",
    tagline: "Playful Hand-Drawn Mascot Branding, Pastel Coffee Packaging & Store Signage",
    category: "branding",
    description:
      "Whimsical and cozy brand identity for a specialty cat café featuring 3 custom feline mascots, takeaway coffee cups, pastry boxes, and merchandise.",
    overview:
      "Purr & Pour is a haven for coffee enthusiasts and cat lovers alike. Drawing inspiration from Aya's own cats (Milo, Oliver, and Luna), this branding project infused warmth, friendliness, and aesthetic charm into every touchpoint—from loyalty stamp cards to neon storefront signage.",
    problem:
      "Pet-themed cafés often lean into childish cartoon graphics that compromise the premium, third-wave coffee experience and gourmet culinary appeal.",
    solution:
      "Harmonized playful vector cat illustrations with elegant Scandinavian pastel hues, clean rounded typography, and artisan kraft textures for a mature yet irresistibly cute aesthetic.",
    role:
      "Illustrator & Brand Designer. Illustrated the mascot trio, designed packaging for beans and cups, created the physical store menu, and developed Instagram sticker packs.",
    impact:
      "Achieved viral social media reach with customer unboxing reels; café merchandise became their #2 revenue stream within two months of opening.",
    duration: "4 Weeks",
    client: "Purr & Pour Specialty Coffee",
    image: "/projectImage/purr-and-pour.webp",
    technologies: ["Adobe Illustrator", "Procreate", "Vector Illustration", "Packaging", "Merchandise Design"],
    features: [
      {
        title: "The Mascot Trio",
        desc: "Three expressive cat characters adapted for coffee cups, tote bags, pins, and seasonal café stickers."
      },
      {
        title: "Artisan Packaging",
        desc: "Eco-friendly coffee bean pouches with aroma valves, pastel drink sleeves, and macaron gift boxes."
      },
      {
        title: "Interior & Spatial Graphics",
        desc: "Neon window signs, directional floor paw decals, and illustrated wall mural artwork."
      }
    ]
  },
  {
    id: "proj-3",
    slug: "velvet-vine",
    aliases: ["velvet-vine", "chocolatier-packaging"],
    title: "Velvet & Vine – Premium Gourmet Chocolatier",
    tagline: "Bespoke Geometric Foil Packaging, Texture Embossing & Confectionery Identity",
    category: "packaging",
    description:
      "Exquisite packaging collection for single-origin artisan chocolates, blending art-deco geometry with rich pastel shades and metallic foil accents.",
    overview:
      "Velvet & Vine crafts bean-to-bar gourmet chocolates. This design case study created a modular packaging system for 6 flavor varieties, utilizing color-coded textured paper, blind debossing, and metallic bronze foil stamping.",
    problem:
      "Creating a cohesive collection where each flavor stands out individually while feeling part of a unified, high-luxury gift box collection.",
    solution:
      "Crafted an intricate geometric mosaic inspired by cocoa botany, paired with an elegant color-coding system (Berry Velvet, Salted Pistachio, Golden Honeycomb, Espresso Noir).",
    role:
      "Packaging Designer & Print Specialist. Supervised paper stock selection, foil registration, and CMYK color accuracy tests.",
    impact:
      "Awarded Best Confectionery Packaging in regional design awards; 40% increase in holiday gift box pre-orders.",
    duration: "5 Weeks",
    client: "Velvet & Vine Artisan Chocolates",
    image: "/projectImage/velvet-vine.webp",
    technologies: ["Adobe Illustrator", "InDesign", "Foil Stamping", "Die-Cut Engineering", "Print Production"],
    features: [
      {
        title: "Multi-SKU Flavor System",
        desc: "Harmonious 6-flavor color coding system with dedicated flavor icons and origin storytelling."
      },
      {
        title: "Tactile Unboxing Experience",
        desc: "Custom sliding matchbox drawer design with magnetic closure and embossed textured sleeve."
      }
    ]
  },
  {
    id: "proj-4",
    slug: "bloom-beauty-drop",
    aliases: ["bloom-beauty", "social-media-campaign"],
    title: "Bloom Beauty – Viral Social Campaign & Digital Kit",
    tagline: "High-Converting 360° Social Media Assets, Motion Graphics & Influencer PR Suite",
    category: "social",
    description:
      "Comprehensive digital marketing visual suite including 40+ Instagram carousels, TikTok video title templates, and an influencer PR package design.",
    overview:
      "For the seasonal launch of Bloom Beauty's floral lip oil collection, Aya created an energetic, dreamy social media visual campaign that captivated Gen-Z and millennial audiences with aesthetic typography and dynamic kinetic motion.",
    problem:
      "Brands struggle to maintain visual consistency across rapidly churning social platforms while standing out in fast-scrolling mobile feeds.",
    solution:
      "Engineered a modular design template library in Figma and Photoshop, paired with eye-catching motion banners in After Effects, delivering thumb-stopping visual rhythm.",
    role:
      "Digital Art Director & Social Creative. Designed social feeds, motion stories, promotional email headers, and influencer PR box graphics.",
    impact:
      "Campaign drove a 240% lift in Instagram engagement and over 1.2M organic impressions across social channels during launch week.",
    duration: "3 Weeks",
    client: "Bloom Cosmetics Co.",
    image: "/projectImage/bloom-beauty.webp",
    technologies: ["Adobe Photoshop", "After Effects", "Figma", "Social Media Strategy", "Motion Graphics"],
    features: [
      {
        title: "High-Engagement Carousels",
        desc: "Seamless slide-through panoramic Instagram carousels with compelling visual hooks."
      },
      {
        title: "Motion Video Overlays",
        desc: "Animated typography stickers and video intro/outro cards tailored for 9:16 mobile viewports."
      }
    ]
  },
  {
    id: "proj-5",
    slug: "maison-etheree",
    aliases: ["maison-etheree", "fashion-editorial"],
    title: "Maison Éthérée – High-Fashion Lookbook & Magazine",
    tagline: "Contemporary 96-Page Print & Digital Editorial Publication with Avant-Garde Layouts",
    category: "editorial",
    description:
      "Art direction and comprehensive editorial layout design for a seasonal haute couture lookbook, exploring experimental grids and serene whitespace.",
    overview:
      "Maison Éthérée represents modern haute couture. Aya designed an exclusive limited-run collector's lookbook that acts as both an art piece and a sales catalogue for international fashion buyers.",
    problem:
      "Balancing bold avant-garde editorial expression with functional readability for garment specifications and fabric details.",
    solution:
      "Constructed a multi-column asymmetric grid system with generous breathing room, sculptural display serif headings, and delicate page numbering details.",
    role:
      "Editorial Designer & Art Director. Managed page layout, image curation, typographic pacing, and pre-press color separations.",
    impact:
      "Distributed at Paris Fashion Week showroom; praised by creative directors for its poetic layout and paper tactile balance.",
    duration: "4 Weeks",
    client: "Maison Éthérée Paris",
    image: "/projectImage/maison-etheree.webp",
    technologies: ["Adobe InDesign", "Photoshop", "Editorial Design", "Typography", "Pre-Press"],
    features: [
      {
        title: "Asymmetric Editorial Grid",
        desc: "Dynamic layout rhythm alternating between full-bleed photographic spreads and delicate text vignettes."
      },
      {
        title: "Collector's Print Finishing",
        desc: "Thread-bound Swiss binding with iridescent soft-touch cover and rose-tinted endpapers."
      }
    ]
  },
  {
    id: "proj-6",
    slug: "whiskers-app",
    aliases: ["whiskers", "pet-care-ui"],
    title: "Whiskers & Co. – Pet Care Mobile App UI/UX",
    tagline: "Cute, Intuitive Mobile App UI with Custom Pastel Components & Vector Mascot Icons",
    category: "digital",
    description:
      "Delightful mobile veterinary and pet health management application designed with soothing pastel aesthetics, cute micro-illustrations, and seamless user flow.",
    overview:
      "Whiskers & Co. is a mobile companion app for pet owners to track vaccinations, schedule vet appointments, and order nutritious pet meals. Designed with empathy, warmth, and high usability.",
    problem:
      "Medical and pet care apps are often clinical and overwhelming with clinical jargon, causing anxiety for pet parents.",
    solution:
      "Designed a joyful, stress-free UI with soft rounded cards, cheerful cat and dog micro-illustrations, intuitive reminder cards, and clear visual hierarchy in Figma.",
    role:
      "UI/UX Visual Designer. Built the complete Figma design system, created 30+ custom icons and mascots, and mapped 40+ app screens.",
    impact:
      "Achieved a 4.9-star rating on the App Store during beta testing, with 94% of users complimenting the friendly and aesthetic interface.",
    duration: "6 Weeks",
    client: "Whiskers Digital Labs",
    image: "/projectImage/whiskers-app.webp",
    technologies: ["Figma", "Design Systems", "UI/UX Design", "Prototyping", "Iconography"],
    features: [
      {
        title: "Pet Health Dashboard",
        desc: "Vibrant visual cards displaying medication schedules, nutrition logs, and upcoming checkups."
      },
      {
        title: "Custom Mascot Icon Set",
        desc: "A set of 50+ playful vector icons representing pet moods, medical needs, and food categories."
      }
    ]
  }
];



export const INITIAL_SKILLS = [
  {
    name: "Adobe Illustrator",
    category: "tools",
    tier: "Mastery Core",
    experience: "5+ years",
    proficiency: 98,
    highlight: "Vector Precision, Logo Creation, Die-Lines, Complex Pattern Design, Typography",
    badgeColor: "border-pink-300 text-pink-600 bg-pink-50"
  },
  {
    name: "Adobe Photoshop",
    category: "tools",
    tier: "Mastery Core",
    experience: "5+ years",
    proficiency: 95,
    highlight: "Photo Manipulation, Realistic 3D Mockups, Retouching, Social Media Art, Color Grading",
    badgeColor: "border-rose-300 text-rose-600 bg-rose-50"
  },
  {
    name: "Adobe InDesign",
    category: "tools",
    tier: "Print & Publishing",
    experience: "4+ years",
    proficiency: 92,
    highlight: "Editorial Layout, Multi-page Catalogs, Magazines, Pre-Press CMYK, Grid Systems",
    badgeColor: "border-purple-300 text-purple-600 bg-purple-50"
  },
  {
    name: "Figma & UI Design",
    category: "digital",
    tier: "Digital & UI",
    experience: "3+ years",
    proficiency: 90,
    highlight: "Design Systems, Mobile & Web UI, Interactive Prototypes, Component Libraries",
    badgeColor: "border-violet-300 text-violet-600 bg-violet-50"
  },
  {
    name: "Brand Identity Systems",
    category: "branding",
    tier: "Core Strategy",
    experience: "5+ years",
    proficiency: 96,
    highlight: "Brand Strategy, Logo Suites, Style Guides, Typography Pairing, Moodboards",
    badgeColor: "border-pink-300 text-pink-700 bg-pink-50"
  },
  {
    name: "Packaging & Print Prep",
    category: "branding",
    tier: "Physical Production",
    experience: "4+ years",
    proficiency: 93,
    highlight: "Die-line Engineering, Foil Stamping, Spot UV, Emboss/Deboss, CMYK Proofing",
    badgeColor: "border-amber-300 text-amber-700 bg-amber-50"
  },
  {
    name: "Typography & Lettering",
    category: "branding",
    tier: "Artisan Craft",
    experience: "5+ years",
    proficiency: 95,
    highlight: "Font Pairing, Kerning Precision, Editorial Typography, Arabic & Latin Harmony",
    badgeColor: "border-rose-300 text-rose-600 bg-rose-50"
  },
  {
    name: "After Effects & Motion",
    category: "tools",
    tier: "Motion Graphics",
    experience: "3+ years",
    proficiency: 84,
    highlight: "Animated Logos, Social Reels, Kinetic Typography, Lottie Micro-animations",
    badgeColor: "border-fuchsia-300 text-fuchsia-600 bg-fuchsia-50"
  },
  {
    name: "Procreate & Illustration",
    category: "tools",
    tier: "Digital Art",
    experience: "4+ years",
    proficiency: 90,
    highlight: "Digital Painting, Feline & Animal Characters, Custom Stickers, Hand-lettering",
    badgeColor: "border-orange-300 text-orange-600 bg-orange-50"
  }
];



export const INITIAL_SERVICES = [
  {
    id: 1,
    title: "Brand Identity & Logo Design",
    titleAr: "الهوية البصرية وتصميم الشعارات",
    icon: "palette",
    color: "from-pink-500 to-rose-400",
    description:
      "Transforming your brand story into an iconic visual identity. Includes comprehensive logo suites, bespoke color palettes, typography rules, and in-depth brand guidelines.",
    descriptionAr:
      "تحويل قصة ورؤية علامتك التجارية إلى هوية بصرية أيقونية لا تُنسى. تشمل حزمة شعارات كاملة، لوحات ألوان مدروسة، خطوط وتوجيهات استخدام تفصيلية.",
    features: [
      "Primary, Secondary & Submark Logo Variations",
      "Comprehensive Brand Style Guide & Rules",
      "Curated Typography Systems (Arabic & Latin)",
      "Color Psychology & Palette Specifications",
      "Stationery & Business Card Collateral"
    ]
  },
  {
    id: 2,
    title: "Packaging & Product Label Design",
    titleAr: "تصميم العبوات والتغليف الفاخر",
    icon: "box",
    color: "from-rose-400 to-pink-500",
    description:
      "Tactile, shelf-stopping packaging that turns everyday products into coveted luxury objects. Engineered with precision die-lines and high-end print finishes.",
    descriptionAr:
      "تصميم عبوات استثنائية تجذب الأنظار على الأرفف وتعكس الفخامة. هندسة داي-لاين دقيقة وتجهيز متكامل لتقنيات الطباعة الحديثة كالبصمة والريليف.",
    features: [
      "Custom Packaging Box & Label Die-lines",
      "Luxury Finishes: Gold Foil, Embossing & Spot UV",
      "Photorealistic 3D Product Mockups",
      "Print-Ready Pre-Press CMYK Production Files",
      "Eco-Friendly & Sustainable Material Advice"
    ]
  },
  {
    id: 3,
    title: "Social Media & Advertising Creatives",
    titleAr: "تصاميم السوشيال ميديا والإعلانات",
    icon: "instagram",
    color: "from-purple-500 to-pink-500",
    description:
      "Scroll-stopping social media graphics, panoramic Instagram carousels, and viral ad creatives designed to grow brand awareness and customer conversions.",
    descriptionAr:
      "تصاميم إبداعية تجذب الانتباه وسط الزحام. بوستات وكاروسيل إنستغرام بانورامية، بنرات إعلانية متحركة، وقوالب قابلة للتعديل تسهل نمو حساباتك.",
    features: [
      "High-Converting Instagram & Facebook Ad Assets",
      "Seamless Story & Panoramic Carousel Posts",
      "Custom Canva / Figma Editable Template Kits",
      "Animated Stories & Motion Graphics",
      "Highlight Covers, Grid Planning & Bio Banners"
    ]
  },
  {
    id: 4,
    title: "Editorial & Publication Layout",
    titleAr: "تصميم المجلات، الكتب والمطبوعات",
    icon: "book",
    color: "from-violet-400 to-purple-500",
    description:
      "Editorial publications, corporate profiles, lookbooks, and high-fashion magazines with refined typographic rhythm and elegant spatial layouts.",
    descriptionAr:
      "تصميم احترافي للمجلات، الكتالوجات، بروفايل الشركات، وأغلفة الكتب، مع مراعاة أدق تفاصيل التايبوغرافي وشبكات التخطيط المتوازنة.",
    features: [
      "Multi-Page Company Profiles & Brochures",
      "Fashion Lookbooks & Product Catalogs",
      "Book Covers & Interior Typesetting Layouts",
      "Annual Reports & Presentation Deck Design",
      "Fine Paper & Print Finish Consultation"
    ]
  },
  {
    id: 5,
    title: "UI/UX & Digital Visual Design",
    titleAr: "تصميم واجهات المستخدم والمواقع (UI/UX)",
    icon: "layout",
    color: "from-pink-400 to-amber-400",
    description:
      "Clean, modern, aesthetic interfaces for web and mobile apps designed in Figma. Focused on intuitive navigation, beautiful visual harmony, and brand consistency.",
    descriptionAr:
      "واجهات رقمية جذابة وسلسة للمواقع وتطبيقات الهاتف عبر فيجما، تجمع بين الراحة وسهولة الاستخدام والجمال البصري العصري.",
    features: [
      "Mobile App UI/UX Design (iOS & Android)",
      "Landing Page & E-Commerce Web Visuals",
      "Figma Design Systems & Scalable Components",
      "Interactive Prototypes & Clickable Flows",
      "Developer-Ready Asset Hand-Off & Redlines"
    ]
  },
  {
    id: 6,
    title: "Custom Illustration & Mascot Art",
    titleAr: "الرسم الرقمي وتصميم الشخصيات (القطط!)",
    icon: "cat",
    color: "from-amber-400 to-rose-400",
    description:
      "Charming hand-drawn digital illustrations, brand mascots (especially cute cats!), custom sticker packs, merchandise artwork, and editorial icons.",
    descriptionAr:
      "رسوم توضيحية رقمية مبهجة، تصميم شخصيات كرتونية وماسكوت للعلامات التجارية (خصوصاً القطط اللطيفة!)، وتصاميم التيشيرتات والميرشندايز.",
    features: [
      "Custom Brand Mascots & Character Design",
      "Cute Feline & Animal Digital Illustrations",
      "Tote Bags, Pins, Apparel & Merchandise Art",
      "Unique Vector Icon Sets & Infographics",
      "High-Resolution Print & Digital Formats"
    ]
  }
];



export const FURRY_CO_DESIGNERS = [
  {
    id: "cat-milo",
    name: "Milo",
    nameAr: "مايلو",
    breed: "Orange Tabby (مشمشي)",
    role: "Chief Color Strategist & Warmth Inspector",
    roleAr: "رئيس قسم تناسق الألوان ومدقق الدفء",
    badge: "Warm Palette Specialist",
    iconName: "FaCat",
    photoDescription: "The curious orange tabby on Aya's arm looking up playfully",
    quirk: "Inspects every gradient; won't let Aya export without at least one warm tone.",
    quirkAr: "يراقب تدرجات الألوان بشغف؛ ولا يسمح بالتصدير دون لمسة دفء مشرقة.",
    funStat: "99% Curiosity • 100% Cuddly",
    color: "from-amber-400 to-orange-400",
    border: "border-orange-200"
  },
  {
    id: "cat-oliver",
    name: "Oliver",
    nameAr: "أوليفر",
    breed: "Striped Tabby (مخطط هادئ)",
    role: "Head of Zen, Ergonomics & Creative Naps",
    roleAr: "مسؤول الراحة، بيئة العمل والقيلولة الإبداعية",
    badge: "Zen Master",
    iconName: "FaPaw",
    photoDescription: "The peaceful sleeping cat curled up comfortably in Aya's lap",
    quirk: "Sleeps right beside the graphics tablet to absorb deadline stress.",
    quirkAr: "ينام بوداعة بجانب التابلت ليمتص أي توتر أثناء تسليم المشاريع.",
    funStat: "18h Sleep/Day • 10/10 Purrs",
    color: "from-pink-400 to-rose-400",
    border: "border-pink-200"
  },
  {
    id: "cat-luna",
    name: "Luna",
    nameAr: "لونا",
    breed: "Smiling Tabby (مخططة مبتسمة)",
    role: "Executive Art Director & Pixel Guardian",
    roleAr: "المدير الفني الأول وحارسة البكسلات",
    badge: "Pixel Perfectionist",
    iconName: "HiSparkles",
    photoDescription: "The smiling tabby perched happily on Aya's shoulder",
    quirk: "Perches on Aya's shoulder during Figma sessions to catch any 1px misalignment.",
    quirkAr: "تجلس على كتف آية أثناء العمل لتتأكد من محاذاة كل بكسل بدقة متناهية.",
    funStat: "100% Vision • 0 Tolerance for Misalignment",
    color: "from-purple-400 to-pink-400",
    border: "border-purple-200"
  }
];

export const INITIAL_SETTINGS = {
  siteName: "Aya Adel Studio",
  tagline: "Graphic & Brand Identity Designer",
  announcement: "Open for New Design Projects & Retainers",
  showAnnouncement: true,
  themeColor: "blush"
};
