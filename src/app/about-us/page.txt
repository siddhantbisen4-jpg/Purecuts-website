import React from "react";
import Link from "next/link";
import { Scissors, ShieldCheck, Truck, Building2, Award, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">About PureCuts</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-amber-400" /> About PureCuts
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
            India's Leading Marketplace for Professional Salon & Beauty Supplies
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Headquartered in Wagholi, Pune, PureCuts was founded with a singular purpose: to empower salon owners, hairstylists, beauty therapists, and discerning consumers with 100% authentic, salon-grade products at genuine wholesale pricing.
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm">
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              Our Mission & Heritage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              At PureCuts, we understand that professional hairstyling and beauty services demand genuine chemical formulations, durable electrical machinery, and hygienic consumables. Counterfeit products in the salon market damage hair, harm skin, and destroy salon reputations.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We partner directly with leading domestic and international manufacturers—including <strong>L'Oréal Professionnel, Matrix Biolage, Schwarzkopf Professional, Ikonic, Wahl USA, Streax Professional, Dr. Rashel, and VLCC</strong>—ensuring every tub, tube, and clipper is fresh, batch-coded, and 100% original.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h3 className="text-sm font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> 100% Original Guarantees
              </h3>
              <p className="text-xs text-amber-900/80">
                Direct authorized distribution with verifiable lot numbers and official brand warranties.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <h3 className="text-sm font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" /> Pune Wagholi Hub
              </h3>
              <p className="text-xs text-emerald-900/80">
                Centralized distribution center on Domkhel Road, Wagholi, ensuring express pan-India dispatch.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg font-black text-slate-900 mb-3">Our Core Business Verticals</h2>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Salon B2B Wholesale:</strong> Bulk chemical cartons, developer drums, and disposable bulk boxes for salons and academies.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Salon Furniture & Heavy Equipment:</strong> Hydraulic styling chairs, ceramic shampoo wash units, and facial beds shipped safely with freight support.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Retail Beauty Enthusiasts:</strong> Professional-grade hair masques, scalp treatments, and facial kits delivered directly to doorsteps across India.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block font-bold text-sm">PureCuts Operating Address:</strong>
            <p>EUREKA, A Building, GHRCEM Domkhel Road, Wagholi - 412207, Pune, Maharashtra, India</p>
            <p>Contact: +91 9579177826 | Email: contact@purecuts.in</p>
          </div>
        </div>
      </div>
    </main>
  );
}
