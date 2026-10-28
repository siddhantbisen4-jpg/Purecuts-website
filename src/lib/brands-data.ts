export interface BrandDetail {
  slug: string;
  name: string;
  query: string;
  origin: string;
  categoryFocus: string;
  description: string;
  badge: string;
  productCount: number;
  featured: boolean;
  heroImage: string;
}

// Live brands are now fetched dynamically from Firestore collection 'brands'
export const ALL_BRANDS_DATA: BrandDetail[] = [];
