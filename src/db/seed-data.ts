export interface SeedCategory {
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  productCount: number;
  isFeatured: boolean;
  displayOrder: number;
}

export interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  price: number;
  punePrice?: number;
  outsidePunePrice?: number;

  originalPrice: number;
  discountPercent: number;
  rating: string;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  shortDescription: string;
  highlights: string[];
  usageInstructions: string;
  specifications: Record<string, string>;
  volumeSize?: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isDealOfTheDay?: boolean;
  isHairCareHero?: boolean;
  isSkincareBestseller?: boolean;
  isSalonPro?: boolean;
  tags: string[];
}

export const CATEGORIES_DATA: SeedCategory[] = [
  {
    name: "Haircare",
    slug: "haircare",
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    description: "",
    productCount: 48,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    name: "Skincare & Bodycare",
    slug: "skincare",
    icon: "HeartHandshake",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    description: "",
    productCount: 42,
    isFeatured: true,
    displayOrder: 2,
  },
  {
    name: "Machineries & Tools",
    slug: "machineries",
    icon: "Zap",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    description: "",
    productCount: 30,
    isFeatured: true,
    displayOrder: 3,
  },
  {
    name: "Salon Accessories",
    slug: "accessories",
    icon: "Scissors",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    description: "",
    productCount: 26,
    isFeatured: true,
    displayOrder: 4,
  },
  {
    name: "Salon Furniture",
    slug: "furniture",
    icon: "Armchair",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    description: "",
    productCount: 14,
    isFeatured: true,
    displayOrder: 5,
  },
  {
    name: "Salon Disposables",
    slug: "disposable",
    icon: "Layers",
    image:
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    description: "",
    productCount: 20,
    isFeatured: true,
    displayOrder: 6,
  },
  {
    name: "Hair Color & Developers",
    slug: "hair-color",
    icon: "Palette",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    description: "",
    productCount: 35,
    isFeatured: true,
    displayOrder: 7,
  },
  {
    name: "Salon Combos & Bulk Packs",
    slug: "salon-combos",
    icon: "PackageCheck",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    description: "",
    productCount: 18,
    isFeatured: true,
    displayOrder: 8,
  },
];

export const BASE_PRODUCTS_DATA: SeedProduct[] = [
  // --- Haircare Products ---
  {
    slug: "schwarzkopf-bonacure-peptide-repair-rescue-mask-500ml",
    name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 500ml",
    brand: "Schwarzkopf Professional",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Creams & Masks",
    subcategorySlug: "hair-creams-masks",
    price: 1237,

    originalPrice: 1650,
    discountPercent: 25,
    rating: "4.9",
    reviewCount: 48,
    stock: 65,
    inStock: true,
    image:
      "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-1.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-1.png",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    description:
      "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask is a salon-quality product designed for severely damaged hair. Deeply reconstructs inner and outer hair structure with peptides and Cell Perfector Technology for instant elasticity and strength. Balances moisture, reduces frizz, and boosts shine, softness, and manageability in one use.",
    shortDescription:
      "Salon-grade deep conditioning hair mask for severely damaged, chemically treated hair.",
    highlights: [
      "Reconstructs inner cortex & outer cuticle with Vegan Keratin & Peptides",
      "Deep moisture & 95% less breakage from first use",
      "Perfect for chemically treated, porous or bleached hair",
      "100% Authentic Schwarzkopf Salon Professional 500ml Tub",
    ],
    usageInstructions:
      "Apply 25-30g to towel-dried hair after shampooing. Massage through mid-lengths and ends. Leave on for 5-10 minutes, then rinse thoroughly.",
    specifications: {
      Brand: "Schwarzkopf Professional",
      Formulation: "Rich Masque Cream",
      "Hair Type": "Damaged, Bleached, Chemically Treated",
      "Net Quantity": "500 ml",
      Origin: "Germany / India Import",
    },
    volumeSize: "500 ml",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: [
      "schwarzkopf",
      "bonacure",
      "hair mask",
      "hair treatment",
      "repair rescue",
    ],
  },
  {
    slug: "schwarzkopf-bonacure-peptide-repair-rescue-mask-200ml",
    name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 200ml",
    brand: "Schwarzkopf Professional",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Creams & Masks",
    subcategorySlug: "hair-creams-masks",
    price: 862,

    originalPrice: 1150,
    discountPercent: 25,
    rating: "4.8",
    reviewCount: 34,
    stock: 45,
    inStock: true,
    image:
      "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-2.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-2.png",
    ],
    description:
      "Reconstructs inner hair cortex and outer cuticle using peptides, vegan keratin, and arginine for instant strength and elasticity. Provides deep moisture, reduces frizz, and enhances shine and softness; ideal for chemically treated or breakage-prone hair.",
    shortDescription:
      "200ml salon repair rescue treatment for damaged, dull, and frizzy hair.",
    highlights: [
      "Restores elasticity & strength",
      "Formulated with Cell Perfector Technology",
      "Instant visible salon results",
    ],
    usageInstructions:
      "Apply to towel-dried hair for 5-10 minutes, then rinse cleanly.",
    specifications: {
      Brand: "Schwarzkopf Professional",
      "Net Quantity": "200 ml",
      "Hair Type": "Dry & Damaged",
    },
    volumeSize: "200 ml",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["schwarzkopf", "bonacure", "200ml", "repair"],
  },
  {
    slug: "matrix-biolage-colorlast-color-protecting-masque",
    name: "Matrix Biolage ColorLast Color Protecting Masque",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Masque",
    subcategorySlug: "hair-masque",
    price: 554,

    originalPrice: 630,
    discountPercent: 12,
    rating: "4.7",
    reviewCount: 29,
    stock: 50,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-6-1.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-6-1.png",
    ],
    description:
      "Matrix Biolage ColorLast Color Protecting Masque is a deep-conditioning hair mask designed for color-treated hair, featuring orchid extract to preserve vibrancy and shine. Protects color from fading for up to 9 weeks while deeply hydrating and nourishing hair. Enhances shine and smoothness without silicone buildup.",
    shortDescription:
      "Deep conditioning mask for color-treated hair, enriched with orchid extract.",
    highlights: [
      "Maintains color depth, tone and shine for up to 9 weeks",
      "Low pH formula with UV filters",
      "Paraben-free and lightweight finish",
    ],
    usageInstructions:
      "Apply to wet hair and leave in 3-5 minutes. Rinse thoroughly. Use 1-2 times weekly in place of conditioner.",
    specifications: {
      Brand: "Matrix Biolage",
      "Hair Type": "Color-treated hair",
      Formula: "Low pH, Orchid Extract",
      "Net Quantity": "490 g",
    },
    volumeSize: "490 g",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "biolage", "colorlast", "color safe", "hair masque"],
  },
  {
    slug: "matrix-opti-conditioning-cream-neutralizer",
    name: "Matrix Opti Conditioning Cream Neutralizer",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Neutralizing Cream",
    subcategorySlug: "neutralizing-cream",
    price: 704,

    originalPrice: 800,
    discountPercent: 12,
    rating: "4.8",
    reviewCount: 22,
    stock: 38,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-5.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-5.png",
    ],
    description:
      "Matrix Opti Conditioning Cream Neutralizer is a post-treatment cream used after hair straightening or smoothing processes to lock in results and condition hair. It suits normal, resistant, and sensitized hair types while protecting against damage.",
    shortDescription:
      "Professional salon post-straightening neutralizer cream for lasting smooth results.",
    highlights: [
      "Seals straightening effects for silky, frizz-free hair",
      "Deeply conditions to preserve hair moisture barrier",
      "Forms protective layer around hair shaft",
    ],
    usageInstructions:
      "Apply evenly across straightened hair strands, leave for recommended processing time (10-15 min), then rinse completely.",
    specifications: {
      Brand: "Matrix Professional",
      Application: "Post-rebonding / Post-straightening",
      "Net Quantity": "1000 ml",
    },
    volumeSize: "1000 ml",
    isFeatured: false,
    isBestseller: false,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "opti", "neutralizer", "straightening", "rebonding"],
  },
  {
    slug: "matrix-biolage-advanced-scalppure-mask",
    name: "Matrix Biolage Advanced Scalppure Mask",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Creams & Masks",
    subcategorySlug: "hair-creams-masks",
    price: 770,

    originalPrice: 875,
    discountPercent: 12,
    rating: "4.9",
    reviewCount: 31,
    stock: 40,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-4-1.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-4-1.png",
    ],
    description:
      "Matrix Biolage Advanced Scalppure Mask is a multi-purpose scalp treatment that tackles dandruff, oiliness, and irritation for healthier hair and scalp. It uses Zinc PCA, Zinc Pyrithione, and Bergamot to purify and soothe all hair types. Cools and refreshes scalp with mint and Kola Nut complex during massage.",
    shortDescription:
      "Multi-action anti-dandruff and scalp soothing treatment mask.",
    highlights: [
      "Reduces dandruff, excess sebum, and scalp itching",
      "Contains Zinc Pyrithione + Bergamot + Cooling Mint",
      "Salon head spa treatment favorite",
    ],
    usageInstructions:
      "Apply directly to clean damp scalp and hair. Massage gently for 3-5 minutes. Rinse well.",
    specifications: {
      Brand: "Matrix Biolage",
      "Target Concern": "Dandruff, Itchy Scalp, Oiliness",
      "Net Quantity": "490 g",
    },
    volumeSize: "490 g",
    isFeatured: true,
    isBestseller: false,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "scalppure", "anti-dandruff", "scalp treatment"],
  },
  {
    slug: "matrix-liquid-protein-masque",
    name: "Matrix Professional Liquid Protein Masque",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Masque",
    subcategorySlug: "hair-masque",
    price: 770,

    originalPrice: 875,
    discountPercent: 12,
    rating: "4.9",
    reviewCount: 38,
    stock: 55,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-3.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-3.png",
    ],
    description:
      "Matrix Professional Liquid Protein Masque, from the Opti.Repair range, deeply nourishes and repairs damaged hair with liquid proteins. It's suitable for all hair types, especially dry, brittle, or chemically treated ones, showing results from the first use. Cuts hair breakage by up to 99% and restores strength and elasticity.",
    shortDescription:
      "Opti.Repair liquid protein intensive reconstruction mask for weak hair.",
    highlights: [
      "Fills cuticle gaps and reduces split ends immediately",
      "Reduces breakage up to 99%",
      "Paraben-free, lightweight salon formulation",
    ],
    usageInstructions:
      "After shampooing, apply onto wet lengths. Leave for 5 minutes and rinse thoroughly.",
    specifications: {
      Brand: "Matrix Professional",
      "Key Ingredient": "Liquid Proteins",
      "Net Quantity": "490 g",
    },
    volumeSize: "490 g",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "liquid protein", "opti repair", "anti breakage"],
  },
  {
    slug: "matrix-biolage-advanced-fiberstrong-mask",
    name: "Matrix Biolage Advanced Fiberstrong Mask",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Creams & Masks",
    subcategorySlug: "hair-creams-masks",
    price: 818,
    originalPrice: 930,
    discountPercent: 12,
    rating: "4.8",
    reviewCount: 42,
    stock: 60,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-2.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-2.png",
    ],
    description:
      "Matrix Biolage Advanced Fiberstrong Mask strengthens fragile, damaged hair with bamboo extract and Intra-Cylane technology. Cuts hair breakage by up to 95% in one use. Boosts strength, elasticity, and moisture for weak or chemically treated hair.",
    shortDescription:
      "Strengthening masque with Bamboo and Intra-Cylane for fragile hair.",
    highlights: [
      "Cuts breakage by up to 95% in one single application",
      "Enriched with Bamboo & Intra-Cylane molecules",
      "Smooths cuticle and enhances natural elasticity",
    ],
    usageInstructions:
      "Apply to clean, damp hair from mid-lengths to tips. Leave for 5 to 10 minutes and rinse.",
    specifications: {
      Brand: "Matrix Biolage",
      "Active Components": "Bamboo Extract, Intra-Cylane",
      "Net Quantity": "490 g",
    },
    volumeSize: "490 g",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "fiberstrong", "bamboo", "hair mask"],
  },
  {
    slug: "matrix-professional-liquid-protein-shampoo",
    name: "Matrix Professional Liquid Protein Shampoo",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Shampoo",
    subcategorySlug: "shampoo",
    price: 343,
    originalPrice: 390,
    discountPercent: 12,
    rating: "4.7",
    reviewCount: 28,
    stock: 75,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-1.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix-1.png",
    ],
    description:
      "Cleanses scalp and strands without stripping essential moisture. Strengthens hair to cut breakage by up to 99% with regular use. Restores softness, reduces frizz, and boosts manageability.",
    shortDescription:
      "Daily hair strengthening protein shampoo for brittle, damage-prone hair.",
    highlights: [
      "Gentle scalp cleanser with liquid protein bond fortifier",
      "Noticeably reduced breakage and split ends",
      "Pairs seamlessly with Matrix Liquid Protein Conditioner",
    ],
    usageInstructions:
      "Massage into wet scalp and hair until lather forms. Rinse well.",
    specifications: {
      Brand: "Matrix Professional",
      Form: "Liquid Shampoo",
      "Net Quantity": "200 ml",
    },
    volumeSize: "200 ml",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "shampoo", "liquid protein", "cleanse"],
  },
  {
    slug: "matrix-professional-liquid-protein-conditioner",
    name: "Matrix Professional Liquid Protein Conditioner",
    brand: "Matrix",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Conditioner",
    subcategorySlug: "conditioner",
    price: 294,
    originalPrice: 335,
    discountPercent: 12,
    rating: "4.7",
    reviewCount: 25,
    stock: 70,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/02/matrix.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/02/matrix.png",
    ],
    description:
      "Repairs dry, brittle, damaged hair quickly. Reduces split ends, breakage by up to 99%, and knotting. Apply after shampoo on mid-lengths to ends, leave 2-3 minutes, rinse. Best in system with InstaCure Shampoo and Porosity Spray. Vegan, paraben-free, suitable for all hair types.",
    shortDescription:
      "Nourishing liquid protein conditioner for smooth, tangle-free, resilient hair.",
    highlights: [
      "Detangles instantly with zero drag",
      "Deeply seals cuticles for reflective salon shine",
      "Vegan & paraben-free formula",
    ],
    usageInstructions:
      "Apply to washed damp hair lengths for 2-3 minutes. Rinse with cool water.",
    specifications: {
      Brand: "Matrix Professional",
      "Net Quantity": "196 g",
      "Hair Type": "All Hair Types / Dry Hair",
    },
    volumeSize: "196 g",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["matrix", "conditioner", "liquid protein", "haircare"],
  },
  {
    slug: "loreal-majirel-hair-color-natural-black-1",
    name: "L'Oréal Professionnel Paris Majirel Hair Color Tube – Natural Black (1 No.)",
    brand: "L'Oréal Professionnel",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Color",
    subcategorySlug: "hair-color",
    price: 357,
    originalPrice: 420,
    discountPercent: 15,
    rating: "4.9",
    reviewCount: 64,
    stock: 120,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    ],
    description:
      "L'Oréal Professionnel Paris Majirel is the benchmark in professional hair color. Enriched with Ionène G and Incell technology, it provides 100% white hair coverage with deep, rich, long-lasting uniform color and exceptional hair condition.",
    shortDescription:
      "Permanent professional hair color cream shade 1 (Natural Black) with 100% grey coverage.",
    highlights: [
      "100% grey/white hair coverage",
      "Infused with Ionène G & Incell to strengthen hair core",
      "Legendary rich and glossy dark black finish",
      "Pro salon mixing ratio: 1:1.5 with L'Oréal Developer",
    ],
    usageInstructions:
      "Mix 1 tube (50ml) with 75ml of L'Oréal Professionnel 20 or 30 Vol Oxydant. Apply onto dry unwashed hair. Leave for 35 minutes, emulsify and rinse.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      Shade: "1 (Natural Black)",
      Type: "Permanent Crème Hair Color",
      "Net Quantity": "50 ml / 60 g",
    },
    volumeSize: "50 ml",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["loreal", "majirel", "hair color", "natural black", "grey coverage"],
  },
  {
    slug: "loreal-majirel-hair-color-golden-blonde-7-3",
    name: "L'Oréal Professionnel Paris Majirel Hair Color Tube – Golden Blonde (7.3 No.)",
    brand: "L'Oréal Professionnel",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Color",
    subcategorySlug: "hair-color",
    price: 357,
    originalPrice: 420,
    discountPercent: 15,
    rating: "4.8",
    reviewCount: 38,
    stock: 80,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    ],
    description:
      "Permanent professional hair color in shade 7.3 (Golden Blonde). Provides up to 100% grey hair coverage with vibrant multi-dimensional golden blonde reflections and superior resistance to fading.",
    shortDescription:
      "Professional salon golden blonde hair color tube 7.3 with Ionène G.",
    highlights: [
      "Shade 7.3 Golden Blonde",
      "Multi-dimensional salon shine & warm tones",
      "Long-lasting fade resistant color",
    ],
    usageInstructions:
      "Mix 1:1.5 with 20 Vol / 30 Vol developer. Develop for 35 minutes.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      Shade: "7.3 (Golden Blonde)",
      "Net Quantity": "50 ml",
    },
    volumeSize: "50 ml",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["loreal", "majirel", "golden blonde", "color tube"],
  },
  {
    slug: "streax-pro-argan-secrets-hair-colourant-5-4",
    name: "Streax Professional Argan Secrets Hair Colourant Cream - 5.4 (Copper Light Brown)",
    brand: "Streax Professional",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Color",
    subcategorySlug: "hair-color",
    price: 165,
    originalPrice: 220,
    discountPercent: 25,
    rating: "4.7",
    reviewCount: 39,
    stock: 90,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/11/84.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/11/84.png"],
    description:
      "Shade 5.4 (Copper Light Brown) is a permanent hair color cream enriched with precious Argan Oil and Walnut Oil that produces a vibrant copper-tinged light brown with a rich, multi-dimensional natural finish and excellent grey coverage.",
    shortDescription:
      "Argan Oil infused professional hair color cream shade 5.4 Copper Light Brown.",
    highlights: [
      "Infused with Argan Oil & Walnut Oil",
      "Brilliant copper tone with intense shine",
      "Rich grey coverage with hair conditioning",
    ],
    usageInstructions:
      "Mix 1:1 with Streax Professional Developer (20 Vol). Apply and develop for 30 minutes.",
    specifications: {
      Brand: "Streax Professional",
      Shade: "5.4 Copper Light Brown",
      "Net Quantity": "60 ml / 100 ml",
    },
    volumeSize: "100 ml",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["streax", "argan secrets", "hair color", "copper brown"],
  },
  {
    slug: "loreal-liss-unlimited-shampoo-300ml",
    name: "L'Oréal Professionnel Serie Expert Liss Unlimited Shampoo 300ml",
    brand: "L'Oréal Professionnel",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Shampoo",
    subcategorySlug: "shampoo",
    price: 562,
    originalPrice: 750,
    discountPercent: 25,
    rating: "4.8",
    reviewCount: 52,
    stock: 65,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80",
    ],
    description:
      "L'Oréal Professionnel Serie Expert Liss Unlimited Shampoo purifies the hair and keeps frizz under control for up to 4 days, even under high humidity conditions. Enriched with Pro-Keratin, Kukui Nut Oil and Evening Primrose Oil.",
    shortDescription:
      "Anti-frizz smoothing shampoo with Pro-Keratin and Kukui Nut Oil.",
    highlights: [
      "Controls rebellious & frizzy hair up to 96 hours",
      "Infused with Pro-Keratin & Evening Primrose Oil",
      "Leaves hair soft, manageable, and intensely glossy",
    ],
    usageInstructions:
      "Apply evenly to damp hair. Lather and rinse thoroughly. Follow with Liss Unlimited Masque.",
    specifications: {
      Brand: "L'Oréal Professionnel",
      "Net Quantity": "300 ml",
      "Target Concern": "Frizzy, Rebellious, Straightened Hair",
    },
    volumeSize: "300 ml",
    isFeatured: true,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: true,
    tags: ["loreal", "liss unlimited", "frizz control", "shampoo"],
  },
  {
    slug: "parachute-coconut-oil-600ml-bottle",
    name: "Parachute 100% Pure Coconut Oil 600 ml Bottle",
    brand: "Parachute",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Oil",
    subcategorySlug: "hair-oil",
    price: 399,
    originalPrice: 430,
    discountPercent: 7,
    rating: "4.9",
    reviewCount: 88,
    stock: 150,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/04/21.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2026/04/21.png"],
    description:
      "Parachute Coconut Oil 600 ml is 100% pure, unrefined coconut oil from Marico, India's top-selling brand, made from sun-dried coconuts via a hands-free extraction process. Undergoes 5-stage purification and 27 quality tests for purity, retaining a fresh nutty aroma and edible-grade certification.",
    shortDescription:
      "100% pure unrefined coconut oil with 5-stage purification for scalp massage.",
    highlights: [
      "100% Pure sun-dried coconut oil with no chemicals or additives",
      "Deeply conditions scalp and strengthens hair roots",
      "Essential staple for salon head massage and hair spa pre-oiling",
    ],
    usageInstructions:
      "Warm oil slightly, gently massage into scalp and hair strands. Leave for 45 minutes or overnight before shampoo.",
    specifications: {
      Brand: "Parachute (Marico)",
      Type: "100% Pure Unrefined Oil",
      "Net Quantity": "600 ml",
    },
    volumeSize: "600 ml",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: false,
    tags: ["parachute", "coconut oil", "hair oil", "pure"],
  },
  {
    slug: "bajaj-almond-drops-hair-oil-625ml",
    name: "Bajaj Almond Drops Hair Oil, 625ml, Light & Non-Sticky",
    brand: "Bajaj",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Oil",
    subcategorySlug: "hair-oil",
    price: 486,
    originalPrice: 540,
    discountPercent: 10,
    rating: "4.8",
    reviewCount: 56,
    stock: 90,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/04/11.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2026/04/11.png"],
    description:
      "Bajaj Almond Drops Hair Oil is a popular non-sticky hair care product from Bajaj Consumer Care, enriched with sweet almond oil and 6X Vitamin E for deep root nourishment. It moisturizes the scalp, reduces hair fall by strengthening strands, and promotes shiny, silky hair with easy absorption.",
    shortDescription:
      "Non-sticky hair oil enriched with sweet almond oil and 6X Vitamin E.",
    highlights: [
      "6X Vitamin E nourishment for stronger hair strands",
      "Light, non-sticky and quickly absorbed formulation",
      "Reduces hair fall and adds smooth manageable shine",
    ],
    usageInstructions:
      "Pour a few drops on palm, apply gently to scalp and hair tips.",
    specifications: {
      Brand: "Bajaj Consumer Care",
      "Net Quantity": "625 ml",
      "Key Nutrient": "Almond Oil + 6X Vitamin E",
    },
    volumeSize: "625 ml",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: false,
    tags: ["bajaj", "almond drops", "vitamin e", "hair oil"],
  },
  {
    slug: "garnier-color-naturals-natural-black-1",
    name: "Garnier Color Naturals Crème – Natural Black (1 No.)",
    brand: "Garnier",
    category: "Haircare",
    categorySlug: "haircare",
    subcategory: "Hair Color",
    subcategorySlug: "hair-color",
    price: 170,
    originalPrice: 230,
    discountPercent: 26,
    rating: "4.6",
    reviewCount: 41,
    stock: 110,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/07/17.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/07/17.png"],
    description:
      "Permanent crème hair color in shade 1 (Natural Black) for intense, natural-looking black results with 100% grey coverage. No ammonia formula enriched with 3 essential oils (Almond, Olive & Avocado) to nourish hair while coloring.",
    shortDescription:
      "No-ammonia permanent crème hair color with 3 natural nourishing oils.",
    highlights: [
      "100% Grey Coverage with rich natural black shine",
      "No Ammonia formula gentle on scalp",
      "Enriched with Olive, Almond & Avocado oils",
    ],
    usageInstructions:
      "Mix colorant and developer in 1:1 ratio. Apply on hair and leave for 30 minutes before washing.",
    specifications: {
      Brand: "Garnier",
      Shade: "1 Natural Black",
      Formula: "No Ammonia Crème",
      "Net Quantity": "70 ml + 60 g",
    },
    volumeSize: "Complete Kit",
    isFeatured: false,
    isBestseller: true,
    isHairCareHero: true,
    isSalonPro: false,
    tags: ["garnier", "color naturals", "no ammonia", "black"],
  },

  // --- Skincare & Bodycare Products ---
  {
    slug: "ponds-powder-starlight-glow",
    name: "Pond's Dreamflower & Sandal Powder - Ultra Matte Glow",
    brand: "POND'S",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Powder",
    subcategorySlug: "facial-powder",
    price: 308,
    originalPrice: 335,
    discountPercent: 8,
    rating: "4.8",
    reviewCount: 45,
    stock: 80,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/07/ponds4.png",
    galleryImages: [
      "https://purecuts.in/wp-content/uploads/2026/07/ponds4.png",
    ],
    description:
      "Soft, smooth, and effortlessly radiant. A flawless finish for your everyday glow. Lightweight coverage, naturally beautiful results. Pond's Powder brings you a smooth, fresh, and naturally radiant look with a lightweight formula that blends effortlessly into the skin. Designed to help control excess oil and blur imperfections, leaving your complexion looking soft, matte, and refined all day long.",
    shortDescription:
      "Lightweight oil-control finishing powder for fresh matte salon-finish complexion.",
    highlights: [
      "Controls excess oil & shine all day",
      "Fine micro-particles blur skin imperfections",
      "Comfortable lightweight silky feel",
    ],
    usageInstructions:
      "Dust lightly across forehead, nose, and chin using a soft puff or powder brush.",
    specifications: {
      Brand: "POND'S (Unilever)",
      "Skin Type": "All Skin Types / Oily to Normal",
      "Net Quantity": "300 g",
    },
    volumeSize: "300 g",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isDealOfTheDay: false,
    tags: ["ponds", "powder", "oil control", "matte"],
  },
  {
    slug: "vlcc-serum-face-wash-hydra-nourish",
    name: "VLCC Serum Face Wash Hydra Nourish with Hyaluronic Acid",
    brand: "VLCC",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Face Wash",
    subcategorySlug: "face-wash",
    price: 269,
    originalPrice: 299,
    discountPercent: 10,
    rating: "4.7",
    reviewCount: 38,
    stock: 65,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/04/41.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2026/04/41.png"],
    description:
      "VLCC Serum Face Wash is a hydrating, serum-infused cleanser from VLCC, designed for deep yet gentle cleansing without drying the skin. Formulated with Hyaluronic Acid and Aloe Vera to provide intense moisture and skin barrier support while clearing pores.",
    shortDescription:
      "Hydrating serum-infused cleanser with Hyaluronic Acid and Aloe Vera.",
    highlights: [
      "Serum-infused cleansing action",
      "Hyaluronic Acid locks in moisture",
      "Non-drying, sulphate-free daily wash",
    ],
    usageInstructions:
      "Wet face with water, squeeze a pea-sized amount onto palms, massage in circular motions for 1 minute and rinse.",
    specifications: {
      Brand: "VLCC",
      "Key Actives": "Hyaluronic Acid, Aloe Vera",
      "Net Quantity": "100 ml",
    },
    volumeSize: "100 ml",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: false,
    tags: ["vlcc", "serum face wash", "hyaluronic", "cleanser"],
  },
  {
    slug: "vlcc-natural-science-neem-face-wash",
    name: "VLCC Natural Sciences Neem Face Wash - Anti Acne & Purifying",
    brand: "VLCC",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Face Wash",
    subcategorySlug: "face-wash",
    price: 207,
    originalPrice: 230,
    discountPercent: 10,
    rating: "4.6",
    reviewCount: 52,
    stock: 95,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2026/04/31.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2026/04/31.png"],
    description:
      "VLCC Natural Sciences Neem Face Wash is a gentle, non-drying cleanser suitable for all skin types, formulated with pure neem extract, chamomile oil, and tea tree oil. It fights acne and pimples through neem's antibacterial and antifungal properties, while reducing inflammation, oiliness, and blemishes without stripping moisture.",
    shortDescription:
      "Herbal anti-acne cleanser with pure Neem, Chamomile and Tea Tree oil.",
    highlights: [
      "Fights 99.9% acne-causing bacteria",
      "Soothes redness with chamomile & tea tree oil",
      "Soap-free and gentle on acne-prone skin",
    ],
    usageInstructions:
      "Apply onto damp face, gently work up lather and rinse off.",
    specifications: {
      Brand: "VLCC Natural Sciences",
      "Key Herbs": "Neem, Chamomile, Tea Tree",
      "Net Quantity": "150 ml",
    },
    volumeSize: "150 ml",
    isFeatured: false,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: false,
    tags: ["vlcc", "neem face wash", "anti acne", "tea tree"],
  },
  {
    slug: "dr-rashel-pearl-cream",
    name: "Dr. Rashel Pearl Face & Body Cream 380ml",
    brand: "Dr. Rashel",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Cream",
    subcategorySlug: "facial-cream",
    price: 109,
    originalPrice: 249,
    discountPercent: 56,
    rating: "4.8",
    reviewCount: 77,
    stock: 140,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/6-2.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/6-2.png"],
    description:
      "Dr. Rashel Pearl Cream is formulated with genuine micro-pearl extracts to brighten skin tone and provide a natural luminous glow. It fades uneven skin tone, blemishes, and dark spots while providing rich moisture and controlling excess oiliness. A top salon favorite for facials and cleanups.",
    shortDescription:
      "Skin-brightening facial & body massage cream with natural pearl extract.",
    highlights: [
      "Brightens skin tone and produces a luminous salon glow",
      "Fades pigmentation, blemishes, and dark spots",
      "Ideal for facial massage, cleanups, and daily moisturizing",
      "Huge 380ml salon tub at unbeatable value",
    ],
    usageInstructions:
      "Take generous quantity, massage gently in upward strokes on face, neck or body for 10-15 minutes until absorbed.",
    specifications: {
      Brand: "Dr. Rashel",
      "Main Actives": "Pearl Powder Extract, Vitamin E",
      "Net Quantity": "380 ml",
      Use: "Salon Facial Massage & Daily Care",
    },
    volumeSize: "380 ml",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isDealOfTheDay: true,
    isSalonPro: true,
    tags: ["dr rashel", "pearl cream", "glow", "facial massage", "deal"],
  },
  {
    slug: "dr-rashel-olive-scrub",
    name: "Dr. Rashel Olive Face & Body Scrub 380ml",
    brand: "Dr. Rashel",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Scrub",
    subcategorySlug: "facial-scrub",
    price: 109,
    originalPrice: 249,
    discountPercent: 56,
    rating: "4.7",
    reviewCount: 63,
    stock: 120,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/8-2.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/8-2.png"],
    description:
      "Dr. Rashel Olive Scrub removes excess dead skin, impurities, and dullness while hydrating and deeply nourishing. Formulated with Mediterranean olive extract and walnut shell granules, it promotes a smoother, brighter complexion and reduces dark spots and tan.",
    shortDescription:
      "Deep exfoliating face & body scrub with Mediterranean olive oil and walnut granules.",
    highlights: [
      "Removes dead skin cells, blackheads, and tan",
      "Nourishing olive oil base prevents post-scrub dryness",
      "Promotes supple, polished skin texture",
    ],
    usageInstructions:
      "Apply on moist skin, massage in circular motions for 3-5 minutes, focusing on nose, chin, and forehead. Rinse with warm water.",
    specifications: {
      Brand: "Dr. Rashel",
      Exfoliant: "Natural Walnut Grits & Olive Oil",
      "Net Quantity": "380 ml",
    },
    volumeSize: "380 ml",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["dr rashel", "olive scrub", "exfoliating", "de-tan"],
  },
  {
    slug: "dr-rashel-orange-scrub",
    name: "Dr. Rashel Orange Face & Body Scrub 380ml",
    brand: "Dr. Rashel",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Scrub",
    subcategorySlug: "facial-scrub",
    price: 109,
    originalPrice: 249,
    discountPercent: 56,
    rating: "4.8",
    reviewCount: 58,
    stock: 130,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/10-2.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/10-2.png"],
    description:
      "Packed with Vitamin C and natural orange zest extracts, this invigorating scrub removes suntan, dead skin, and excess oil. Fades acne marks and gives dull skin an instant surge of freshness and brightness.",
    shortDescription:
      "Vitamin C enriched exfoliating scrub for instant tan removal and glow.",
    highlights: [
      "Vitamin C enriched for de-tanning and brightening",
      "Gently clears clogged pores and dead skin",
      "Leaves skin energised with citrus aroma",
    ],
    usageInstructions:
      "Massage onto damp face/body for 3-4 minutes. Rinse clean.",
    specifications: {
      Brand: "Dr. Rashel",
      "Key Actives": "Orange Extract, Vitamin C",
      "Net Quantity": "380 ml",
    },
    volumeSize: "380 ml",
    isFeatured: false,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["dr rashel", "orange scrub", "vitamin c", "tan removal"],
  },
  {
    slug: "dr-rashel-pearl-face-pack",
    name: "Dr. Rashel Pearl Face Pack 380ml",
    brand: "Dr. Rashel",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facepack",
    subcategorySlug: "facepack",
    price: 109,
    originalPrice: 249,
    discountPercent: 56,
    rating: "4.8",
    reviewCount: 47,
    stock: 115,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/7-2.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/7-2.png"],
    description:
      "Hydrates and nourishes skin, controls melanin synthesis, and lightens dark spots. Reduces hyperpigmentation, acne marks, and dullness while soaking up excess sebum and tightening pores for a clean porcelain finish.",
    shortDescription:
      "Pore-tightening and brightening pearl face pack for salon cleanups.",
    highlights: [
      "Tightens dilated pores and improves firmness",
      "Lightens pigmentation and blemishes",
      "Cooling, calming salon clay mask formula",
    ],
    usageInstructions:
      "Apply an even layer on face and neck avoiding eye area. Leave for 15-20 minutes until dry. Wipe off with moist sponge or rinse.",
    specifications: {
      Brand: "Dr. Rashel",
      "Net Quantity": "380 ml",
      "Skin Type": "All Skin Types",
    },
    volumeSize: "380 ml",
    isFeatured: false,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["dr rashel", "pearl pack", "face mask", "tightening"],
  },
  {
    slug: "dr-rashel-ubtan-gel",
    name: "Dr. Rashel Ubtan Face & Body Gel 380ml",
    brand: "Dr. Rashel",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Gel",
    subcategorySlug: "facial-gel",
    price: 109,
    originalPrice: 249,
    discountPercent: 56,
    rating: "4.9",
    reviewCount: 61,
    stock: 95,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/3-1.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/3-1.png"],
    description:
      "Dr. Rashel Ubtan Gel harnesses traditional Ayurvedic turmeric, saffron, and sandalwood extracts in a refreshing water-gel matrix. Reduces pigmentation, calms inflammation, and gives an unmistakable golden glow.",
    shortDescription:
      "Traditional turmeric & saffron brightening gel for glowing radiant skin.",
    highlights: [
      "Formulated with Turmeric, Saffron & Sandalwood",
      "Ultra-light, non-sticky water gel hydration",
      "Soothes sunburn and evens out patchy skin tone",
    ],
    usageInstructions:
      "Smooth over clean skin and massage gently until absorbed. Great for ultrasonic facial machines as well.",
    specifications: {
      Brand: "Dr. Rashel",
      "Key Ingredients": "Turmeric, Saffron, Sandalwood",
      "Net Quantity": "380 ml",
    },
    volumeSize: "380 ml",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["dr rashel", "ubtan gel", "turmeric", "facial gel"],
  },
  {
    slug: "lotus-papaya-vitamin-e-face-scrub",
    name: "Lotus Professional Papaya & Vitamin E Rejuvenating Face Scrub",
    brand: "Lotus",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Scrub",
    subcategorySlug: "facial-scrub",
    price: 312,
    originalPrice: 390,
    discountPercent: 20,
    rating: "4.8",
    reviewCount: 36,
    stock: 70,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    description:
      "Lotus Professional Papaya & Vitamin E Scrub combines papaya enzymes (papain) with rich Vitamin E microspheres. Gently breaks down dead keratinised cells, unclogs congested pores, and promotes cell renewal for youthful skin.",
    shortDescription:
      "Enzyme-powered exfoliating scrub for instant glow and texture refinement.",
    highlights: [
      "Natural Papaya enzyme dissolves dead epidermal cells",
      "Vitamin E beads hydrate and shield against oxidative damage",
      "Salon-approved gentle micro-granules",
    ],
    usageInstructions:
      "Apply on damp skin, massage in circular movements for 2-3 minutes, rinse with fresh water.",
    specifications: {
      Brand: "Lotus Professional",
      "Key Actives": "Papaya Fruit Enzyme, Vitamin E",
      "Net Quantity": "200 g",
    },
    volumeSize: "200 g",
    isFeatured: false,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["lotus", "papaya scrub", "vitamin e", "facial scrub"],
  },
  {
    slug: "vel-aroma-silver-facial-kit",
    name: "Vel Aroma Silver Resplendent 6-Step Facial Kit 250g",
    brand: "Vel Aroma",
    category: "Skincare & Bodycare",
    categorySlug: "skincare",
    subcategory: "Facial Kit",
    subcategorySlug: "facial-kit",
    price: 179,
    originalPrice: 280,
    discountPercent: 36,
    rating: "4.7",
    reviewCount: 44,
    stock: 85,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1512290900672-1f02a0a023b3?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512290900672-1f02a0a023b3?w=800&q=80",
    ],
    description:
      "Vel Aroma Silver Facial Kit offers a professional 6-step salon facial treatment: Cleanser, Scrub, Massage Gel, Massage Cream, Silver Pack, and Finishing Serum. Restores lost moisture, cools inflamed skin, and delivers sparkling radiance.",
    shortDescription:
      "Complete 6-step professional silver facial kit for radiant bridal and party glow.",
    highlights: [
      "Complete 6-Step Facial Routine in one box",
      "Silver ash micro-particles impart diamond-like glow",
      "Suitable for oily and combination skin types",
    ],
    usageInstructions:
      "Follow steps 1 to 6 as numbered on jars: Cleanser (5m), Scrub (5m), Gel (5m), Cream (10m), Pack (15m), Serum.",
    specifications: {
      Brand: "Vel Aroma",
      Steps: "6 Salon Steps",
      "Net Quantity": "250 g",
    },
    volumeSize: "250 g (6 Steps)",
    isFeatured: true,
    isBestseller: true,
    isSkincareBestseller: true,
    isSalonPro: true,
    tags: ["vel aroma", "silver facial kit", "facial kit", "salon facial"],
  },

  // --- Machineries & Tools ---
  {
    slug: "ikonic-professional-s3-ceramic-straightener",
    name: "Ikonic Professional S3+ Tourmaline Ceramic Hair Straightener",
    brand: "Ikonic",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Straightner",
    subcategorySlug: "straightner",
    price: 3413,
    originalPrice: 5250,
    discountPercent: 35,
    rating: "5.0",
    reviewCount: 67,
    stock: 35,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    ],
    description:
      "Ikonic Professional S3+ is a multi-functional styling tool that can straighten, curl, flick, or create soft waves all in one device. Equipped with wide floating tourmaline ceramic plates for perfect alignment and smooth snag-free glide. Features digital temperature control up to 235°C for precision styling and keratin treatments.",
    shortDescription:
      "Tourmaline ceramic multi-styler straightener with digital temp control up to 235°C.",
    highlights: [
      "Floating Tourmaline Ceramic Plates for silky, zero-snag glide",
      "Digital temperature control from 130°C to 235°C",
      "Instant 30-second PTC heat up & 360° swivel cord",
      "1-Year Ikonic Professional Official Warranty",
    ],
    usageInstructions:
      "Select desired heat setting according to hair texture. Section hair and glide plates smoothly from roots to ends in one fluid stroke.",
    specifications: {
      Brand: "Ikonic Professional",
      "Plate Material": "Tourmaline Ceramic Floating Plates",
      "Max Temperature": "235°C",
      "Cord Length": "2.8m Professional Swivel Cord",
      Warranty: "1 Year Manufacturer Warranty",
    },
    volumeSize: "1 Unit",
    isFeatured: true,
    isBestseller: true,
    isDealOfTheDay: true,
    isSalonPro: true,
    tags: ["ikonic", "straightener", "ceramic", "s3+", "styling tool"],
  },
  {
    slug: "ikonic-professional-blaze-hair-dryer-2000w",
    name: "Ikonic Professional Blaze Hair Dryer 2000W",
    brand: "Ikonic",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Dryer",
    subcategorySlug: "hair-dryer",
    price: 1674,
    originalPrice: 2575,
    discountPercent: 35,
    rating: "4.9",
    reviewCount: 53,
    stock: 40,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    description:
      "Ikonic Professional Blaze Hair Dryer boasts a powerful 2000W AC motor delivering high-velocity airflow for fast salon blowouts. Features multiple heat and speed settings plus an instant cool-shot button to lock in volume and curls.",
    shortDescription:
      "High-power 2000W AC motor salon blow dryer with dual concentrator nozzles.",
    highlights: [
      "2000 Watts heavy-duty AC motor for long salon shifts",
      "Ionic conditioning technology eliminates static and frizz",
      "2 speed / 3 heat settings + True Cold Shot button",
      "Includes 2 airflow concentrator nozzles",
    ],
    usageInstructions:
      "Dry damp hair with high heat/speed. Finish styling with cool-shot button for lasting hold.",
    specifications: {
      Brand: "Ikonic Professional",
      Power: "2000 Watts AC Motor",
      "Speed Settings": "2 Speeds / 3 Heat Levels",
      Warranty: "1 Year Replacement Guarantee",
    },
    volumeSize: "1 Unit + 2 Nozzles",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["ikonic", "blaze", "hair dryer", "2000w", "blowout"],
  },
  {
    slug: "wahl-professional-super-taper",
    name: "Wahl Professional Super Taper Heavy Duty Hair Clipper",
    brand: "Wahl",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Clipper",
    subcategorySlug: "hair-clipper",
    price: 4744,
    originalPrice: 7299,
    discountPercent: 35,
    rating: "5.0",
    reviewCount: 92,
    stock: 30,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    ],
    description:
      "Wahl Professional Super Taper is the ultimate barber workhorse clipper known worldwide. Powered by a high-torque V5000 electromagnetic motor engineered for non-stop salon use. Chrome-plated precision blades resist rust and provide effortless fading and blending with thumb-adjustable taper lever.",
    shortDescription:
      "The barber standard V5000 electromagnetic motor hair clipper with precision chrome blades.",
    highlights: [
      "V5000 heavy-duty electromagnetic motor for all-day continuous clipping",
      "Chrome-plated precision blade with convenient thumb taper lever",
      "Includes 4 guide combs (3mm, 6mm, 10mm, 13mm), oil & cleaning brush",
      "100% Original Wahl USA Salon Pro model with warranty",
    ],
    usageInstructions:
      "Oil blades before use. Adjust taper lever for custom blend lengths. Clean with brush after each cut.",
    specifications: {
      Brand: "Wahl Professional",
      Motor: "V5000 Electromagnetic",
      "Blade Width": "40 mm",
      "Cutting Length": "1mm - 3.5mm adjustable",
      Origin: "USA Design",
    },
    volumeSize: "Full Barber Kit",
    isFeatured: true,
    isBestseller: true,
    isDealOfTheDay: true,
    isSalonPro: true,
    tags: ["wahl", "super taper", "clipper", "barber tool", "v5000"],
  },
  {
    slug: "wahl-magic-trimmer-cordless",
    name: "Wahl Professional Cordless Magic Clip & Trimmer Combo",
    brand: "Wahl",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Trimmers",
    subcategorySlug: "trimmers",
    price: 8449,
    originalPrice: 12999,
    discountPercent: 35,
    rating: "4.9",
    reviewCount: 46,
    stock: 25,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    ],
    description:
      "Wahl Magic Trimmer features staggered tooth 'crunch blade' technology that blends hair and creates seamless texture while cutting. Powered by a lithium-ion battery with 100+ minutes of run time, lightweight ergonomic build, and cord/cordless versatility.",
    shortDescription:
      "Stagger-tooth crunch blade cordless clipper with 100+ min lithium battery.",
    highlights: [
      "Unique Stagger-Tooth blade creates seamless blends & zero-gap fades",
      "100+ Minutes continuous runtime with quick lithium charging",
      "Ergonomic lightweight body for comfort during high volume salon days",
    ],
    usageInstructions:
      "Charge fully before first use. Use cordless or plug in while operating if battery runs low.",
    specifications: {
      Brand: "Wahl Professional",
      Battery: "Lithium-Ion 100+ min",
      Blade: "Stagger-Tooth Crunch Blade",
    },
    volumeSize: "1 Unit + Accessories",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["wahl", "magic clip", "cordless", "fade trimmer"],
  },
  {
    slug: "vgr-v-901-metal-housing-hair-clipper",
    name: "VGR Premium Metal Housing Hair Clipper with LED Display (V-901)",
    brand: "VGR",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Trimmers",
    subcategorySlug: "trimmers",
    price: 1099,
    originalPrice: 3000,
    discountPercent: 63,
    rating: "4.7",
    reviewCount: 71,
    stock: 55,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    ],
    description:
      "VGR V-901 is an all-metal professional hair clipper equipped with self-sharpening stainless steel blades and a smart LED display showing battery percentage and oil reminders. Features a heavy-duty rotary motor and 2500mAh lithium battery providing up to 240 minutes of continuous runtime.",
    shortDescription:
      "All-metal vintage body hair clipper with digital LED battery indicator and 240m run time.",
    highlights: [
      "All-metal luxury engraved housing",
      "Smart LED percentage display & oil indicator",
      "2500mAh Lithium battery with 240 minutes run time",
      "USB fast charging & 4 attachment combs",
    ],
    usageInstructions:
      "Charge via Type-C USB cable. Snap on desired limit comb and turn on switch.",
    specifications: {
      Brand: "VGR",
      Model: "V-901 Metal Housing",
      Battery: "2500mAh Lithium (240 min)",
      Display: "Digital LED Screen",
    },
    volumeSize: "1 Kit",
    isFeatured: false,
    isBestseller: true,
    isDealOfTheDay: true,
    isSalonPro: true,
    tags: ["vgr", "v-901", "metal clipper", "trimmer", "led display"],
  },
  {
    slug: "glista-gl-102-professional-hair-clipper",
    name: "Glista Professional Hair Clipper GL-102",
    brand: "Glista",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Clipper",
    subcategorySlug: "hair-clipper",
    price: 875,
    originalPrice: 1749,
    discountPercent: 50,
    rating: "4.6",
    reviewCount: 33,
    stock: 45,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    ],
    description:
      "Glista GL-102 is an ultra-reliable corded salon clipper built with a high-speed magnetic motor and stainless steel T-blade. Low vibration and ergonomic grip make it comfortable for extended haircutting sessions in busy barbershops.",
    shortDescription:
      "Heavy-duty corded hair clipper with high-speed motor and ergonomic grip.",
    highlights: [
      "Smooth low-vibration magnetic motor",
      "Self-sharpening stainless steel blade",
      "Affordable high-performance daily salon workhorse",
    ],
    usageInstructions:
      "Plug into 220V power outlet. Use taper lever to adjust blade depth.",
    specifications: {
      Brand: "Glista",
      Model: "GL-102",
      Power: "Corded AC 220-240V",
    },
    volumeSize: "1 Unit",
    isFeatured: false,
    isBestseller: false,
    isSalonPro: true,
    tags: ["glista", "gl-102", "hair clipper", "budget clipper"],
  },
  {
    slug: "ikonic-pro-titanium-crimp-hair-crimper",
    name: "Ikonic Professional Pro Titanium Crimp Hair Crimper",
    brand: "Ikonic",
    category: "Machineries & Tools",
    categorySlug: "machineries",
    subcategory: "Hair Crimper",
    subcategorySlug: "hair-crimper",
    price: 4550,
    originalPrice: 7000,
    discountPercent: 35,
    rating: "4.9",
    reviewCount: 29,
    stock: 22,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    description:
      "Ikonic Pro Titanium Crimp delivers intense root volume and dramatic crimped patterns with micro-titanium crimping plates. Rapid heat recovery ensures uniform texture and long-lasting hairstyle architecture for bridal hairdos.",
    shortDescription:
      "Micro-titanium plate crimper for extreme root lift and bridal hair styling.",
    highlights: [
      "Premium Titanium Crimping Plates for quick thermal transfer",
      "Instant root volumizing for hairstyles and updos",
      "Digital temperature control up to 230°C",
    ],
    usageInstructions:
      "Section hair at roots and press plates firmly for 2-3 seconds per section.",
    specifications: {
      Brand: "Ikonic Professional",
      Plates: "Titanium Micro Crimp",
      Temperature: "Up to 230°C",
    },
    volumeSize: "1 Unit",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["ikonic", "crimper", "titanium crimp", "bridal hairstyling"],
  },

  // --- Salon Accessories ---
  {
    slug: "gillette-wilkinson-sword-saloon-blades-50-pcs",
    name: "Gillette Wilkinson Sword Saloon Double Edge Razor Blades (50 pcs)",
    brand: "Gillette",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Blades",
    subcategorySlug: "blades",
    price: 90,
    originalPrice: 150,
    discountPercent: 40,
    rating: "4.9",
    reviewCount: 112,
    stock: 250,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/06/11.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/06/11.png"],
    description:
      "Gillette Wilkinson Sword Double Edge Razor Blades feature a triple coating that resists corrosion, providing added durability and less irritation during shaving. The blades maintain their sharp edge longer than standard blades, ensuring a close, comfortable glide over multiple uses. Made from high-quality stainless steel.",
    shortDescription:
      "Triple-coated stainless steel double edge salon razor blades 50 pcs pack.",
    highlights: [
      "Triple polymer coating prevents skin friction & razor burns",
      "High quality hardened stainless steel",
      "Individually wax paper wrapped for hygienic barber use",
      "Compatible with all straight razors and double edge safety razors",
    ],
    usageInstructions:
      "Snap blade into half for straight razor (ustra) use or place intact in safety razor head.",
    specifications: {
      Brand: "Gillette Wilkinson Sword",
      Quantity: "50 Double-Edge Blades (10 tucks of 5)",
      Material: "Triple Coated Stainless Steel",
    },
    volumeSize: "50 Blades Pack",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: [
      "gillette",
      "wilkinson sword",
      "saloon blades",
      "razor blades",
      "shaving",
    ],
  },
  {
    slug: "rk-blades-50-pcs-salon-pack",
    name: "RK Professional Stainless Steel Double Edge Salon Blades 50 pcs",
    brand: "RK Blades",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Blades",
    subcategorySlug: "blades",
    price: 40,
    originalPrice: 60,
    discountPercent: 33,
    rating: "4.7",
    reviewCount: 48,
    stock: 300,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/07/21-1.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/07/21-1.png"],
    description:
      "High-quality stainless steel double edge razor blades designed for smooth, precise, and comfortable shaving. Compatible with all standard double edge safety razors and salon straight razors.",
    shortDescription:
      "Ultra-sharp stainless steel razor blades 50 pcs salon pack at wholesale price.",
    highlights: [
      "Smooth chromium-coated cutting edge",
      "Essential consumable for daily salon shaving",
      "Pack of 50 blades in easy dispenser box",
    ],
    usageInstructions: "Single use recommended for salon hygiene.",
    specifications: {
      Brand: "RK Blades",
      Quantity: "50 Blades",
      Material: "Stainless Steel",
    },
    volumeSize: "50 pcs",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["rk blades", "blades", "salon accessory", "shaving blades"],
  },
  {
    slug: "non-foaming-shaving-gel-1l-auro-nature",
    name: "NEW AURO NATURE Non-Foaming Transparent Shaving Gel (1L)",
    brand: "Auro Nature",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Shaving Gel",
    subcategorySlug: "shaving-gel",
    price: 99,
    originalPrice: 300,
    discountPercent: 67,
    rating: "4.8",
    reviewCount: 54,
    stock: 120,
    inStock: true,
    image: "https://purecuts.in/wp-content/uploads/2025/08/71.png",
    galleryImages: ["https://purecuts.in/wp-content/uploads/2025/08/71.png"],
    description:
      "Non-Foaming Formula allows clear visibility of skin for precise styling, beard shaping, line-ups, and contouring. Enriched with aloe vera, vegetable glycerine, and cooling menthol to soothe, hydrate, and protect even sensitive skin against nicks and razor burn.",
    shortDescription:
      "Clear non-foaming glide gel 1000ml bottle for precise beard shaping & lining.",
    highlights: [
      "Crystal clear transparent texture gives 100% visibility for sharp lines",
      "Aloe Vera & Menthol cool the skin and stop post-shave burns",
      "1000ml bulk salon bottle with pump dispenser compatibility",
    ],
    usageInstructions:
      "Pump small amount onto beard/shaving zone, smooth evenly, and shape with razor.",
    specifications: {
      Brand: "Auro Nature",
      Texture: "Clear Gel (Non-Foaming)",
      "Net Quantity": "1000 ml (1 Liter)",
    },
    volumeSize: "1 Liter",
    isFeatured: true,
    isBestseller: true,
    isDealOfTheDay: true,
    isSalonPro: true,
    tags: [
      "auro nature",
      "shaving gel",
      "non-foaming",
      "beard shaping",
      "1 liter",
    ],
  },
  {
    slug: "ikonic-blow-dry-brush-ccb25",
    name: "Ikonic Chameleon Blow Dry Ceramic Barrel Hair Brush CCB25 (25 mm)",
    brand: "Ikonic",
    category: "Salon Accessories",
    categorySlug: "accessories",
    subcategory: "Comb & Brushes",
    subcategorySlug: "comb-brushes",
    price: 495,
    originalPrice: 650,
    discountPercent: 24,
    rating: "4.8",
    reviewCount: 37,
    stock: 60,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    description:
      "Ikonic Chameleon ceramic barrel changes color when hot to indicate optimal styling temperature. Heat-resistant ionic nylon bristles distribute hair's natural oils, add volume, and create bouncy curls with zero frizz.",
    shortDescription:
      "Ceramic barrel thermo-chromic blow dry brush 25mm for volume and curls.",
    highlights: [
      "Thermo-chromic barrel changes color with heat",
      "Ionic bristles smooth cuticles and cut drying time",
      "Rubberized non-slip grip handle",
    ],
    usageInstructions:
      "Wrap damp hair sections around barrel while directing blow dryer airflow downwards.",
    specifications: {
      Brand: "Ikonic",
      "Barrel Size": "25 mm",
      Bristles: "Ionic Heat-Resistant Nylon",
    },
    volumeSize: "25mm Barrel",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["ikonic", "blow dry brush", "hair brush", "ccb25"],
  },

  // --- Salon Furniture ---
  {
    slug: "purecuts-hydraulic-salon-styling-chair",
    name: "PureCuts Elite Hydraulic Reclining Salon Styling Chair",
    brand: "PureCuts Pro",
    category: "Salon Furniture",
    categorySlug: "furniture",
    subcategory: "Styling Chair",
    subcategorySlug: "styling-chair",
    price: 9499,
    originalPrice: 14999,
    discountPercent: 37,
    rating: "4.9",
    reviewCount: 19,
    stock: 12,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    ],
    description:
      "Crafted with high-density memory foam cushioning, premium water-resistant faux leather upholstery, and a heavy-duty chrome round hydraulic pump that supports up to 200 kg. 360-degree lockable swivel and multi-angle reclining backrest for hair cutting, beard styling, and facial treatments.",
    shortDescription:
      "Heavy-duty hydraulic reclining salon styling chair with chrome base.",
    highlights: [
      "Heavy duty hydraulic pump with 360° swivel & lock",
      "Multi-position reclining backrest with removable headrest",
      "Durable stain-resistant PU leather and reinforced steel frame",
      "Pre-assembled with fast salon freight delivery across India",
    ],
    usageInstructions:
      "Step on pump pedal to raise chair; push pedal down fully to lower.",
    specifications: {
      Brand: "PureCuts Pro Furniture",
      "Weight Capacity": "200 kg",
      Base: "Solid Heavy Chrome Round Base",
      Warranty: "2 Years Hydraulic Pump Warranty",
    },
    volumeSize: "1 Unit (Freight Shipping)",
    isFeatured: true,
    isBestseller: false,
    isSalonPro: true,
    tags: [
      "salon chair",
      "styling chair",
      "hydraulic chair",
      "furniture",
      "barber chair",
    ],
  },
  {
    slug: "purecuts-backwash-hair-shampoo-station",
    name: "PureCuts Luxury Ceramic Basin Shampoo Backwash Station",
    brand: "PureCuts Pro",
    category: "Salon Furniture",
    categorySlug: "furniture",
    subcategory: "Hair Wash Chair",
    subcategorySlug: "hair-wash-chair",
    price: 18500,
    originalPrice: 26000,
    discountPercent: 29,
    rating: "5.0",
    reviewCount: 14,
    stock: 8,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    ],
    description:
      "Deep tilting black ceramic sink with integrated gel neck rest, chrome hot & cold mixer faucet, flexible shower spray hose, and plumbing trap. Ergonomically contoured lounge chair reduces neck and spine strain during hair wash and conditioning treatments.",
    shortDescription:
      "Deep tilting ceramic basin shampoo wash unit with padded lounge chair.",
    highlights: [
      "High-gloss ceramic tilting sink with silicone gel neck cushion",
      "Includes hot/cold brass mixer faucet & extendable spray hose",
      "Ergonomic lumbar support seat with high resilience foam",
    ],
    usageInstructions:
      "Connect hot & cold water inlets to standard 1/2-inch plumbing connections.",
    specifications: {
      Brand: "PureCuts Pro Furniture",
      "Basin Material": "Glossy Black Ceramic",
      "Chair Frame": "Reinforced Fiberglass & Steel",
    },
    volumeSize: "Complete Unit",
    isFeatured: true,
    isBestseller: false,
    isSalonPro: true,
    tags: ["hair wash chair", "shampoo station", "backwash", "salon furniture"],
  },
  {
    slug: "5-tier-salon-rolling-trolley-cart",
    name: "PureCuts 5-Tier Roller Salon Service Trolley Cart with Side Trays",
    brand: "PureCuts Pro",
    category: "Salon Furniture",
    categorySlug: "furniture",
    subcategory: "Trolley",
    subcategorySlug: "trolley",
    price: 2199,
    originalPrice: 3500,
    discountPercent: 37,
    rating: "4.8",
    reviewCount: 42,
    stock: 25,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    ],
    description:
      "Features 5 slide-out durable chemical-resistant ABS drawers, top workspace tray with blow dryer holder, tint bowl slots, and silent 360-degree hair-repellent caster wheels for effortless mobility between salon stations.",
    shortDescription:
      "5-drawer chemical-resistant rolling trolley with appliance slots.",
    highlights: [
      "5 High-capacity interchangeable slide drawers",
      "Top appliance station with dryer & tint bowl holders",
      "Hair-free silent rubber caster wheels",
    ],
    usageInstructions: "Simple 10-minute snap assembly with no tools required.",
    specifications: {
      Brand: "PureCuts Pro",
      Material: "Virgin ABS & Steel Support Tubes",
      Drawers: "5 Removable Trays",
    },
    volumeSize: "1 Trolley Kit",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["trolley", "salon trolley", "rolling cart", "storage"],
  },

  // --- Salon Disposables ---
  {
    slug: "purecuts-disposable-neck-paper-rolls-5-rolls",
    name: "PureCuts Hygienic Waterproof Salon Neck Strip Paper (Pack of 5 Rolls - 500 Strips)",
    brand: "PureCuts Pro",
    category: "Salon Disposables",
    categorySlug: "disposable",
    subcategory: "Neck Role",
    subcategorySlug: "neck-role",
    price: 249,
    originalPrice: 499,
    discountPercent: 50,
    rating: "4.9",
    reviewCount: 84,
    stock: 200,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    ],
    description:
      "Stretchable, self-adhesive, and water-resistant disposable neck paper strips. Catches loose hairs, absorbs sweat, and prevents hair dye from staining client clothing. Essential hygienic standard for all modern barbershops and salons.",
    shortDescription:
      "Self-adhesive stretchable neck strips pack of 5 rolls (500 strips total).",
    highlights: [
      "Flexible elasticity fits any neck size comfortably",
      "Blue adhesive tape holds securely throughout haircut",
      "Prevents cut hair pricking client's collar and skin",
      "500 Strips total (5 rolls x 100 strips)",
    ],
    usageInstructions:
      "Stretch paper around client's neck, stick blue adhesive glue ends together, and fold cutting cape collar over strip.",
    specifications: {
      Brand: "PureCuts Pro",
      Quantity: "5 Rolls (500 Strips)",
      Material: "Waterproof Wood Pulp Paper",
    },
    volumeSize: "5 Rolls (500 Strips)",
    isFeatured: true,
    isBestseller: true,
    isSalonPro: true,
    tags: ["neck strips", "neck rolls", "disposables", "salon hygiene"],
  },
  {
    slug: "purecuts-disposable-salon-cutting-sheets-50-pcs",
    name: "PureCuts Disposable Salon Hair Cutting & Chemical Sheets (50 pcs)",
    brand: "PureCuts Pro",
    category: "Salon Disposables",
    categorySlug: "disposable",
    subcategory: "Disposable Cutting Sheet",
    subcategorySlug: "disposable-sheets",
    price: 199,
    originalPrice: 350,
    discountPercent: 43,
    rating: "4.8",
    reviewCount: 65,
    stock: 180,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    ],
    description:
      "Large 110cm x 150cm transparent waterproof disposable sheets for hair color, keratin treatments, bleach, and haircutting. Keeps clients 100% clean and eliminates laundry costs.",
    shortDescription:
      "Waterproof lightweight disposable salon sheets 50 pcs pack.",
    highlights: [
      "Extra-large size 110 x 150 cm for full client coverage",
      "100% Chemical and dye proof",
      "Hygienic single-use for fast station turnover",
    ],
    usageInstructions:
      "Drape over client shoulders and tie at neck before starting chemical or hair service.",
    specifications: {
      Brand: "PureCuts Pro",
      Quantity: "50 Sheets",
      Dimensions: "110 cm x 150 cm",
    },
    volumeSize: "50 pcs Pack",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["disposable sheet", "cutting sheets", "apron", "salon cape"],
  },
  {
    slug: "purecuts-absorbent-cotton-roll-500g",
    name: "PureCuts 100% Pure Hospital & Salon Absorbent Cotton Roll (500g)",
    brand: "PureCuts Pro",
    category: "Salon Disposables",
    categorySlug: "disposable",
    subcategory: "Cotton",
    subcategorySlug: "cotton",
    price: 185,
    originalPrice: 280,
    discountPercent: 34,
    rating: "4.9",
    reviewCount: 73,
    stock: 220,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    ],
    description:
      "Soft, highly absorbent bleached surgical-grade cotton roll. Ideal for facial cleansing, makeup removal, applying skin toners, and wiping excess perm / color chemicals in salons.",
    shortDescription:
      "500g virgin absorbent cotton roll for salon facials and tint cleanups.",
    highlights: [
      "100% Pure bleached natural cotton fibers",
      "Ultra-soft on sensitive skin with zero linting",
      "High liquid absorbency rate",
    ],
    usageInstructions:
      "Tear desired cotton portion, moisten with toner or water for facial wipe-down.",
    specifications: {
      Brand: "PureCuts Pro",
      Weight: "500 Grams",
      Grade: "Surgical / Salon Absorbent",
    },
    volumeSize: "500 g Roll",
    isFeatured: false,
    isBestseller: true,
    isSalonPro: true,
    tags: ["cotton roll", "absorbent cotton", "disposable", "facial cotton"],
  },


  // --- NEW ADDITIONS FOR CATEGORIES & SECTION LINKING ---
  {
  "slug": "loreal-professionnel-oxydant-creme-20-vol-1000ml",
  "name": "L'Oréal Professionnel Paris Oxydant Crème 20 Volume (6%) Developer 1000ml",
  "brand": "L'Oréal Professionnel",
  "category": "Hair Color & Developers",
  "categorySlug": "hair-color",
  "subcategory": "Developers & Peroxides",
  "subcategorySlug": "developers-peroxides",
  "price": 410,
  "originalPrice": 475,
  "discountPercent": 14,
  "rating": "4.9",
  "reviewCount": 52,
  "stock": 90,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
  ],
  "description": "L'Oréal Professionnel Paris Oxydant Crème 20 Volume (6%) is an optimized stabilized peroxide developer crafted specifically for Majirel and Inoa color creams. Delivers predictable 1 to 2 shades lift, flawless 100% white/grey coverage, and maintains hair fiber softness with active lipid emollients.",
  "shortDescription": "Salon professional 20 Vol (6%) developer for Majirel & permanent hair colors.",
  "highlights": [
    "Formulated for flawless 100% grey hair coverage",
    "Rich creamy viscosity prevents dripping on scalp",
    "Standard salon pairing for Majirel and Majirouge ranges",
    "100% Genuine L'Oréal Professionnel Salon Pack 1000ml"
  ],
  "usageInstructions": "Mix in 1:1.5 ratio with L'Oréal Majirel color tube in a non-metallic bowl. Apply evenly and process for 35 minutes.",
  "specifications": {
    "Brand": "L'Oréal Professionnel",
    "Strength": "20 Volume (6% Peroxide)",
    "Net Quantity": "1000 ml",
    "Packaging": "Salon Professional Bottle"
  },
  "volumeSize": "1000 ml",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "loreal",
    "developer",
    "20 vol",
    "oxydant",
    "hair color"
  ]
},

  {
  "slug": "loreal-professionnel-oxydant-creme-30-vol-1000ml",
  "name": "L'Oréal Professionnel Paris Oxydant Crème 30 Volume (9%) Developer 1000ml",
  "brand": "L'Oréal Professionnel",
  "category": "Hair Color & Developers",
  "categorySlug": "hair-color",
  "subcategory": "Developers & Peroxides",
  "subcategorySlug": "developers-peroxides",
  "price": 425,
  "originalPrice": 495,
  "discountPercent": 14,
  "rating": "4.8",
  "reviewCount": 38,
  "stock": 75,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  ],
  "description": "L'Oréal Professionnel 30 Volume (9%) Crème Developer provides up to 3 levels of lift on natural dark hair. Essential for vibrant blonde tones, warm honey reflects, and lightening services when paired with Majirel high-lift formulas.",
  "shortDescription": "Professional 30 Vol developer for up to 3 levels of luminous hair lightening.",
  "highlights": [
    "3 Levels of lightening on virgin hair",
    "Stabilized high-performance formula",
    "Creamy consistency for seamless salon application"
  ],
  "usageInstructions": "Blend 1:1.5 or 1:2 according to hair color technician requirements in tint bowl.",
  "specifications": {
    "Brand": "L'Oréal Professionnel",
    "Strength": "30 Volume (9% Peroxide)",
    "Net Quantity": "1000 ml"
  },
  "volumeSize": "1000 ml",
  "isFeatured": false,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "loreal",
    "developer",
    "30 vol",
    "high lift",
    "hair color"
  ]
},

  {
  "slug": "schwarzkopf-igora-royal-permanent-color-tube-60ml",
  "name": "Schwarzkopf Professional Igora Royal High Definition Permanent Color 60ml",
  "brand": "Schwarzkopf Professional",
  "category": "Hair Color & Developers",
  "categorySlug": "hair-color",
  "subcategory": "Hair Colour Cream",
  "subcategorySlug": "hair-colour-cream",
  "price": 345,
  "originalPrice": 420,
  "discountPercent": 18,
  "rating": "4.9",
  "reviewCount": 44,
  "stock": 80,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
  ],
  "description": "Schwarzkopf Igora Royal provides true-to-swatch color results, maximum contrast retention, and 100% white hair coverage even on coarse thick hair. Infused with High Definition Color Pigment Matrix for ultra-radiant shine and long-lasting salon vibrance.",
  "shortDescription": "Ultra-pigmented salon permanent hair color for 100% white coverage.",
  "highlights": [
    "True-to-swatch color accuracy with High Definition Pigment Matrix",
    "Up to 100% white hair coverage with intense pigment retention",
    "Trusted worldwide by top salon master colorists"
  ],
  "usageInstructions": "Mix with Igora Royal Oil Developer (1:1 ratio). Develop for 30 to 45 minutes.",
  "specifications": {
    "Brand": "Schwarzkopf Professional",
    "Shade": "Salon Color Choice",
    "Net Quantity": "60 ml"
  },
  "volumeSize": "60 ml",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "schwarzkopf",
    "igora royal",
    "hair color",
    "permanent color"
  ]
},

  {
  "slug": "matrix-socolor-permanent-cream-hair-color-90ml",
  "name": "Matrix SoColor Beauty Conditioning Permanent Cream Hair Color 90ml",
  "brand": "Matrix",
  "category": "Hair Color & Developers",
  "categorySlug": "hair-color",
  "subcategory": "Hair Colour Cream",
  "subcategorySlug": "hair-colour-cream",
  "price": 265,
  "originalPrice": 310,
  "discountPercent": 15,
  "rating": "4.8",
  "reviewCount": 39,
  "stock": 95,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80"
  ],
  "description": "Matrix SoColor Beauty provides rich color deposit with Cera-Oil conditioning complex that strengthens hair fibers during application. Delivers long-lasting shine, 100% grey coverage, and silky salon hair feel.",
  "shortDescription": "Conditioning permanent cream color with Cera-Oil complex.",
  "highlights": [
    "Contains Cera-Oil conditioning complex for silky softness",
    "Predictable results across all natural and resistant grey shades",
    "Exceptional value with large 90ml professional tube"
  ],
  "usageInstructions": "Mix 1:1.5 with Matrix Cream Developer. Apply onto dry unwashed hair and leave for 35-40 minutes.",
  "specifications": {
    "Brand": "Matrix",
    "Net Quantity": "90 ml",
    "Coverage": "100% Grey Coverage"
  },
  "volumeSize": "90 ml",
  "isFeatured": false,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "matrix",
    "socolor",
    "hair color",
    "cera-oil"
  ]
},

  {
  "slug": "loreal-blond-studio-multi-techniques-powder-500g",
  "name": "L'Oréal Professionnel Blond Studio 8 Levels Dust-Free Lightening Bleaching Powder 500g",
  "brand": "L'Oréal Professionnel",
  "category": "Hair Color & Developers",
  "categorySlug": "hair-color",
  "subcategory": "Bleach & Lighteners",
  "subcategorySlug": "bleach-lighteners",
  "price": 1599,
  "originalPrice": 1950,
  "discountPercent": 18,
  "rating": "4.9",
  "reviewCount": 61,
  "stock": 40,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80"
  ],
  "description": "L'Oréal Professionnel Blond Studio Multi-Techniques Powder provides up to 8 levels of clean blonde lift with low odor and zero powder dusting. Enriched with Pro-Keratin to reinforce hair bonds during high-light and balayage techniques.",
  "shortDescription": "Up to 8 levels dust-free bleaching powder with bond-protecting Pro-Keratin.",
  "highlights": [
    "Lifts up to 8 levels for bright Scandinavian or Ash Blondes",
    "Multi-techniques: highlights, balayage, full-head bleaching",
    "Enriched with Pro-Keratin for hair fiber integrity"
  ],
  "usageInstructions": "Mix with 20 or 30 Vol developer in 1:1 to 1:2 ratio. Check lightening progress every 10 minutes.",
  "specifications": {
    "Brand": "L'Oréal Professionnel",
    "Weight": "500 Grams",
    "Type": "Dust-Free Lightening Powder"
  },
  "volumeSize": "500 g Tub",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "loreal",
    "blond studio",
    "bleach",
    "lightener",
    "balayage"
  ]
},

  {
  "slug": "brazilian-keratin-treatment-salon-master-kit-1000ml",
  "name": "Brazilian Keratin Treatment 3-Step Master Salon Kit (Clarifying Shampoo 1L + Keratin 1L + Deep Masque 1L)",
  "brand": "PureCuts Pro",
  "category": "Salon Combos & Bulk Packs",
  "categorySlug": "salon-combos",
  "subcategory": "Treatment Kits",
  "subcategorySlug": "treatment-kits",
  "price": 4999,
  "originalPrice": 7500,
  "discountPercent": 33,
  "rating": "5.0",
  "reviewCount": 78,
  "stock": 35,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  ],
  "description": "Complete Brazilian Keratin 3-Step salon treatment kit containing deep Clarifying Shampoo (1000ml), Formaldehyde-Free Nano-Keratin Infusion (1000ml), and Intensive Moisture Sealing Masque (1000ml). Eliminates 100% frizz and seals hair cuticles with high-gloss mirror shine for up to 6 months.",
  "shortDescription": "Complete 3-Step 1000ml professional Brazilian keratin treatment system.",
  "highlights": [
    "Complete 3x 1000ml full-size salon bottles",
    "Provides up to 25 full client salon treatments",
    "Eliminates 100% frizz with up to 6 months durability",
    "High profit margin treatment kit for salons"
  ],
  "usageInstructions": "Step 1: Clarifying wash twice. Step 2: Dry 80%, apply keratin, wait 40 mins, blow dry & flat iron at 230°C. Step 3: Rinse and apply sealing masque.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Contents": "Clarifying Shampoo 1L + Keratin 1L + Masque 1L",
    "Yield": "20-25 Salon Client Sessions"
  },
  "volumeSize": "3 x 1000 ml Kit",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "keratin",
    "treatment kit",
    "brazilian keratin",
    "combo",
    "salon pro"
  ]
},

  {
  "slug": "complete-barber-station-pro-combo-setup-kit",
  "name": "Wahl & Ikonic Barbershop Complete Station Setup Kit (Clipper + Trimmer + Foil Shaver + Cutting Cape + 6-Inch Scissors)",
  "brand": "Wahl",
  "category": "Salon Combos & Bulk Packs",
  "categorySlug": "salon-combos",
  "subcategory": "Barber Station Sets",
  "subcategorySlug": "barber-station-sets",
  "price": 8499,
  "originalPrice": 11999,
  "discountPercent": 29,
  "rating": "4.9",
  "reviewCount": 42,
  "stock": 25,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
  ],
  "description": "The ultimate turnkey starter bundle for modern barbershops. Includes Wahl Professional corded Super Taper heavy clipper, VGR metal zero-gap trimmer, double foil shaver, Japanese steel 6.0-inch haircutting shears, and water-resistant salon cutting cape.",
  "shortDescription": "Complete high-performance barber cutting station combo package.",
  "highlights": [
    "Turnkey setup with top professional barber tools",
    "Includes Clipper + Trimmer + Foil Shaver + Shears + Cape",
    "Saves over ₹3,500 compared to individual tool purchases"
  ],
  "usageInstructions": "Essential professional tool kit ready to plug and play for barbershop stations.",
  "specifications": {
    "Brand": "Wahl & PureCuts Pro",
    "Total Items": "5 Premium Hardware Tools & Accessories",
    "Warranty": "1 Year Official Brand Warranty on Electricals"
  },
  "volumeSize": "5-Piece Station Kit",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "barber kit",
    "station combo",
    "wahl",
    "clipper combo",
    "tools pack"
  ]
},

  {
  "slug": "dr-rashel-parlour-facial-glow-master-combo-pack",
  "name": "Dr. Rashel 6-Tub Complete Parlour Facial Master Combo (380ml x 6 Tubs)",
  "brand": "Dr. Rashel",
  "category": "Salon Combos & Bulk Packs",
  "categorySlug": "salon-combos",
  "subcategory": "Facial Combos",
  "subcategorySlug": "facial-combos",
  "price": 999,
  "originalPrice": 1599,
  "discountPercent": 38,
  "rating": "4.8",
  "reviewCount": 89,
  "stock": 60,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  ],
  "description": "Huge value 6-tub professional facial master combo containing Dr. Rashel's bestsellers: Papaya Exfoliating Scrub, Pearl Deep Massage Cream, Orange Hydrating Gel, Ubtan Brightening Pack, Aloe Vera Cleanser, and De-Tan Glow Polish (380ml each).",
  "shortDescription": "6-Tub 380ml complete salon facial combo yielding over 70 client facial sessions.",
  "highlights": [
    "Includes 6 full 380ml salon parlor tubs",
    "Yields over 70 complete salon facial sessions",
    "Instant glass skin glow, deep tan removal, and hydration",
    "Unmatched B2B value for beauty parlors and salon owners"
  ],
  "usageInstructions": "Follow standard 5-step salon facial sequence: Cleanser -> Scrub -> Gel -> Cream massage -> Pack.",
  "specifications": {
    "Brand": "Dr. Rashel",
    "Quantity": "6 Tubs x 380ml (Total 2,280ml)",
    "Origin": "India"
  },
  "volumeSize": "6 x 380 ml Tubs",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "dr rashel",
    "facial combo",
    "scrub",
    "facial pack",
    "parlour bulk"
  ]
},

  {
  "slug": "purecuts-disposable-salon-hygiene-bulk-carton-1000pcs",
  "name": "PureCuts 1000 Pcs Disposable Salon Hygiene Bulk Carton (Sheets + Towels + Strips)",
  "brand": "PureCuts Pro",
  "category": "Salon Combos & Bulk Packs",
  "categorySlug": "salon-combos",
  "subcategory": "Bulk Cartons",
  "subcategorySlug": "bulk-cartons",
  "price": 2499,
  "originalPrice": 3800,
  "discountPercent": 34,
  "rating": "4.9",
  "reviewCount": 65,
  "stock": 50,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
  ],
  "description": "Wholesale bulk box containing 500 waterproof cutting sheets, 300 ultra-absorbent disposable head towels, and 200 hygienic stretch neck strips. Keeps salon stations 100% clean, compliant with municipal hygiene standards, and saves hours of daily laundry.",
  "shortDescription": "1000 pcs wholesale hygiene bulk carton for active barbershops and beauty salons.",
  "highlights": [
    "1000 Pieces total salon hygiene consumables",
    "Zero laundry costs - 100% single-use client hygiene",
    "Heavy-duty water & chemical resistant fabrics"
  ],
  "usageInstructions": "Stock at barber and stylist stations for single-use client servicing.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Carton Quantity": "1000 Pieces Total",
    "Packaging": "Corrugated Master Carton"
  },
  "volumeSize": "1000 Pcs Master Carton",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "disposable bulk",
    "hygiene carton",
    "sheets",
    "towels",
    "wholesale"
  ]
},

  {
  "slug": "purecuts-pro-carbon-tail-comb-set-6pcs",
  "name": "PureCuts Pro Heat-Resistant Carbon Fiber Anti-Static Tail & Section Comb Set (6 Pcs)",
  "brand": "PureCuts Pro",
  "category": "Salon Accessories",
  "categorySlug": "accessories",
  "subcategory": "Comb & Brushes",
  "subcategorySlug": "comb-brushes",
  "price": 349,
  "originalPrice": 599,
  "discountPercent": 42,
  "rating": "4.8",
  "reviewCount": 37,
  "stock": 120,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
  ],
  "description": "Professional aerospace-grade carbon fiber salon combs engineered to withstand styling iron heat up to 230°C. 100% static-free with seamless rounded teeth that glide through wet or dry hair without snagging or scraping the scalp.",
  "shortDescription": "Heat-resistant carbon fiber salon parting and styling combs.",
  "highlights": [
    "Heat resistant up to 230°C for flat iron styling",
    "Anti-static carbon fiber prevents flyaway hair",
    "Includes 6 essential barber and stylist comb shapes"
  ],
  "usageInstructions": "Use fine pin tail for clean hair sectioning and foil placement.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Material": "Aerospace Carbon Fiber",
    "Quantity": "6 Combs Set"
  },
  "volumeSize": "6-Piece Set",
  "isFeatured": false,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "comb",
    "carbon fiber",
    "anti-static",
    "styling comb",
    "accessories"
  ]
},

  {
  "slug": "purecuts-tint-bowl-and-applicator-brush-set",
  "name": "PureCuts Professional Non-Slip Rubber Base Tint Bowl & Dual-Bristle Hair Dye Brush Set",
  "brand": "PureCuts Pro",
  "category": "Salon Accessories",
  "categorySlug": "accessories",
  "subcategory": "Comb & Brushes",
  "subcategorySlug": "comb-brushes",
  "price": 189,
  "originalPrice": 299,
  "discountPercent": 37,
  "rating": "4.7",
  "reviewCount": 46,
  "stock": 150,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
  ],
  "description": "Heavy-duty chemical-resistant polypropylene mixing bowl with suction rubber base to prevent accidental counter spills. Comes with premium dual-bristle feathering brush for precise root retouching and balayage sweeps.",
  "shortDescription": "Non-slip salon tinting bowl and dye applicator brush duo.",
  "highlights": [
    "Non-slip silicone ring base prevents work station spills",
    "Accurate internal milliliter measurement markings",
    "Feathered bristles for smooth balayage & root blending"
  ],
  "usageInstructions": "Mix developer and color cream with tint brush until smooth.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "BowlCapacity": "300 ml",
    "Material": "Chemical-Resistant Polypropylene"
  },
  "volumeSize": "Bowl + Brush Set",
  "isFeatured": false,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "tint bowl",
    "dye brush",
    "hair color tools",
    "accessories"
  ]
},

  {
  "slug": "ultra-fine-continuous-salon-water-mist-spray-bottle-300ml",
  "name": "PureCuts Ultra-Fine Continuous Salon Water Mist Spray Bottle 300ml",
  "brand": "PureCuts Pro",
  "category": "Salon Accessories",
  "categorySlug": "accessories",
  "subcategory": "Spray Bottle",
  "subcategorySlug": "spray-bottle",
  "price": 299,
  "originalPrice": 499,
  "discountPercent": 40,
  "rating": "4.9",
  "reviewCount": 72,
  "stock": 90,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
  ],
  "description": "Next-generation aerosol-free continuous mist spray bottle delivering an ultra-fine, even moisture cloud with a single squeeze. Operates at any angle, including upside down, without leaking.",
  "shortDescription": "Continuous ultra-fine 360-degree salon water mist bottle.",
  "highlights": [
    "Aerosol-free continuous mist distribution",
    "Works 360-degrees upside down for fast haircutting",
    "Ergonomic handle reduces hand fatigue during busy salon hours"
  ],
  "usageInstructions": "Fill with distilled or filtered water and squeeze trigger firmly for continuous spray.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Capacity": "300 ml",
    "Type": "Continuous Fine Mist Spray"
  },
  "volumeSize": "300 ml",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "spray bottle",
    "mist bottle",
    "water sprayer",
    "accessories"
  ]
},

  {
  "slug": "purecuts-black-nitrile-salon-gloves-box-of-100",
  "name": "PureCuts Heavy-Duty Powder-Free Black Nitrile Salon Gloves (Box of 100 Pcs)",
  "brand": "PureCuts Pro",
  "category": "Salon Disposables",
  "categorySlug": "disposable",
  "subcategory": "Tissue",
  "subcategorySlug": "tissue",
  "price": 449,
  "originalPrice": 650,
  "discountPercent": 31,
  "rating": "4.9",
  "reviewCount": 84,
  "stock": 140,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
  ],
  "description": "Tear-resistant medical-grade black nitrile gloves offering superior barrier protection against hair dyes, bleaches, keratin chemicals, and hot styling oils. Textured fingertips ensure tight grip on scissors and foils.",
  "shortDescription": "Tear-resistant powder-free black nitrile gloves for salon colorists.",
  "highlights": [
    "100% Latex-free & powder-free for sensitive skin",
    "Chemical resistant to peroxides and hair color developers",
    "Micro-textured fingertips for precise scissor and razor grip"
  ],
  "usageInstructions": "Single use protective gloves for color mixing, shampooing, and chemical smoothing.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Material": "Medical Grade Nitrile",
    "Quantity": "100 Gloves (50 Pairs)"
  },
  "volumeSize": "100 Pcs Box",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "gloves",
    "nitrile gloves",
    "black gloves",
    "disposable",
    "salon hygiene"
  ]
},

  {
  "slug": "purecuts-disposable-biodegradable-towels-pack-of-50",
  "name": "PureCuts Extra-Absorbent Non-Woven Disposable Salon Towels (50 Pcs Pack)",
  "brand": "PureCuts Pro",
  "category": "Salon Disposables",
  "categorySlug": "disposable",
  "subcategory": "Cotton",
  "subcategorySlug": "cotton",
  "price": 399,
  "originalPrice": 599,
  "discountPercent": 33,
  "rating": "4.8",
  "reviewCount": 49,
  "stock": 85,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80"
  ],
  "description": "Extra large 40cm x 80cm disposable salon towels made of thick 60 GSM spunlace non-woven fabric. Absorbs twice as much water as standard cotton towels without dripping, linting, or carrying laundry bacteria between clients.",
  "shortDescription": "Extra-large 40x80cm absorbent single-use disposable salon head towels.",
  "highlights": [
    "Absorbs twice as much water as standard cotton towels",
    "No lint, zero odor, 100% hygienic per client",
    "Cuts down electricity and water laundry utility bills"
  ],
  "usageInstructions": "Drape over client shoulders at shampoo backwash basin for quick drying.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Dimensions": "40 cm x 80 cm",
    "Thickness": "60 GSM Spunlace",
    "Quantity": "50 Towels Pack"
  },
  "volumeSize": "50 Towels Pack",
  "isFeatured": false,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "disposable towel",
    "salon towels",
    "hygiene",
    "disposable",
    "spunlace"
  ]
},

  {
  "slug": "wahl-professional-5-star-cordless-senior-clipper",
  "name": "Wahl Professional 5-Star Cordless Senior Metal Housing Hair Clipper",
  "brand": "Wahl",
  "category": "Machineries & Tools",
  "categorySlug": "machineries",
  "subcategory": "Hair Clipper",
  "subcategorySlug": "hair-clipper",
  "price": 9899,
  "originalPrice": 12500,
  "discountPercent": 21,
  "rating": "5.0",
  "reviewCount": 92,
  "stock": 30,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
  ],
  "description": "The gold standard heavy-duty metal housing clipper powered by Wahl's strongest rotary motor. Precision zero-overlap adjustable blade creates seamless skin fades, debulking thick wet or dry hair effortlessly with 80 minutes continuous lithium runtime.",
  "shortDescription": "Heavy-duty metal housing clipper with high torque rotary motor.",
  "highlights": [
    "Heavy-duty ergonomic aluminum metal housing",
    "V9000 equivalent high torque rotary motor",
    "Precision zero-gap adjustable fade blade",
    "Official 2-Year Wahl India Warranty"
  ],
  "usageInstructions": "Charge fully before first use. Apply Wahl clipper oil after every 2-3 haircuts.",
  "specifications": {
    "Brand": "Wahl Professional",
    "Motor": "High Speed Rotary Motor (7,200 RPM)",
    "Battery": "Lithium-Ion (80 Mins Runtime)",
    "Blade": "Zero-Overlap Chrome Plated"
  },
  "volumeSize": "1 Set with 3 Premium Guards",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "wahl",
    "senior",
    "cordless clipper",
    "clipper",
    "machineries",
    "barber"
  ]
},

  {
  "slug": "ikonic-pro-2800-super-heat-hair-dryer-2500w",
  "name": "Ikonic Professional Pro 2800+ Super Heat Ionic Salon Hair Dryer (2500W)",
  "brand": "Ikonic",
  "category": "Machineries & Tools",
  "categorySlug": "machineries",
  "subcategory": "Hair Dryer",
  "subcategorySlug": "hair-dryer",
  "price": 3299,
  "originalPrice": 4200,
  "discountPercent": 21,
  "rating": "4.9",
  "reviewCount": 68,
  "stock": 45,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
  ],
  "description": "Heavy-duty 2500W Italian design AC motor engineered for fast blowout services in busy hair salons. Features ceramic tourmaline ionic generator that seals cuticle moisture for frizz-free, ultra-shiny hair styling in half the drying time.",
  "shortDescription": "2500W high-speed ionic salon hair dryer for fast blowouts.",
  "highlights": [
    "2500W High power Italian design AC motor",
    "Tourmaline negative ion generator eliminates frizz",
    "2 Speed & 3 Heat settings with instant Cold Shot button"
  ],
  "usageInstructions": "Use narrow concentrator nozzle for smooth directional blowout brushing.",
  "specifications": {
    "Brand": "Ikonic",
    "Power": "2500 Watts",
    "Cord": "3 Meter Heavy Duty Salon Cable",
    "Motor": "Long-Life AC Motor"
  },
  "volumeSize": "Dryer + 2 Concentrator Nozzles",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "ikonic",
    "hair dryer",
    "blowout",
    "2500w",
    "machineries"
  ]
},

  {
  "slug": "purecuts-heavy-duty-portable-facial-massage-bed",
  "name": "PureCuts 3-Fold Portable Heavy-Duty Facial & Massage Treatment Bed with Aluminum Legs",
  "brand": "PureCuts Pro",
  "category": "Salon Furniture",
  "categorySlug": "furniture",
  "subcategory": "Facial & Spa Bed",
  "subcategorySlug": "facial-spa-bed",
  "price": 8999,
  "originalPrice": 12500,
  "discountPercent": 28,
  "rating": "4.9",
  "reviewCount": 26,
  "stock": 15,
  "inStock": true,
  "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  "galleryImages": [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
  ],
  "description": "Ergonomic 3-fold portable salon treatment bed cushioned with 7cm multi-layer high-density foam and oil-proof PU leather. Folds cleanly in 30 seconds into a portable carry case, supporting up to 250kg working weight.",
  "shortDescription": "Heavy-duty 3-fold portable facial & massage spa bed.",
  "highlights": [
    "Oil & waterproof medical grade PU leather upholstery",
    "Height adjustable from 60cm to 85cm for therapist comfort",
    "Working weight capacity tested up to 250 kg"
  ],
  "usageInstructions": "Unfold legs, tighten safety lock knobs, and position face cradle.",
  "specifications": {
    "Brand": "PureCuts Pro",
    "Structure": "Reinforced Aluminum & Hardwood",
    "WeightCapacity": "250 KG",
    "Dimensions": "185 cm x 70 cm"
  },
  "volumeSize": "1 Bed + Face Cradle + Carry Bag",
  "isFeatured": true,
  "isBestseller": true,
  "isSalonPro": true,
  "tags": [
    "facial bed",
    "massage bed",
    "portable bed",
    "furniture",
    "salon equipment"
  ]
},
];


export const PRODUCTS_DATA: SeedProduct[] = BASE_PRODUCTS_DATA.map(
  (product) => ({
    ...product,

    punePrice:
      product.punePrice ?? Math.max(1, product.price - 100),

    outsidePunePrice:
      product.outsidePunePrice ?? product.price + 200,
  })
);

export const BLOG_POSTS_DATA = [
  {
    slug: "top-10-salon-hair-colors-for-indian-hair",
    title: "Top 10 Salon Professional Hair Colors for Indian Hair in 2026",
    excerpt:
      "Discover the best shades and developer ratios from L'Oréal Majirel, Schwarzkopf Igora, and Streax Argan Secrets for rich grey coverage and vibrant undertones.",
    content:
      "When selecting professional hair colors for Indian hair textures, stylists need formulations with deep pigment deposits, low ammonia damage, and conditioning agents like Argan oil and Ionène G. In this guide, we break down top-performing shades from L'Oréal Majirel 1 and 7.3, Schwarzkopf Igora Zero AMM, and Streax Pro Argan Secrets...",
    coverImage:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    category: "Hair Care Trends",
    author: "PureCuts Hair Artistry Team",
    readTime: "4 min read",
  },
  {
    slug: "how-to-choose-the-best-barber-clipper-wahl-vs-ikonic-vs-vgr",
    title: "How to Choose the Best Barber Clipper: Wahl vs Ikonic vs VGR",
    excerpt:
      "A comprehensive breakdown of motor types, blade geometry, battery runtime, and blade heat management for barbershop professionals.",
    content:
      "A reliable hair clipper is the backbone of every barber station. While Wahl Super Taper remains the time-tested standard for all-day continuous clipping with its V5000 electromagnetic motor, cordless tools like the Wahl Cordless Magic Clip and VGR V-901 Metal Housing offer unprecedented ergonomic flexibility...",
    coverImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    category: "Salon Tools & Equipment",
    author: "Master Barber Rahul Joshi",
    readTime: "5 min read",
  },
  {
    slug: "the-ultimate-salon-facial-protocol-with-dr-rashel-and-vlcc",
    title: "The Ultimate Salon Facial Protocol with Dr. Rashel and VLCC",
    excerpt:
      "Step-by-step masterclass on combining exfoliating scrubs, whitening creams, and tightening packs to deliver an instant glass-skin bridal glow.",
    content:
      "Delivering a salon facial that produces visible radiance requires an orderly 5-step methodology: Double Cleansing with VLCC Serum Face Wash, Micro-dermabrasion using Dr. Rashel Orange or Papaya scrub, deep dermal massage with Dr. Rashel Pearl Cream, followed by tightening clay mask and hydration sealing...",
    coverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    category: "Skincare Masterclass",
    author: "Pooja Deshmukh (Lead Esthetician)",
    readTime: "6 min read",
  },
];

export const COUPONS_DATA = [
  {
    code: "PURECUTS10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 300,
    description: "Get 10% OFF on all orders above ₹499 (Max ₹300)",
    isActive: true,
  },
  {
    code: "SALONPRO20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 2500,
    maxDiscount: 1000,
    description:
      "Special 20% OFF for Salon Owners on orders above ₹2,500 (Max ₹1000)",
    isActive: true,
  },
  {
    code: "FIRST50",
    discountType: "flat",
    discountValue: 50,
    minOrderValue: 299,
    maxDiscount: 50,
    description: "Flat ₹50 OFF on your first PureCuts purchase",
    isActive: true,
  },
];
