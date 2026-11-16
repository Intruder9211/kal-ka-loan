import Link from "next/link";
import { ArrowRight, BookOpen, Clock, CalendarDays } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function BlogGuides() {
  const dbArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  }).catch(() => []);

  if (dbArticles.length === 0) {
    return null;
  }

  const featured = dbArticles[0];
  const regular = dbArticles.slice(1);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 animate-fade-up">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Financial <span className="text-brand-mint">Knowledge Center</span></h2>
            <p className="text-lg text-slate-500 font-medium">Empower yourself with actionable insights, guides, and real estate market updates.</p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-all shadow-sm">
            View All Articles <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Featured Article */}
          {featured && (
            <div className="lg:col-span-7 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 animate-fade-up">
              <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-100">
                {featured.imageUrl ? (
                  <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-brand-deep/90 flex items-center justify-center text-brand-mint">
                    <BookOpen size={48} className="opacity-40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-mint text-brand-deep text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Featured Guide
                  </span>
                </div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <span className="text-brand-mint bg-brand-mint/10 px-3 py-1 rounded-md">{featured.category}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14}/> {featured.readTime || '5 min read'}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={14}/> {featured.date}</span>
                </div>
                
                <h3 className="font-extrabold text-2xl md:text-3xl text-slate-900 mb-4 leading-snug group-hover:text-brand-mint transition-colors">{featured.title}</h3>
                <p className="text-slate-600 text-base mb-8 leading-relaxed max-w-xl">{featured.desc}</p>
                
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-brand-deep font-bold hover:text-brand-mint transition-colors mt-auto w-fit group/btn">
                  Read Full Guide <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Regular Articles List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {regular.map((art) => (
              <div key={art.id} className="group bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  {art.imageUrl ? (
                    <Image src={art.imageUrl} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <BookOpen size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-mint bg-brand-mint/10 px-2 py-0.5 rounded-md mb-2 inline-block">
                    {art.category}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-brand-mint transition-colors line-clamp-2">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{art.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
