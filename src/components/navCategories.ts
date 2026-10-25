export interface NavCategory {
  name: string;
  slug: string;
  badge?: string;
  isDeal?: boolean;
}

export const NAV_CATEGORIES: NavCategory[] = [
  { name: "All Products", slug: "all" },
  { name: "Haircare", slug: "haircare" },

  { name: "Skincare & Bodycare", slug: "skincare" },
  {
    name: "Machineries & Tools",
    slug: "machineries",
    
  },

  { name: "Salon Accessories", slug: "accessories" },
  { name: "Salon Furniture", slug: "furniture" },
  {
    name: "Salon Disposables",
    slug: "disposable",
    
  },
];
