export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory?: string | null;
  subcategorySlug?: string | null;
  price: number;
  punePrice: number;
  outsidePunePrice: number;
  originalPrice: number;
  discountPercent?: number | null;
  rating?: string | null;
  reviewCount?: number | null;
  stock?: number | null;
  inStock?: boolean | null;
  image: string;
  galleryImages?: string[] | null;
  description: string;
  shortDescription?: string | null;
  highlights?: string[] | null;
  usageInstructions?: string | null;
  specifications?: Record<string, string> | null;
  volumeSize?: string | null;
  isFeatured?: boolean | null;
  isBestseller?: boolean | null;
  isDealOfTheDay?: boolean | null;
  isHairCareHero?: boolean | null;
  isSkincareBestseller?: boolean | null;
  isSalonPro?: boolean | null;
  tags?: string[] | null;
  createdAt?: Date | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  image?: string | null;
  description?: string | null;
  productCount?: number | null;
  isFeatured?: boolean | null;
  displayOrder?: number | null;
}

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  volumeSize?: string;
  quantity: number;
  inStock: boolean;
}

export interface OrderItem {
  productId: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  volumeSize?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salonName?: string | null;
  gstNumber?: string | null;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: OrderItem[];
  trackingId?: string | null;
  createdAt: Date;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  title?: string | null;
  comment: string;
  verifiedPurchase?: boolean | null;
  createdAt: Date;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt?: Date | null;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number;
  description: string;
  isActive: boolean;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating" | "discount" | "newest";
  inStockOnly?: boolean;
  salonProOnly?: boolean;
  isDeal?: boolean;
  isHero?: boolean;
  page?: number;
  limit?: number;
}
