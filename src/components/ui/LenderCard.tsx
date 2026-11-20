import Link from "next/link";
import { CheckCircle2, ExternalLink, Percent, FileText, ChevronRight, ShieldCheck, Clock } from "lucide-react";
import BankLogo from "@/components/ui/BankLogo";

export interface Lender {
  id: string;
  name: string;
  logo: string;
  interestRate: string;
  salariedRate?: string;
  selfEmployedRate?: string;
  rateType?: string;
  officialUrl?: string;
  processingFee: string;
  maxTenure: string;
  maxAmount: string;
  tags?: string[];
  type?: string;
}

export default function LenderCard({ lender }: { lender: Lender }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl p-5 md:p-6 lg:p-7 flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-center border border-slate-200/90 hover:border-brand-mint/60 shadow-lg shadow-slate-900/8 hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-2 hover:scale-[1.008] transition-all duration-300">
      
      {/* Top Radiant Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#86efac] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      {/* 1. Lender Logo & Name Header */}
      <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-start xl:items-center lg:text-left xl:text-center gap-3.5 lg:gap-2.5 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 lg:pr-6">
        <div className="shrink-0 transition-transform duration-300 group-hover:scale-108 group-hover:rotate-1">
          <BankLogo 
            name={lender.name} 
            logoUrl={lender.logo} 
            className="w-14 h-14 md:w-16 md:h-16 shadow-xs border border-slate-200/60 rounded-2xl p-1.5 bg-white" 
            size={64} 
          />
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-base md:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight truncate tracking-tight">
            {lender.name}
          </h3>
          
          <div className="flex flex-wrap gap-1 mt-1.5 justify-start xl:justify-center">
            {(lender.tags || ["Lowest Rate"]).map((tag, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs group-hover:bg-emerald-100/80 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {tag}
              </span>
            ))}
            {lender.type && (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {lender.type}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* 2. Key Metrics Grid with Frosted Hover Glow */}
      <div className="w-full lg:w-2/4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 text-left">
        
        {/* Metric 1: Starting ROI */}
        <div className="bg-slate-50/80 group-hover:bg-emerald-50/30 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:border-emerald-200/60 transition-all duration-300">
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-700 transition-colors mb-1">
            <Percent size={12} className="text-brand-mint" />
            <p className="text-[10px] uppercase tracking-wider font-bold">Starting ROI</p>
          </div>
          <p className="font-black text-lg md:text-xl text-emerald-600 tracking-tight leading-tight group-hover:scale-105 origin-left transition-transform">
            {lender.interestRate}
          </p>
          {lender.salariedRate && (
            <p className="text-[10px] text-slate-500 font-semibold mt-1 truncate">
              Sal: {lender.salariedRate}
            </p>
          )}
        </div>

        {/* Metric 2: Rate Sheet / Circular */}
        <div className="bg-slate-50/80 group-hover:bg-emerald-50/30 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:border-emerald-200/60 transition-all duration-300">
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-700 transition-colors mb-1">
            <FileText size={12} className="text-brand-mint" />
            <p className="text-[10px] uppercase tracking-wider font-bold">Rate Sheet</p>
          </div>
          <div className="mt-0.5">
            {lender.officialUrl ? (
              <a 
                href={lender.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/circ inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 hover:decoration-emerald-700 underline-offset-2 transition-colors"
              >
                <span>Circular</span>
                <ExternalLink size={11} className="group-hover/circ:translate-x-0.5 group-hover/circ:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span className="text-xs font-semibold text-slate-400">Standard</span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">
            {lender.rateType || "Floating ROI"}
          </p>
        </div>

        {/* Metric 3: Processing Fee */}
        <div className="bg-slate-50/80 group-hover:bg-emerald-50/30 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:border-emerald-200/60 transition-all duration-300">
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-700 transition-colors mb-1">
            <ShieldCheck size={12} className="text-brand-mint" />
            <p className="text-[10px] uppercase tracking-wider font-bold">Proc. Fee</p>
          </div>
          <p className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2">
            {lender.processingFee}
          </p>
        </div>

        {/* Metric 4: Max Tenure */}
        <div className="bg-slate-50/80 group-hover:bg-emerald-50/30 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:border-emerald-200/60 transition-all duration-300">
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-700 transition-colors mb-1">
            <Clock size={12} className="text-brand-mint" />
            <p className="text-[10px] uppercase tracking-wider font-bold">Max Tenure</p>
          </div>
          <p className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug">
            {lender.maxTenure}
          </p>
          {lender.maxAmount && (
            <p className="text-[10px] text-slate-500 font-medium mt-1 truncate">
              {lender.maxAmount}
            </p>
          )}
        </div>
      </div>
      
      {/* 3. Call to Action Button */}
      <div className="w-full lg:w-1/4 flex flex-col items-stretch lg:items-end justify-center pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
        <div className="inline-flex items-center justify-center lg:justify-end gap-1.5 text-xs text-emerald-700 font-bold mb-2.5">
          <CheckCircle2 size={14} className="text-brand-mint" />
          <span>Instant Pre-Approval</span>
        </div>
        <Link 
          href="/affordability" 
          className="group/btn w-full inline-flex items-center justify-center gap-2 bg-brand-deep text-white font-extrabold py-3 px-5 rounded-2xl hover:bg-emerald-700 hover:shadow-[0_10px_25px_-5px_rgba(7,153,116,0.35)] text-xs md:text-sm transition-all duration-300 active:scale-95"
        >
          <span>Check Eligibility</span>
          <ChevronRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform text-brand-mint" />
        </Link>
      </div>

    </div>
  );
}
