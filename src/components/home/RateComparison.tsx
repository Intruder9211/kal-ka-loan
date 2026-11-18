"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Percent, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight,
  TrendingDown,
  Building2
} from "lucide-react";
import fallbackLendersData from "@/data/lenders.json";
import BankLogo from "@/components/ui/BankLogo";

export default function RateComparison() {
  const [lenders, setLenders] = useState(fallbackLendersData);
  const [activeTab, setActiveTab] = useState<"all" | "top" | "lowest">("all");

  useEffect(() => {
    async function loadLenders() {
      try {
        const res = await fetch("/api/lenders");
        if (res.ok) {
          const data = await res.json();
          if (data.lenders && data.lenders.length > 0) {
            setLenders(data.lenders);
          }
        }
      } catch (e) {
        // Fallback to static lenders data
      }
    }
    loadLenders();
  }, []);

  const activeLenders = lenders.filter((l: any) => l.status !== "Inactive");

  // Dynamic sorting/filtering for sleek interactive tabs
  const filteredLenders = (() => {
    const list = [...activeLenders];
    if (activeTab === "lowest") {
      return list.sort((a, b) => {
        const rateA = parseFloat(a.interestRate?.replace(/[^0-9.]/g, "") || "99");
        const rateB = parseFloat(b.interestRate?.replace(/[^0-9.]/g, "") || "99");
        return rateA - rateB;
      });
    }
    if (activeTab === "top") {
      return list.filter((b) => ["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"].includes(b.name));
    }
    return list;
  })().slice(0, 8);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-stone-50/60 via-white to-stone-50/60 relative">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-mint/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 max-w-6xl relative z-10">
        {/* 
          Section Header:
          On mobile (< md): Sticky at top (top-14) with backdrop blur so it stays pinned while cards slide underneath!
          On desktop (>= md): Static normal header unchanged!
        */}
        <div className="md:static sticky top-14 sm:top-16 z-30 bg-stone-50/95 md:bg-transparent backdrop-blur-md pt-2 pb-3 mb-6 md:mb-12 text-center animate-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Verified Live Bank Sheet
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight">
            Compare <span className="text-emerald-600">Top Partner Banks</span>
          </h2>
          <p className="hidden sm:block text-xs sm:text-sm md:text-base text-stone-500 max-w-2xl mx-auto font-medium mt-1">
            Transparent interest rates and official circular sheets directly from India&apos;s leading RBI-approved institutions.
          </p>

          {/* Interactive Quick Filters */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-brand-deep text-white shadow-sm shadow-emerald-950/20"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              All ({activeLenders.length})
            </button>
            <button
              onClick={() => setActiveTab("lowest")}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1 ${
                activeTab === "lowest"
                  ? "bg-brand-deep text-white shadow-sm shadow-emerald-950/20"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <TrendingDown size={13} className="text-emerald-500" />
              Lowest ROI First
            </button>
            <button
              onClick={() => setActiveTab("top")}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1 ${
                activeTab === "top"
                  ? "bg-brand-deep text-white shadow-sm shadow-emerald-950/20"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <Building2 size={13} className="text-emerald-500" />
              Marquee Banks
            </button>
          </div>
        </div>

        {/* 
          Comparison Container:
          On mobile (< md): Spaced stacking flow where cards slide over one another sequentially in lower 75%
          On desktop (>= md): Classic single container table completely unchanged!
        */}
        <div className="flex flex-col gap-4 md:gap-0 md:bg-white md:rounded-2xl md:sm:rounded-3xl md:border md:border-stone-200/90 md:shadow-xl md:shadow-stone-900/5 md:overflow-hidden md:divide-y md:divide-stone-100 pb-16 md:pb-0">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-stone-50/90 border-b border-stone-200/80 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            <div className="col-span-4 flex items-center gap-1.5">
              <span>Lender / Institution</span>
            </div>
            <div className="col-span-3 text-center">Starting ROI (p.a.)</div>
            <div className="col-span-3 text-center">Official Rate Sheet</div>
            <div className="col-span-2 text-right">Instant Action</div>
          </div>

          {/* 
            Bank Cards / Rows:
            On mobile (< md): Sticky scroll stacking in lower 75% of screen (calc(22vh + offset))
            On desktop (>= md): Standard table rows unchanged!
          */}
          {filteredLenders.map((bank: any, index: number) => (
            <div
              key={bank.id || index}
              style={{
                // Mobile-only stacking offset (overridden by md:static on desktop)
                top: `calc(22vh + ${index * 8}px)`,
                zIndex: 10 + index,
              }}
              className="md:static sticky top-[22vh] md:top-auto z-10 md:z-auto bg-white rounded-2xl md:rounded-none border border-stone-200/90 md:border-none shadow-lg shadow-stone-900/10 md:shadow-none p-4 sm:p-5 lg:px-6 lg:py-4 hover:bg-emerald-50/30 transition-all duration-300 flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center relative group"
            >
              {/* 1. Bank Brand & Details */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <BankLogo
                    name={bank.name}
                    logoUrl={bank.logo}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-1 bg-white border border-stone-100 shadow-xs"
                    size={44}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm sm:text-base text-stone-900 truncate group-hover:text-emerald-900 transition-colors">
                    {bank.name}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="truncate">{bank.type || "Scheduled Bank"}</span>
                    <span>&bull;</span>
                    <span className="whitespace-nowrap">Up to {bank.maxTenure || "30 Years"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Sleek Starting ROI */}
              <div className="lg:col-span-3 mt-3 pt-2.5 border-t border-stone-100 lg:border-t-0 lg:pt-0 lg:mt-0 flex flex-row lg:flex-col justify-between lg:justify-center items-center">
                <span className="text-[11px] text-stone-400 font-medium lg:hidden flex items-center gap-1">
                  <Percent size={12} className="text-emerald-600" />
                  Starting ROI
                </span>

                <div className="text-right lg:text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-500/20 text-emerald-800 font-bold text-sm sm:text-base tracking-tight shadow-2xs group-hover:bg-emerald-100/70 group-hover:border-emerald-500/40 transition-all duration-300">
                    <span>{bank.interestRate}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                    {bank.salariedRate ? `Salaried: ${bank.salariedRate}` : "Floating p.a."}
                  </div>
                </div>
              </div>

              {/* 3. Official Rate Sheet Link & Processing Fee */}
              <div className="lg:col-span-3 mt-2.5 pt-2 border-t border-stone-100 lg:border-t-0 lg:pt-0 lg:mt-0 flex flex-row lg:flex-col justify-between lg:justify-center items-center">
                <span className="text-[11px] text-stone-400 font-medium lg:hidden">
                  Official Circular
                </span>
                <div className="text-right lg:text-center space-y-0.5">
                  {bank.officialUrl ? (
                    <a
                      href={bank.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200/60 px-2.5 py-1 rounded-md transition-all duration-200 group/link"
                    >
                      <span>Circular Sheet</span>
                      <ArrowUpRight size={11} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-stone-400 font-medium">Standard Guidelines</span>
                  )}

                  {bank.processingFee && (
                    <div className="text-[10px] text-stone-400 font-medium">
                      Fee: {bank.processingFee}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Action Button with smooth hover slide */}
              <div className="lg:col-span-2 mt-3 lg:mt-0 pt-2.5 border-t border-stone-100 lg:border-t-0 lg:pt-0 flex justify-end">
                <Link
                  href="/affordability"
                  className="w-full lg:w-auto text-center bg-brand-deep text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-900 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 group/btn"
                >
                  <span>Apply</span>
                  <ChevronRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/compare"
            className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200/90 text-stone-700 font-bold px-6 py-3 rounded-xl hover:bg-stone-50 hover:border-emerald-500/30 hover:text-emerald-900 transition-all duration-300 shadow-2xs text-xs sm:text-sm group"
          >
            <span>View All Partner Banks &amp; Comprehensive Rate Cards</span>
            <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
