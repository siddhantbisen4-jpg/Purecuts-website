"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { Product, ProductVariant, CartItem, Coupon } from "@/lib/types";
import pincodes from "@/data/pincodes.json";

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    volumeSize?: string,
    selectedVariant?: ProductVariant | null
  ) => void;
  updateQuantity: (
    productId: number | string,
    quantity: number,
    variantId?: string
  ) => void;
  removeFromCart: (
    productId: number | string,
    variantId?: string
  ) => void;
  clearCart: () => void;

  subtotal: number;
  itemCount: number;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Coupon
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (
    code: string
  ) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;

  // Delivery
  deliveryFee: number;
  totalAmount: number;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: (number | string)[];
  toggleWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  wishlistCount: number;

  // Pincode & Delivery
  pincode: string;
  deliveryCity: string;
  customerRegion: "pune" | "outside-pune" | "";
  setPincode: (pincode: string, customCity?: string) => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // B2B Modal
  isB2BModalOpen: boolean;
  openB2BModal: () => void;
  closeB2BModal: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

const FREE_SHIPPING_THRESHOLD = 499;

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // --------------------------------------------------
  // CART
  // --------------------------------------------------

  const [cart, setCart] = useState<CartItem[]>([]);

  // --------------------------------------------------
  // WISHLIST
  // --------------------------------------------------

  const [wishlist, setWishlist] = useState<(number | string)[]>([]);

  // --------------------------------------------------
  // CART UI
  // --------------------------------------------------

  const [isCartOpen, setIsCartOpen] = useState(false);

  // --------------------------------------------------
  // COUPON
  // --------------------------------------------------

  const [appliedCoupon, setAppliedCoupon] =
    useState<Coupon | null>(null);

  const [couponDiscount, setCouponDiscount] = useState(0);

  // --------------------------------------------------
  // PINCODE / DELIVERY
  // --------------------------------------------------

  const [pincode, setPincodeState] = useState("");

  const [deliveryCity, setDeliveryCity] = useState("");

  const [customerRegion, setCustomerRegion] = useState<
    "pune" | "outside-pune" | ""
  >("");

  // --------------------------------------------------
  // QUICK VIEW
  // --------------------------------------------------

  const [quickViewProduct, setQuickViewProduct] =
    useState<Product | null>(null);

  // --------------------------------------------------
  // B2B
  // --------------------------------------------------

  const [isB2BModalOpen, setIsB2BModalOpen] =
    useState(false);

  // --------------------------------------------------
  // TOAST
  // --------------------------------------------------

  const [toastMessage, setToastMessage] =
    useState<string | null>(null);

  // --------------------------------------------------
  // LOAD LOCAL STORAGE
  // --------------------------------------------------

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("purecuts_cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist =
        localStorage.getItem("purecuts_wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedPin =
        localStorage.getItem("purecuts_pincode");

      if (savedPin) {
        setPincodeState(savedPin);
        const savedCity = localStorage.getItem("purecuts_delivery_city");
        if (savedCity) {
          setDeliveryCity(savedCity);
        } else {
          const loc = pincodes[savedPin as keyof typeof pincodes];
          if (loc) {
            setDeliveryCity(loc.district || "");
          }
        }
      }

      const savedRegion =
        localStorage.getItem("purecuts_region");

      if (
        savedRegion === "pune" ||
        savedRegion === "outside-pune"
      ) {
        setCustomerRegion(savedRegion);
      }
    } catch (error) {
      console.error(
        "Failed to load local storage state:",
        error
      );
    }
  }, []);

  // --------------------------------------------------
  // SAVE CART
  // --------------------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        "purecuts_cart",
        JSON.stringify(cart)
      );
    } catch {}
  }, [cart]);

  // --------------------------------------------------
  // SAVE WISHLIST
  // --------------------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        "purecuts_wishlist",
        JSON.stringify(wishlist)
      );
    } catch {}
  }, [wishlist]);

  // --------------------------------------------------
  // TOAST
  // --------------------------------------------------

  const showToast = (msg: string) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // --------------------------------------------------
  // PINCODE
  // --------------------------------------------------

  const setPincode = (pin: string, customCity?: string) => {
    const cleaned = pin
      .replace(/\D/g, "")
      .slice(0, 6);

    // Validate 6 digit pincode
    if (!/^\d{6}$/.test(cleaned)) {
      showToast(
        "Please enter a valid 6-digit pincode"
      );
      return;
    }

    // Find pincode in JSON
    const location =
      pincodes[
        cleaned as keyof typeof pincodes
      ];

    let isPune = false;
    let city = customCity || "";

    if (location) {
      isPune =
        location.district?.toUpperCase() === "PUNE" &&
        location.state?.toUpperCase() ===
          "MAHARASHTRA";
      if (!city) {
        city = location.district || (isPune ? "Pune" : "");
      }
    } else {
      if (customCity && customCity.toUpperCase().includes("PUNE")) {
        isPune = true;
      }
    }

    // Set region
    const region:
      | "pune"
      | "outside-pune" = isPune
      ? "pune"
      : "outside-pune";

    // Save state
    setPincodeState(cleaned);
    setCustomerRegion(region);
    setDeliveryCity(city || (isPune ? "Pune" : ""));

    // Save to localStorage
    try {
      localStorage.setItem(
        "purecuts_pincode",
        cleaned
      );

      localStorage.setItem(
        "purecuts_region",
        region
      );

      if (city || isPune) {
        localStorage.setItem(
          "purecuts_delivery_city",
          city || "Pune"
        );
      }
    } catch (error) {
      console.error(
        "Failed to save pincode:",
        error
      );
    }

    // IMPORTANT:
    // No success pricing popup here.
    //
    // The region is still saved as:
    // "pune"
    // or
    // "outside-pune"
    //
    // So your pricing logic can continue working
    // without showing the success popup.
  };

  // --------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------

  const addToCart = (
    product: Product,
    quantity = 1,
    volumeSize?: string,
    selectedVariant?: ProductVariant | null
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (selectedVariant?.id) {
          return item.productId === product.id && item.selectedVariant?.id === selectedVariant.id;
        }
        return item.productId === product.id && !item.selectedVariant?.id;
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const effectivePrice = selectedVariant?.price ?? product.price;
      const effectiveOriginalPrice = selectedVariant?.originalPrice ?? product.originalPrice;
      const effectiveImage = selectedVariant?.image || product.image;
      const effectiveVolumeSize =
        volumeSize ||
        (selectedVariant ? selectedVariant.name : (product.volumeSize || undefined));

      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: effectivePrice,
          originalPrice: effectiveOriginalPrice,
          image: effectiveImage,
          volumeSize: effectiveVolumeSize,
          quantity,
          inStock: selectedVariant?.inStock ?? (product.inStock ?? true),
          selectedVariant: selectedVariant || null,
        },
      ];
    });

    const variantLabel = selectedVariant?.name ? ` (${selectedVariant.name})` : "";
    showToast(
      `Added "${product.name.slice(0, 28)}${variantLabel}" to cart`
    );
  };

  // --------------------------------------------------
  // UPDATE QUANTITY
  // --------------------------------------------------

  const updateQuantity = (
    productId: number | string,
    quantity: number,
    variantId?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        const matches = variantId
          ? item.productId === productId && item.selectedVariant?.id === variantId
          : item.productId === productId;
        return matches
          ? {
              ...item,
              quantity,
            }
          : item;
      })
    );
  };

  // --------------------------------------------------
  // REMOVE FROM CART
  // --------------------------------------------------

  const removeFromCart = (
    productId: number | string,
    variantId?: string
  ) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (variantId) {
          return !(item.productId === productId && item.selectedVariant?.id === variantId);
        }
        return item.productId !== productId;
      })
    );

    showToast("Item removed from cart");
  };

  // --------------------------------------------------
  // CLEAR CART
  // --------------------------------------------------

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // --------------------------------------------------
  // WISHLIST
  // --------------------------------------------------

  const toggleWishlist = (
    productId: number | string
  ) => {
    setWishlist((prev) => {
      const exists =
        prev.includes(productId);

      if (exists) {
        showToast(
          "Removed from wishlist"
        );

        return prev.filter(
          (id) => id !== productId
        );
      }

      showToast("Saved to wishlist");

      return [
        ...prev,
        productId,
      ];
    });
  };

  // --------------------------------------------------
  // CHECK WISHLIST
  // --------------------------------------------------

  const isInWishlist = (
    productId: number | string
  ) => {
    return wishlist.includes(productId);
  };

  // --------------------------------------------------
  // CART CALCULATIONS
  // --------------------------------------------------

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const deliveryFee =
    subtotal === 0 ||
    subtotal >=
      FREE_SHIPPING_THRESHOLD
      ? 0
      : 49;

  const totalAmount = Math.max(
    0,
    subtotal -
      couponDiscount +
      deliveryFee
  );

  // --------------------------------------------------
  // APPLY COUPON
  // --------------------------------------------------

  const applyCoupon = async (
    code: string
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const res = await fetch(
        "/api/coupons/validate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            code,
            subtotal,
          }),
        }
      );

      const data =
        await res.json();

      if (data.valid) {
        setAppliedCoupon(
          data.coupon || {
            id: 1,
            code: code.toUpperCase(),
            discountType:
              "percentage",
            discountValue: 10,
            minOrderValue: 499,
            maxDiscount: 500,
            description:
              data.message,
            isActive: true,
          }
        );

        setCouponDiscount(
          data.discount
        );

        showToast(
          data.message
        );

        return {
          success: true,
          message: data.message,
        };
      }

      return {
        success: false,
        message:
          data.message ||
          "Invalid coupon code",
      };
    } catch {
      return {
        success: false,
        message:
          "Error validating coupon code.",
      };
    }
  };

  // --------------------------------------------------
  // REMOVE COUPON
  // --------------------------------------------------

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast("Coupon removed");
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,

        subtotal,
        itemCount,

        isCartOpen,
        openCart: () =>
          setIsCartOpen(true),
        closeCart: () =>
          setIsCartOpen(false),

        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,

        deliveryFee,
        totalAmount,
        freeShippingThreshold:
          FREE_SHIPPING_THRESHOLD,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount:
          wishlist.length,

        pincode,
        deliveryCity,
        customerRegion,
        setPincode,

        quickViewProduct,
        openQuickView: (product) =>
          setQuickViewProduct(product),
        closeQuickView: () =>
          setQuickViewProduct(null),

        isB2BModalOpen,
        openB2BModal: () =>
          setIsB2BModalOpen(true),
        closeB2BModal: () =>
          setIsB2BModalOpen(false),

        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// --------------------------------------------------
// useStore HOOK
// --------------------------------------------------

export function useStore() {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used within a StoreProvider"
    );
  }

  return context;
}