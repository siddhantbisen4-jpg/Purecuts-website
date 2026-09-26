import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Terms & Conditions</span>
        </nav>

        <h1 className="text-2xl font-black text-slate-900">Terms & Conditions</h1>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or shopping on PureCuts (purecuts.in), you agree to be bound by these Terms and Conditions and our policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Professional Salon Use Notice</h2>
          <p>
            Certain chemical products (e.g. permanent hair colors, high-volume peroxides, rebonding neutralizers) are formulated for trained salon professionals. Users are responsible for following patch test guidelines and manufacturer safety protocols.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Pricing & Tax Compliance</h2>
          <p>
            All prices displayed on the website are in Indian Rupees (INR) and include applicable Goods and Services Tax (GST). Tax invoices with GSTIN numbers are issued for verified salon buyers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Jurisdiction</h2>
          <p>
            Any disputes arising out of purchases from PureCuts are subject to the exclusive jurisdiction of courts in Pune, Maharashtra, India.
          </p>
        </section>
      </div>
    </main>
  );
}
