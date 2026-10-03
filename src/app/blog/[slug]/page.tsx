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
      {/* Blog Header */}
      <div className="bg-brand-deep text-white py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-mint hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 text-sm font-bold text-brand-mint uppercase tracking-wider mb-4">
            <span>{data.category}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2"><User size={16} /> {data.author}</div>
            <div className="flex items-center gap-2"><Calendar size={16} /> {data.date}</div>
            <div className="flex items-center gap-2"><Clock size={16} /> {data.readTime}</div>
          </div>
        </div>
      </div>
      
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
