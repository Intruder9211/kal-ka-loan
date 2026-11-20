"use client";

import { useState, useRef } from "react";
import { 
  ChevronDown, 
  ShieldCheck, 
  Layers, 
  Coins, 
  Sparkles, 
  ArrowRight,
  HeadphonesIcon
} from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  category: "Eligibility" | "Process" | "Fees";
  q: string;
  a: string;
}

const FAQS_DATA: FAQItem[] = [
  // Eligibility (4 items)
  {
    id: "e-1",
    category: "Eligibility",
    q: "What is the minimum CIBIL score required for a home loan?",
    a: "Most prime banks require a minimum CIBIL score of 650. However, to unlock the absolute lowest interest rates starting at 7.25%, a score of 750 or above is recommended. If your score is between 600–680, our specialists can still help you secure approvals with specialized NBFC partners."
  },
  {
    id: "e-2",
    category: "Eligibility",
    q: "What is the maximum loan amount I can qualify for?",
    a: "Banks typically sanction up to 80%–90% of the property's registered agreement value. The exact ceiling depends on your FOIR (Fixed Obligation to Income Ratio)—typically capped at 50%–60% of your net monthly earnings minus active EMIs."
  },
  {
    id: "e-3",
    category: "Eligibility",
    q: "Can I add a co-applicant to increase my loan eligibility?",
    a: "Yes. Adding an earning co-applicant—such as your spouse, parents, or siblings—pools your total household income, directly boosting your eligible loan amount and tax deduction benefits under Section 80C and Section 24(b)."
  },
  {
    id: "e-4",
    category: "Eligibility",
    q: "What is the minimum income requirement for salaried vs self-employed?",
    a: "For salaried applicants, the net in-hand monthly credit should be at least ₹25,000 per month with 2+ years of continuous work experience. Self-employed borrowers require audited ITRs showing an annual net profit of at least ₹3,00,000 with a 3-year operating vintage."
  },

  // Process (4 items)
  {
    id: "p-1",
    category: "Process",
    q: "How long does it take to get a home loan sanctioned?",
    a: "With Money Viora's digital verification pipeline, in-principle digital sanction letters are issued within 48 to 72 hours once basic KYC and income documents are submitted. Final disbursement occurs upon legal title clearance."
  },
  {
    id: "p-2",
    category: "Process",
    q: "Can I transfer my existing home loan to a lower interest rate?",
    a: "Yes! Through our Balance Transfer service, you can port your active loan from a high-rate bank down to competitive rates starting at 7.25%. We negotiate fee waivers and manage the foreclosure letter coordination on your behalf."
  },
  {
    id: "p-3",
    category: "Process",
    q: "Do I need to visit physical bank branches?",
    a: "No. The entire loan discovery, comparative assessment, document submission, and pre-approval process is 100% digital. For original document verification, we offer complimentary doorstep pickup."
  },
  {
    id: "p-4",
    category: "Process",
    q: "What happens during property technical and legal verification?",
    a: "The lender assigns an independent civil engineer to evaluate the construction quality/market valuation and an advocate to conduct a 30-year search report of the title deeds, ensuring the property is free of legal encumbrances."
  },

  // Fees (4 items)
  {
    id: "f-1",
    category: "Fees",
    q: "Are there any hidden charges when applying through Money Viora?",
    a: "Zero hidden charges. Our platform and advisory services are 100% free for borrowers. We receive standard referral fee payments directly from banking institutions only after your loan is disbursed."
  },
  {
    id: "f-2",
    category: "Fees",
    q: "What is the standard processing fee charged by banks?",
    a: "Processing fees typically range from 0.25% to 0.50% of the sanctioned loan amount (or a fixed ₹3,000 to ₹10,000 + GST). During festive offers, Money Viora frequently secures partial or full processing fee waivers."
  },
  {
    id: "f-3",
    category: "Fees",
    q: "Is there any prepayment penalty on floating rate home loans?",
    a: "Per RBI guidelines, banks and NBFCs cannot charge any prepayment penalty or foreclosure fee on floating rate home loans sanctioned to individual borrowers, regardless of whether it is a partial or full prepayment."
  },
  {
    id: "f-4",
    category: "Fees",
    q: "Who bears the cost of property legal and valuation checks?",
    a: "Technical valuation and legal search fees are billed by the lender's empaneled third-party vendors (typically ₹3,000 to ₹5,000). Many of our partner banks waive this fee as part of promotional campaigns."
  }
];

const CATEGORIES: Array<{ id: "Eligibility" | "Process" | "Fees"; label: string; icon: any; count: number }> = [
  { id: "Eligibility", label: "Eligibility", icon: ShieldCheck, count: 4 },
  { id: "Process", label: "Process", icon: Layers, count: 4 },
  { id: "Fees", label: "Fees", icon: Coins, count: 4 },
];

export default function FAQ() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "e-1": true, "p-1": true, "f-1": true });
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  const activeCategory = CATEGORIES[activeCategoryIndex].id;
  const currentCategoryData = CATEGORIES[activeCategoryIndex];

  const toggleAccordion = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Wheel scroll interaction over FAQ container to step between categories smoothly
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    if (e.deltaY > 35 && activeCategoryIndex < CATEGORIES.length - 1) {
      lastWheelTime.current = now;
      setActiveCategoryIndex(prev => prev + 1);
    } else if (e.deltaY < -35 && activeCategoryIndex > 0) {
      lastWheelTime.current = now;
      setActiveCategoryIndex(prev => prev - 1);
    }
  };

  // Mobile Touch Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0 && activeCategoryIndex < CATEGORIES.length - 1) {
        setActiveCategoryIndex(prev => prev + 1);
      } else if (diffX < 0 && activeCategoryIndex > 0) {
        setActiveCategoryIndex(prev => prev - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeFaqs = FAQS_DATA.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-50/60 border-t border-stone-200/70 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold mb-2.5 shadow-2xs">
            <Sparkles size={13} className="text-brand-mint" />
            <span>Instant Help &amp; Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-2">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-500 max-w-xl mx-auto font-medium">
            Clear, transparent answers to every question regarding eligibility, process, and fees.
          </p>
        </div>

        {/* 
          =======================================================
          MOBILE VIEW (< md): 
          Existing single-column layout with 3 tabs only (Eligibility, Process, Fees).
          Shows ONLY the FAQs belonging to the selected category.
          =======================================================
        */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="block md:hidden"
        >
          {/* Mobile Tab Bar */}
          <div className="flex bg-slate-200/70 p-1.5 rounded-2xl gap-1 mb-5">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-deep text-white shadow-md scale-100"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Icon size={13} className={isSelected ? "text-brand-mint" : "text-stone-400"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Category FAQ Accordion List (Selected Category Only) */}
          <div key={activeCategory} className="space-y-3 animate-fade-in">
            {activeFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "border-emerald-500/50 shadow-md shadow-emerald-950/5" 
                      : "border-stone-200/80 shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`mobile-faq-answer-${faq.id}`}
                    className="w-full p-4 flex items-center justify-between text-left gap-3"
                  >
                    <span className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div 
                      id={`mobile-faq-answer-${faq.id}`}
                      className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 font-medium"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 
          =======================================================
          DESKTOP & TABLET VIEW (>= md):
          Two-column layout: Sticky Left "Browse Categories" panel.
          Right container shows ONLY the active category's 4 FAQs.
          Dynamic height matching content, with next section immediately following!
          =======================================================
        */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Sticky "Browse Categories" Panel */}
          <div className="md:col-span-4 sticky top-24 self-start space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-3 shadow-md shadow-stone-900/5 space-y-1.5">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between">
                <span>Browse Categories</span>
                <span className="text-emerald-600 font-mono text-[10px]">
                  Step 0{activeCategoryIndex + 1} / 03
                </span>
              </div>

              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = activeCategoryIndex === idx;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`w-full p-3 rounded-xl font-bold text-sm text-left flex items-center justify-between transition-all duration-300 group ${
                      isActive
                        ? "bg-brand-deep text-white shadow-md shadow-emerald-950/20 translate-x-1"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-brand-mint/20 text-brand-mint" 
                            : "bg-stone-100 text-stone-400 group-hover:text-stone-700"
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                      <span>{cat.label}</span>
                    </div>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600"
                      }`}
                    >
                      {cat.count} FAQs
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Need personalized help card */}
            <div className="bg-gradient-to-br from-[#0c221b] to-brand-deep text-white p-4.5 rounded-2xl border border-emerald-500/20 shadow-md">
              <div className="flex items-center gap-2 text-brand-mint text-xs font-bold mb-1">
                <HeadphonesIcon size={15} />
                <span>Unsure About Eligibility?</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed mb-2.5">
                Speak directly with a bank loan specialist for personalized evaluation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-mint hover:text-white transition-colors"
              >
                <span>Talk to Loan Officer</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* 
            RIGHT COLUMN: Shows ONLY the 4 FAQs of the Active Category!
            Does not show Process or Fees FAQs prematurely.
            Supports wheel scroll to smoothly cycle through categories.
          */}
          <div 
            onWheel={handleWheel}
            className="md:col-span-8"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <currentCategoryData.icon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-deep tracking-tight">
                    {currentCategoryData.label} FAQs
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Showing all {activeFaqs.length} questions for {currentCategoryData.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5" role="tablist" aria-label="FAQ category selector">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveCategoryIndex(i)}
                    aria-label={`Show ${cat.label} FAQs`}
                    aria-selected={i === activeCategoryIndex}
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-300 min-h-[24px] min-w-[24px] flex items-center justify-center ${
                      i === activeCategoryIndex ? "w-7 bg-brand-mint" : "w-2 bg-stone-200 hover:bg-stone-300"
                    }`}
                  >
                    <span className="sr-only">Show {cat.label} FAQs</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 
              The 4 FAQs of the ACTIVE category only:
              Smooth animated transition on category switch
            */}
            <div 
              key={activeCategory} 
              className="space-y-3 animate-faq-fade-in"
            >
              {activeFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-emerald-500/50 shadow-md shadow-emerald-950/5"
                        : "border-stone-200/80 shadow-xs hover:border-stone-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full p-4.5 flex items-center justify-between text-left gap-4 group"
                    >
                      <span className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-400 group-hover:bg-stone-200"
                        }`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <div
                      id={`faq-answer-${faq.id}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen
                          ? "max-h-[500px] px-4.5 pb-4.5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 opacity-100 font-medium"
                          : "max-h-0 py-0 opacity-0"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Global CSS for FAQ category transition */}
      <style jsx global>{`
        @keyframes faqFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-faq-fade-in {
          animation: faqFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
