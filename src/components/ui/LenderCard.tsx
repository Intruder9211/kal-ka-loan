import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
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
    <div className="card-interactive bg-white rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-center group border border-slate-200/90 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md">
      
      {/* 1. Lender Logo & Name Header */}
      <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:justify-center gap-3.5 lg:gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 lg:pr-6">
        <BankLogo 
          name={lender.name} 
          logoUrl={lender.logo} 
          className="w-13 h-13 md:w-14 md:h-14" 
          size={56} 
        />
        <div className="text-left lg:text-center min-w-0 flex-1">
          <h3 className="font-extrabold text-base md:text-lg text-brand-deep leading-tight truncate">
            {lender.name}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1.5 justify-start lg:justify-center">
            {(lender.tags || ["Lowest Rate"]).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* 2. Lender Key Metrics Grid */}
      <div className="w-full lg:w-2/4 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 text-left">
        <div className="bg-slate-50/60 lg:bg-transparent p-3 lg:p-0 rounded-xl">
          <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">Starting ROI</p>
          <p className="font-extrabold text-lg md:text-xl text-emerald-600 mt-0.5">{lender.interestRate}</p>
          {lender.salariedRate && (
            <p className="text-[10px] text-gray-500 mt-0.5 truncate">Sal: {lender.salariedRate}</p>
          )}
        </div>

        <div className="bg-slate-50/60 lg:bg-transparent p-3 lg:p-0 rounded-xl">
          <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">Rate Sheet</p>
          <div className="mt-1">
            {lender.officialUrl ? (
              <a 
                href={lender.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
              >
                Circular <ExternalLink size={11} />
              </a>
            ) : (
              <span className="text-xs text-gray-400">Standard</span>
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">{lender.rateType || "Floating"}</p>
        </div>

        <div className="bg-slate-50/60 lg:bg-transparent p-3 lg:p-0 rounded-xl">
          <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">Processing Fee</p>
          <p className="font-bold text-xs text-gray-800 mt-1">{lender.processingFee}</p>
        </div>

        <div className="bg-slate-50/60 lg:bg-transparent p-3 lg:p-0 rounded-xl">
          <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">Max Tenure</p>
          <p className="font-bold text-xs text-gray-800 mt-1">{lender.maxTenure}</p>
        </div>
      </div>
      
      {/* 3. Call to Action */}
      <div className="w-full lg:w-1/4 flex flex-col items-stretch lg:items-end justify-center pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
        <div className="flex items-center justify-center lg:justify-end gap-1.5 text-xs text-emerald-600 font-bold mb-2.5">
          <CheckCircle2 size={14} /> Instant Pre-Approval
        </div>
        <Link 
          href="/affordability" 
          className="btn-interactive w-full text-center bg-brand-deep text-white font-bold py-2.5 px-5 rounded-xl hover:bg-slate-800 hover:text-white hover:shadow-md text-xs md:text-sm transition-all"
        >
          Check Eligibility
        </Link>
      </div>

    </div>
  );
}
