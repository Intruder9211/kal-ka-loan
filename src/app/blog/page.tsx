import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Guides | Kal Ka Loan",
  description: "Expert advice, tips, and guides on home loans, credit scores, and real estate in India.",
};

const articles = [
  {
    slug: "how-to-increase-cibil-score",
    title: "How to increase your CIBIL Score for a Home Loan",
    category: "Credit Score",
    readTime: "5 min read",
    desc: "Learn actionable tips to boost your credit score and unlock the lowest home loan interest rates.",
    date: "Oct 12, 2026",
    author: "Rahul Verma"
  },
  {
    slug: "fixed-vs-floating-interest-rate",
    title: "Fixed vs Floating Interest Rate: Which is better?",
    category: "Home Loan Tips",
    readTime: "4 min read",
    desc: "Confused between fixed and floating rates? We break down the pros and cons to help you decide.",
    date: "Oct 10, 2026",
    author: "Priya Sharma"
  },
  {
    slug: "balance-transfer-checklist",
    title: "Checklist for Home Loan Balance Transfer",
    category: "Balance Transfer",
    readTime: "6 min read",
    desc: "Everything you need to know before transferring your existing home loan to a new bank.",
    date: "Oct 05, 2026",
    author: "Amit Desai"
  },
  {
    slug: "home-loan-tax-benefits-2026",
    title: "Home Loan Tax Benefits in 2026 under Section 80C & 24(b)",
    category: "Tax Planning",
    readTime: "7 min read",
    desc: "Maximize your tax savings this year by understanding exactly how much you can claim on principal and interest.",
    date: "Sep 28, 2026",
    author: "Neha Gupta"
  }
];

export default function BlogArchive() {
  return (
    <div className="flex-1 bg-gray-50/50">
      <div className="bg-brand-deep text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Blog & <span className="text-brand-mint">Guides</span>
          </h1>
          <p className="text-lg text-gray-300">
            Insights, tips, and expert advice to help you navigate the world of home loans in India.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="card-interactive bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group animate-fade-up" style={{animationDelay: `${i*100}ms`}}>
              <div className="h-48 bg-brand-light flex items-center justify-center text-brand-mint relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/5 to-transparent"></div>
                <span className="font-bold text-2xl opacity-20">{article.category}</span>
              </div>
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
