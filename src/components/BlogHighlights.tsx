"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";

interface BlogHighlightsProps {
  posts: BlogPost[];
}

export function BlogHighlights({ posts }: BlogHighlightsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-12">
      <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Salon Artistry & Education
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Salon Guides & Pro Masterclasses
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Read All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-400 transition flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-600 transition line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <User className="w-3.5 h-3.5 text-slate-400" /> {post.author.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
