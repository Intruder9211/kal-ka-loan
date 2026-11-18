import Link from "next/link";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog & Guides | Money Viora",
  description: "Expert advice, tips, and guides on home loans, credit scores, and real estate in India.",
};

export const dynamic = "force-dynamic";

export default async function BlogArchive() {
  const articles = await prisma.article.findMany() || [];
  
  return (
    <div className="flex-1 bg-gray-50/50">
      {/* Hero Section */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
          {/* Ambient Glow & Radial Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep pointer-events-none" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-brand-mint/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs backdrop-blur-sm">
              <BookOpen size={14} />
              <span>Knowledge Center & Insights</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
              Blog & <span className="text-brand-mint">Guides</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Insights, expert advice, and step-by-step guides to help you navigate the world of home loans in India.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="card-interactive bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group animate-fade-up" style={{animationDelay: `${i*100}ms`}}>
              {article.imageUrl ? (
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-deep">
                    {article.category}
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-brand-light flex items-center justify-center text-brand-mint relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/5 to-transparent"></div>
                  <span className="font-bold text-2xl opacity-20">{article.category}</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-bold text-brand-mint uppercase tracking-wider mb-3">
                  <span>{article.category}</span>
                  <span className="text-gray-400 font-normal flex items-center gap-1"><Calendar size={12}/> {article.date}</span>
                </div>
                <h3 className="font-bold text-xl text-brand-deep mb-3 leading-snug group-hover:text-brand-mint transition-colors">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">{article.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User size={14} /> {article.author}
                  </div>
                  <Link href={`/blog/${article.slug}`} className="text-brand-deep font-bold flex items-center gap-1 hover:text-brand-mint transition-colors text-sm">
                    Read Article <ArrowRight size={14} className="icon-slide" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
