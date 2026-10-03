import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Wallet, Banknote } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import EmiCalculator from "@/components/calculators/EmiCalculator";

export const metadata: Metadata = {
  title: "Top-Up Home Loan | Money Viora",
  description: "Get additional funds on your existing home loan at low interest rates.",
};

export default function TopUpLoanPage() {
  return (
    <div className="flex-1 bg-white">
      
      {/* Hero Section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-sm font-medium mb-6">
              <TrendingUp size={16} />
              <span>Get Extra Funds Today</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Home Loan <span className="text-brand-mint">Top-Up</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Need funds for home renovation, wedding, or education? Get a top-up on your existing home loan at much lower rates than a personal loan.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Rates starting from 8.50%</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Longer repayment tenure up to 15 years</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>No end-use restriction</span>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10 text-brand-deep">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Check Eligibility</h3>
                <p className="text-sm text-gray-500">Find out how much you can borrow instantly.</p>
              </div>
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <h2 className="text-3xl font-bold text-brand-deep mb-6">Why choose a Top-Up Loan?</h2>
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          <div className="bg-brand-light p-6 rounded-xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-brand-deep mb-4 shadow-sm">
              <Banknote size={24} />
            </div>
            <h3 className="font-bold mb-2">Lower Rates</h3>
            <p className="text-sm text-gray-600">Cheaper than personal loans or credit cards.</p>
          </div>
          <div className="bg-brand-light p-6 rounded-xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-brand-deep mb-4 shadow-sm">
              <Wallet size={24} />
            </div>
            <h3 className="font-bold mb-2">Easy Processing</h3>
            <p className="text-sm text-gray-600">Minimal documentation since you're an existing customer.</p>
          </div>
          <div className="bg-brand-light p-6 rounded-xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-brand-deep mb-4 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-bold mb-2">Tax Benefits</h3>
            <p className="text-sm text-gray-600">Available if used for home renovation/construction.</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-deep mb-4">Plan Your Top-Up EMI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Use our calculator to see how much your monthly outgo will be.</p>
          </div>
          <EmiCalculator />
        </div>
      </section>
    </div>
  );
}
