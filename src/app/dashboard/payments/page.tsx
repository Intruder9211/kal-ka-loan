import Link from "next/link";
import { 
  CreditCard, 
  CheckCircle2, 
  Calendar, 
  Percent, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building2,
  Clock,
  Sparkles
} from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-brand-deep rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <span>e-NACH Automated Clearing House</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              EMI Repayments &amp; Prepayments
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Manage automatic monthly NACH deductions, make instant lump-sum principal part-payments, and download payment receipts.
            </p>
          </div>

          <Link 
            href="/calculators?tab=prepayment" 
            className="bg-brand-mint text-brand-deep font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl hover:bg-white hover:shadow-[0_0_20px_rgba(117,232,122,0.4)] transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
          >
            <Zap size={16} />
            <span>Prepayment Savings Calculator</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Next Scheduled EMI</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">₹0</div>
          <span className="text-[10px] text-slate-500 font-medium">No upcoming due date</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">e-NACH Auto-Debit</span>
          <div className="text-base sm:text-lg font-black text-slate-700 mt-1">Not Enrolled</div>
          <span className="text-[10px] text-slate-400 font-medium">Activated upon disbursal</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Part-Payment Fee</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">0% (Free)</div>
          <span className="text-[10px] text-slate-500 font-medium">RBI zero-fee protection</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Default Charges</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">₹0.00</div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Clean Credit</span>
        </div>
      </div>

      {/* 3. Empty State Card */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="h-16 w-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100 shadow-xs">
          <CreditCard size={32} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-1">No upcoming EMIs or dues</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed font-medium">
          You currently have no active loan requiring monthly payments. Once a loan is sanctioned and disbursed, your EMI schedules, auto-debit mandate status, and payment receipts will appear here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link 
            href="/dashboard/applications" 
            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-colors"
          >
            Check Loan Application
          </Link>
          <Link 
            href="/calculators" 
            className="px-6 py-2.5 bg-brand-deep text-brand-mint font-extrabold text-xs sm:text-sm rounded-xl hover:bg-slate-900 shadow-md transition-colors inline-flex items-center gap-1.5"
          >
            <span>Plan EMI with Calculator</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4. Payment Security & e-NACH Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck size={18} className="text-brand-mint" />
            <h4 className="font-extrabold text-sm text-slate-900">Direct Bank Mandates (e-NACH)</h4>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            All repayments are routed through NPCI-regulated electronic clearing mandates. Automated debits take place on your chosen monthly cycle date (e.g. 5th or 10th of every month).
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Sparkles size={18} className="text-brand-mint" />
            <h4 className="font-extrabold text-sm text-slate-900">Flexible Prepayment Facility</h4>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Pay any extra amount anytime towards your loan principal without visiting a branch. Direct principal reduction immediately lowers your overall interest burden and tenure.
          </p>
        </div>
      </div>

    </div>
  );
}
