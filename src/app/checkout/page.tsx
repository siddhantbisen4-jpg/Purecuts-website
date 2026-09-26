"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  Lock,
  UserRound,
  CheckCircle2,
  Banknote,
  QrCode,
  ArrowRight,
} from "lucide-react";

type CustomerType = "SALON_OWNER" | "GUEST";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  salonName: string;
  gstNumber: string;
  udyamNumber: string;
  paymentMethod: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  salonName: "",
  gstNumber: "",
  udyamNumber: "",
  paymentMethod: "COD",
};

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    subtotal,
    couponDiscount,
    appliedCoupon,
    deliveryFee,
    totalAmount,
    pincode,
    deliveryCity,
    clearCart,
  } = useStore();

  const [customerType, setCustomerType] =
    useState<CustomerType | null>(null);

  const [formData, setFormData] =
    useState<FormData>(EMPTY_FORM);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState("");

  /*
   * Load saved salon information.
   *
   * This is used only for Salon Owner checkout.
   * GST / UDYAM information is collected once
   * and reused on future checkouts.
   */
  useEffect(() => {
    try {
      const savedSalonProfile =
        localStorage.getItem("purecuts_salon_profile");

      if (savedSalonProfile) {
        const saved = JSON.parse(savedSalonProfile);

        setFormData((previous) => ({
          ...previous,
          ...saved,
          pincode: pincode || saved.pincode || "",
          city:
            deliveryCity?.split(",")[0] ||
            saved.city ||
            "",
          state:
            saved.state ||
            "",
        }));
      } else {
        setFormData((previous) => ({
          ...previous,
          pincode: pincode || "",
          city: deliveryCity?.split(",")[0] || "",
        }));
      }
    } catch (error) {
      console.error(
        "Failed to load salon profile:",
        error
      );
    }
  }, [pincode, deliveryCity]);

  /*
   * Empty cart
   */
  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-slate-100/60 py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm">

          <h1 className="text-xl font-bold text-slate-900 mb-2">
            No items to checkout
          </h1>

          <p className="text-xs text-slate-500 mb-6">
            Your cart is currently empty.
          </p>

          <Link
            href="/category/all"
            className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl inline-block"
          >
            Go to Shop
          </Link>

        </div>
      </main>
    );
  }

  /*
   * Update form field
   */
  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Select checkout type
   */
  const handleCustomerTypeSelect = (
    type: CustomerType
  ) => {
    setCustomerType(type);
    setErrorMsg("");

    if (type === "GUEST") {
      setFormData((previous) => ({
        ...previous,
        salonName: "",
        gstNumber: "",
        udyamNumber: "",
      }));
    }
  };

  /*
   * Place order
   */
  const handlePlaceOrder = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMsg("");

    /*
     * Safety check
     */
    if (!customerType) {
      setErrorMsg(
        "Please select Salon Owner or Guest."
      );
      return;
    }

    /*
     * Salon Owner validation
     *
     * At least one of GSTIN or UDYAM is required.
     */
    if (
      customerType === "SALON_OWNER" &&
      !formData.gstNumber.trim() &&
      !formData.udyamNumber.trim()
    ) {
      setErrorMsg(
        "Salon Owner checkout requires either a GSTIN or UDYAM number."
      );
      return;
    }

    /*
     * Save salon profile for future checkout.
     */
    if (customerType === "SALON_OWNER") {
      try {
        localStorage.setItem(
          "purecuts_salon_profile",
          JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            salonName: formData.salonName,
            gstNumber: formData.gstNumber,
            udyamNumber: formData.udyamNumber,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          })
        );
      } catch { }
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerType,

        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,

        salonName:
          customerType === "SALON_OWNER"
            ? formData.salonName || undefined
            : undefined,

        gstNumber:
          customerType === "SALON_OWNER"
            ? formData.gstNumber || undefined
            : undefined,

        udyamNumber:
          customerType === "SALON_OWNER"
            ? formData.udyamNumber || undefined
            : undefined,

        addressLine: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        subtotal,
        discount: couponDiscount,
        couponCode:
          appliedCoupon?.code,

        deliveryFee,
        totalAmount,

        paymentMethod:
          formData.paymentMethod,

        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          volumeSize: item.volumeSize,
        })),
      };

      const response = await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            orderPayload
          ),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
          "Failed to place order."
        );
      }

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            y: 0.6,
          },
        });
      } catch { }

      clearCart();

      router.push(
        `/order-success?orderNumber=${data.order.orderNumber}`
      );
    } catch (error) {
      console.error(
        "Order submit error:",
        error
      );

      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * Checkout type selection screen
   */
  if (!customerType) {
    return (
      <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">

        <div className="max-w-5xl mx-auto">

          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link
              href="/"
              className="hover:text-amber-600 font-medium"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/cart"
              className="hover:text-amber-600 font-medium"
            >
              Cart
            </Link>

            <span>/</span>

            <span className="text-slate-800 font-bold">
              Checkout
            </span>
          </nav>

          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-8">

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#795BCB] text-white mb-4">
                <Truck className="w-7 h-7" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                How would you like to checkout?
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                Choose the option that matches your
                purchase.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Salon Owner */}
              <button
                type="button"
                onClick={() =>
                  handleCustomerTypeSelect(
                    "SALON_OWNER"
                  )
                }
                className="group text-left bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#795BCB] hover:shadow-lg transition"
              >

                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-[#795BCB] text-white flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#795BCB] transition" />

                </div>

                <h2 className="text-lg font-black text-slate-900 mt-5">
                  Salon Owner
                </h2>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  For salon owners and professional
                  buyers. Add your salon address and
                  GSTIN or UDYAM details.
                </p>

                <div className="mt-5 space-y-2">

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Salon/business details
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    GSTIN or UDYAM
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Address saved for future orders
                  </div>

                </div>

              </button>

              {/* Guest */}
              <button
                type="button"
                onClick={() =>
                  handleCustomerTypeSelect(
                    "GUEST"
                  )
                }
                className="group text-left bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#795BCB] hover:shadow-lg transition"
              >

                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-[#795BCB] text-white flex items-center justify-center">
                    <UserRound className="w-6 h-6" />
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition" />

                </div>

                <h2 className="text-lg font-black text-slate-900 mt-5">
                  Guest
                </h2>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Quick checkout without creating a
                  salon profile. Enter your email and
                  delivery address.
                </p>

                <div className="mt-5 space-y-2">

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Email address
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Delivery address
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    No GST / UDYAM required
                  </div>

                </div>

              </button>

            </div>

            {errorMsg && (
              <p className="mt-5 text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl text-center">
                {errorMsg}
              </p>
            )}

          </div>
        </div>
      </main>
    );
  }

  /*
   * Actual checkout form
   */
  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">

          <Link
            href="/"
            className="hover:text-amber-600 font-medium"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/cart"
            className="hover:text-amber-600 font-medium"
          >
            Cart
          </Link>

          <span>/</span>

          <span className="text-slate-800 font-bold">
            Checkout
          </span>

        </nav>

        {/* Selected checkout type */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-white text-amber-700 flex items-center justify-center">

              {customerType ===
                "SALON_OWNER" ? (
                <Building2 className="w-5 h-5 text-[#795BCB]" />
              ) : (
                <UserRound className="w-5 h-5 " />
              )}

            </div>

            <div>

              <p className="text-[10px] uppercase font-bold text-slate-400">
                Checkout as
              </p>

              <p className="text-sm font-black text-slate-900">
                {customerType ===
                  "SALON_OWNER"
                  ? "Salon Owner"
                  : "Guest"}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setCustomerType(null)
            }
            className="text-xs font-bold text-[#795BCB] hover:underline"
          >
            Change
          </button>

        </div>

        <form
          onSubmit={handlePlaceOrder}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT */}
            <div className="lg:col-span-8 space-y-6">

              {/* Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">

                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">

                  <Truck className="w-5 h-5 text-[#795BCB]" />

                  <h2 className="text-base font-black text-slate-900">
                    1. Delivery Address
                  </h2>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>

                    <input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>

                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value
                        )
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                      placeholder="9876543210"
                    />
                  </div>

                </div>

                {/* Guest Email */}
                {customerType ===
                  "GUEST" && (
                    <div>

                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateField(
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                        placeholder="yourname@example.com"
                      />

                    </div>
                  )}

                {/* Salon email */}
                {customerType ===
                  "SALON_OWNER" && (
                    <div>

                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Email *
                      </label>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateField(
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                        placeholder="salon@example.com"
                      />

                    </div>
                  )}

                <div>

                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Address *
                  </label>

                  <textarea
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 resize-none"
                    placeholder="House / Shop / Salon address"
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  <input
                    required
                    value={formData.city}
                    onChange={(e) =>
                      updateField(
                        "city",
                        e.target.value
                      )
                    }
                    placeholder="City"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                  />

                  <input
                    required
                    value={formData.state}
                    onChange={(e) =>
                      updateField(
                        "state",
                        e.target.value
                      )
                    }
                    placeholder="State"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                  />

                  <input
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="Pincode"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                  />

                </div>

              </div>

              {/* SALON OWNER ONLY */}
              {customerType ===
                "SALON_OWNER" && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">

                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">

                      <Building2 className="w-5 h-5 text-[#795BCB]" />

                      <div>

                        <h2 className="text-base font-black text-slate-900">
                          2. Salon Business Details
                        </h2>

                        <p className="text-[11px] text-slate-500">
                          Add GSTIN or UDYAM once for
                          your salon profile.
                        </p>

                      </div>

                    </div>

                    <div>

                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Salon / Business Name
                      </label>

                      <input
                        value={formData.salonName}
                        onChange={(e) =>
                          updateField(
                            "salonName",
                            e.target.value
                          )
                        }
                        placeholder="Your salon name"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300"
                      />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>

                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          GSTIN
                        </label>

                        <input
                          value={formData.gstNumber}
                          onChange={(e) =>
                            updateField(
                              "gstNumber",
                              e.target.value.toUpperCase()
                            )
                          }
                          placeholder="27AAAAA0000A1Z5"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 uppercase font-bold"
                        />

                      </div>

                      <div>

                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          UDYAM Number
                        </label>

                        <input
                          value={formData.udyamNumber}
                          onChange={(e) =>
                            updateField(
                              "udyamNumber",
                              e.target.value.toUpperCase()
                            )
                          }
                          placeholder="UDYAM-XX-00-0000000"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 uppercase font-bold"
                        />

                      </div>

                    </div>

                    <div className="bg-[#795BCB] border border-[#795BCB] rounded-xl p-3 text-xs text-white">
                      Enter at least one: <strong>GSTIN</strong> or{" "}
                      <strong>UDYAM Number</strong>.
                    </div>

                  </div>
                )}

              {/* PAYMENT */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">

                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">

                  <CreditCard className="w-5 h-5 text-[#795BCB]" />

                  <h2 className="text-base font-black text-slate-900">
                    {customerType ===
                      "SALON_OWNER"
                      ? "3"
                      : "2"}. Payment Method
                  </h2>

                </div>

                <div className="space-y-3">

                  {/* COD */}
                  <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer ${formData.paymentMethod === "COD"
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200"
                    }`}>

                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={
                        formData.paymentMethod ===
                        "COD"
                      }
                      onChange={() =>
                        updateField(
                          "paymentMethod",
                          "COD"
                        )
                      }
                    />

                    <Banknote className="w-5 h-5 text-emerald-600" />

                    <div>
                      <p className="text-xs font-bold">
                        Cash on Delivery
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                  </label>

                  {/* UPI */}
                  <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer ${formData.paymentMethod === "UPI"
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200"
                    }`}>

                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={
                        formData.paymentMethod ===
                        "UPI"
                      }
                      onChange={() =>
                        updateField(
                          "paymentMethod",
                          "UPI"
                        )
                      }
                    />

                    <QrCode className="w-5 h-5 text-blue-600" />

                    <div>
                      <p className="text-xs font-bold">
                        UPI
                      </p>

                      <p className="text-[11px] text-slate-500">
                        GPay, PhonePe, Paytm and other UPI apps.
                      </p>
                    </div>

                  </label>

                  {/* CARD */}
                  <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer ${formData.paymentMethod === "CARD"
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200"
                    }`}>

                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={
                        formData.paymentMethod ===
                        "CARD"
                      }
                      onChange={() =>
                        updateField(
                          "paymentMethod",
                          "CARD"
                        )
                      }
                    />

                    <CreditCard className="w-5 h-5 text-purple-600" />

                    <div>
                      <p className="text-xs font-bold">
                        Card / NetBanking
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Debit card, credit card and net banking.
                      </p>
                    </div>

                  </label>

                </div>

              </div>

            </div>

            {/* RIGHT - ORDER SUMMARY */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 sticky top-28">

              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="max-h-56 overflow-y-auto space-y-3">

                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 items-center"
                  >

                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1"
                    />

                    <div className="flex-1 min-w-0">

                      <p className="text-xs font-semibold truncate">
                        {item.name}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <span className="text-xs font-bold">
                      ₹{(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>
                ))}

              </div>

              <div className="space-y-2 text-xs border-t border-slate-200 pt-4">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <strong>
                      -₹{couponDiscount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <strong>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </strong>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-black">

                  <span>Total</span>

                  <span className="text-amber-600">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {errorMsg && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#795BCB] hover:bg-[#795BCB] text-white font-black rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
              >

                <Lock className="w-4 h-4" />

                {isSubmitting
                  ? "Placing Order..."
                  : "Confirm & Place Order"}

              </button>

              <div className="flex justify-center items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Secure Checkout
              </div>

            </div>

          </div>
        </form>

      </div>

    </main>
  );
}