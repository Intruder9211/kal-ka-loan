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
      interestRange: "8.35% - 8.55%",
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
    <div className="space-y-6 mt-12">
      <div className="flex items-center gap-3">
        <div className="bg-brand-mint/20 p-2 rounded-lg">
          <Sparkles className="h-6 w-6 text-brand-mint" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Personalized Loan Matches</h2>
          <p className="text-slate-500">Based on your profile, here are the best options you are eligible for.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`relative rounded-2xl border ${rec.isTopMatch ? 'border-brand-mint bg-white shadow-lg shadow-brand-mint/5' : 'border-slate-200 bg-white shadow-sm'} overflow-hidden transition-all hover:shadow-md`}
          >
            {rec.isTopMatch && (
              <div className="absolute top-0 right-0 bg-brand-mint text-brand-deep text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                <Sparkles size={12} /> TOP MATCH
              </div>
            )}
            
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${rec.bankColor} text-white flex items-center justify-center font-bold text-xl`}>
                  {rec.bankLogo}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{rec.bankName} Home Loan</h3>
                  <p className="text-sm text-brand-mint font-medium">{rec.matchReason}</p>
                </div>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-1">Eligible Amount</p>
                  <p className="text-xl font-extrabold text-slate-900 flex items-center">
                    <IndianRupee size={18} className="text-slate-400 mr-1" />
                    {rec.eligibleAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-1">Estimated EMI</p>
                  <p className="text-xl font-extrabold text-slate-900 flex items-center">
                    <IndianRupee size={18} className="text-slate-400 mr-1" />
                    {rec.estimatedEmi.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Percent size={16} /> Interest Rate</span>
                  <span className="font-semibold text-slate-800">{rec.interestRange}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Clock size={16} /> Max Tenure</span>
                  <span className="font-semibold text-slate-800">{rec.tenure}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Building size={16} /> Processing Fee</span>
                  <span className="font-semibold text-slate-800">{rec.processingFee}</span>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Required Documents</p>
                <div className="flex flex-wrap gap-2">
                  {rec.requiredDocs.map((doc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                      <FileText size={12} /> {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/dashboard/apply" 
                className="w-full btn-interactive flex items-center justify-center gap-2 bg-brand-deep text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Proceed with this Loan <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
