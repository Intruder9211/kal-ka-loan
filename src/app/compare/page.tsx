import { Suspense } from "react";
import CompareResultsClient from "@/components/calculators/CompareResultsClient";

export const metadata = {
  title: "Compare Loan Options | Money Viora",
  description: "Compare your personalized loan options and apply instantly.",
};

export default function ComparePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Your <span className="text-brand-mint">Personalized Matches</span>
          </h1>
          <p className="text-lg text-gray-300">
            Based on your financial profile, we've analyzed options across our top partner banks. Compare the rates, EMI, and fees to make an informed decision.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20 pb-20">
        {/* Client component to handle search params and data fetching safely */}
        <Suspense fallback={
          <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-200">
            <div className="w-16 h-16 border-4 border-brand-mint/30 border-t-brand-mint rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your profile...</h3>
            <p className="text-gray-500">Matching you with 30+ lenders in our database</p>
          </div>
        }>
          <CompareResultsClient />
        </Suspense>

        {/* Disclaimer / Additional Info */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-brand-deep mb-3">Things to keep in mind</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Interest rates mentioned are "starting from" and depend on your CIBIL score, loan amount, and profile.</li>
            <li>Processing fees may be subject to GST at applicable rates (usually 18%).</li>
            <li>These recommendations are estimates based on your provided inputs. Final approval is subject to lender underwriting.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
