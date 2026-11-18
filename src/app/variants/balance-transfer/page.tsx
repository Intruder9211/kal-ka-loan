import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, IndianRupee, ArrowRightLeft, TrendingDown, PiggyBank, Calculator } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import BalanceTransferCalculator from "@/components/calculators/BalanceTransferCalculator";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer | Lower Your EMI | Money Viora",
  description: "Transfer your existing home loan to a new lender with a lower interest rate. Save lakhs in interest and reduce your monthly EMI.",
};

export default function BalanceTransferPage() {
  return (
    <div className="flex-1 bg-white">
      
      {/* Hero Section */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl py-12 sm:py-16 md:py-20">
          {/* Ambient Glow & Radial Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep pointer-events-none" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-brand-mint/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-2xs backdrop-blur-sm">
                <TrendingDown size={16} />
                <span>Lower Your EMI Today</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.15]">
                Home Loan <span className="text-brand-mint">Balance Transfer</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed mb-8 max-w-xl">
                Paying a high interest rate on your current home loan? Transfer it to a new bank, lower your EMI, and save lakhs over your loan tenure.
              </p>
              
              <ul className="space-y-3.5 sm:space-y-4 mb-2">
                <li className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-brand-mint" size={15} />
                  </div>
                  <span>Rates starting from 7.25%</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-brand-mint" size={15} />
                  </div>
                  <span>Get Top-Up loan up to ₹1 Cr</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-brand-mint" size={15} />
                  </div>
                  <span>Minimal documentation required</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-5 relative" id="apply">
              <div className="absolute inset-0 bg-brand-mint/20 blur-[100px] rounded-full z-0 pointer-events-none" />
              <div className="relative z-10">
                <MultiStepLeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-3 sm:px-4 py-10 sm:py-14 md:py-20 text-center max-w-5xl">
        <div className="max-w-2xl mx-auto mb-6 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs backdrop-blur-sm">
            <Calculator size={13} />
            <span>Savings Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-2 sm:mb-3">
            Calculate Your <span className="text-brand-mint">Balance Transfer Savings</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            See in real time how much you can lower your monthly EMI and total interest outflow by transferring your existing loan to a lower rate.
          </p>
        </div>

        <BalanceTransferCalculator />
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <h2 className="text-3xl font-bold text-brand-deep mb-6">Why transfer your Home Loan?</h2>
        <p className="text-gray-600 text-lg mb-12">
          A Home Loan Balance Transfer allows you to move your outstanding principal amount to a different financial institution that offers a lower interest rate and better terms.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="card-interactive bg-brand-light p-6 rounded-xl">
            <div className="card-icon w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto text-brand-mint mb-4 shadow-sm border border-brand-mint/10">
              <TrendingDown size={28} />
            </div>
            <h3 className="font-bold mb-2 text-brand-deep">Lower EMI</h3>
            <p className="text-sm text-gray-600">Reduce your monthly financial burden significantly.</p>
          </div>
          <div className="card-interactive bg-brand-light p-6 rounded-xl">
            <div className="card-icon w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto text-brand-mint mb-4 shadow-sm border border-brand-mint/10">
              <PiggyBank size={28} />
            </div>
            <h3 className="font-bold mb-2 text-brand-deep">Save Interest</h3>
            <p className="text-sm text-gray-600">A 0.5% drop can save you lakhs over 20 years.</p>
          </div>
          <div className="card-interactive bg-brand-light p-6 rounded-xl">
            <div className="card-icon w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto text-brand-mint mb-4 shadow-sm border border-brand-mint/10">
              <Calculator size={28} />
            </div>
            <h3 className="font-bold mb-2 text-brand-deep">Better Terms</h3>
            <p className="text-sm text-gray-600">Negotiate better repayment terms and waiver of fees.</p>
          </div>
        </div>
        
        <div className="mt-16">
          <Link href="/compare" className="btn-interactive inline-block bg-brand-deep text-white font-bold px-8 py-4 rounded-full hover:bg-brand-mint hover:text-brand-deep">
            Compare Transfer Rates Now
          </Link>
        </div>
      </div>

    </div>
  );
}
