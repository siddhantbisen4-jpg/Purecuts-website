import React from "react";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/products";
import { notFound } from "next/navigation";
import { Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-600 font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-sm">{post.title}</span>
        </nav>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <User className="w-4 h-4 text-amber-600" /> {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed space-y-4 pt-4 border-t border-slate-100">
            <p className="text-base font-semibold text-slate-900 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {post.excerpt}
            </p>
            <p className="text-sm leading-relaxed">{post.content}</p>
            <p className="text-sm leading-relaxed">
              When applying professional products in salon settings, always conduct client strand and patch tests 48 hours prior to chemical services. Using high quality tools and authentic products from authorized distributors like PureCuts guarantees client satisfaction and maximum retention.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
            <Link
              href="/category/all"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition"
            >
              Shop Featured Salon Products
            </Link>
          </div>
        </article>

        {/* Other articles */}
        {otherPosts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-base font-black text-slate-900">Recommended Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  href={`/blog/${op.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition flex items-center gap-3"
                >
                  <img src={op.coverImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">{op.category}</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">{op.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
