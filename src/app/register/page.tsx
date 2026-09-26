"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import logo from "../../image/purecuts_logo_no_bg-cropped.png";

type AccountType =
  | "salon_owner"
  | "local_customer";

export default function RegisterPage() {
  const router = useRouter();

  const [accountType, setAccountType] =
    useState<AccountType | null>(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    salonName: "",
    gstNumber: "",
    udyamNumber: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!accountType) {
      setError(
        "Please select Salon Owner or Local Customer."
      );
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        form.phone.replace(/\D/g, "")
      )
    ) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError(
        "Password and confirm password do not match."
      );
      return;
    }

    if (
      accountType === "salon_owner" &&
      !form.salonName.trim()
    ) {
      setError(
        "Please enter your salon or business name."
      );
      return;
    }

    if (!form.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!form.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError(
        "Please enter a valid six-digit pincode."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            accountType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to create your account."
        );
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
        salonMember:
          user.accountType === "salon_owner",
        signedInAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "purecuts_user",
        JSON.stringify(session)
      );

      localStorage.setItem(
        "purecuts_pincode",
        user.pincode
      );

      window.dispatchEvent(
        new CustomEvent("purecuts-auth-changed")
      );

      setSuccess(
        "Your PureCuts account has been created successfully."
      );

      setTimeout(() => {
        router.push("/account");
      }, 700);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
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
                Select the option that best describes
                how you shop with PureCuts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Salon Owner */}

              <button
                type="button"
                onClick={() =>
                  setAccountType("salon_owner")
                }
                className="group text-left rounded-3xl border-2 border-slate-200 p-6 transition hover:border-[#795BCB] hover:bg-[#F8F6FE] hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0ECFA] flex items-center justify-center mb-5">
                  <Building2 className="w-7 h-7 text-[#795BCB]" />
                </div>

                <h2 className="text-xl font-black text-slate-900">
                  Salon Owner
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  For salon owners and professional
                  businesses purchasing salon products,
                  equipment and supplies.
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
                onClick={() =>
                  setAccountType("local_customer")
                }
                className="group text-left rounded-3xl border-2 border-slate-200 p-6 transition hover:border-[#795BCB] hover:bg-[#F8F6FE] hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0ECFA] flex items-center justify-center mb-5">
                  <UserRound className="w-7 h-7 text-[#795BCB]" />
                </div>

                <h2 className="text-xl font-black text-slate-900">
                  Local Customer
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  For customers purchasing PureCuts
                  products for personal or local use.
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
                <p className="text-sm text-white/70">
                  Creating account as
                </p>

                <h1 className="text-2xl font-black">
                  {accountType === "salon_owner"
                    ? "Salon Owner"
                    : "Local Customer"}
                </h1>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleRegister}
            className="p-6 sm:p-10 space-y-7"
          >

            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Personal Details */}

            <section>

              <div className="flex items-center gap-2 mb-5">
                <UserRound className="w-5 h-5 text-[#795BCB]" />

                <h2 className="font-black text-slate-900">
                  Personal Details
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">

                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(value) =>
                    updateField("name", value)
                  }
                  placeholder="Enter your full name"
                  icon={<UserRound />}
                  required
                />

                <Input
                  label="Phone Number"
                  value={form.phone}
                  onChange={(value) =>
                    updateField(
                      "phone",
                      value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  placeholder="10-digit mobile number"
                  icon={<Phone />}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    updateField("email", value)
                  }
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
                      Add your business details for professional
                      salon ordering.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">

                  <Input
                    label="Salon / Business Name"
                    value={form.salonName}
                    onChange={(value) =>
                      updateField(
                        "salonName",
                        value
                      )
                    }
                    placeholder="e.g. Aura Unisex Hair Studio"
                    icon={<Building2 />}
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-4">

                    <Input
                      label="GSTIN"
                      value={form.gstNumber}
                      onChange={(value) =>
                        updateField(
                          "gstNumber",
                          value.toUpperCase()
                        )
                      }
                      placeholder="27AAAAA0000A1Z5"
                    />

                    <Input
                      label="UDYAM Number"
                      value={form.udyamNumber}
                      onChange={(value) =>
                        updateField(
                          "udyamNumber",
                          value.toUpperCase()
                        )
                      }
                      placeholder="UDYAM-MH-00-0000000"
                    />

                  </div>

                  <p className="text-xs text-slate-500">
                    You can provide GSTIN or UDYAM details.
                    They can also be added later to your
                    salon profile.
                  </p>

                </div>
              </section>
            )}

            {/* Address */}

            <section>

              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-[#795BCB]" />

                <h2 className="font-black text-slate-900">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-4">

                <Input
                  label="Street Address / Landmark"
                  value={form.address}
                  onChange={(value) =>
                    updateField("address", value)
                  }
                  placeholder="House, street, area or landmark"
                  icon={<MapPin />}
                  required
                />

                <div className="grid sm:grid-cols-3 gap-4">

                  <Input
                    label="City"
                    value={form.city}
                    onChange={(value) =>
                      updateField("city", value)
                    }
                    placeholder="Pune"
                    required
                  />

                  <Input
                    label="State"
                    value={form.state}
                    onChange={(value) =>
                      updateField("state", value)
                    }
                    placeholder="Maharashtra"
                    required
                  />

                  <Input
                    label="Pincode"
                    value={form.pincode}
                    onChange={(value) =>
                      updateField(
                        "pincode",
                        value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="411001"
                    required
                  />

                </div>
              </div>
            </section>

            {/* Password */}

            <section>

              <div className="flex items-center gap-2 mb-5">
                <LockKeyhole className="w-5 h-5 text-[#795BCB]" />

                <h2 className="font-black text-slate-900">
                  Create Password
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">

                <PasswordInput
                  label="Password"
                  value={form.password}
                  show={showPassword}
                  onToggle={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  onChange={(value) =>
                    updateField(
                      "password",
                      value
                    )
                  }
                />

                <PasswordInput
                  label="Confirm Password"
                  value={form.confirmPassword}
                  show={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  onChange={(value) =>
                    updateField(
                      "confirmPassword",
                      value
                    )
                  }
                />

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Password must contain at least 6 characters.
              </p>
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
        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </span>

      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {React.cloneElement(
              icon as React.ReactElement,
              {
                className: "w-4 h-4",
              }
            )}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-200 bg-white py-3.5 ${
            icon ? "pl-11" : "px-4"
          } pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10`}
        />

      </div>
    </label>
  );
}

// ==================================================
// PASSWORD INPUT
// ==================================================

function PasswordInput({
  label,
  value,
  show,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
        <span className="text-red-500 ml-1">
          *
        </span>
      </span>

      <div className="relative">

        <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="Minimum 6 characters"
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#795BCB]"
        >
          {show ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>

      </div>
    </label>
  );
}