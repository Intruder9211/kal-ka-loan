"use client";

import { CheckCircle2, ChevronRight, FileText, IndianRupee, Percent, Sparkles, Building, Clock } from "lucide-react";
import Link from "next/link";

export default function PersonalizedRecommendations() {
  // In a real app, this would be calculated based on the user's profile from the database
  const recommendations = [
    {
      id: "hdfc-premium",
      bankName: "HDFC Bank",
      bankLogo: "H",
      bankColor: "bg-blue-600",
      eligibleAmount: 4500000,
      estimatedEmi: 39500,
      interestRange: "7.45% - 8.55%",
      tenure: "20 Years",
      processingFee: "₹2,999 (Special Waiver)",
      matchReason: "Best match for your salaried profile (>₹75k/month) with zero pre-closure charges.",
      requiredDocs: ["PAN Card", "Last 3 Months Salary Slips", "6 Months Bank Statement"],
      isTopMatch: true,
    },
    {
      id: "sbi-regular",
      bankName: "State Bank of India",
      bankLogo: "S",
      bankColor: "bg-sky-500",
      eligibleAmount: 4200000,
      estimatedEmi: 36800,
      interestRange: "8.40% - 8.60%",
      tenure: "20 Years",
      processingFee: "0.35% of Loan Amount",
      matchReason: "Highest approval probability based on your Tier-1 city location.",
      requiredDocs: ["Aadhar Card", "Form 16", "Property Allotment Letter"],
      isTopMatch: false,
    }
  ];

  return (
    <div className="space-y-6 mt-8 sm:mt-12 w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="bg-brand-mint/20 p-2 rounded-xl shrink-0">
          <Sparkles className="h-6 w-6 text-brand-mint" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">Personalized Loan Matches</h2>
          <p className="text-xs sm:text-sm text-slate-500">Based on your profile, here are the best options you are eligible for.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 w-full">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`relative rounded-3xl border ${rec.isTopMatch ? 'border-brand-mint bg-white shadow-lg shadow-brand-mint/5' : 'border-slate-200 bg-white shadow-sm'} overflow-hidden transition-all hover:shadow-md min-w-0 w-full`}
          >
            {rec.isTopMatch && (
              <div className="absolute top-0 right-0 bg-brand-mint text-brand-deep text-[11px] font-black px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-xs">
                <Sparkles size={12} /> TOP MATCH
              </div>
            )}
            
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${rec.bankColor} text-white flex items-center justify-center font-bold text-lg sm:text-xl shrink-0 shadow-xs`}>
                  {rec.bankLogo}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 truncate">{rec.bankName} Home Loan</h3>
                  <p className="text-xs sm:text-sm text-brand-deep font-medium line-clamp-1">{rec.matchReason}</p>
                </div>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 min-w-0">
                  <p className="text-[11px] text-slate-500 font-semibold mb-0.5 truncate">Eligible Amount</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900 flex items-center truncate">
                    <IndianRupee size={16} className="text-slate-400 mr-0.5 shrink-0" />
                    <span className="truncate">{rec.eligibleAmount.toLocaleString('en-IN')}</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 min-w-0">
                  <p className="text-[11px] text-slate-500 font-semibold mb-0.5 truncate">Estimated EMI</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900 flex items-center truncate">
                    <IndianRupee size={16} className="text-slate-400 mr-0.5 shrink-0" />
                    <span className="truncate">{rec.estimatedEmi.toLocaleString('en-IN')}</span>
                  </p>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2.5 mb-5 sm:mb-6 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 gap-2">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0"><Percent size={14} /> Interest Rate</span>
                  <span className="font-bold text-slate-800 text-right">{rec.interestRange}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 gap-2">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0"><Clock size={14} /> Max Tenure</span>
                  <span className="font-bold text-slate-800 text-right">{rec.tenure}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 gap-2">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0"><Building size={14} /> Processing Fee</span>
                  <span className="font-bold text-slate-800 text-right">{rec.processingFee}</span>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-5 sm:mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Required Documents</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {rec.requiredDocs.map((doc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                      <FileText size={12} className="shrink-0" /> <span>{doc}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/dashboard/applications/new" 
                className="w-full flex items-center justify-center gap-2 bg-brand-deep hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-xl transition-all shadow-xs active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <span>Proceed with this Loan</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
