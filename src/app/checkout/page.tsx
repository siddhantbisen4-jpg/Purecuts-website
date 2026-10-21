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
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  FileText,
} from "lucide-react";
import { State, City } from "country-state-city";

type CustomerType = "SALON_OWNER" | "LOCAL_CUSTOMER";

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

// Regex validators
const NAME_REGEX = /^[a-zA-Z\s'-]{2,50}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PINCODE_REGEX = /^\d{6}$/;
const CITY_STATE_REGEX = /^[a-zA-Z\s]{2,40}$/;
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const UDYAM_REGEX = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;

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

  const [customerType, setCustomerType] = useState<CustomerType | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /*
   * Load saved profile information.
   * Checks both purecuts_salon_profile and purecuts_user from login/registration.
   */
  useEffect(() => {
    try {
      const savedSalonProfile = localStorage.getItem("purecuts_salon_profile");
      const savedUser = localStorage.getItem("purecuts_user");

      let prefill: Partial<FormData> = {};

      if (savedSalonProfile) {
        try {
          prefill = { ...prefill, ...JSON.parse(savedSalonProfile) };
        } catch { }
      }

      if (savedUser) {
        try {
          const userObj = JSON.parse(savedUser);
          prefill = {
            ...prefill,
            name: userObj.name || prefill.name || "",
            email: userObj.email || prefill.email || "",
            phone: userObj.phone || prefill.phone || "",
            salonName: userObj.salonName || prefill.salonName || "",
            gstNumber: userObj.gstNumber || prefill.gstNumber || "",
            udyamNumber: userObj.udyamNumber || prefill.udyamNumber || "",
            address: userObj.address || prefill.address || "",
            city: userObj.city || prefill.city || "",
            state: userObj.state || prefill.state || "",
            pincode: userObj.pincode || prefill.pincode || "",
          };

          if (userObj.accountType === "salon_owner" && !customerType) {
            setCustomerType("SALON_OWNER");
          } else if (userObj.accountType === "local_customer" && !customerType) {
            setCustomerType("LOCAL_CUSTOMER");
          }
        } catch { }
      }

      setFormData((previous) => ({
        ...previous,
        ...prefill,
        pincode: pincode || prefill.pincode || previous.pincode || "",
        city: deliveryCity?.split(",")[0] || prefill.city || previous.city || "",
      }));
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  }, [pincode, deliveryCity]);

  /*
   * Validate a single field
   */
  const validateSingleField = (
    field: keyof FormData,
    value: string,
    currentType: CustomerType | null = customerType
  ): string => {
    switch (field) {
      case "name": {
        const val = value.trim();
        if (!val) return "Full Name is required.";
        if (val.length < 2) return "Name must be at least 2 characters.";
        if (!NAME_REGEX.test(val)) return "Name can only contain letters and spaces.";
        return "";
      }
      case "phone": {
        const val = value.replace(/\D/g, "");
        if (!val) return "Phone number is required.";
        if (val.length !== 10) return "Phone number must be exactly 10 digits.";
        if (!/^[6-9]/.test(val)) return "Must be a valid Indian mobile starting with 6, 7, 8, or 9.";
        return "";
      }
      case "email": {
        const val = value.trim();
        if (!val) return "Email address is required.";
        if (!EMAIL_REGEX.test(val)) return "Please enter a valid email (e.g. name@example.com).";
        return "";
      }
      case "address": {
        const val = value.trim();
        if (!val) return "Delivery address is required.";
        if (val.length < 5) return "Please enter a complete address (minimum 5 characters).";
        return "";
      }
      case "city": {
        const val = value.trim();
        if (!val) return "City is required.";
        if (!CITY_STATE_REGEX.test(val)) return "City must contain only letters (min 2 chars).";
        return "";
      }
      case "state": {
        const val = value.trim();
        if (!val) return "State is required.";
        if (!CITY_STATE_REGEX.test(val)) return "State must contain only letters (min 2 chars).";
        return "";
      }
      case "pincode": {
        const val = value.replace(/\D/g, "");
        if (!val) return "Pincode is required.";
        if (val.length !== 6) return "Pincode must be exactly 6 digits.";
        return "";
      }
      case "salonName": {
        if (currentType === "SALON_OWNER") {
          const val = value.trim();
          if (!val) return "Salon / Business Name is required for Salon Owner.";
          if (val.length < 2) return "Salon Name must be at least 2 characters.";
        }
        return "";
      }
      case "gstNumber": {
        if (currentType === "SALON_OWNER") {
          const val = value.trim().toUpperCase();
          if (val && val.length !== 15) {
            return "GSTIN must be 15 alphanumeric characters (e.g. 27AAAAA0000A1Z5).";
          }
        }
        return "";
      }
      case "udyamNumber": {
        if (currentType === "SALON_OWNER") {
          const val = value.trim().toUpperCase();
          if (val && !UDYAM_REGEX.test(val) && val.length < 12) {
            return "UDYAM format: UDYAM-XX-00-0000000.";
          }
        }
        return "";
      }
      default:
        return "";
    }
  };

  /*
   * Validate entire form
   */
  const validateEntireForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    const nameErr = validateSingleField("name", formData.name);
    if (nameErr) errors.name = nameErr;

    const phoneErr = validateSingleField("phone", formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    const emailErr = validateSingleField("email", formData.email);
    if (emailErr) errors.email = emailErr;

    const addressErr = validateSingleField("address", formData.address);
    if (addressErr) errors.address = addressErr;

    const cityErr = validateSingleField("city", formData.city);
    if (cityErr) errors.city = cityErr;

    const stateErr = validateSingleField("state", formData.state);
    if (stateErr) errors.state = stateErr;

    const pincodeErr = validateSingleField("pincode", formData.pincode);
    if (pincodeErr) errors.pincode = pincodeErr;

    if (customerType === "SALON_OWNER") {
      const salonErr = validateSingleField("salonName", formData.salonName);
      if (salonErr) errors.salonName = salonErr;

      const gstErr = validateSingleField("gstNumber", formData.gstNumber);
      if (gstErr) errors.gstNumber = gstErr;

      const udyamErr = validateSingleField("udyamNumber", formData.udyamNumber);
      if (udyamErr) errors.udyamNumber = udyamErr;

      // At least one of GSTIN or UDYAM is strictly required for Salon Owner
      if (!formData.gstNumber.trim() && !formData.udyamNumber.trim()) {
        errors.businessCred = "Salon Owner checkout requires at least one credential: GSTIN or UDYAM.";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  /*
   * Mark field touched on blur and run validation
   */
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateSingleField(field, formData[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  /*
   * Update form field with real-time sanitation according to required behavior
   */
  const handleFieldChange = (field: keyof FormData, rawValue: string) => {
    let sanitizedValue = rawValue;

    switch (field) {
      case "name":
        // Only letters, spaces, hyphens and apostrophes allowed. No digits or symbols.
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z\s'-]/g, "")
          .replace(/^\s+/, "")
          .replace(/\s{2,}/g, " ")
          .slice(0, 50);
        break;

      case "phone":
        // Only numbers allowed, strictly capped at 10 digits
        sanitizedValue = rawValue.replace(/\D/g, "").slice(0, 10);
        break;

      case "email":
        // No spaces allowed, convert to lowercase
        sanitizedValue = rawValue.replace(/\s/g, "").toLowerCase().slice(0, 80);
        break;

      case "city":
        // Letters and spaces only, no numbers or symbols
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z\s]/g, "")
          .replace(/^\s+/, "")
          .replace(/\s{2,}/g, " ")
          .slice(0, 40);
        break;

      case "state":
        // Letters and spaces only, no numbers or symbols
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z\s]/g, "")
          .replace(/^\s+/, "")
          .replace(/\s{2,}/g, " ")
          .slice(0, 40);
        break;

      case "pincode":
        // Only digits allowed, max 6
        sanitizedValue = rawValue.replace(/\D/g, "").slice(0, 6);
        break;

      case "salonName":
        // Letters, numbers, spaces, and standard business punctuation (&, ., ', -, ,)
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z0-9\s&'.,-]/g, "")
          .replace(/^\s+/, "")
          .replace(/\s{2,}/g, " ")
          .slice(0, 80);
        break;

      case "gstNumber":
        // Uppercase alphanumeric only, max 15
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z0-9]/g, "")
          .toUpperCase()
          .slice(0, 15);
        break;

      case "udyamNumber":
        // Uppercase alphanumeric and hyphens only, max 19
        sanitizedValue = rawValue
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toUpperCase()
          .slice(0, 19);
        break;

      case "address":
        sanitizedValue = rawValue.slice(0, 250);
        break;

      default:
        sanitizedValue = rawValue;
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    // Revalidate field if already touched
    if (touched[field]) {
      const error = validateSingleField(field, sanitizedValue);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }

    // Clear top error message once user types
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  /*
   * Select checkout type
   */
  const handleCustomerTypeSelect = (type: CustomerType) => {
    setCustomerType(type);
    setErrorMsg("");
    setTouched({});
    setFieldErrors({});

    if (type === "LOCAL_CUSTOMER") {
      setFormData((previous) => ({
        ...previous,
        salonName: "",
        gstNumber: "",
        udyamNumber: "",
      }));
    }
  };

  /*
   * Empty cart view
   */
  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-slate-100/60 py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#795BCB]/10 text-[#795BCB] flex items-center justify-center mx-auto mb-4">
            <Truck className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            No items in your cart
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            Your shopping cart is currently empty. Add products to proceed with checkout.
          </p>
          <Link
            href="/category/all"
            className="px-6 py-3 bg-[#795BCB] hover:bg-[#6246B0] text-white font-bold text-xs rounded-xl inline-block shadow-md transition"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  /*
   * Place order handler
   */
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!customerType) {
      setErrorMsg("Please select whether you are a Salon Owner or Local Customer.");
      return;
    }

    // Mark all fields as touched to display validation indicators
    const allTouched: Record<string, boolean> = {
      name: true,
      phone: true,
      email: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
    };

    if (customerType === "SALON_OWNER") {
      allTouched.salonName = true;
      allTouched.gstNumber = true;
      allTouched.udyamNumber = true;
      allTouched.businessCred = true;
    }

    setTouched(allTouched);

    const { isValid, errors } = validateEntireForm();
    setFieldErrors(errors);

    if (!isValid) {
      const firstError = Object.values(errors)[0];
      setErrorMsg(firstError || "Please fill in all required fields properly.");
      return;
    }

    // Save salon profile for future checkout
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
        customerType: customerType === "SALON_OWNER" ? "SALON_OWNER" : "LOCAL_CUSTOMER",
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        salonName: customerType === "SALON_OWNER" ? formData.salonName.trim() || undefined : undefined,
        gstNumber: customerType === "SALON_OWNER" ? formData.gstNumber.trim() || undefined : undefined,
        udyamNumber: customerType === "SALON_OWNER" ? formData.udyamNumber.trim() || undefined : undefined,
        addressLine: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        subtotal,
        discount: couponDiscount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        totalAmount,
        paymentMethod: formData.paymentMethod,
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

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to place order.");
      }

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch { }

      clearCart();
      router.push(`/order-success?orderNumber=${data.order.orderNumber}`);
    } catch (error) {
      console.error("Order submit error:", error);
      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please check all details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * Step 1: Customer Type Selection Screen (Salon Owner vs Local Customer)
   */
  if (!customerType) {
    return (
      <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#795BCB] font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-[#795BCB] font-medium">
              Cart
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Checkout</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#795BCB] text-white mb-4 shadow-md shadow-[#795BCB]/20">
                <Truck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                How would you like to checkout?
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Choose the option that matches your purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Option 1: Salon Owner */}
              <button
                type="button"
                onClick={() => handleCustomerTypeSelect("SALON_OWNER")}
                className="group text-left bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#795BCB] hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#795BCB] text-white flex items-center justify-center shadow-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#795BCB] group-hover:translate-x-1 transition" />
                </div>



                <h2 className="text-lg font-black text-slate-900 mt-2">
                  Salon Owner
                </h2>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  For salon owners, spas, parlours & professional stylists. Add your salon details and GSTIN or UDYAM number for business invoicing.
                </p>

                <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Salon / Business name</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>GSTIN or UDYAM verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Address saved for repeat business orders</span>
                  </div>
                </div>
              </button>

              {/* Option 2: Local Customer */}
              <button
                type="button"
                onClick={() => handleCustomerTypeSelect("LOCAL_CUSTOMER")}
                className="group text-left bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#795BCB] hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#795BCB] text-white flex items-center justify-center shadow-sm">
                    <UserRound className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#795BCB] group-hover:translate-x-1 transition" />
                </div>


                <h2 className="text-lg font-black text-slate-900 mt-2">
                  Local Customer
                </h2>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Quick and simple checkout for personal and home grooming care. Enter your contact details and delivery address.
                </p>

                <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full name & 10-digit mobile number</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct home / local delivery address</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No GST or business registration required</span>
                  </div>
                </div>
              </button>
            </div>

            {errorMsg && (
              <p className="mt-5 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl text-center">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  /*
   * Step 2: Form screen for selected account type (Salon Owner or Local Customer)
   */
  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#795BCB] font-medium">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#795BCB] font-medium">
            Cart
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Checkout</span>
        </nav>

        {/* Selected Customer Type Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${customerType === "SALON_OWNER"
              ? "bg-[#795BCB] text-white"
              : "bg-[#795BCB] text-white"
              }`}>
              {customerType === "SALON_OWNER" ? (
                <Building2 className="w-5 h-5" />
              ) : (
                <UserRound className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Checking out as
              </p>
              <p className="text-sm font-black text-slate-900">
                {customerType === "SALON_OWNER"
                  ? "Salon Owner "
                  : "Local Customer "}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setCustomerType(null);
              setErrorMsg("");
            }}
            className="text-xs font-bold text-[#795BCB] hover:underline px-3 py-1.5 rounded-lg border border-[#795BCB]/30 hover:bg-[#795BCB]/5 transition"
          >
            Switch Account Type
          </button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN - FORM SECTIONS */}
            <div className="lg:col-span-8 space-y-6">
              {/* SECTION 1: Personal & Delivery Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#795BCB]" />
                    <h2 className="text-base font-black text-slate-900">
                      1. Delivery Address & Contact
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    * Required fields
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <UserRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        maxLength={50}
                        required
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.name && fieldErrors.name
                          ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                          }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 px-1">

                      {touched.name && fieldErrors.name && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PHONE NUMBER */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        required
                        value={formData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.phone && fieldErrors.phone
                          ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                          }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 px-1">
                      <span className="text-[10px] text-slate-400">
                        Numbers only ({formData.phone.length}/10)
                      </span>
                      {touched.phone && fieldErrors.phone && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {customerType === "SALON_OWNER" ? "Business Email" : "Email Address"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      maxLength={80}
                      required
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder={
                        customerType === "SALON_OWNER"
                          ? "salon@example.com"
                          : "yourname@example.com"
                      }
                      className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.email && fieldErrors.email
                        ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                        }`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 px-1">
                    <span className="text-[10px] text-slate-400">
                      Format: name@domain.com (no spaces)
                    </span>
                    {touched.email && fieldErrors.email && (
                      <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* DELIVERY ADDRESS */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {customerType === "SALON_OWNER"
                      ? "Salon / Commercial Address"
                      : "Delivery Address"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    autoComplete="street-address"
                    maxLength={250}
                    required
                    value={formData.address}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                    placeholder={
                      customerType === "SALON_OWNER"
                        ? "Shop / Unit No., Building, Street name, Area or Landmark"
                        : "House / Flat / Building No., Street name, Area or Landmark"
                    }
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border resize-none transition outline-hidden ${touched.address && fieldErrors.address
                      ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                      }`}
                  />
                  <div className="flex items-center justify-between mt-1 px-1">
                    <span className="text-[10px] text-slate-400">
                      Street, building & landmark ({formData.address.length}/250)
                    </span>
                    {touched.address && fieldErrors.address && (
                      <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {fieldErrors.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* CITY, STATE, PINCODE */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* CITY */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      maxLength={40}
                      required
                      value={formData.city}
                      onChange={(e) => handleFieldChange("city", e.target.value)}
                      onBlur={() => handleBlur("city")}
                      placeholder="e.g. Pune"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.city && fieldErrors.city
                        ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                        }`}
                    />
                    <div className="flex items-center justify-between mt-1 px-1">

                      {touched.city && fieldErrors.city && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.city}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STATE */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      autoComplete="address-level1"
                      maxLength={40}
                      required
                      value={formData.state}
                      onChange={(e) => handleFieldChange("state", e.target.value)}
                      onBlur={() => handleBlur("state")}
                      placeholder="e.g. Maharashtra"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.state && fieldErrors.state
                        ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                        }`}
                    />
                    <div className="flex items-center justify-between mt-1 px-1">
                      <span className="text-[10px] text-slate-400">Letters only</span>
                      {touched.state && fieldErrors.state && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.state}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PINCODE */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pincode <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={(e) => handleFieldChange("pincode", e.target.value)}
                      onBlur={() => handleBlur("pincode")}
                      placeholder="6 digits"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border font-bold transition outline-hidden ${touched.pincode && fieldErrors.pincode
                        ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                        }`}
                    />
                    <div className="flex items-center justify-between mt-1 px-1">
                      <span className="text-[10px] text-slate-400">
                        6 digits ({formData.pincode.length}/6)
                      </span>
                      {touched.pincode && fieldErrors.pincode && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.pincode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: SALON OWNER BUSINESS DETAILS (Only for Salon Owner) */}
              {customerType === "SALON_OWNER" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#795BCB]" />
                      <div>
                        <h2 className="text-base font-black text-slate-900">
                          2. Salon Business Credentials
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Add your business name and GSTIN or UDYAM for business invoice.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SALON NAME */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Salon / Business Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="salonName"
                        autoComplete="organization"
                        maxLength={80}
                        required
                        value={formData.salonName}
                        onChange={(e) => handleFieldChange("salonName", e.target.value)}
                        onBlur={() => handleBlur("salonName")}
                        placeholder="e.g. Aura Unisex Salon & Spa"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border transition outline-hidden ${touched.salonName && fieldErrors.salonName
                          ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                          }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 px-1">
                      <span className="text-[10px] text-slate-400">
                        Your registered salon, parlour or spa name
                      </span>
                      {touched.salonName && fieldErrors.salonName && (
                        <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.salonName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* GSTIN & UDYAM */}
                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* GSTIN */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          GSTIN <span className="text-slate-400 font-normal">(Optional if UDYAM is provided)</span>
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="gstNumber"
                            maxLength={15}
                            value={formData.gstNumber}
                            onChange={(e) => handleFieldChange("gstNumber", e.target.value)}
                            onBlur={() => handleBlur("gstNumber")}
                            placeholder="e.g. 27AAAAA0000A1Z5"
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border uppercase font-bold transition outline-hidden ${touched.gstNumber && fieldErrors.gstNumber
                              ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                              : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                              }`}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1 px-1">
                          <span className="text-[10px] text-slate-400">
                            15 alphanumeric chars ({formData.gstNumber.length}/15)
                          </span>
                          {touched.gstNumber && fieldErrors.gstNumber && (
                            <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {fieldErrors.gstNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Mobile OR Divider */}
                      <div className="flex sm:hidden items-center gap-3 my-1">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                          OR
                        </span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                      </div>

                      {/* UDYAM */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          UDYAM Number <span className="text-slate-400 font-normal">(Optional if GSTIN is provided)</span>
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="udyamNumber"
                            maxLength={19}
                            value={formData.udyamNumber}
                            onChange={(e) => handleFieldChange("udyamNumber", e.target.value)}
                            onBlur={() => handleBlur("udyamNumber")}
                            placeholder="UDYAM-XX-00-0000000"
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border uppercase font-bold transition outline-hidden ${touched.udyamNumber && fieldErrors.udyamNumber
                              ? "border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200"
                              : "border-slate-300 focus:border-[#795BCB] focus:ring-2 focus:ring-[#795BCB]/20"
                              }`}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1 px-1">
                          <span className="text-[10px] text-slate-400">
                            Format: UDYAM-XX-00-0000000
                          </span>
                          {touched.udyamNumber && fieldErrors.udyamNumber && (
                            <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {fieldErrors.udyamNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Floating OR Badge */}
                    <div className="hidden sm:flex absolute left-1/2 top-[39px] -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-[10px] font-black text-slate-700 uppercase tracking-wider">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Credential Note Banner */}
                  <div className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 transition ${touched.businessCred && fieldErrors.businessCred
                    ? "bg-rose-50 border border-rose-200 text-rose-800"
                    : "bg-[#795BCB]/10 border border-[#795BCB]/20 text-slate-800"
                    }`}>
                    <AlertCircle className={`w-4 h-4 shrink-0 ${touched.businessCred && fieldErrors.businessCred
                      ? "text-rose-600"
                      : "text-[#795BCB]"
                      }`} />
                    <span>
                      At least one business identification is required:{" "}
                      <strong>GSTIN</strong> or <strong>UDYAM Number</strong> for verification and B2B invoice generation.
                    </span>
                  </div>
                </div>
              )}

              {/* SECTION: PAYMENT METHOD */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <CreditCard className="w-5 h-5 text-[#795BCB]" />
                  <h2 className="text-base font-black text-slate-900">
                    {customerType === "SALON_OWNER" ? "3" : "2"}. Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${formData.paymentMethod === "COD"
                      ? "border-[#795BCB] bg-[#795BCB]/5"
                      : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => handleFieldChange("paymentMethod", "COD")}
                      className="accent-[#795BCB]"
                    />
                    <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-slate-500">Pay cash or scan QR when your package arrives at your doorstep.</p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${formData.paymentMethod === "UPI"
                      ? "border-[#795BCB] bg-[#795BCB]/5"
                      : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={() => handleFieldChange("paymentMethod", "UPI")}
                      className="accent-[#795BCB]"
                    />
                    <QrCode className="w-5 h-5 text-blue-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">Instant UPI Payment</p>
                      <p className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM and all banking UPI apps.</p>
                    </div>
                  </label>

                  {/* CARD */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${formData.paymentMethod === "CARD"
                      ? "border-[#795BCB] bg-[#795BCB]/5"
                      : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === "CARD"}
                      onChange={() => handleFieldChange("paymentMethod", "CARD")}
                      className="accent-[#795BCB]"
                    />
                    <CreditCard className="w-5 h-5 text-purple-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">Credit / Debit Card & NetBanking</p>
                      <p className="text-[11px] text-slate-500">All major Indian banks and Visa, MasterCard, RuPay cards supported.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - ORDER SUMMARY & CONFIRMATION */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">
                  Order Summary
                </h3>
                <span className="text-xs font-bold text-[#795BCB]">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain bg-slate-50 rounded-xl p-1 border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity} {item.volumeSize ? `• ${item.volumeSize}` : ""}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-900 shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs border-t border-slate-200 pt-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong className="text-slate-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <strong>-₹{couponDiscount.toLocaleString("en-IN")}</strong>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <strong className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-slate-900"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </strong>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-black">
                  <span className="text-slate-950">Total Payable</span>
                  <span className="text-[#795BCB] text-lg font-black">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Global Error Notice */}
              {errorMsg && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#795BCB] hover:bg-[#6246B0] text-white font-black rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#795BCB]/25 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Place Order</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Genuine
                </span>
                <span>•</span>
                <span>Verified Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}