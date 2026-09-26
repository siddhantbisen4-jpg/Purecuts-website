import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Privacy Policy</span>
        </nav>

        <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>

        <p>
          PureCuts ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your salon and personal information is collected, used, and secured when you browse or order from <strong>purecuts.in</strong>.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you place an order, create an account, or request a wholesale quotation, we collect your name, salon business name, delivery address, phone number, email address, and GSTIN (if provided).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Payment Security</h2>
          <p>
            We never store your credit card or bank credentials. All electronic payments are processed through RBI-authorized payment gateways using 256-bit SSL encryption.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Contact Us</h2>
          <p>
            For privacy inquiries, please write to: <strong>contact@purecuts.in</strong>, EUREKA Building, Domkhel Road, Wagholi, Pune 412207.
          </p>
        </section>
      </div>
    </main>
  );
}
