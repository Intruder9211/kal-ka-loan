import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Mock database
const articles: Record<string, any> = {
  "how-to-increase-cibil-score": {
    title: "How to increase your CIBIL Score for a Home Loan",
    category: "Credit Score",
    readTime: "5 min read",
    date: "Oct 12, 2026",
    author: "Rahul Verma",
    content: `
      <h2>Understanding the Importance of CIBIL</h2>
      <p>Your CIBIL score is a three-digit number ranging from 300 to 900 that reflects your creditworthiness. When you apply for a home loan, this is the very first thing banks look at. A score above 750 is considered excellent and can unlock the lowest interest rates starting at 8.35%.</p>
      
      <h2>1. Pay Your Dues on Time</h2>
      <p>The biggest factor affecting your score is your repayment history. Late payments on credit cards or EMIs will severely dent your score. Set up auto-debit facilities to ensure you never miss a deadline.</p>

      <h2>2. Maintain a Healthy Credit Utilization Ratio (CUR)</h2>
      <p>Your CUR should ideally be below 30%. This means if your total credit limit is ₹1,00,000, you shouldn't be spending more than ₹30,000 at any given time. High utilization signals to banks that you are credit-hungry.</p>

      <h2>3. Don't Close Old Credit Cards</h2>
      <p>The length of your credit history matters. Older credit accounts provide a longer, more stable track record. Even if you don't use an old card often, keep it active to maintain a long credit history.</p>

      <h2>Conclusion</h2>
      <p>Improving your CIBIL score doesn't happen overnight, but by following these disciplined financial habits for 3-6 months, you can significantly boost your score and save lakhs on your home loan interest.</p>
    `
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Article Not Found" };
  
  return {
    title: `${article.title} | Kal Ka Loan Blog`,
    description: article.desc || article.title,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  
  // If we don't have the article in our mock DB, show a generic beautiful placeholder
  const data = article || {
    title: "The Ultimate Guide to Securing a Home Loan in India",
    category: "Home Loan Tips",
    readTime: "4 min read",
    date: "Oct 10, 2026",
    author: "Editorial Team",
    content: `
      <h2>Why Home Loans are Essential</h2>
      <p>Buying a house is a significant financial milestone for most Indians. Given the high property prices in major cities, home loans bridge the gap between your savings and your dream home.</p>
      <h2>Steps to Ensure Quick Approval</h2>
      <p>Always maintain a good CIBIL score, keep your income documents ready, and avoid taking multiple unsecured loans before applying for a home loan.</p>
      <h2>Conclusion</h2>
      <p>Research, compare, and consult with experts like Kal Ka Loan to ensure you get the best deal.</p>
    `
  };

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
