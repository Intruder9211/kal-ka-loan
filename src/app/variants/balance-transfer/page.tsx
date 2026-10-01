import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, IndianRupee, ArrowRightLeft, TrendingDown, PiggyBank, Calculator } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer | Lower Your EMI | Kal Ka Loan",
  description: "Transfer your existing home loan to a new lender with a lower interest rate. Save lakhs in interest and reduce your monthly EMI.",
};

export default function BalanceTransferPage() {
  return (
    <div className="flex-1 bg-white">
      
      {/* Hero Section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-sm font-medium mb-6">
              <TrendingDown size={16} />
              <span>Lower Your EMI Today</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Home Loan <span className="text-brand-mint">Balance Transfer</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Paying a high interest rate on your current home loan? Transfer it to a new bank, lower your EMI, and save lakhs over your loan tenure.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Rates starting from 8.35%</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Get Top-Up loan up to ₹1 Cr</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Minimal documentation required</span>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10 text-brand-deep">
              <div className="text-center mb-6">
                <ArrowRightLeft size={48} className="mx-auto text-brand-mint mb-4" />
                <h3 className="text-2xl font-bold">Switch & Save</h3>
                <p className="text-sm text-gray-500">Find out how much you can save instantly.</p>
              </div>
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>

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
