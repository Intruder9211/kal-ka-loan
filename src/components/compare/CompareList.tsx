"use client";

import { useState, useMemo } from "react";
import LenderCard, { Lender } from "@/components/ui/LenderCard";

export default function CompareList({ initialLenders }: { initialLenders: Lender[] }) {
  const [sortBy, setSortBy] = useState("lowest_rate");

  const parseRate = (rateStr: string) => {
    if (!rateStr) return 999;
    // Extract first float number from strings like "7.25% – 10.25%" or "7.40%+"
    const match = rateStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 999;
  };

  const sortedLenders = useMemo(() => {
    const lenders = [...initialLenders];
    
    return lenders.sort((a, b) => {
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
  }, [initialLenders, sortBy]);

  return (
    <>
      {/* Filters/Sorting UI */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 animate-fade-up">
        <div className="text-sm font-medium text-gray-500 mb-4 md:mb-0">
          Showing <strong className="text-brand-deep">{initialLenders.length}</strong> Partner Banks & NBFCs
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg focus:ring-2 focus:ring-brand-mint focus:border-brand-mint block p-3 outline-none cursor-pointer"
          >
            <option value="lowest_rate">Sort by: Lowest Starting ROI</option>
            <option value="processing_fee">Sort by: Lowest Processing Fee</option>
            <option value="name">Sort by: Bank Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Lender Cards List */}
      <div className="space-y-4">
        {sortedLenders.map((lender, i) => (
          <div key={lender.id} className="animate-fade-up" style={{ animationDelay: (i * 80) + 'ms' }}>
            <LenderCard lender={lender} />
          </div>
        ))}
      </div>
    </>
  );
}
