
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    PackageCheck,
    ShieldCheck,
    Sparkles,
    Truck,


    Banknote,
    Boxes,
} from "lucide-react";

import {
    AboutReveal,
    AboutCountUp,
} from "@/components/AboutReveal";
import Image from "next/image";
import logo from "../../image/purecuts_logo_no_bg-cropped.png";
import skin from "@/image/skincare.png";
import tool from "@/image/tools.png";
import Acc from "@/image/Acceessories.png";
import fur from "@/image/Furniture.png";
import disp from "@/image/disposable.png";
const categories = [
    {
        name: "Haircare",
        slug: "haircare",
        image: skin.src,
        description: "Professional haircare essentials",
    },
    {
        name: "Skincare & Bodycare",
        slug: "skincare",
        image:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        description: "Skincare and beauty treatments",
    },
    {
        name: "Machineries & Tools",
        slug: "machineries",
        image: tool.src,
        description: "Tools for salon professionals",
    },
    {
        name: "Salon Accessories",
        slug: "accessories",
        image:
            Acc.src,
        description: "Everyday professional essentials",
    },

    {
        name: "Salon Furniture",
        slug: "furniture",
        image: fur.src,
        description: "Equip your salon with professional styling chairs, hair wash chairs, trolleys, and spa furniture.",
    },

    {
        name: "Salon Disposables",
        slug: "disposables",
        image: disp.src,
        description: "Keep your salon prepared with essential disposables, including neck rolls, tissues, and cotton for everyday salon use.",
    },


];

const benefits = [
    {
        icon: ShieldCheck,
        title: "Original Products",
        description:
            "A focus on authentic, salon-grade beauty products.",
    },
    {
        icon: PackageCheck,
        title: "Wholesale Supplies",
        description:
            "Product options for salon owners and bulk buyers.",
    },
    {
        icon: Banknote,
        title: "COD Available",
        description:
            "Cash on Delivery available on eligible orders.",
    },
    {
        icon: Boxes,
        title: "Wide Variety of Products",
        description:
            "Explore haircare, skincare, salon tools and beauty essentials.",
    },


];

export default function AboutUsPage() {
    return (
        <main className="overflow-hidden bg-white text-slate-900">

            <section className="bg-[#f7f4ff]">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
                    <nav className="mb-8 flex gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#795BCB]">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-slate-900">
                            About PureCuts
                        </span>
                    </nav>

                    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                        <AboutReveal className="py-4 md:py-10">


                            <p className="mt-6 text-sm font-semibold text-[#795BCB]">
                                Your Professional Beauty Supply Partner
                            </p>


                            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                Who we are

                            </h1>


                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                                PureCuts is a B2B e-commerce platform built for the beauty and wellness industry. We help salons, spas, parlours, and professionals source everything they need from cosmetics and tools to premium furniture all in one place. With 100% original products, fast delivery, and transparent pricing, we’re here to simplify sourcing and support your growth with trust and technology.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/category/all"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#795BCB] px-6 py-3 font-bold text-white transition hover:bg-[#6846b9]"
                                >
                                    Explore Products
                                    <ArrowRight size={18} />
                                </Link>

                                <Link
                                    href="/contact-us"
                                    className="rounded-xl border border-[#795BCB]/30 bg-white px-6 py-3 font-bold text-[#795BCB] transition hover:bg-[#795BCB]/5"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </AboutReveal>

                        <AboutReveal
                            delay={120}
                            className="relative pb-5"
                        >
                            <div className="pc-about-image rounded-[2rem]">
                                <img
                                    src="https://purecuts.in/wp-content/uploads/2025/07/pcimgg.jpg"
                                    alt="Professional beauty and salon setting"
                                    className="h-[100px] w-full rounded-[2rem] object-cover sm:h-[300px]"
                                />
                            </div>

                            {/*<div className="absolute -bottom-1 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl sm:left-8 sm:right-8 sm:p-5">
                                <p className="text-sm font-extrabold text-slate-900">
                                    One destination for salon essentials
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    Product discovery for retail shoppers and salon
                                    professionals.
                                </p>
                            </div>*/}
                        </AboutReveal>
                    </div>
                </div>
            </section>


            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
                <AboutReveal className="mb-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#795BCB]">
                        The PureCuts Difference
                    </p>
                    <h2 className="mt-3 text-2xl font-black sm:text-4xl">
                        Everything Your Salon Needs, All in One Place
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                        From 100% original beauty products and professional haircare to salon equipment, skincare, furniture, and accessories, PureCuts makes salon shopping easier with convenient ordering, competitive wholesale prices, and doorstep delivery.
                    </p>
                </AboutReveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                            <AboutReveal
                                key={benefit.title}
                                delay={index * 90}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#795BCB]/40 hover:shadow-xl"
                            >
                                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#795BCB]/10 text-[#795BCB] transition group-hover:bg-[#795BCB] group-hover:text-white">
                                    <Icon size={24} />
                                </div>

                                <h3 className="font-extrabold">
                                    {benefit.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {benefit.description}
                                </p>
                            </AboutReveal>
                        );
                    })}
                </div>
            </section>


            <section className="bg-[#f8f7fc] py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <AboutReveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-[#795BCB]">
                                Explore Our Range
                            </p>
                            <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                                Everything for your salon
                            </h2>
                        </div>

                        <Link
                            href="/category/all"
                            className="inline-flex items-center gap-2 font-bold text-[#795BCB]"
                        >
                            View all categories
                            <ArrowRight size={17} />
                        </Link>
                    </AboutReveal>

                    <div className="flex gap-5 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar">
                        {categories.map((category, index) => (
                            <AboutReveal
                                key={category.slug}
                                delay={index * 90}
                                className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%_-_15px)]"
                            >
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="pc-about-image">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            loading="lazy"
                                            className="h-56 w-full object-cover"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-extrabold transition group-hover:text-[#795BCB]">
                                            {category.name}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {category.description}
                                        </p>

                                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#795BCB]">
                                            Explore category
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            </AboutReveal>
                        ))}

                    </div>
                </div>
            </section>


            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <AboutReveal>
                        <div className="pc-about-image rounded-3xl">
                            <img
                                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85"
                                alt="Professional salon workstation"
                                loading="lazy"
                                className="h-[320px] w-full rounded-3xl object-cover sm:h-[450px]"
                            />
                        </div>
                    </AboutReveal>

                    <AboutReveal delay={120}>
                        <p className="text-sm font-extrabold uppercase tracking-widest text-[#795BCB]">
                            Our Story
                        </p>

                        <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                            Supporting the people behind every great salon.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600">
                            From everyday haircare products to professional
                            electrical tools and salon consumables, PureCuts
                            aims to simplify how customers find the supplies
                            they need.
                        </p>

                        <div className="mt-7 space-y-4">
                            {[
                                "Professional salon and beauty product categories",
                                "Options for retail and bulk purchasing",
                                "A Pune-based operating hub",
                            ].map((item) => (
                                <p key={item} className="flex items-start gap-3 text-sm font-semibold">
                                    <CheckCircle2
                                        size={20}
                                        className="mt-0.5 shrink-0 text-[#795BCB]"
                                    />
                                    {item}
                                </p>
                            ))}
                        </div>

                        <Link
                            href="/contact-us"
                            className="mt-8 inline-flex items-center gap-2 font-bold text-[#795BCB]"
                        >
                            Get in touch
                            <ArrowRight size={18} />
                        </Link>
                    </AboutReveal>
                </div>
            </section>

            {/*<section className="bg-[#24163d] py-12 text-white sm:py-16">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-2 sm:px-6">
                    <AboutReveal>
                        <p className="text-4xl font-black sm:text-5xl">
                            <AboutCountUp end={8} suffix="+" />
                        </p>
                        <p className="mt-2 text-sm text-white/75">
                            Core product categories
                        </p>
                    </AboutReveal>

                    <AboutReveal delay={120}>
                        <p className="text-4xl font-black sm:text-5xl">
                            <AboutCountUp end={2} />
                        </p>
                        <p className="mt-2 text-sm text-white/75">
                            Customer purchasing channels — retail and wholesale
                        </p>
                    </AboutReveal>
                </div>
            </section>


            {/*<section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 md:py-16">
                <AboutReveal>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#795BCB]">
                        Professional beauty brands
                    </p>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                        Find products for your professional needs
                    </h2>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {[
                            "L'Oréal Professionnel",
                            "Matrix",
                            "Schwarzkopf Professional",
                            "Ikonic",
                            "Wahl",
                            "VLCC",
                        ].map((brand) => (
                            <span
                                key={brand}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#795BCB]/50 hover:text-[#795BCB]"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </AboutReveal>
            </section>*/}

            <section className="px-4 pb-14 sm:px-6 md:pb-20">
                <AboutReveal className="mx-auto max-w-7xl rounded-3xl bg-[#795BCB] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
                    <Building2 className="mx-auto mb-4" size={34} />

                    <h2 className="text-2xl font-black sm:text-4xl">
                        Let&apos;s make your next salon order easier.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
                        Explore professional haircare, skincare, machinery
                        and essential salon supplies through PureCuts.
                    </p>

                    <Link
                        href="/category/all"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#795BCB] transition hover:bg-violet-50"
                    >
                        Start shopping
                        <ArrowRight size={18} />
                    </Link>
                </AboutReveal>
            </section>


        </main >
    );
}
