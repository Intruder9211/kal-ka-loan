"use client";

import { useState, useMemo } from "react";
import LenderCard, { Lender } from "@/components/ui/LenderCard";
import { Search, SlidersHorizontal, Sparkles, Building2, X } from "lucide-react";

export default function CompareList({ initialLenders }: { initialLenders: Lender[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "sub-8" | "private" | "public" | "nbfc">("all");
  const [sortBy, setSortBy] = useState("lowest_rate");

  const parseRate = (rateStr: string) => {
    if (!rateStr) return 999;
    const match = rateStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 999;
  };

  const filteredAndSortedLenders = useMemo(() => {
    let list = [...initialLenders];

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(l => 
        l.name.toLowerCase().includes(q) || 
        (l.type && l.type.toLowerCase().includes(q)) ||
        (l.tags && l.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // 2. Quick Category Filter
    if (activeFilter === "sub-8") {
      list = list.filter(l => parseRate(l.interestRate) < 8.0);
    } else if (activeFilter === "private") {
      list = list.filter(l => (l.type || "").toLowerCase().includes("private"));
    } else if (activeFilter === "public") {
      list = list.filter(l => (l.type || "").toLowerCase().includes("public"));
    } else if (activeFilter === "nbfc") {
      list = list.filter(l => (l.type || "").toLowerCase().includes("nbfc") || (l.type || "").toLowerCase().includes("hfc"));
    }

    // 3. Sorting
    return list.sort((a, b) => {
      const rateA = parseRate(a.interestRate);
      const rateB = parseRate(b.interestRate);
      
      if (sortBy === "lowest_rate") {
        return rateA - rateB;
      }
      
      if (sortBy === "processing_fee") {
        const feeA = (a.processingFee || "").toLowerCase().includes("nil") ? 0 : 1;
        const feeB = (b.processingFee || "").toLowerCase().includes("nil") ? 0 : 1;
        return feeA - feeB;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [initialLenders, searchQuery, activeFilter, sortBy]);

  const filterKey = `${searchQuery}-${activeFilter}-${sortBy}`;

  return (
    <div className="space-y-6">
      
      {/* Modern Filter & Search Control Center */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/90 mb-6">
        
        {/* Top Row: Search Input & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
          
          {/* Live Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bank e.g. HDFC, SBI, Bajaj, Axis..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-mint/50 focus:border-brand-mint outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={15} className="text-slate-400 hidden sm:block" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl focus:ring-2 focus:ring-brand-mint/40 focus:border-brand-mint block py-2.5 px-3.5 outline-none cursor-pointer transition-all"
            >
              <option value="lowest_rate">Sort by: Lowest Starting ROI</option>
              <option value="processing_fee">Sort by: Nil / Lowest Proc. Fee</option>
              <option value="name">Sort by: Bank Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Quick Filter Category Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Lenders" },
              { id: "sub-8", label: "Under 8.00% ROI" },
              { id: "private", label: "Private Banks" },
              { id: "public", label: "Public Sector" },
              { id: "nbfc", label: "HFCs & NBFCs" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-brand-deep text-brand-mint shadow-xs scale-102 border border-brand-deep"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing <strong className="text-brand-deep">{filteredAndSortedLenders.length}</strong> Partner Lenders</span>
          </div>
        </div>

      </div>

      {/* Lender Cards Sticky Stacking Deck ("cards one by one upr aate jaye") */}
      <div className="flex flex-col gap-4 sm:gap-5 pb-36 sm:pb-48 relative">
        {filteredAndSortedLenders.length > 0 ? (
          filteredAndSortedLenders.map((lender, i) => (
            <div 
              key={`${lender.id}-${filterKey}-${i}`}
              style={{
                top: `calc(5.25rem + ${Math.min(i * 12, 160)}px)`,
                zIndex: 10 + i,
              }}
              className="sticky transition-all duration-300 hover:!z-40"
            >
              <LenderCard lender={lender} />
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Building2 size={28} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">No matching banks found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
              We couldn&apos;t find any partner banks matching &ldquo;{searchQuery}&rdquo;. Try clearing your search query or switching filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="inline-flex items-center gap-2 bg-brand-deep text-brand-mint font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-all text-xs"
            >
              <Sparkles size={14} /> Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
