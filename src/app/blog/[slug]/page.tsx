import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({ where: { slug: resolvedParams.slug } });
  if (!article) return { title: "Article Not Found" };
  
  return {
    title: `${article.title} | Money Viora Blog`,
    description: article.desc || article.title,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await prisma.article.findUnique({ where: { slug: resolvedParams.slug } });
  
  if (!data) {
    notFound();
  }

  return (
    <div className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl py-12 sm:py-16 md:py-20">
          {/* Ambient Glow & Radial Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep pointer-events-none" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-brand-mint/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-4xl relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-mint hover:text-white transition-colors mb-6 font-medium text-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs backdrop-blur-sm">
              <span>{data.category}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {data.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2"><User size={16} className="text-brand-mint" /> {data.author}</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-mint" /> {data.date}</div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-brand-mint" /> {data.readTime}</div>
            </div>
          </div>
        </div>
      </section>
      
      {data.imageUrl && (
        <div className="container mx-auto px-4 max-w-5xl -mt-12 relative z-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-[400px]">
            <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <article 
          className="prose prose-lg prose-brand max-w-none prose-headings:text-brand-deep prose-a:text-brand-mint hover:prose-a:text-brand-deep"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-brand-light p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-brand-deep mb-2">Ready to apply?</h3>
            <p className="text-gray-600 mb-6">Check your eligibility in 2 minutes with 50+ lenders.</p>
            <Link href="#apply" className="btn-interactive inline-block bg-brand-deep text-white font-bold px-8 py-4 rounded-full">
              Check Eligibility Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
