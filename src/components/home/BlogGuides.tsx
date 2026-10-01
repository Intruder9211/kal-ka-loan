import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BlogGuides() {
  const articles = [
    {
      title: "How to increase your CIBIL Score for a Home Loan",
      category: "Credit Score",
      readTime: "5 min read",
      desc: "Learn actionable tips to boost your credit score and unlock the lowest home loan interest rates.",
    },
    {
      title: "Fixed vs Floating Interest Rate: Which is better?",
      category: "Home Loan Tips",
      readTime: "4 min read",
      desc: "Confused between fixed and floating rates? We break down the pros and cons to help you decide.",
    },
    {
      title: "Checklist for Home Loan Balance Transfer",
      category: "Balance Transfer",
      readTime: "6 min read",
      desc: "Everything you need to know before transferring your existing home loan to a new bank.",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-fade-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-2">Guides & Articles</h2>
            <p className="text-gray-600">Empower yourself with financial knowledge.</p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-brand-mint font-bold hover:text-brand-deep transition-colors">
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className={`card-interactive bg-white border border-gray-100 rounded-2xl overflow-hidden animate-fade-up flex flex-col`} style={{animationDelay: `${i*100}ms`}}>
              <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                <BookOpen size={48} opacity={0.5} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-bold text-brand-mint uppercase tracking-wider mb-3">
                  <span>{article.category}</span>
                  <span className="text-gray-400 font-normal">{article.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-brand-deep mb-3 leading-snug">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">{article.desc}</p>
                <Link href="/blog" className="text-brand-deep font-bold flex items-center gap-2 hover:text-brand-mint transition-colors">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
