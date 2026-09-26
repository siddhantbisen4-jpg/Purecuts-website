import React from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/products";
import { BookOpen, Clock, User, ArrowRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Salon Artistry & Education Blog</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> PureCuts Educational Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            Salon Guides, Product Comparisons & Technique Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Written by professional barbers, colorists, and estheticians to help you choose the right salon formulations and elevate your client service.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-lg backdrop-blur-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <User className="w-3.5 h-3.5 text-amber-600" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
