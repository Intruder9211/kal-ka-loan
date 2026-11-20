import Link from "next/link";
import { 
  Landmark, 
  Plus, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Percent, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function LoansPage() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Page Header Banner */}
      <div className="bg-brand-deep rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <span>Active Mortgage Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              My Active &amp; Sanctioned Loans
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Monitor active loan amortizations, download annual interest certificates for tax filing, and initiate zero-penalty part prepayments.
            </p>
          </div>

          <Link 
            href="/dashboard/applications/new" 
            className="bg-brand-mint text-brand-deep font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl hover:bg-white hover:shadow-[0_0_20px_rgba(117,232,122,0.4)] transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
          >
            <Plus size={16} />
            <span>Apply for New Loan</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Portfolio Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Loans</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">0</div>
          <span className="text-[10px] text-slate-500 font-medium">No active debt</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Sanctioned</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">₹0</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Zero balance</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Part-Payment Charge</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">NIL (₹0)</div>
          <span className="text-[10px] text-slate-500 font-medium">100% Free on floating ROI</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Starting Rate Available</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">7.25% p.a.</div>
          <span className="text-[10px] text-slate-500 font-medium">From top partner banks</span>
        </div>
      </div>

      {/* 3. Empty State with Modern Interactive Action Cards */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="h-16 w-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100 shadow-xs">
          <Landmark size={32} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-1">No active loans found</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed font-medium">
          When your loan application completes institutional legal and technical valuation and funds are disbursed, your live loan account, monthly amortization breakdown, and tax certificates will appear here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link 
            href="/dashboard/applications" 
            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-colors"
          >
            Check Application Status
          </Link>
          <Link 
            href="/compare" 
            className="px-6 py-2.5 bg-brand-deep text-brand-mint font-extrabold text-xs sm:text-sm rounded-xl hover:bg-slate-900 shadow-md transition-colors inline-flex items-center gap-1.5"
          >
            <span>Compare 30+ Bank Rates</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4. Borrower Entitlements & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <Percent size={18} />
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">Zero Foreclosure Penalties</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Per RBI mandates, individual floating-rate home loans carry 0% prepayment and foreclosure fees anytime during tenure.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-all">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
            <FileText size={18} />
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">IT Tax Rebate Certificates</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Download your annual provisional and final interest certificates to claim up to ₹5 Lakhs annual tax rebate under Sec 24b &amp; 80C.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-all">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <TrendingUp size={18} />
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">Low-Interest Balance Transfer</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Hold an expensive loan elsewhere? Switch to prime banks at 7.25% p.a. starting and save ₹3L to ₹8L in total interest.
          </p>
        </div>
      </div>

    </div>
  );
}
