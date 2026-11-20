import { Suspense } from "react";
import CompareResultsClient from "@/components/calculators/CompareResultsClient";
import CompareList from "@/components/compare/CompareList";
import { readFile } from "fs/promises";
import path from "path";
import { Percent, ShieldCheck, Clock, FileCheck2, Info } from "lucide-react";

export const metadata = {
  title: "Compare Bank Home Loan ROI & Rates 2026 | Money Viora",
  description: "Live comparison of interest rates from India's top banks & NBFCs including Bajaj Housing Finance, HDFC Bank, ICICI Bank, Axis Bank, and more.",
};

async function getLenders() {
  try {
    const dataFilePath = path.join(process.cwd(), "src/data/lenders.json");
    const raw = await readFile(dataFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export default async function ComparePage() {
  const allLenders = await getLenders();

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header / Hero Section with Modern Ambient Glows & Staggered Elements */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white py-12 sm:py-16 md:py-20 relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
          {/* Ambient Radial Glows */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep pointer-events-none" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-brand-mint/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-5 sm:px-6 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-6 shadow-2xs backdrop-blur-sm animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
              <span>Verified Rate Sheets & Official Circulars 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 leading-[1.15] animate-fade-up stagger-1">
              Compare <span className="text-brand-mint">Bank Home Loan Rates</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed mb-8 sm:mb-10 animate-fade-up stagger-2">
              Transparent live comparison of starting interest rates, salaried vs self-employed tiers, processing charges, and official bank circulars across 30+ lenders.
            </p>

            {/* Quick Feature Pillars - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto animate-fade-up stagger-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:border-brand-mint/40 hover:bg-white/10 transition-all duration-300">
                <Percent size={18} className="text-brand-mint mx-auto mb-1.5" />
                <div className="font-black text-sm sm:text-base text-white">7.25% p.a.</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Starting ROI</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:border-brand-mint/40 hover:bg-white/10 transition-all duration-300">
                <ShieldCheck size={18} className="text-brand-mint mx-auto mb-1.5" />
                <div className="font-black text-sm sm:text-base text-white">30+ Lenders</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Banks & NBFCs</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:border-brand-mint/40 hover:bg-white/10 transition-all duration-300">
                <Clock size={18} className="text-brand-mint mx-auto mb-1.5" />
                <div className="font-black text-sm sm:text-base text-white">Up to 30 Yrs</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Max Tenure</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:border-brand-mint/40 hover:bg-white/10 transition-all duration-300">
                <FileCheck2 size={18} className="text-brand-mint mx-auto mb-1.5" />
                <div className="font-black text-sm sm:text-base text-white">100% Live</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Official Circulars</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-6xl mt-4 sm:mt-6 relative z-20 pb-20">
        
        {/* Dynamic Calculation Recommendations (When Query Params exist) */}
        <Suspense fallback={
          <div className="bg-white rounded-3xl shadow-sm p-8 text-center border border-slate-200 mb-8 animate-card-cascade">
            <div className="w-10 h-10 border-4 border-brand-mint/30 border-t-brand-mint rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm font-semibold">Retrieving personalized loan matches...</p>
          </div>
        }>
          <CompareResultsClient />
        </Suspense>

        {/* Live Bank Rate Cards with Cascading Entrance & Modern Controls */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Percent size={13} className="text-brand-mint" />
                <span>Transparent Comparison</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Live Bank Rate Cards & Official Circulars
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Click &lsquo;Circular&rsquo; on any lender to view published rate documentation.
            </p>
          </div>

          <CompareList initialLenders={allLenders} />
        </div>

        {/* Modern Disclaimer & Best Practices Accordion Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2.5 text-brand-deep font-black text-base sm:text-lg mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Info size={18} />
            </div>
            <h3>Important Information for Borrowers</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-mint shrink-0 mt-1.5" />
              <p>Interest rates shown are &ldquo;starting from&rdquo; benchmarks linked to borrower CIBIL score (750+ typically unlocks premier rates).</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-mint shrink-0 mt-1.5" />
              <p>Click on <strong>Official Circular</strong> to access direct bank-published policy notices and rate notifications.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-mint shrink-0 mt-1.5" />
              <p>Statutory processing fees and valuation fees may be subject to standard GST (typically 18%).</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-mint shrink-0 mt-1.5" />
              <p>Final loan sanction, sanctioned LTV, and risk spread remain subject to individual lender credit appraisal.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
