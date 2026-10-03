"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // In a real implementation, these would be fetched from the Admin CMS database
  const cmsFaqs = [
    {
      category: "Eligibility",
      q: "What is the minimum CIBIL score required for a home loan?",
      a: "Most banks require a minimum CIBIL score of 650. However, to unlock the absolute lowest interest rates (starting at 8.35%), a score of 750 or above is recommended. If your score is lower, our experts can still help you find specialized NBFC lenders."
    },
    {
      category: "Fees",
      q: "Are there any hidden charges when applying through Money Viora?",
      a: "Absolutely not. Our distribution and comparison platform is completely free for customers. We earn a standard referral fee directly from the bank only when your loan is disbursed. You pay zero convenience or hidden fees to us."
    },
    {
      category: "Process",
      q: "How long does it take to get a home loan sanctioned?",
      a: "If your income documentation is complete and your credit profile is strong, our digital process allows partner banks to sanction your home loan within 48 to 72 hours."
    },
    {
      category: "Process",
      q: "Can I transfer my existing home loan to a lower interest rate?",
      a: "Yes, this is called a Balance Transfer. If you are paying a higher interest rate with your current lender, we can help you switch to a new lender offering lower rates, which can save you lakhs in interest and reduce your EMI."
    },
    {
      category: "Eligibility",
      q: "What is the maximum loan amount I can get?",
      a: "You can get up to 80-90% of the property value as a home loan. However, the final maximum amount is heavily dependent on your FOIR (Fixed Obligation to Income Ratio) which looks at your monthly income minus existing EMIs."
    }
  ];

  const categories = ["All", "Eligibility", "Process", "Fees"];
  
  const filteredFaqs = activeCategory === "All" 
    ? cmsFaqs 
    : cmsFaqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="w-16 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-center mx-auto text-brand-mint mb-6">
            <MessageCircleQuestion size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Got Questions?</h2>
          <p className="text-lg text-slate-500 font-medium">Clear answers to help you make confident financial decisions.</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-up stagger-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); // Reset open index on filter change
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat 
                  ? "bg-brand-deep text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-white border ${isOpen ? 'border-brand-mint/50 shadow-[0_8px_30px_rgb(7,153,116,0.08)]' : 'border-slate-200 shadow-sm'} rounded-2xl overflow-hidden transition-all duration-300 animate-fade-up`}
                style={{animationDelay: `${i*100}ms`}}
              >
                <button 
                  className={`w-full px-8 py-5 flex items-center justify-between font-bold text-left transition-colors ${isOpen ? 'text-brand-deep' : 'text-slate-700 hover:text-brand-deep'}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="pr-8 text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-brand-mint/20 text-brand-mint' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown 
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-mint" : ""}`} 
                      size={18} 
                    />
                  </div>
                </button>
                <div 
                  className={`px-8 text-slate-500 font-medium overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] py-5 border-t border-slate-100 opacity-100 leading-relaxed" : "max-h-0 py-0 opacity-0"}`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
