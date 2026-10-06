"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { Product, Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";

import {
  SlidersHorizontal,
  X,
  Filter,
  Grid3X3,
  LayoutGrid,
  Search,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type SubcategoryItem = {
  label: string;
  slug: string;
};

/* =========================================================
   SUBCATEGORY DATA
========================================================= */

const SUBCATEGORIES: Record<string, SubcategoryItem[]> = {
  /* =======================================================
     HAIRCARE
  ======================================================= */

  haircare: [
    {
      label: "Shampoo",
      slug: "shampoo",
    },
    {
      label: "Conditioner",
      slug: "conditioner",
    },
    {
      label: "Hair Spa",
      slug: "hair-spa",
    },
    {
      label: "Blonder",
      slug: "blonder",
    },
    {
      label: "Hair Color",
      slug: "hair-color",
    },
    {
      label: "Hair Oil",
      slug: "hair-oil",
    },
    {
      label: "Hair Styling",
      slug: "hair-styling",
    },
    {
      label: "Hair Spray",
      slug: "hair-spray",
    },
    {
      label: "Hair Masque",
      slug: "hair-masque",
    },
    {
      label: "Hair Creams & Masks",
      slug: "hair-creams-masks",
    },
    {
      label: "Hair Dryer",
      slug: "hair-dryer",
    },
    {
      label: "Hair Texture",
      slug: "hair-texture",
    },
    {
      label: "Hair Tonic",
      slug: "hair-tonic",
    },
    {
      label: "Hair Wax",
      slug: "hair-wax",
    },
    {
      label: "Nanoplasty",
      slug: "nanoplasty",
    },
    {
      label: "Scalf Scrub",
      slug: "scalf-scrub",
    },
    {
      label: "Serum",
      slug: "serum",
    },
    {
      label: "Botox",
      slug: "botox",
    },
    {
      label: "Beard Hair Color",
      slug: "beard-hair-color",
    },
    {
      label: "Shaving Foam",
      slug: "shaving-foam",
    },
    {
      label: "Shower Cap",
      slug: "shower-cap",
    },
  ],

  /* =======================================================
     SKINCARE / BODYCARE
  ======================================================= */

  skincare: [
    {
      label: "Cleansing Milk",
      slug: "cleansing-milk",
    },
    {
      label: "Face Wash",
      slug: "face-wash",
    },
    {
      label: "Facepack",
      slug: "facepack",
    },
    {
      label: "Facial Cream",
      slug: "facial-cream",
    },
    {
      label: "Facial De-Tan",
      slug: "facial-de-tan",
    },
    {
      label: "Facial Gel",
      slug: "facial-gel",
    },
    {
      label: "Facial Kit",
      slug: "facial-kit",
    },
    {
      label: "Facial Mask",
      slug: "facial-mask",
    },
    {
      label: "Facial Scrub",
      slug: "facial-scrub",
    },
    {
      label: "Non-Foaming Shaving Gel",
      slug: "non-foaming-shaving-gel",
    },
    {
      label: "Rose Water",
      slug: "rose-water",
    },
    {
      label: "Shaving Cream",
      slug: "shaving-cream",
    },
    {
      label: "Shaving Lotion",
      slug: "shaving-lotion",
    },
    {
      label: "Sunscreen",
      slug: "sunscreen",
    },
    {
      label: "Lotion",
      slug: "lotion",
    },
    {
      label: "Wax",
      slug: "wax",
    },
  ],

  /* =======================================================
     MACHINERIES
  ======================================================= */

  machineries: [
    {
      label: "Curling Tang",
      slug: "curling-tang",
    },
    {
      label: "Hair Crimper",
      slug: "hair-crimper",
    },
    {
      label: "Hair Dryer",
      slug: "hair-dryer",
    },
    {
      label: "Massager",
      slug: "massager",
    },
    {
      label: "Steamers",
      slug: "steamers",
    },
    {
      label: "Straightner",
      slug: "straightner",
    },
    {
      label: "Trimmers",
      slug: "trimmers",
    },
    {
      label: "Hair Clipper",
      slug: "hair-clipper",
    },
    {
      label: "Zero Trimmer",
      slug: "zero-trimmer",
    },
    {
      label: "Wax Heater",
      slug: "wax-heater",
    },
  ],

  /* =======================================================
     ACCESSORIES
  ======================================================= */

  accessories: [
    {
      label: "Blades",
      slug: "blades",
    },
    {
      label: "Comb & Brushes",
      slug: "comb-brushes",
    },
    {
      label: "Dummy",
      slug: "dummy",
    },
    {
      label: "Hair Clipper Oil",
      slug: "hair-clipper-oil",
    },
    {
      label: "Hair Clips",
      slug: "hair-clips",
    },
    {
      label: "Hair Cutting Scissor",
      slug: "hair-cutting-scissor",
    },
    {
      label: "Hair Dryer Stand",
      slug: "hair-dryer-stand",
    },
    {
      label: "Medium Towel",
      slug: "medium-towel",
    },
    {
      label: "Napkin",
      slug: "napkin",
    },
    {
      label: "Spray Bottle",
      slug: "spray-bottle",
    },
    {
      label: "Spray Trigger Head",
      slug: "spray-trigger-head",
    },
  ],

  /* =======================================================
     FURNITURE
  ======================================================= */

  furniture: [
    {
      label: "Facial & Spa Bed",
      slug: "facial-spa-bed",
    },
    {
      label: "Hair Styling & Cutting Chair",
      slug: "hair-styling-cutting-chair",
    },
    {
      label: "Hair Wash Chair",
      slug: "hair-wash-chair",
    },
    {
      label: "Jacuzzi Tub",
      slug: "jacuzzi-tub",
    },
    {
      label: "Manicure Pedicure Chair",
      slug: "manicure-pedicure-chair",
    },
    {
      label: "Pedicure",
      slug: "pedicure",
    },
    {
      label: "Styling Chair",
      slug: "styling-chair",
    },
    {
      label: "Styling Stool",
      slug: "styling-stool",
    },
    {
      label: "Trolley",
      slug: "trolley",
    },
  ],

  /* =======================================================
     DISPOSABLES
  ======================================================= */

  disposable: [
    {
      label: "Cotton",
      slug: "cotton",
    },
    {
      label: "Neck Role",
      slug: "neck-role",
    },
    {
      label: "Tissue",
      slug: "tissue",
    },
    {
      label: "Disposable Cutting Sheet",
      slug: "disposable-sheets",
    },
  ],
};

/* =========================================================
   CHILD SUBCATEGORY DATA
========================================================= */

const SUBSUBCATEGORIES: Record<string, SubcategoryItem[]> = {
  /* Hair Color */

  "hair-color": [
    {
      label: "Developers & Peroxides",
      slug: "developers-peroxides",
    },
    {
      label: "Hair Color Gel",
      slug: "hair-color-gel",
    },
    {
      label: "Hair Colour Cream",
      slug: "hair-colour-cream",
    },
    {
      label: "Hair Dye",
      slug: "hair-dye",
    },
  ],

  /* Hair Creams & Masks */

  "hair-creams-masks": [
    {
      label: "All Hair Smoothing Creams",
      slug: "all-hair-smoothing-creams",
    },
    {
      label: "Hair Straightening",
      slug: "hair-straightening",
    },
  ],
};

/* =========================================================
   PROPS
========================================================= */

interface CategoryCatalogProps {
  initialProducts: Product[];
  categories: Category[];
  currentCategorySlug: string;
  brands: {
    name: string;
    count: number;
  }[];
  initialSearch?: string;
  initialBrand?: string;
  initialSort?: string;
  initialDeal?: boolean;
  initialSubcategory?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export function CategoryCatalog({
  initialProducts,
  categories,
  currentCategorySlug,
  brands,
  initialSearch = "",
  initialBrand = "",
  initialSort = "featured",
  initialDeal = false,
  initialSubcategory = "all",
}: CategoryCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /* =======================================================
     READ CURRENT URL VALUES
  ======================================================= */

  const urlSubcategory = searchParams.get("subcategory") || "all";

  const urlSubSubcategory = searchParams.get("subsubcategory") || "all";

  /* =======================================================
     STATE
  ======================================================= */

  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);

  const [selectedSort, setSelectedSort] = useState<string>(initialSort);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    urlSubcategory !== "all" ? urlSubcategory : initialSubcategory || "all",
  );

  const [selectedSubSubcategory, setSelectedSubSubcategory] =
    useState<string>(urlSubSubcategory);

  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const [salonProOnly, setSalonProOnly] = useState<boolean>(false);

  const [priceRange, setPriceRange] = useState<number>(15000);

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  /* =======================================================
     POPUP
  ======================================================= */

  const [isSubSubcategoryPopupOpen, setIsSubSubcategoryPopupOpen] =
    useState<boolean>(false);

  const [popupSubcategory, setPopupSubcategory] =
    useState<SubcategoryItem | null>(null);

  /* =======================================================
     AVAILABLE SUBCATEGORIES
  ======================================================= */

  const availableSubcategories = SUBCATEGORIES[currentCategorySlug] || [];

  const subcatNavRef = useRef<HTMLDivElement>(null);
  const subcatScrollRef = useRef<HTMLDivElement>(null);

  // Dynamically update CSS custom property --subcat-nav-height so sidebar filters stick nicely below it
  useEffect(() => {
    if (!subcatNavRef.current) {
      document.documentElement.style.setProperty("--subcat-nav-height", "0px");
      return;
    }

    const updateHeight = () => {
      if (subcatNavRef.current) {
        const h = subcatNavRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--subcat-nav-height",
          `${h}px`,
        );
      }
    };

    updateHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && subcatNavRef.current) {
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(subcatNavRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.setProperty("--subcat-nav-height", "0px");
    };
  }, [availableSubcategories.length]);

  const scrollSubcat = (direction: "left" | "right") => {
    if (subcatScrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      subcatScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /* =======================================================
     CHILDREN OF CURRENT SUBCATEGORY
  ======================================================= */

  const activeSubSubcategories =
    selectedSubcategory !== "all"
      ? SUBSUBCATEGORIES[selectedSubcategory] || []
      : [];

  /* =======================================================
     IMPORTANT FIX

     Synchronize state from URL.

     We DO NOT use initialSubcategory here.
     This prevents the selected subcategory from
     jumping back to "all" after router.push().
  ======================================================= */

  useEffect(() => {
    const currentSubcategory = searchParams.get("subcategory") || "all";

    const currentSubSubcategory = searchParams.get("subsubcategory") || "all";

    setSelectedSubcategory(currentSubcategory);

    setSelectedSubSubcategory(currentSubSubcategory);
  }, [searchParams, pathname]);

  /* =======================================================
     UPDATE URL

     IMPORTANT:
     Always stay on the CURRENT CATEGORY.

     Example:
     /category/haircare
     -> /category/haircare?subcategory=blonder

     NOT:
     /category/all
  ======================================================= */

  const updateCategoryParams = (
    subcategory: string,
    subsubcategory: string = "all",
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!subcategory || subcategory === "all") {
      params.delete("subcategory");
      params.delete("subsubcategory");
    } else {
      params.set("subcategory", subcategory);

      if (subsubcategory && subsubcategory !== "all") {
        params.set("subsubcategory", subsubcategory);
      } else {
        params.delete("subsubcategory");
      }
    }

    const queryString = params.toString();

    const targetUrl =
      `/category/${currentCategorySlug}` +
      (queryString ? `?${queryString}` : "");

    router.push(targetUrl, {
      scroll: false,
    });
  };

  /* =======================================================
     SELECT SUBCATEGORY
  ======================================================= */

  const handleSubcategoryClick = (subcategory: SubcategoryItem) => {
    const children = SUBSUBCATEGORIES[subcategory.slug] || [];

    /* -----------------------------------------------
       If this subcategory has children,
       open popup first.
    ------------------------------------------------ */

    if (children.length > 0) {
      setPopupSubcategory(subcategory);

      setIsSubSubcategoryPopupOpen(true);

      return;
    }

    /* -----------------------------------------------
       Normal subcategory
    ------------------------------------------------ */

    setSelectedSubcategory(subcategory.slug);

    setSelectedSubSubcategory("all");

    updateCategoryParams(subcategory.slug, "all");
  };

  /* =======================================================
     SELECT CHILD SUBCATEGORY
  ======================================================= */

  const handleSubSubcategorySelect = (childSlug: string) => {
    if (!popupSubcategory) {
      return;
    }

    const parentSlug = popupSubcategory.slug;

    setSelectedSubcategory(parentSlug);

    setSelectedSubSubcategory(childSlug);

    setIsSubSubcategoryPopupOpen(false);

    setPopupSubcategory(null);

    updateCategoryParams(parentSlug, childSlug);
  };

  /* =======================================================
     SELECT ALL PARENT PRODUCTS
  ======================================================= */

  const handleAllSubcategorySelect = () => {
    setSelectedSubcategory("all");

    setSelectedSubSubcategory("all");

    updateCategoryParams("all", "all");
  };

  /* =======================================================
     SIDEBAR CHILD SELECTION
  ======================================================= */

  const handleSidebarChildChange = (childSlug: string) => {
    if (selectedSubcategory === "all") {
      return;
    }

    if (childSlug === "all") {
      setSelectedSubSubcategory("all");

      updateCategoryParams(selectedSubcategory, "all");

      return;
    }

    setSelectedSubSubcategory(childSlug);

    updateCategoryParams(selectedSubcategory, childSlug);
  };

  /* =======================================================
     FILTER PRODUCTS
  ======================================================= */

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        /* Category */

        if (
          currentCategorySlug !== "all" &&
          product.categorySlug !== currentCategorySlug
        ) {
          return false;
        }

        /* ---------------------------------------------
           Parent subcategory
        --------------------------------------------- */

        if (
          selectedSubcategory !== "all" &&
          product.subcategorySlug !== selectedSubcategory
        ) {
          return false;
        }

        /* ---------------------------------------------
           Child subcategory
        --------------------------------------------- */

        if (selectedSubSubcategory !== "all") {
          const productAny = product as Product & {
            subSubcategorySlug?: string;
            subSubCategorySlug?: string;
            subSubCategory?: string;
            subsubcategorySlug?: string;
            subsubcategory?: string;
          };

          const productChildSlug =
            productAny.subSubcategorySlug ||
            productAny.subSubCategorySlug ||
            productAny.subSubCategory ||
            productAny.subsubcategorySlug ||
            productAny.subsubcategory ||
            "";

          /*
           * If product has a child slug,
           * it must match the selected child.
           */
          if (productChildSlug && productChildSlug !== selectedSubSubcategory) {
            return false;
          }

          /*
           * If no child slug exists in the
           * product data, don't accidentally
           * send the user to All Categories.
           *
           * Keep the parent products visible.
           */
        }

        /* Brand */

        if (
          selectedBrand &&
          selectedBrand !== "all" &&
          product.brand.toLowerCase() !== selectedBrand.toLowerCase()
        ) {
          return false;
        }

        /* Search */

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();

          const matches =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            Boolean(product.description?.toLowerCase().includes(q));

          if (!matches) {
            return false;
          }
        }

        /* Price */

        if (product.price > priceRange) {
          return false;
        }

        /* Stock */

        if (inStockOnly && !product.inStock) {
          return false;
        }

        /* Salon Pro */

        if (salonProOnly && !product.isSalonPro) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "price-asc") {
          return a.price - b.price;
        }

        if (selectedSort === "price-desc") {
          return b.price - a.price;
        }

        if (selectedSort === "rating") {
          return Number(b.rating || 0) - Number(a.rating || 0);
        }

        if (selectedSort === "discount") {
          return (
            Number(b.discountPercent || 0) - Number(a.discountPercent || 0)
          );
        }

        return 0;
      });
  }, [
    initialProducts,
    currentCategorySlug,
    selectedSubcategory,
    selectedSubSubcategory,
    selectedBrand,
    searchQuery,
    priceRange,
    inStockOnly,
    salonProOnly,
    selectedSort,
  ]);

  /* =======================================================
     CURRENT CATEGORY
  ======================================================= */

  const currentCategory = categories.find(
    (category) => category.slug === currentCategorySlug,
  );

  const categoryTitle =
    currentCategorySlug === "all"
      ? "All Salon Products"
      : currentCategory?.name || "Products";

  /* =======================================================
     LABELS
  ======================================================= */

  const selectedSubcategoryLabel =
    availableSubcategories.find((item) => item.slug === selectedSubcategory)
      ?.label || "";

  const selectedSubSubcategoryLabel =
    activeSubSubcategories.find((item) => item.slug === selectedSubSubcategory)
      ?.label || "";

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearAllFilters = () => {
    setSelectedBrand("");
    setSelectedSubcategory("all");
    setSelectedSubSubcategory("all");
    setSearchQuery("");
    setInStockOnly(false);
    setSalonProOnly(false);
    setPriceRange(15000);
    setSelectedSort("featured");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("subcategory");
    params.delete("subsubcategory");
    params.delete("brand");
    params.delete("q");
    params.delete("sort");

    const queryString = params.toString();

    router.push(
      `/category/${currentCategorySlug}` +
        (queryString ? `?${queryString}` : ""),
      {
        scroll: false,
      },
    );
  };

  /* =======================================================
     ACTIVE FILTERS
  ======================================================= */

  const hasActiveFilters =
    selectedSubcategory !== "all" ||
    selectedSubSubcategory !== "all" ||
    Boolean(selectedBrand) ||
    Boolean(searchQuery) ||
    inStockOnly ||
    salonProOnly ||
    priceRange < 15000 ||
    selectedSort !== "featured";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {/* =================================================
          BREADCRUMBS
      ================================================= */}

        <nav className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#795BCB] font-medium">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/category/all"
            className="hover:text-[#795BCB] font-medium"
          >
            Catalog
          </Link>

          {currentCategorySlug !== "all" && (
            <>
              <span>/</span>

              <span className="text-slate-800 font-bold">{categoryTitle}</span>
            </>
          )}
        </nav>

        {/* =================================================
          CATEGORY HEADER
      ================================================= */}

        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 mb-4 sm:mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white bg-[#795BCB] px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  PureCuts Catalog
                </span>

                <span className="text-[10px] sm:text-xs text-slate-500 font-semibold whitespace-nowrap">
                  {filteredProducts.length} items available
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {categoryTitle}
              </h1>

              {currentCategory?.description && (
                <p className="text-[11px] sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  {currentCategory.description}
                </p>
              )}
            </div>

            {/* SEARCH */}

            <div className="relative max-w-xs md:max-w-xs w-full shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Filter in ${categoryTitle}...`}
                className="w-full pl-9 pr-9 py-2.5 sm:py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#795BCB]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
        SUBCATEGORY BUTTONS NAVBAR (STICKY)

        Sticks directly below the category navbar when scrolling.
    ================================================= */}

     {availableSubcategories.length > 0 && (
  <div
    ref={subcatNavRef}
    className="sticky z-[90] w-full bg-white/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm mb-4 sm:mb-6"
    style={{
      top: "var(--header-height, 0px)",
    }}
  >
          <div className="max-w-7xl mx-auto px-2 sm:px-6 relative">
            {/* Scroll Left Button (desktop) */}
            <button
              type="button"
              onClick={() => scrollSubcat("left")}
              className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-sm items-center justify-center text-slate-600 hover:text-[#795BCB] hover:border-[#795BCB] transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div
              ref={subcatScrollRef}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 sm:py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-1"
            >
              {/* All */}
              <button
                type="button"
                onClick={handleAllSubcategorySelect}
                className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2 rounded-full border text-[11px] sm:text-xs font-bold transition-all ${
                  selectedSubcategory === "all"
                    ? "bg-[#795BCB] text-white border-[#795BCB] shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#795BCB] hover:text-[#795BCB] hover:bg-purple-50"
                }`}
              >
                <span
                  className={
                    selectedSubcategory === "all"
                      ? "text-white"
                      : "text-slate-700"
                  }
                >
                  All {categoryTitle}
                </span>
              </button>

              {/* Subcategories */}
              {availableSubcategories.map((subcategory) => {
                const isSelected = selectedSubcategory === subcategory.slug;

                const hasChildren = Boolean(
                  SUBSUBCATEGORIES[subcategory.slug]?.length,
                );

                return (
                  <button
                    key={subcategory.slug}
                    type="button"
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#795BCB] text-white border-[#795BCB] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-[#795BCB] hover:text-[#795BCB] hover:bg-purple-50"
                    }`}
                  >
                    <span
                      className={isSelected ? "text-white" : "text-slate-700"}
                    >
                      {subcategory.label}
                    </span>

                    {hasChildren && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-white" : "text-slate-400"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button (desktop) */}
            <button
              type="button"
              onClick={() => scrollSubcat("right")}
              className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-sm items-center justify-center text-slate-600 hover:text-[#795BCB] hover:border-[#795BCB] transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================
        MAIN LAYOUT
    ================================================= */}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-5 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* =================================================
            SIDEBAR
        ================================================= */}

          <aside
            className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-6 sticky"
            style={{
              top: "calc(var(--header-height, 113px) + var(--subcat-nav-height, 0px) + 16px)",
            }}
          >
            {/* FILTER HEADER */}

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <SlidersHorizontal className="w-4 h-4 text-[#795BCB]" />

                <span>
                  {activeSubSubcategories.length > 0
                    ? "Subcategory Filter"
                    : "Filters"}
                </span>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* =================================================
              SELECTED SUBCATEGORY CHILD FILTER
          ================================================= */}

            {activeSubSubcategories.length > 0 ? (
              <div>
                <div className="mb-3">
                  <p className="text-[10px] uppercase tracking-wider font-black text-[#795BCB]">
                    {selectedSubcategoryLabel}
                  </p>

                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    Choose an option
                  </h3>
                </div>

                <div className="space-y-1">
                  {/* ALL PARENT */}

                  <label
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition ${
                      selectedSubSubcategory === "all"
                        ? "bg-[rgba(121,91,203,0.10)] text-[#795BCB]"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubSubcategory === "all"}
                      onChange={() => handleSidebarChildChange("all")}
                      className="w-4 h-4 rounded border-slate-300 text-[#795BCB] focus:ring-[#795BCB]"
                    />

                    <span className="text-xs font-semibold flex-1">
                      All {selectedSubcategoryLabel}
                    </span>

                    {selectedSubSubcategory === "all" && (
                      <Check className="w-4 h-4 text-[#795BCB]" />
                    )}
                  </label>

                  {/* CHILDREN */}

                  {activeSubSubcategories.map((child) => {
                    const checked = selectedSubSubcategory === child.slug;

                    return (
                      <label
                        key={child.slug}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition ${
                          checked
                            ? "bg-[rgba(121,91,203,0.10)] text-[#795BCB]"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            handleSidebarChildChange(
                              checked ? "all" : child.slug,
                            )
                          }
                          className="w-4 h-4 rounded border-slate-300 text-[#795BCB] focus:ring-[#795BCB]"
                        />

                        <span className="text-xs font-medium flex-1">
                          {child.label}
                        </span>

                        {checked && (
                          <Check className="w-4 h-4 text-[#795BCB]" />
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* BACK */}

                <button
                  type="button"
                  onClick={handleAllSubcategorySelect}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-[#795BCB] border border-slate-200 rounded-xl hover:border-[#795BCB] transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  All {categoryTitle}
                </button>
              </div>
            ) : (
              <>
                {/* =================================================
                  NORMAL FILTERS
              ================================================= */}

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Categories
                  </span>

                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link
                        href="/category/all"
                        className={`flex items-center justify-between p-2 rounded-xl transition ${
                          currentCategorySlug === "all"
                            ? "bg-[rgba(121,91,203,0.10)] text-[#795BCB] font-bold border border-[rgba(121,91,203,0.35)]"
                            : "text-slate-700 hover:bg-[rgba(121,91,203,0.06)]"
                        }`}
                      >
                        <span>All Categories</span>

                        <span className="text-[11px] text-slate-400 font-normal">
                          ({initialProducts.length})
                        </span>
                      </Link>
                    </li>

                    {categories
                      .filter(
                        (cat) =>
                          cat.slug !== "hair-color" &&
                          cat.slug !== "salon-combos",
                      )
                      .sort((a, b) => {
                        const order = [
                          "haircare",
                          "skincare",
                          "machineries",
                          "accessories",
                          "furniture",
                          "disposable",
                        ];

                        const aIndex = order.indexOf(a.slug);

                        const bIndex = order.indexOf(b.slug);

                        return (
                          (aIndex === -1 ? 999 : aIndex) -
                          (bIndex === -1 ? 999 : bIndex)
                        );
                      })
                      .map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={`/category/${cat.slug}`}
                            className={`flex items-center justify-between p-2 rounded-xl transition ${
                              currentCategorySlug === cat.slug
                                ? "bg-[rgba(121,91,203,0.10)] text-[#795BCB] font-bold border border-[rgba(121,91,203,0.35)]"
                                : "text-slate-700 hover:bg-[rgba(121,91,203,0.06)]"
                            }`}
                          >
                            <span>{cat.name}</span>

                            <span className="text-[11px] text-slate-400 font-normal">
                              ({cat.productCount || 0})
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* BRANDS */}

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Brand
                  </span>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedBrand("")}
                      className={`w-full text-left p-1.5 rounded-lg transition flex items-center justify-between ${
                        !selectedBrand
                          ? "bg-amber-50 text-amber-900 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>All Brands</span>
                    </button>

                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        type="button"
                        onClick={() =>
                          setSelectedBrand(
                            selectedBrand === brand.name ? "" : brand.name,
                          )
                        }
                        className={`w-full text-left p-1.5 rounded-lg transition flex items-center justify-between ${
                          selectedBrand.toLowerCase() ===
                          brand.name.toLowerCase()
                            ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{brand.name}</span>

                        <span className="text-[10px] text-slate-400">
                          ({brand.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRICE */}

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                    <span>Max Price</span>

                    <span className="text-[#795BCB]">
                      ₹{priceRange.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="20000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#795BCB] cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹100</span>

                    <span>₹20,000+</span>
                  </div>
                </div>

                {/* TOGGLES */}

                <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#795BCB] focus:ring-[#795BCB]"
                    />

                    <span>In Stock Only</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={salonProOnly}
                      onChange={(e) => setSalonProOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#795BCB] focus:ring-[#795BCB]"
                    />

                    <span>Salon Professional Only</span>
                  </label>
                </div>
              </>
            )}
          </aside>

          {/* =================================================
            PRODUCT AREA
        ================================================= */}

          <div className="lg:col-span-9 space-y-3 sm:space-y-4 min-w-0">
            {/* TOP CONTROL */}

            <div className="bg-white p-2.5 sm:p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-end gap-2 sm:gap-3 shadow-xs">
              {/* MOBILE FILTER */}

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex-1 sm:flex-none px-3 py-2.5 sm:py-2 bg-slate-900 text-white rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <Filter className="w-3.5 h-3.5" />

                <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
              </button>

              {/* SORT */}

              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600">
                <span className="font-semibold whitespace-nowrap">
                  Sort by:
                </span>

                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795BCB] focus:border-[#795BCB] cursor-pointer min-w-[125px] sm:min-w-[145px]"
                >
                  <option value="featured">Featured</option>

                  <option value="price-asc">Price: Low to High</option>

                  <option value="price-desc">Price: High to Low</option>

                  <option value="rating">Top Customer Rated</option>

                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* GRID */}

              <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-lg transition ${
                    gridCols === 3
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="3 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-lg transition ${
                    gridCols === 4
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="4 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* =================================================
              ACTIVE FILTER PILLS
          ================================================= */}

            {(selectedSubcategory !== "all" ||
              selectedSubSubcategory !== "all" ||
              selectedBrand ||
              inStockOnly ||
              salonProOnly ||
              searchQuery) && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {/* PARENT */}

                {selectedSubcategory !== "all" && (
                  <span className="bg-purple-100 text-purple-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    {selectedSubcategoryLabel}

                    <button
                      type="button"
                      onClick={handleAllSubcategorySelect}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* CHILD */}

                {selectedSubSubcategory !== "all" && (
                  <span className="bg-purple-100 text-purple-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    {selectedSubSubcategoryLabel || selectedSubSubcategory}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubSubcategory("all");

                        updateCategoryParams(selectedSubcategory, "all");
                      }}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* BRAND */}

                {selectedBrand && (
                  <span className="bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    Brand: {selectedBrand}
                    <button
                      type="button"
                      onClick={() => setSelectedBrand("")}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* STOCK */}

                {inStockOnly && (
                  <span className="bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    In Stock Only
                    <button
                      type="button"
                      onClick={() => setInStockOnly(false)}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* SALON PRO */}

                {salonProOnly && (
                  <span className="bg-purple-100 text-purple-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    Salon Pro
                    <button
                      type="button"
                      onClick={() => setSalonProOnly(false)}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* SEARCH */}

                {searchQuery && (
                  <span className="bg-blue-100 text-blue-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    "{searchQuery}"
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* =================================================
              PRODUCTS
          ================================================= */}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200">
                <div className="w-16 h-16 bg-white text-[#795BCB] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  No salon products found
                </h3>

                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try adjusting your search, selected brand, price filter, or
                  subcategory.
                </p>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-3 sm:gap-5 ${
                  gridCols === 3
                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          SUB-SUBCATEGORY POPUP
      ===================================================== */}

      {isSubSubcategoryPopupOpen && popupSubcategory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsSubSubcategoryPopupOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            {/* POPUP HEADER */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-black text-[#795BCB]">
                  Select from
                </p>

                <h3 className="text-lg font-black text-slate-900">
                  {popupSubcategory.label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubSubcategoryPopupOpen(false);
                  setPopupSubcategory(null);
                }}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* POPUP OPTIONS */}

            <div className="p-4 max-h-[65vh] overflow-y-auto">
              {/* ALL PARENT */}

              <button
                type="button"
                onClick={() => handleSubSubcategorySelect("all")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border mb-2 transition ${
                  selectedSubcategory === popupSubcategory.slug &&
                  selectedSubSubcategory === "all"
                    ? "border-[#795BCB] bg-purple-50 text-[#795BCB]"
                    : "border-slate-200 hover:border-[#795BCB] hover:bg-purple-50"
                }`}
              >
                <span className="text-sm font-semibold">
                  All {popupSubcategory.label}
                </span>

                {selectedSubcategory === popupSubcategory.slug &&
                  selectedSubSubcategory === "all" && (
                    <Check className="w-4 h-4 text-[#795BCB]" />
                  )}
              </button>

              {/* CHILD OPTIONS */}

              {(SUBSUBCATEGORIES[popupSubcategory.slug] || []).map((child) => {
                const isSelected =
                  selectedSubcategory === popupSubcategory.slug &&
                  selectedSubSubcategory === child.slug;

                return (
                  <button
                    key={child.slug}
                    type="button"
                    onClick={() => handleSubSubcategorySelect(child.slug)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border mb-2 transition text-left ${
                      isSelected
                        ? "border-[#795BCB] bg-purple-50 text-[#795BCB]"
                        : "border-slate-200 hover:border-[#795BCB] hover:bg-purple-50 text-slate-700"
                    }`}
                  >
                    <span className="text-sm font-semibold">{child.label}</span>

                    {isSelected && <Check className="w-4 h-4 text-[#795BCB]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE FILTER
      ===================================================== */}

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-sm bg-white h-full p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* HEADER */}

              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4">
                <span className="font-bold text-slate-900 text-sm">
                  Filter Products
                </span>

                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 -mr-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* MOBILE SUBCATEGORY */}

              <div className="mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Subcategory
                </span>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={handleAllSubcategorySelect}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      selectedSubcategory === "all"
                        ? "bg-purple-100 text-[#795BCB] font-bold"
                        : "text-slate-700"
                    }`}
                  >
                    All {categoryTitle}
                  </button>

                  {availableSubcategories.map((subcategory) => (
                    <button
                      key={subcategory.slug}
                      type="button"
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                        selectedSubcategory === subcategory.slug
                          ? "bg-purple-100 text-[#795BCB] font-bold"
                          : "text-slate-700"
                      }`}
                    >
                      <span>{subcategory.label}</span>

                      {SUBSUBCATEGORIES[subcategory.slug]?.length ? (
                        <ChevronRight className="w-3.5 h-3.5" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              {/* MOBILE CHILD FILTER */}

              {activeSubSubcategories.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {selectedSubcategoryLabel}
                  </span>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={selectedSubSubcategory === "all"}
                        onChange={() => handleSidebarChildChange("all")}
                        className="w-4 h-4 rounded text-[#795BCB]"
                      />

                      <span className="text-xs font-medium">
                        All {selectedSubcategoryLabel}
                      </span>
                    </label>

                    {activeSubSubcategories.map((child) => (
                      <label
                        key={child.slug}
                        className="flex items-center gap-2 p-2 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubSubcategory === child.slug}
                          onChange={() =>
                            handleSidebarChildChange(
                              selectedSubSubcategory === child.slug
                                ? "all"
                                : child.slug,
                            )
                          }
                          className="w-4 h-4 rounded text-[#795BCB]"
                        />

                        <span className="text-xs font-medium">
                          {child.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* BRAND */}

              <div className="mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Brand
                </span>

                <div className="space-y-1.5 max-h-44 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedBrand("")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      !selectedBrand
                        ? "bg-amber-100 text-amber-900 font-bold"
                        : "text-slate-700"
                    }`}
                  >
                    All Brands
                  </button>

                  {brands.map((brand) => (
                    <button
                      key={brand.name}
                      type="button"
                      onClick={() =>
                        setSelectedBrand(
                          selectedBrand === brand.name ? "" : brand.name,
                        )
                      }
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex justify-between ${
                        selectedBrand === brand.name
                          ? "bg-amber-100 text-amber-900 font-bold"
                          : "text-slate-700"
                      }`}
                    >
                      <span>{brand.name}</span>

                      <span className="text-slate-400">({brand.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE */}

              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Max Price</span>

                  <span className="text-[#795BCB]">
                    ₹{priceRange.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#795BCB]"
                />
              </div>

              {/* TOGGLES */}

              <div className="space-y-2 text-xs font-medium text-slate-700">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#795BCB]"
                  />

                  <span>In Stock Only</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={salonProOnly}
                    onChange={(e) => setSalonProOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#795BCB]"
                  />

                  <span>Salon Pro Only</span>
                </label>
              </div>
            </div>

            {/* MOBILE ACTIONS */}

            <div className="pt-3 sm:pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#795BCB] hover:bg-[#6246B0] text-white font-bold rounded-xl text-xs transition"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>

              <button
                type="button"
                onClick={clearAllFilters}
                className="w-full py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs transition"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
