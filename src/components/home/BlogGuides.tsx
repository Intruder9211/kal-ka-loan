import Link from "next/link";
import { ArrowRight, BookOpen, Clock, CalendarDays } from "lucide-react";
import Image from "next/image";

export default function BlogGuides() {
  const articles = [
    {
      title: "How to increase your CIBIL Score for a Home Loan in 60 Days",
      category: "Credit Score",
      readTime: "5 min read",
      date: "Oct 12, 2026",
      desc: "Learn actionable tips to boost your credit score, remove errors from your report, and unlock the absolute lowest home loan interest rates.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      featured: true
    },
    {
      title: "Fixed vs Floating Interest Rate: Which is better?",
      category: "Home Loan Tips",
      readTime: "4 min read",
      date: "Oct 08, 2026",
      desc: "Confused between fixed and floating rates? We break down the pros and cons.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      featured: false
    },
    {
      title: "Checklist for Home Loan Balance Transfer",
      category: "Balance Transfer",
      readTime: "6 min read",
      date: "Oct 02, 2026",
      desc: "Everything you need to know before transferring your existing home loan to a new bank.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      featured: false
    }
  ];

  const featured = articles.find(a => a.featured);
  const regular = articles.filter(a => !a.featured);

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
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                  <span className="flex items-center gap-1.5"><Clock size={14}/> {featured.readTime}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={14}/> {featured.date}</span>
                </div>
                
                <h3 className="font-extrabold text-2xl md:text-3xl text-slate-900 mb-4 leading-snug group-hover:text-brand-mint transition-colors">{featured.title}</h3>
                <p className="text-slate-600 text-base mb-8 leading-relaxed max-w-xl">{featured.desc}</p>
                
                <Link href="/blog" className="inline-flex items-center gap-2 text-brand-deep font-bold hover:text-brand-mint transition-colors mt-auto w-fit group/btn">
                  Read Full Guide <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Regular Articles Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {regular.map((article, i) => (
              <div key={i} className={`group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 animate-fade-up flex flex-col sm:flex-row h-full`} style={{animationDelay: `${(i+1)*150}ms`}}>
                <div className="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden shrink-0">
                  <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    <span className="text-brand-mint">{article.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-3 leading-snug group-hover:text-brand-mint transition-colors">{article.title}</h3>
                  <p className="text-slate-500 text-sm mb-5 line-clamp-2">{article.desc}</p>
                  
                  <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 group-hover:text-brand-mint transition-colors mt-auto w-fit">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-8 py-3.5 rounded-full w-full justify-center">
            View All Articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
