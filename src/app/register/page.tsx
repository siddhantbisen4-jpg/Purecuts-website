"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import logo from "../../image/purecuts_logo_no_bg-cropped.png";

type AccountType = "salon_owner" | "local_customer";

export default function RegisterPage() {
  const router = useRouter();

  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    salonName: "",
    gstNumber: "",
    udyamNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    let sanitized = value;

    if (field === "name") {
      // Letters, spaces, hyphens, and apostrophes only. No digits or special symbols.
      sanitized = value
        .replace(/[^a-zA-Z\s'-]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);
    } else if (field === "phone") {
      // Digits only, maximum 10 digits
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "email") {
      // No spaces, lowercase
      sanitized = value.replace(/\s/g, "").toLowerCase().slice(0, 80);
    } else if (field === "city" || field === "state") {
      // Letters and spaces only, no digits or special symbols
      sanitized = value
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 40);
    } else if (field === "pincode") {
      // Digits only, maximum 6 digits
      sanitized = value.replace(/\D/g, "").slice(0, 6);
    } else if (field === "salonName") {
      // Letters, numbers, spaces, and standard business symbols
      sanitized = value
        .replace(/[^a-zA-Z0-9\s&'.,-]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 80);
    } else if (field === "gstNumber") {
      // Uppercase alphanumeric only, max 15
      sanitized = value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 15);
    } else if (field === "udyamNumber") {
      // Uppercase alphanumeric and hyphens only, max 19
      sanitized = value
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toUpperCase()
        .slice(0, 19);
    } else if (field === "address") {
      sanitized = value.slice(0, 250);
    }

    setForm((current) => ({
      ...current,
      [field]: sanitized,
    }));

    setError("");
  };

  // --------------------------------------------------
  // SEND OTP
  // --------------------------------------------------

  const handleSendOtp = () => {
    setError("");
    setSuccess("");

    const phone = form.phone.replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 before sending OTP."
      );
      return;
    }

    // For now this only displays the OTP input.
    // Real SMS OTP API will be connected later.
    setOtpSent(true);
    setOtp("");

    setSuccess("OTP input is ready. SMS OTP service will be connected next.");
  };

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!accountType) {
      setError("Please select Salon Owner or Local Customer.");
      return;
    }

    const nameTrimmed = form.name.trim();
    if (!nameTrimmed) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[a-zA-Z\s'-]{2,50}$/.test(nameTrimmed)) {
      setError("Full name must only contain letters and spaces (minimum 2 characters).");
      return;
    }

    const phoneClean = form.phone.replace(/\D/g, "");
    if (!phoneClean) {
      setError("Please enter your phone number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      setError("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
      return;
    }

    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (accountType === "salon_owner" && !form.salonName.trim()) {
      setError("Please enter your salon or business name.");
      return;
    }

    if (!form.address.trim() || form.address.trim().length < 5) {
      setError("Please enter your full address (minimum 5 characters).");
      return;
    }

    if (!form.city.trim() || !/^[a-zA-Z\s]{2,40}$/.test(form.city.trim())) {
      setError("Please enter a valid city name (letters only).");
      return;
    }

    if (!form.state.trim() || !/^[a-zA-Z\s]{2,40}$/.test(form.state.trim())) {
      setError("Please enter a valid state name (letters only).");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit postal pincode.");
      return;
    }

    if (accountType === "salon_owner") {
      const gstClean = form.gstNumber.trim().toUpperCase();
      const udyamClean = form.udyamNumber.trim().toUpperCase();

      if (gstClean && gstClean.length !== 15) {
        setError("GSTIN must be 15 alphanumeric characters (e.g. 27AAAAA0000A1Z5).");
        return;
      }
      if (udyamClean && !/^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/.test(udyamClean) && udyamClean.length < 12) {
        setError("UDYAM format must be UDYAM-XX-00-0000000.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to create your account.");
      }

      const user = data.user;

      const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        accountType: user.accountType,
        salonName: user.salonName,
        gstNumber: user.gstNumber,
        udyamNumber: user.udyamNumber,
        address: user.addressLine,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        salonMember: user.accountType === "salon_owner",
        signedInAt: new Date().toISOString(),
      };

      localStorage.setItem("purecuts_user", JSON.stringify(session));

      localStorage.setItem("purecuts_pincode", user.pincode);

      window.dispatchEvent(new CustomEvent("purecuts-auth-changed"));

      setSuccess("Your PureCuts account has been created successfully.");

      setTimeout(() => {
        router.push("/account");
      }, 700);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // ACCOUNT TYPE SELECTION
  // --------------------------------------------------

  if (!accountType) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#795BCB]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>

          <div className="bg-white rounded-3xl border border-[#E9E4F7] shadow-[0_20px_70px_rgba(70,45,130,0.10)] p-6 sm:p-10">
            <div className="text-center mb-10">
              <Image
                src={logo}
                alt="PureCuts"
                width={150}
                height={60}
                priority
                className="mx-auto object-contain mb-6"
              />

              <p className="text-sm font-bold text-[#795BCB] uppercase tracking-wider">
                Create your PureCuts account
              </p>

              <h1 className="mt-2 text-3xl font-black text-slate-900">
                Choose your account type
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                Select the option that best describes how you shop with
                PureCuts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Salon Owner */}

              <button
                type="button"
                onClick={() => setAccountType("salon_owner")}
                className="group text-left rounded-3xl border-2 border-slate-200 p-6 transition hover:border-[#795BCB] hover:bg-[#F8F6FE] hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0ECFA] flex items-center justify-center mb-5">
                  <Building2 className="w-7 h-7 text-[#795BCB]" />
                </div>

                <h2 className="text-xl font-black text-slate-900">
                  Salon Owner
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  For salon owners and professional businesses purchasing salon
                  products, equipment and supplies.
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    Business / salon details
                  </div>

                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    GST or UDYAM details
                  </div>

                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    Professional ordering
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#795BCB]">
                  Continue as Salon Owner
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </div>
              </button>

              {/* Local Customer */}

              <button
                type="button"
                onClick={() => setAccountType("local_customer")}
                className="group text-left rounded-3xl border-2 border-slate-200 p-6 transition hover:border-[#795BCB] hover:bg-[#F8F6FE] hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0ECFA] flex items-center justify-center mb-5">
                  <UserRound className="w-7 h-7 text-[#795BCB]" />
                </div>

                <h2 className="text-xl font-black text-slate-900">
                  Local Customer
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  For customers purchasing PureCuts products for personal or
                  local use.
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    Personal account
                  </div>

                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    Saved delivery address
                  </div>

                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-[#795BCB] mt-0.5" />
                    Faster checkout
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#795BCB]">
                  Continue as Local Customer
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // REGISTRATION FORM
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#F8F7FC] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setAccountType(null)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#795BCB]"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Account Type
        </button>

        <div className="bg-white rounded-3xl border border-[#E9E4F7] shadow-[0_20px_70px_rgba(70,45,130,0.10)] overflow-hidden">
          {/* Header */}

          <div className="bg-[#795BCB] px-6 sm:px-10 py-8 text-white">
            <Image
              src={logo}
              alt="PureCuts"
              width={130}
              height={50}
              priority
              className="bg-white rounded-xl px-3 py-2 object-contain mb-6"
            />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                {accountType === "salon_owner" ? (
                  <Building2 className="w-6 h-6" />
                ) : (
                  <UserRound className="w-6 h-6" />
                )}
              </div>

              <div>
                <p className="text-sm text-white/70">Creating account as</p>

                <h1 className="text-2xl font-black">
                  {accountType === "salon_owner"
                    ? "Salon Owner"
                    : "Local Customer"}
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="p-6 sm:p-10 space-y-7">
            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Personal Details */}

            <section>
              <div className="flex items-center gap-2 mb-5">
                <UserRound className="w-5 h-5 text-[#795BCB]" />

                <h2 className="font-black text-slate-900">Personal Details</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(value) => updateField("name", value)}
                  placeholder="Enter your full name"
                  icon={<UserRound />}
                  required
                />

                {/* Phone + Send OTP */}

                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                      <span className="text-red-500 ml-1">*</span>
                    </span>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(event) => {
                            const phone = event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);

                            updateField("phone", phone);

                            // Reset OTP if phone number changes
                            if (otpSent) {
                              setOtpSent(false);
                              setOtp("");
                            }
                          }}
                          placeholder="10-digit mobile number"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={form.phone.length !== 10}
                        className="sm:w-auto w-full rounded-xl bg-[#795BCB] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#6246B0] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {otpSent ? "OTP Sent" : "Send OTP"}
                      </button>
                    </div>
                  </label>

                  {/* OTP Input */}

                  {otpSent && (
                    <div className="mt-4">
                      <Input
                        label="Enter OTP"
                        type="text"
                        value={otp}
                        onChange={(value) =>
                          setOtp(value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="Enter 6-digit OTP"
                        icon={<LockKeyhole />}
                        required
                      />
                    </div>
                  )}
                </div>

                <Input
                  label="Email Address(optional)"
                  type="email"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="you@example.com"
                  icon={<Mail />}
                  required
                />
              </div>
            </section>

            {/* Salon Details */}

            {accountType === "salon_owner" && (
              <section className="rounded-2xl bg-[#F8F6FE] border border-[#E4DCF7] p-5">
                <div className="flex items-center gap-2 mb-5">
                  <BriefcaseBusiness className="w-5 h-5 text-[#795BCB]" />

                  <div>
                    <h2 className="font-black text-slate-900">
                      Salon / Business Details
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                      Add your business details for professional salon ordering.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Salon / Business Name"
                    value={form.salonName}
                    onChange={(value) => updateField("salonName", value)}
                    placeholder="e.g. Aura Unisex Hair Studio"
                    icon={<Building2 />}
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* GSTIN */}
                    <div className="relative">
                      <div className="w-full sm:max-w-[300px]">
                        <Input
                          label="GSTIN Number"
                          value={form.gstNumber}
                          onChange={(value) => updateField("gstNumber", value)}
                          placeholder="Enter GSTIN"
                        />
                      </div>

                      {/* OR */}
                      <div className="absolute right-[-38px] top-1/2 z-10 hidden sm:flex items-center justify-center">
                        <span className=" px-6 text-xs font-bold text-black">
                          OR
                        </span>
                      </div>
                    </div>

                    {/* UDYAM */}
                    <div className="sm:pl-2">
                      <div className="w-full sm:max-w-[300px]">
                        <Input
                          label="UDYAM Number"
                          value={form.udyamNumber}
                          onChange={(value) =>
                            updateField("udyamNumber", value)
                          }
                          placeholder="Enter UDYAM Number"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    You can provide GSTIN or UDYAM details. They can also be
                    added later to your salon profile.
                  </p>
                </div>
              </section>
            )}

            {/* Address */}

            <section>
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-[#795BCB]" />

                <h2 className="font-black text-slate-900">Delivery Address</h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Street Address / Landmark"
                  value={form.address}
                  onChange={(value) => updateField("address", value)}
                  placeholder="House, street, area or landmark"
                  icon={<MapPin />}
                  required
                />

                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={form.city}
                    onChange={(value) => updateField("city", value)}
                    placeholder="Pune"
                    required
                  />

                  <Input
                    label="State"
                    value={form.state}
                    onChange={(value) => updateField("state", value)}
                    placeholder="Maharashtra"
                    required
                  />

                  <Input
                    label="Pincode"
                    value={form.pincode}
                    onChange={(value) =>
                      updateField(
                        "pincode",
                        value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    placeholder="411001"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#795BCB] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#795BCB]/20 transition hover:bg-[#6246B0] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create My PureCuts Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-bold text-[#795BCB] hover:text-[#6246B0]"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

// ==================================================
// INPUT COMPONENT
// ==================================================

function Input({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700 mb-2">
        {label}

        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:w-4 [&>svg]:h-4">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-200 bg-white py-3.5 ${icon ? "pl-11" : "px-4"
            } pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10`}
        />
      </div>
    </label>
  );
}
