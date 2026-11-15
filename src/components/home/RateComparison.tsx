"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Percent, ChevronRight, ExternalLink } from "lucide-react";
import fallbackLendersData from "@/data/lenders.json";
import BankLogo from "@/components/ui/BankLogo";

export default function RateComparison() {
  const [lenders, setLenders] = useState(fallbackLendersData);

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
        // Fallback
      }
    }
    loadLenders();
  }, []);

  const activeLenders = lenders.filter((l: any) => l.status !== "Inactive");
  const tableData = activeLenders.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Bank ROI Sheet
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6">
            Compare <span className="text-brand-mint">Top Banks</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Stop guessing. Real-time lowest live interest rates and official circular rate sheets from India&apos;s leading lenders.
          </p>
        </div>
        
        {/* Comparison Table / Cards */}
        <div className="flex flex-col gap-4 md:gap-0 md:bg-white md:rounded-3xl md:shadow-sm md:border md:border-slate-200 md:overflow-hidden animate-fade-up stagger-1">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">Lender / Institution</div>
            <div className="col-span-3 text-center">Starting ROI (p.a.)</div>
            <div className="col-span-3 text-center">Official Circular</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Bank Rows / Mobile Stacking Cards */}
          {tableData.map((bank: any, index: number) => (
            <div 
              key={bank.id} 
              style={{
                top: `${4.5 + index * 0.4}rem`,
                zIndex: 10 + index,
              }}
              className="mobile-bank-card-stack bg-white rounded-2xl md:rounded-none border border-slate-200/90 md:border-none md:border-b md:border-slate-100 p-5 md:px-8 md:py-5 hover:bg-slate-50/70 transition-all shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] md:shadow-none flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center"
            >
              {/* 1. Bank Brand & Details */}
              <div className="lg:col-span-4 flex items-center gap-3.5">
                <BankLogo 
                  name={bank.name} 
                  logoUrl={bank.logo} 
                  className="w-12 h-12 md:w-13 md:h-13" 
                  size={52} 
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-base md:text-lg text-slate-900 truncate">
                    {bank.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                    <span>{bank.type || "Private Bank"}</span>
                    <span>•</span>
                    <span>{bank.maxTenure || "30 Years"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Starting ROI & Category Rates */}
              <div className="lg:col-span-3 mt-4 pt-3 border-t border-slate-100 lg:border-t-0 lg:pt-0 lg:mt-0 flex flex-row lg:flex-col justify-between lg:justify-center items-center">
                <span className="text-xs text-slate-400 font-semibold lg:hidden flex items-center gap-1">
                  <Percent size={13} /> Starting ROI
                </span>
                <div className="text-right lg:text-center">
                  <div className="font-black text-xl md:text-2xl text-emerald-600 tracking-tight">
                    {bank.interestRate}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {bank.salariedRate ? `Salaried: ${bank.salariedRate}` : "Per Annum (Floating)"}
                  </div>
                </div>
              </div>

              {/* 3. Official Rate Sheet Link & Processing Fee */}
              <div className="lg:col-span-3 mt-3 pt-3 border-t border-slate-100 lg:border-t-0 lg:pt-0 lg:mt-0 flex flex-row lg:flex-col justify-between lg:justify-center items-center">
                <span className="text-xs text-slate-400 font-semibold lg:hidden">
                  Official Rate Sheet
                </span>
                <div className="text-right lg:text-center space-y-1">
                  {bank.officialUrl ? (
                    <a 
                      href={bank.officialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Rate Sheet <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Standard Guidelines</span>
                  )}
                  {bank.processingFee && (
                    <div className="text-[11px] text-slate-400">
                      Fee: {bank.processingFee}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Action CTA */}
              <div className="lg:col-span-2 mt-4 lg:mt-0 pt-3 border-t border-slate-100 lg:border-t-0 lg:pt-0 flex justify-end">
                <Link 
                  href="/affordability" 
                  className="w-full lg:w-auto text-center bg-brand-deep text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all shadow-xs flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  Apply Now <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link 
            href="/compare" 
            className="btn-interactive inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-7 py-3.5 rounded-xl hover:bg-slate-50 transition-all shadow-xs text-sm md:text-base"
          >
            View All Partner Banks & Full Rate Cards
          </Link>
        </div>
      </div>
    </section>
  );
}
