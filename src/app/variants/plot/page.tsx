import type { Metadata } from "next";
import { CheckCircle2, MapPin, Hammer, Home } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import EmiCalculator from "@/components/calculators/EmiCalculator";

export const metadata: Metadata = {
  title: "Plot & Construction Loan | Kal Ka Loan",
  description: "Finance the purchase of a plot and the construction of your dream home.",
};

export default function PlotLoanPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-sm font-medium mb-6">
              <Hammer size={16} />
              <span>Build Your Dream Home</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Plot & <span className="text-brand-mint">Construction Loan</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Buy a plot of land and construct your house exactly the way you want it. We provide composite loans covering both plot purchase and construction.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Up to 80% funding on plot + construction</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-mint" size={20} />
                <span>Flexible disbursement based on construction stage</span>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10 text-brand-deep">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Apply Now</h3>
              </div>
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-deep mb-4">Plot & Construction EMI Calculator</h2>
          </div>
          <EmiCalculator />
        </div>
      </section>
    </div>
  );
}
