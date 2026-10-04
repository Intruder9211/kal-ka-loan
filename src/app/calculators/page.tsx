import CalculatorsAccordion from "@/components/calculators/CalculatorsAccordion";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator | Money Viora",
  description: "Calculate your home loan EMI instantly. Use our sliders to adjust principal, interest rate, and tenure.",
};

export default function CalculatorsPage() {
  return (
    <div className="flex-1 bg-gray-50/50">
      {/* Header section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Smart <span className="text-brand-mint">Calculators</span>
          </h1>
          <p className="text-lg text-gray-300">
            Plan your home loan better. Adjust the sliders below to see how your EMI and total interest change based on the loan amount and tenure.
          </p>
        </div>
      </div>

      {/* Calculators Accordion Container */}
      <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        <Suspense fallback={<div>Loading calculators...</div>}>
          <CalculatorsAccordion />
        </Suspense>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-brand max-w-none">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">How is Home Loan EMI Calculated?</h2>
          <p className="text-gray-600 mb-4">
            Equated Monthly Installment (EMI) is the amount payable every month to the bank until the loan amount is fully paid off. It consists of the interest on loan as well as part of the principal amount to be repaid.
          </p>
          <p className="text-gray-600 mb-6">
            The mathematical formula to calculate EMI is: <strong>EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
            <li><strong>P</strong> = Principal loan amount</li>
            <li><strong>r</strong> = Rate of interest calculated on monthly basis (i.e., r = Rate of Annual interest/12/100)</li>
            <li><strong>n</strong> = Loan tenure in months</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
