import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, IndianRupee, Percent } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";

export const metadata: Metadata = {
  title: "Home Loan - Interest Rates, Eligibility & Documents | Kal Ka Loan",
  description: "Get complete details about home loans in India. Check eligibility, view required documents, and apply online for the lowest interest rates.",
};

export default function HomeLoanPage() {
  return (
    <div className="flex-1 bg-white">
      
      {/* Hero Section */}
      <div className="bg-brand-deep text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Everything about <span className="text-brand-mint">Home Loans</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Unlock the door to your dream home. We help you compare top banks, get the lowest interest rates starting at 8.35% p.a., and sanction your loan within 48 hours.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Percent className="text-brand-mint mb-2" />
                <div className="font-bold text-xl">8.35%</div>
                <div className="text-xs text-gray-400">Starting Rate</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <IndianRupee className="text-brand-mint mb-2" />
                <div className="font-bold text-xl">₹10 Cr</div>
                <div className="text-xs text-gray-400">Max Amount</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block" id="apply">
            <MultiStepLeadForm />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12 prose prose-brand max-w-none">
            
            <section>
              <h2 className="text-3xl font-bold text-brand-deep mb-4">What is a Home Loan?</h2>
              <p className="text-gray-600 leading-relaxed">
                A home loan is a secured loan provided by banks and housing finance companies (HFCs) to help you purchase a house or flat, construct a house on a plot, or renovate/extend an existing property. The property itself serves as collateral.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-brand-deep mb-6">Eligibility Criteria</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card-interactive bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-2">Age</h3>
                  <p className="text-sm text-gray-600">21 to 65 years (at loan maturity)</p>
                </div>
                <div className="card-interactive bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-2">Income</h3>
                  <p className="text-sm text-gray-600">Minimum ₹25,000 net monthly salary (Salaried) or ₹3 Lakhs ITR (Self-Employed)</p>
                </div>
                <div className="card-interactive bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-2">CIBIL Score</h3>
                  <p className="text-sm text-gray-600">750 or above for the best interest rates.</p>
                </div>
                <div className="card-interactive bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-2">Employment</h3>
                  <p className="text-sm text-gray-600">Minimum 2 years of work experience.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-brand-deep mb-4">Required Documents</h2>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-brand-mint/20 p-2 rounded-full text-brand-deep"><FileText size={20} /></div>
                  <div>
                    <strong className="block text-brand-deep">KYC Documents</strong>
                    <span className="text-gray-600 text-sm">PAN Card, Aadhaar Card, Passport, or Voter ID.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-brand-mint/20 p-2 rounded-full text-brand-deep"><IndianRupee size={20} /></div>
                  <div>
                    <strong className="block text-brand-deep">Income Proof (Salaried)</strong>
                    <span className="text-gray-600 text-sm">Last 3 months salary slips, Form 16, and last 6 months bank statements.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-brand-mint/20 p-2 rounded-full text-brand-deep"><IndianRupee size={20} /></div>
                  <div>
                    <strong className="block text-brand-deep">Income Proof (Self-Employed)</strong>
                    <span className="text-gray-600 text-sm">ITR for last 2 years, Profit & Loss statement, Balance Sheet, and Business Proof.</span>
                  </div>
                </li>
              </ul>
            </section>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="md:hidden" id="apply-mobile">
              <MultiStepLeadForm />
            </div>

            <div className="bg-brand-light rounded-2xl p-8 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-xl text-brand-deep mb-4">Why choose Kal Ka Loan?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 size={20} className="text-brand-mint shrink-0" />
                  <span className="text-sm text-gray-700">Compare 50+ Banks & NBFCs</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={20} className="text-brand-mint shrink-0" />
                  <span className="text-sm text-gray-700">Dedicated Relationship Manager</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={20} className="text-brand-mint shrink-0" />
                  <span className="text-sm text-gray-700">Zero Convenience Fee from you</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={20} className="text-brand-mint shrink-0" />
                  <span className="text-sm text-gray-700">Doorstep Document Collection</span>
                </li>
              </ul>
              
              <Link href="/compare" className="link-underline block w-full text-center mt-8 text-brand-deep font-bold">
                View All Partners &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
