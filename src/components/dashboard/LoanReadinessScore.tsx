"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  UploadCloud, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  RefreshCw, 
  Info,
  ChevronRight,
  Gauge
} from "lucide-react";
import Link from "next/link";

interface ReadinessCriterion {
  id: string;
  label: string;
  category: string;
  weight: number;
  status: "passed" | "action_needed" | "optional";
  insight: string;
  actionText?: string;
  actionLink?: string;
}

export default function LoanReadinessScore() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [criteria, setCriteria] = useState<ReadinessCriterion[]>([
    { 
      id: "kyc", 
      label: "KYC & Identity Verification", 
      category: "Identity",
      weight: 20, 
      status: "passed", 
      insight: "Aadhaar & PAN matched with NSDL database." 
    },
    { 
      id: "credit", 
      label: "CIBIL Score Benchmark (750+)", 
      category: "Credit Health",
      weight: 25, 
      status: "passed", 
      insight: "Estimated 775+ score unlocks prime 7.25% ROI rate cards." 
    },
    { 
      id: "foir", 
      label: "Debt-to-Income (FOIR) Check", 
      category: "Underwriting",
      weight: 20, 
      status: "passed", 
      insight: "Current fixed obligations are under 38% of net monthly income." 
    },
    { 
      id: "banking", 
      label: "6-Month Operative Banking Records", 
      category: "Financials",
      weight: 20, 
      status: "action_needed", 
      insight: "Last 3 months uploaded; 3 additional months needed to complete full 6-mo credit audit.",
      actionText: "Upload Missing Months",
      actionLink: "/dashboard/documents"
    },
    { 
      id: "property", 
      label: "Property Legal & Title Chain", 
      category: "Collateral",
      weight: 15, 
      status: "action_needed", 
      insight: "Sale agreement draft uploaded; builder NOC pending.",
      actionText: "Submit NOC",
      actionLink: "/dashboard/documents"
    }
  ]);

  // Calculate live score based on criteria status
  const currentScore = criteria.reduce((sum, item) => {
    if (item.status === "passed") return sum + item.weight;
    if (item.status === "optional") return sum + Math.round(item.weight / 2);
    return sum;
  }, 0);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 900);
  };

  const getScoreTier = (score: number) => {
    if (score >= 85) return { label: "Prime Sanction Ready", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 65) return { label: "High Approval Probability", color: "text-brand-deep", bg: "bg-brand-mint/15", border: "border-brand-mint/30" };
    return { label: "Action Needed for Sanction", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" };
  };

  const tier = getScoreTier(currentScore);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xs overflow-hidden flex flex-col h-full hover:border-brand-mint/50 hover:shadow-md transition-all duration-300 w-full max-w-full">
      
      {/* Header with Run Check Button */}
      <div className="border-b border-slate-100 bg-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-brand-mint" />
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">Loan Readiness Score Check</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Automated multi-bank underwriting audit
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all active:scale-95 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={isAuditing ? "animate-spin text-brand-mint" : "text-slate-500"} />
          <span>{isAuditing ? "Auditing..." : "Re-Check Score"}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
        
        {/* Score Gauge & Tier Banner */}
        <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-4">
          
          {/* Circular Visual Gauge */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress arc */}
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${currentScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-black text-xl text-slate-900 leading-none">{currentScore}</span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Score</span>
              </div>
            </div>

            <div className="min-w-0">
              <span className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tier.bg} ${tier.color} ${tier.border} mb-1`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="truncate">{tier.label}</span>
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs break-words">
                Your profile qualifies for instant digital sanctions at Tier-1 partner banks.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto shrink-0 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Sanction Potential</span>
            <span className="font-black text-base sm:text-lg text-emerald-700">Up to ₹1.25 Cr</span>
            <span className="text-[10px] text-slate-500 block font-medium">At 7.25% p.a. starting</span>
          </div>

        </div>

        {/* 5-Pillar Live Underwriting Checklist */}
        <div className="space-y-2.5">
          <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
            Institutional Audit Checklist ({criteria.filter(c => c.status === "passed").length}/{criteria.length} Verified)
          </p>

          <div className="space-y-2">
            {criteria.map((item) => (
              <div 
                key={item.id} 
                className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-2.5 ${
                  item.status === "passed"
                    ? "bg-slate-50/60 border-slate-100 hover:bg-white"
                    : "bg-amber-50/40 border-amber-200/80 shadow-2xs"
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  {item.status === "passed" ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle size={13} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-800 break-words">
                        {item.label}
                      </h4>
                      <span className="text-[9px] uppercase font-semibold text-slate-400 bg-white px-1.5 py-0.2 rounded border border-slate-100 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium break-words">
                      {item.insight}
                    </p>
                  </div>
                </div>

                {item.actionText && item.actionLink && (
                  <Link 
                    href={item.actionLink}
                    className="shrink-0 text-[11px] font-bold text-brand-deep bg-brand-mint/20 hover:bg-brand-mint hover:text-white px-2.5 py-1 rounded-lg transition-colors border border-brand-mint/30 whitespace-nowrap self-center"
                  >
                    {item.actionText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-medium min-w-0">
            <Sparkles size={16} className="text-emerald-700 shrink-0" />
            <span className="break-words">Complete remaining 2 checks to bump score to <strong className="font-black text-emerald-800">95%</strong> and unlock ₹15L extra sanction.</span>
          </div>
          <Link
            href="/dashboard/documents"
            className="shrink-0 font-extrabold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-0.5 self-start sm:self-auto"
          >
            <span>Fix Now</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>

    </div>
  );
}
