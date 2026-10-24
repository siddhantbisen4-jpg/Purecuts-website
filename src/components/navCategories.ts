
export interface NavCategory {
    name: string;
    slug: string;
    badge?: string;
    isDeal?: boolean;
}

export const NAV_CATEGORIES: NavCategory[] = [
    { name: "All Products", slug: "all", badge: "60+ Items" },
    { name: "Haircare", slug: "haircare", badge: "Hot" },

    { name: "Skincare & Bodycare", slug: "skincare" },
    {
        name: "Machineries & Tools",
        slug: "machineries",
        badge: "Up to 50% Off",
    },
    { name: "Hair Color & Developers", slug: "hair-color", badge: "Pro Color" },
    { name: "Salon Combos & Bulk", slug: "salon-combos", badge: "Bulk Deals" },
    { name: "Salon Accessories", slug: "accessories" },
    { name: "Salon Furniture", slug: "furniture" },
    {
        name: "Salon Disposables",
        slug: "disposable",
        badge: "Wholesale",
    },
];

