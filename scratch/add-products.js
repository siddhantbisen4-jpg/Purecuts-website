const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, '..', 'src', 'db', 'seed-data.ts');
let content = fs.readFileSync(seedFilePath, 'utf8');

const newProducts = [
  // --- Hair Color & Developers ---
  {
    slug: "loreal-professionnel-oxydant-creme-20-vol-1000ml",
    name: "L'Oréal Professionnel Paris Oxydant Crème 20 Volume (6%) Developer 1000ml",
    brand: "L'Oréal Professionnel",
    category: "Hair Color & Developers",
    categorySlug: "hair-color",
    subcategory: "Developers & Peroxides",
    subcategorySlug: "developers-peroxides",
    price: 410,
    originalPrice: 475,
    discountPercent: 14,
    rating: "4.9",
    reviewCount: 52,
    stock: 90,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
    ],
    description: "L'Oréal Professionnel Paris Oxydant Crème 20 Volume (6%) is an optimized stabilized peroxide developer crafted specifically for Majirel and Inoa color creams. Delivers predictable 1 to 2 shades lift, flawless 100% white/grey coverage, and maintains hair fiber softness with active lipid emollients.",
    shortDescription: "Salon professional 20 Vol (6%) developer for Majirel & permanent hair colors.",
    highlights: [
      "Formulated for flawless 100% grey hair coverage",
      "Rich creamy viscosity prevents dripping on scalp",
      "Standard salon pairing for Majirel and Majirouge ranges",
      "100% Genuine L'Oréal Professionnel Salon Pack 1000ml"
    ],
    usageInstructions: "Mix in 1:1.5 ratio with L'Oréal Majirel color tube in a non-metallic bowl. Apply evenly and process for 35 minutes.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      Strength: "20 Volume (6% Peroxide)",
      "Net Quantity": "1000 ml",
      Packaging: "Salon Professional Bottle"
    },
    volumeSize: "1000 ml",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["loreal", "developer", "20 vol", "oxydant", "hair color"]
  },
  {
    slug: "loreal-professionnel-oxydant-creme-30-vol-1000ml",
    name: "L'Oréal Professionnel Paris Oxydant Crème 30 Volume (9%) Developer 1000ml",
    brand: "L'Oréal Professionnel",
    category: "Hair Color & Developers",
    categorySlug: "hair-color",
    subcategory: "Developers & Peroxides",
    subcategorySlug: "developers-peroxides",
    price: 425,
    originalPrice: 495,
    discountPercent: 14,
    rating: "4.8",
    reviewCount: 38,
    stock: 75,
    inStock: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
    ],
    description: "L'Oréal Professionnel 30 Volume (9%) Crème Developer provides up to 3 levels of lift on natural dark hair. Essential for vibrant blonde tones, warm honey reflects, and lightening services when paired with Majirel high-lift formulas.",
    shortDescription: "Professional 30 Vol developer for up to 3 levels of luminous hair lightening.",
    highlights: [
      "3 Levels of lightening on virgin hair",
      "Stabilized high-performance formula",
      "Creamy consistency for seamless salon application"
    ],
    usageInstructions: "Blend 1:1.5 or 1:2 according to hair color technician requirements in tint bowl.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      Strength: "30 Volume (9% Peroxide)",
      "Net Quantity": "1000 ml"
    },
    volumeSize: "1000 ml",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["loreal", "developer", "30 vol", "high lift", "hair color"]
  },
  {
    slug: "schwarzkopf-igora-royal-permanent-color-tube-60ml",
    name: "Schwarzkopf Professional Igora Royal High Definition Permanent Color 60ml",
    brand: "Schwarzkopf Professional",
    category: "Hair Color & Developers",
    categorySlug: "hair-color",
    subcategory: "Hair Colour Cream",
    subcategorySlug: "hair-colour-cream",
    price: 345,
    originalPrice: 420,
    discountPercent: 18,
    rating: "4.9",
    reviewCount: 44,
    stock: 80,
    inStock: true,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
    ],
    description: "Schwarzkopf Igora Royal provides true-to-swatch color results, maximum contrast retention, and 100% white hair coverage even on coarse thick hair. Infused with High Definition Color Pigment Matrix for ultra-radiant shine and long-lasting salon vibrance.",
    shortDescription: "Ultra-pigmented salon permanent hair color for 100% white coverage.",
    highlights: [
      "True-to-swatch color accuracy with High Definition Pigment Matrix",
      "Up to 100% white hair coverage with intense pigment retention",
      "Trusted worldwide by top salon master colorists"
    ],
    usageInstructions: "Mix with Igora Royal Oil Developer (1:1 ratio). Develop for 30 to 45 minutes.",
    specifications: {
      Brand: "Schwarzkopf Professional",
      Shade: "Salon Color Choice",
      "Net Quantity": "60 ml"
    },
    volumeSize: "60 ml",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["schwarzkopf", "igora royal", "hair color", "permanent color"]
  },
  {
    slug: "matrix-socolor-permanent-cream-hair-color-90ml",
    name: "Matrix SoColor Beauty Conditioning Permanent Cream Hair Color 90ml",
    brand: "Matrix",
    category: "Hair Color & Developers",
    categorySlug: "hair-color",
    subcategory: "Hair Colour Cream",
    subcategorySlug: "hair-colour-cream",
    price: 265,
    originalPrice: 310,
    discountPercent: 15,
    rating: "4.8",
    reviewCount: 39,
    stock: 95,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80"
    ],
    description: "Matrix SoColor Beauty provides rich color deposit with Cera-Oil conditioning complex that strengthens hair fibers during application. Delivers long-lasting shine, 100% grey coverage, and silky salon hair feel.",
    shortDescription: "Conditioning permanent cream color with Cera-Oil complex.",
    highlights: [
      "Contains Cera-Oil conditioning complex for silky softness",
      "Predictable results across all natural and resistant grey shades",
      "Exceptional value with large 90ml professional tube"
    ],
    usageInstructions: "Mix 1:1.5 with Matrix Cream Developer. Apply onto dry unwashed hair and leave for 35-40 minutes.",
    specifications: {
      Brand: "Matrix",
      "Net Quantity": "90 ml",
      Coverage: "100% Grey Coverage"
    },
    volumeSize: "90 ml",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["matrix", "socolor", "hair color", "cera-oil"]
  },
  {
    slug: "loreal-blond-studio-multi-techniques-powder-500g",
    name: "L'Oréal Professionnel Blond Studio 8 Levels Dust-Free Lightening Bleaching Powder 500g",
    brand: "L'Oréal Professionnel",
    category: "Hair Color & Developers",
    categorySlug: "hair-color",
    subcategory: "Bleach & Lighteners",
    subcategorySlug: "bleach-lighteners",
    price: 1599,
    originalPrice: 1950,
    discountPercent: 18,
    rating: "4.9",
    reviewCount: 61,
    stock: 40,
    inStock: true,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
    ],
    description: "L'Oréal Professionnel Blond Studio Multi-Techniques Powder provides up to 8 levels of clean blonde lift with low odor and zero powder dusting. Enriched with Pro-Keratin to reinforce hair bonds during high-light and balayage techniques.",
    shortDescription: "Up to 8 levels dust-free bleaching powder with bond-protecting Pro-Keratin.",
    highlights: [
      "Lifts up to 8 levels for bright Scandinavian or Ash Blondes",
      "Multi-techniques: highlights, balayage, full-head bleaching",
      "Enriched with Pro-Keratin for hair fiber integrity"
    ],
    usageInstructions: "Mix with 20 or 30 Vol developer in 1:1 to 1:2 ratio. Check lightening progress every 10 minutes.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      Weight: "500 Grams",
      Type: "Dust-Free Lightening Powder"
    },
    volumeSize: "500 g Tub",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["loreal", "blond studio", "bleach", "lightener", "balayage"]
  },

  // --- Salon Combos & Bulk Packs ---
  {
    slug: "brazilian-keratin-treatment-salon-master-kit-1000ml",
    name: "Brazilian Keratin Treatment 3-Step Master Salon Kit (Clarifying Shampoo 1L + Keratin 1L + Deep Masque 1L)",
    brand: "PureCuts Pro",
    category: "Salon Combos & Bulk Packs",
    categorySlug: "salon-combos",
    subcategory: "Treatment Kits",
    subcategorySlug: "treatment-kits",
    price: 4999,
    originalPrice: 7500,
    discountPercent: 33,
    rating: "5.0",
    reviewCount: 78,
    stock: 35,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
    ],
    description: "Complete Brazilian Keratin 3-Step salon treatment kit containing deep Clarifying Shampoo (1000ml), Formaldehyde-Free Nano-Keratin Infusion (1000ml), and Intensive Moisture Sealing Masque (1000ml). Eliminates 100% frizz and seals hair cuticles with high-gloss mirror shine for up to 6 months.",
    shortDescription: "Complete 3-Step 1000ml professional Brazilian keratin treatment system.",
    highlights: [
      "Complete 3x 1000ml full-size salon bottles",
      "Provides up to 25 full client salon treatments",
      "Eliminates 100% frizz with up to 6 months durability",
      "High profit margin treatment kit for salons"
    ],
    usageInstructions: "Step 1: Clarifying wash twice. Step 2: Dry 80%, apply keratin, wait 40 mins, blow dry & flat iron at 230°C. Step 3: Rinse and apply sealing masque.",
    specifications: {
      Brand: "PureCuts Pro",
      Contents: "Clarifying Shampoo 1L + Keratin 1L + Masque 1L",
      Yield: "20-25 Salon Client Sessions"
    },
    volumeSize: "3 x 1000 ml Kit",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["keratin", "treatment kit", "brazilian keratin", "combo", "salon pro"]
  },
  {
    slug: "complete-barber-station-pro-combo-setup-kit",
    name: "Wahl & Ikonic Barbershop Complete Station Setup Kit (Clipper + Trimmer + Foil Shaver + Cutting Cape + 6-Inch Scissors)",
    brand: "Wahl",
    category: "Salon Combos & Bulk Packs",
    categorySlug: "salon-combos",
    subcategory: "Barber Station Sets",
    subcategorySlug: "barber-station-sets",
    price: 8499,
    originalPrice: 11999,
    discountPercent: 29,
    rating: "4.9",
    reviewCount: 42,
    stock: 25,
    inStock: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
    ],
    description: "The ultimate turnkey starter bundle for modern barbershops. Includes Wahl Professional corded Super Taper heavy clipper, VGR metal zero-gap trimmer, double foil shaver, Japanese steel 6.0-inch haircutting shears, and water-resistant salon cutting cape.",
    shortDescription: "Complete high-performance barber cutting station combo package.",
    highlights: [
      "Turnkey setup with top professional barber tools",
      "Includes Clipper + Trimmer + Foil Shaver + Shears + Cape",
      "Saves over ₹3,500 compared to individual tool purchases"
    ],
    usageInstructions: "Essential professional tool kit ready to plug and play for barbershop stations.",
    specifications: {
      Brand: "Wahl & PureCuts Pro",
      "Total Items": "5 Premium Hardware Tools & Accessories",
      Warranty: "1 Year Official Brand Warranty on Electricals"
    },
    volumeSize: "5-Piece Station Kit",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["barber kit", "station combo", "wahl", "clipper combo", "tools pack"]
  },
  {
    slug: "dr-rashel-parlour-facial-glow-master-combo-pack",
    name: "Dr. Rashel 6-Tub Complete Parlour Facial Master Combo (380ml x 6 Tubs)",
    brand: "Dr. Rashel",
    category: "Salon Combos & Bulk Packs",
    categorySlug: "salon-combos",
    subcategory: "Facial Combos",
    subcategorySlug: "facial-combos",
    price: 999,
    originalPrice: 1599,
    discountPercent: 38,
    rating: "4.8",
    reviewCount: 89,
    stock: 60,
    inStock: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
    ],
    description: "Huge value 6-tub professional facial master combo containing Dr. Rashel's bestsellers: Papaya Exfoliating Scrub, Pearl Deep Massage Cream, Orange Hydrating Gel, Ubtan Brightening Pack, Aloe Vera Cleanser, and De-Tan Glow Polish (380ml each).",
    shortDescription: "6-Tub 380ml complete salon facial combo yielding over 70 client facial sessions.",
    highlights: [
      "Includes 6 full 380ml salon parlor tubs",
      "Yields over 70 complete salon facial sessions",
      "Instant glass skin glow, deep tan removal, and hydration",
      "Unmatched B2B value for beauty parlors and salon owners"
    ],
    usageInstructions: "Follow standard 5-step salon facial sequence: Cleanser -> Scrub -> Gel -> Cream massage -> Pack.",
    specifications: {
      Brand: "Dr. Rashel",
      Quantity: "6 Tubs x 380ml (Total 2,280ml)",
      Origin: "India"
    },
    volumeSize: "6 x 380 ml Tubs",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["dr rashel", "facial combo", "scrub", "facial pack", "parlour bulk"]
  },
  {
    slug: "purecuts-disposable-salon-hygiene-bulk-carton-1000pcs",
    name: "PureCuts 1000 Pcs Disposable Salon Hygiene Bulk Carton (Sheets + Towels + Strips)",
    brand: "PureCuts Pro",
    category: "Salon Combos & Bulk Packs",
    categorySlug: "salon-combos",
    subcategory: "Bulk Cartons",
    subcategorySlug: "bulk-cartons",
    price: 2499,
    originalPrice: 3800,
    discountPercent: 34,
    rating: "4.9",
    reviewCount: 65,
    stock: 50,
    inStock: true,
    image: "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
    ],
    description: "Wholesale bulk box containing 500 waterproof cutting sheets, 300 ultra-absorbent disposable head towels, and 200 hygienic stretch neck strips. Keeps salon stations 100% clean, compliant with municipal hygiene standards, and saves hours of daily laundry.",
    shortDescription: "1000 pcs wholesale hygiene bulk carton for active barbershops and beauty salons.",
    highlights: [
      "1000 Pieces total salon hygiene consumables",
      "Zero laundry costs - 100% single-use client hygiene",
      "Heavy-duty water & chemical resistant fabrics"
    ],
    usageInstructions: "Stock at barber and stylist stations for single-use client servicing.",
    specifications: {
      Brand: "PureCuts Pro",
      "Carton Quantity": "1000 Pieces Total",
      Packaging: "Corrugated Master Carton"
    },
    volumeSize: "1000 Pcs Master Carton",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["disposable bulk", "hygiene carton", "sheets", "towels", "wholesale"]
  },

  // --- Accessories ---
  {
    slug: "purecuts-pro-carbon-tail-comb-set-6pcs",
    name: "PureCuts Pro Heat-Resistant Carbon Fiber Anti-Static Tail & Section Comb Set (6 Pcs)",
    brand: "PureCuts Pro",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Comb & Brushes",
    subcategorySlug: "comb-brushes",
    price: 349,
    originalPrice: 599,
    discountPercent: 42,
    rating: "4.8",
    reviewCount: 37,
    stock: 120,
    inStock: true,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
    ],
    description: "Professional aerospace-grade carbon fiber salon combs engineered to withstand styling iron heat up to 230°C. 100% static-free with seamless rounded teeth that glide through wet or dry hair without snagging or scraping the scalp.",
    shortDescription: "Heat-resistant carbon fiber salon parting and styling combs.",
    highlights: [
      "Heat resistant up to 230°C for flat iron styling",
      "Anti-static carbon fiber prevents flyaway hair",
      "Includes 6 essential barber and stylist comb shapes"
    ],
    usageInstructions: "Use fine pin tail for clean hair sectioning and foil placement.",
    specifications: {
      Brand: "PureCuts Pro",
      Material: "Aerospace Carbon Fiber",
      Quantity: "6 Combs Set"
    },
    volumeSize: "6-Piece Set",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["comb", "carbon fiber", "anti-static", "styling comb", "accessories"]
  },
  {
    slug: "purecuts-tint-bowl-and-applicator-brush-set",
    name: "PureCuts Professional Non-Slip Rubber Base Tint Bowl & Dual-Bristle Hair Dye Brush Set",
    brand: "PureCuts Pro",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Comb & Brushes",
    subcategorySlug: "comb-brushes",
    price: 189,
    originalPrice: 299,
    discountPercent: 37,
    rating: "4.7",
    reviewCount: 46,
    stock: 150,
    inStock: true,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
    ],
    description: "Heavy-duty chemical-resistant polypropylene mixing bowl with suction rubber base to prevent accidental counter spills. Comes with premium dual-bristle feathering brush for precise root retouching and balayage sweeps.",
    shortDescription: "Non-slip salon tinting bowl and dye applicator brush duo.",
    highlights: [
      "Non-slip silicone ring base prevents work station spills",
      "Accurate internal milliliter measurement markings",
      "Feathered bristles for smooth balayage & root blending"
    ],
    usageInstructions: "Mix developer and color cream with tint brush until smooth.",
    specifications: {
      Brand: "PureCuts Pro",
      BowlCapacity: "300 ml",
      Material: "Chemical-Resistant Polypropylene"
    },
    volumeSize: "Bowl + Brush Set",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["tint bowl", "dye brush", "hair color tools", "accessories"]
  },
  {
    slug: "ultra-fine-continuous-salon-water-mist-spray-bottle-300ml",
    name: "PureCuts Ultra-Fine Continuous Salon Water Mist Spray Bottle 300ml",
    brand: "PureCuts Pro",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Spray Bottle",
    subcategorySlug: "spray-bottle",
    price: 299,
    originalPrice: 499,
    discountPercent: 40,
    rating: "4.9",
    reviewCount: 72,
    stock: 90,
    inStock: true,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
    ],
    description: "Next-generation aerosol-free continuous mist spray bottle delivering an ultra-fine, even moisture cloud with a single squeeze. Operates at any angle, including upside down, without leaking.",
    shortDescription: "Continuous ultra-fine 360-degree salon water mist bottle.",
    highlights: [
      "Aerosol-free continuous mist distribution",
      "Works 360-degrees upside down for fast haircutting",
      "Ergonomic handle reduces hand fatigue during busy salon hours"
    ],
    usageInstructions: "Fill with distilled or filtered water and squeeze trigger firmly for continuous spray.",
    specifications: {
      Brand: "PureCuts Pro",
      Capacity: "300 ml",
      Type: "Continuous Fine Mist Spray"
    },
    volumeSize: "300 ml",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["spray bottle", "mist bottle", "water sprayer", "accessories"]
  },

  // --- Disposables ---
  {
    slug: "purecuts-black-nitrile-salon-gloves-box-of-100",
    name: "PureCuts Heavy-Duty Powder-Free Black Nitrile Salon Gloves (Box of 100 Pcs)",
    brand: "PureCuts Pro",
    category: "Salon Disposables",
    categorySlug: "disposable",
    subcategory: "Tissue",
    subcategorySlug: "tissue",
    price: 449,
    originalPrice: 650,
    discountPercent: 31,
    rating: "4.9",
    reviewCount: 84,
    stock: 140,
    inStock: true,
    image: "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
    ],
    description: "Tear-resistant medical-grade black nitrile gloves offering superior barrier protection against hair dyes, bleaches, keratin chemicals, and hot styling oils. Textured fingertips ensure tight grip on scissors and foils.",
    shortDescription: "Tear-resistant powder-free black nitrile gloves for salon colorists.",
    highlights: [
      "100% Latex-free & powder-free for sensitive skin",
      "Chemical resistant to peroxides and hair color developers",
      "Micro-textured fingertips for precise scissor and razor grip"
    ],
    usageInstructions: "Single use protective gloves for color mixing, shampooing, and chemical smoothing.",
    specifications: {
      Brand: "PureCuts Pro",
      Material: "Medical Grade Nitrile",
      Quantity: "100 Gloves (50 Pairs)"
    },
    volumeSize: "100 Pcs Box",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["gloves", "nitrile gloves", "black gloves", "disposable", "salon hygiene"]
  },
  {
    slug: "purecuts-disposable-biodegradable-towels-pack-of-50",
    name: "PureCuts Extra-Absorbent Non-Woven Disposable Salon Towels (50 Pcs Pack)",
    brand: "PureCuts Pro",
    category: "Salon Disposables",
    categorySlug: "disposable",
    subcategory: "Cotton",
    subcategorySlug: "cotton",
    price: 399,
    originalPrice: 599,
    discountPercent: 33,
    rating: "4.8",
    reviewCount: 49,
    stock: 85,
    inStock: true,
    image: "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
    ],
    description: "Extra large 40cm x 80cm disposable salon towels made of thick 60 GSM spunlace non-woven fabric. Absorbs twice as much water as standard cotton towels without dripping, linting, or carrying laundry bacteria between clients.",
    shortDescription: "Extra-large 40x80cm absorbent single-use disposable salon head towels.",
    highlights: [
      "Absorbs twice as much water as standard cotton towels",
      "No lint, zero odor, 100% hygienic per client",
      "Cuts down electricity and water laundry utility bills"
    ],
    usageInstructions: "Drape over client shoulders at shampoo backwash basin for quick drying.",
    specifications: {
      Brand: "PureCuts Pro",
      Dimensions: "40 cm x 80 cm",
      Thickness: "60 GSM Spunlace",
      Quantity: "50 Towels Pack"
    },
    volumeSize: "50 Towels Pack",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["disposable towel", "salon towels", "hygiene", "disposable", "spunlace"]
  },

  // --- Machineries ---
  {
    slug: "wahl-professional-5-star-cordless-senior-clipper",
    name: "Wahl Professional 5-Star Cordless Senior Metal Housing Hair Clipper",
    brand: "Wahl",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Clipper",
    subcategorySlug: "hair-clipper",
    price: 9899,
    originalPrice: 12500,
    discountPercent: 21,
    rating: "5.0",
    reviewCount: 92,
    stock: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
    ],
    description: "The gold standard heavy-duty metal housing clipper powered by Wahl's strongest rotary motor. Precision zero-overlap adjustable blade creates seamless skin fades, debulking thick wet or dry hair effortlessly with 80 minutes continuous lithium runtime.",
    shortDescription: "Heavy-duty metal housing clipper with high torque rotary motor.",
    highlights: [
      "Heavy-duty ergonomic aluminum metal housing",
      "V9000 equivalent high torque rotary motor",
      "Precision zero-gap adjustable fade blade",
      "Official 2-Year Wahl India Warranty"
    ],
    usageInstructions: "Charge fully before first use. Apply Wahl clipper oil after every 2-3 haircuts.",
    specifications: {
      Brand: "Wahl Professional",
      Motor: "High Speed Rotary Motor (7,200 RPM)",
      Battery: "Lithium-Ion (80 Mins Runtime)",
      Blade: "Zero-Overlap Chrome Plated"
    },
    volumeSize: "1 Set with 3 Premium Guards",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["wahl", "senior", "cordless clipper", "clipper", "machineries", "barber"]
  },
  {
    slug: "ikonic-pro-2800-super-heat-hair-dryer-2500w",
    name: "Ikonic Professional Pro 2800+ Super Heat Ionic Salon Hair Dryer (2500W)",
    brand: "Ikonic",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Dryer",
    subcategorySlug: "hair-dryer",
    price: 3299,
    originalPrice: 4200,
    discountPercent: 21,
    rating: "4.9",
    reviewCount: 68,
    stock: 45,
    inStock: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
    ],
    description: "Heavy-duty 2500W Italian design AC motor engineered for fast blowout services in busy hair salons. Features ceramic tourmaline ionic generator that seals cuticle moisture for frizz-free, ultra-shiny hair styling in half the drying time.",
    shortDescription: "2500W high-speed ionic salon hair dryer for fast blowouts.",
    highlights: [
      "2500W High power Italian design AC motor",
      "Tourmaline negative ion generator eliminates frizz",
      "2 Speed & 3 Heat settings with instant Cold Shot button"
    ],
    usageInstructions: "Use narrow concentrator nozzle for smooth directional blowout brushing.",
    specifications: {
      Brand: "Ikonic",
      Power: "2500 Watts",
      Cord: "3 Meter Heavy Duty Salon Cable",
      Motor: "Long-Life AC Motor"
    },
    volumeSize: "Dryer + 2 Concentrator Nozzles",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["ikonic", "hair dryer", "blowout", "2500w", "machineries"]
  },

  // --- Furniture ---
  {
    slug: "purecuts-heavy-duty-portable-facial-massage-bed",
    name: "PureCuts 3-Fold Portable Heavy-Duty Facial & Massage Treatment Bed with Aluminum Legs",
    brand: "PureCuts Pro",
    category: "Salon Furniture",
    categorySlug: "furniture",
    subcategory: "Facial & Spa Bed",
    subcategorySlug: "facial-spa-bed",
    price: 8999,
    originalPrice: 12500,
    discountPercent: 28,
    rating: "4.9",
    reviewCount: 26,
    stock: 15,
    inStock: true,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
    ],
    description: "Ergonomic 3-fold portable salon treatment bed cushioned with 7cm multi-layer high-density foam and oil-proof PU leather. Folds cleanly in 30 seconds into a portable carry case, supporting up to 250kg working weight.",
    shortDescription: "Heavy-duty 3-fold portable facial & massage spa bed.",
    highlights: [
      "Oil & waterproof medical grade PU leather upholstery",
      "Height adjustable from 60cm to 85cm for therapist comfort",
      "Working weight capacity tested up to 250 kg"
    ],
    usageInstructions: "Unfold legs, tighten safety lock knobs, and position face cradle.",
    specifications: {
      Brand: "PureCuts Pro",
      Structure: "Reinforced Aluminum & Hardwood",
      WeightCapacity: "250 KG",
      Dimensions: "185 cm x 70 cm"
    },
    volumeSize: "1 Bed + Face Cradle + Carry Bag",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["facial bed", "massage bed", "portable bed", "furniture", "salon equipment"]
  }
];

// Read existing content
const marker = 'export const PRODUCTS_DATA: SeedProduct[] =';
const markerIndex = content.indexOf(marker);

if (markerIndex === -1) {
  console.error("Marker not found in seed-data.ts!");
  process.exit(1);
}

// Check how many items currently in BASE_PRODUCTS_DATA
console.log('Existing BASE_PRODUCTS_DATA found before marker.');

// Format new products as TypeScript objects
const formattedCode = newProducts.map(p => `  ${JSON.stringify(p, null, 2)},`).join('\n\n');

// Find the last item before the closing bracket of BASE_PRODUCTS_DATA
const closingBracketIndex = content.lastIndexOf('];', markerIndex);

if (closingBracketIndex === -1) {
  console.error("Closing bracket of BASE_PRODUCTS_DATA not found!");
  process.exit(1);
}

const beforeClosing = content.substring(0, closingBracketIndex);
const afterClosing = content.substring(closingBracketIndex);

const updatedContent = `${beforeClosing}\n\n  // --- NEW ADDITIONS FOR CATEGORIES & SECTION LINKING ---\n${formattedCode}\n${afterClosing}`;

fs.writeFileSync(seedFilePath, updatedContent, 'utf8');
console.log(`Successfully added ${newProducts.length} new products to seed-data.ts!`);
