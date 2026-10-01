"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the minimum CIBIL score required for a home loan?",
      a: "Most banks require a minimum CIBIL score of 650 for a home loan. However, to get the best interest rates (starting at 8.35%), a score of 750 or above is recommended."
    },
    {
      q: "Are there any hidden charges when applying through Kal Ka Loan?",
      a: "No! Our loan distribution and comparison service is completely free for customers. We earn a standard referral fee from the bank when your loan is disbursed. You pay absolutely zero convenience fees to us."
    },
    {
      q: "How long does it take to get a home loan sanctioned?",
      a: "If your documentation is complete and your credit profile is strong, we can get your home loan sanctioned within 48 to 72 hours through our partner banks."
    },
    {
      q: "Can I transfer my existing home loan to a lower interest rate?",
      a: "Yes, this is called a Balance Transfer. If you are paying a higher interest rate with your current lender, you can switch to a new lender offering lower rates, which can save you lakhs in interest over the tenure."
    },
    {
      q: "What is the maximum loan amount I can get?",
      a: "You can get up to 80-90% of the property value as a home loan, depending on the loan amount and the bank's policies. The maximum loan amount also depends on your repayment capacity (income and existing obligations)."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all animate-fade-up"
              style={{animationDelay: `${i*100}ms`}}
            >
              <button 
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-left text-brand-deep hover:bg-brand-light transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <ChevronDown 
                  className={`text-brand-mint transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} 
                  size={20} 
                />
              </button>
              <div 
                className={`px-6 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-40 py-4 border-t border-gray-100" : "max-h-0 py-0"}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
