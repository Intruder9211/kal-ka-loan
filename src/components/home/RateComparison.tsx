import Link from "next/link";
import { Building, Percent, Wallet, Clock, ChevronRight } from "lucide-react";
import lendersData from "@/data/lenders.json";

export default function RateComparison() {
  const tableData = lendersData.slice(0, 5);

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Compare <span className="text-brand-mint">Top Banks</span></h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Stop guessing. We've compiled the lowest live interest rates from India's top lenders.</p>
        </div>
        
        {/* Responsive Comparison Grid */}
        <div className="flex flex-col gap-4 animate-fade-up stagger-1">
          
          {/* Desktop Table Header (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-8 py-4 bg-white rounded-t-2xl border-b border-slate-100 text-sm font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-1">Lender</div>
            <div className="col-span-1 text-center">Interest Rate</div>
            <div className="col-span-1 text-center">Processing Fee</div>
            <div className="col-span-1 text-center">Max Tenure</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Bank Cards / Rows */}
          <div className="flex flex-col gap-4 md:gap-0 md:bg-white md:rounded-b-2xl md:shadow-sm md:border md:border-slate-100 md:border-t-0 md:overflow-hidden">
            {tableData.map((bank, i) => (
              <div 
                key={bank.id} 
                className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-4 items-center p-6 md:p-8 bg-white rounded-2xl md:rounded-none border border-slate-200 md:border-none md:border-b md:border-slate-50 hover:bg-slate-50 transition-colors shadow-sm md:shadow-none"
              >
                {/* Bank Name */}
                <div className="col-span-1 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Building size={20} className="text-slate-400" />
                  </div>
                  <div className="font-bold text-lg text-slate-900">{bank.name}</div>
                </div>

                {/* Interest Rate */}
                <div className="col-span-1 flex md:flex-col justify-between md:justify-center items-center md:items-center">
                  <div className="text-xs text-slate-400 font-medium md:hidden flex items-center gap-1"><Percent size={14}/> Interest Rate</div>
                  <div className="font-extrabold text-2xl text-brand-mint">{bank.interestRate}</div>
                  <div className="text-[10px] text-slate-400 uppercase hidden md:block mt-1">Per Annum</div>
                </div>

                {/* Processing Fee */}
                <div className="col-span-1 flex md:flex-col justify-between md:justify-center items-center md:items-center pt-3 border-t border-slate-100 md:border-t-0 md:pt-0">
                  <div className="text-xs text-slate-400 font-medium md:hidden flex items-center gap-1"><Wallet size={14}/> Processing Fee</div>
                  <div className="font-semibold text-slate-700 text-right md:text-center">{bank.processingFee}</div>
                </div>

                {/* Max Tenure */}
                <div className="col-span-1 flex md:flex-col justify-between md:justify-center items-center md:items-center pt-3 border-t border-slate-100 md:border-t-0 md:pt-0">
                  <div className="text-xs text-slate-400 font-medium md:hidden flex items-center gap-1"><Clock size={14}/> Max Tenure</div>
                  <div className="font-semibold text-slate-700">{bank.maxTenure}</div>
                </div>

                {/* Action CTA */}
                <div className="col-span-1 mt-4 md:mt-0 flex justify-end">
                  <Link 
                    href="/affordability" 
                    className="w-full md:w-auto text-center bg-brand-deep text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-mint hover:text-brand-deep transition-colors shadow-sm flex items-center justify-center gap-2 group"
                  >
                    Check Eligibility <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/compare" className="btn-interactive inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            View All 30+ Banks
          </Link>
        </div>
      </div>
    </section>
  );
}
