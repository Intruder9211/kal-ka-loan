import { Suspense } from "react";
import CompareResultsClient from "@/components/calculators/CompareResultsClient";
import CompareList from "@/components/compare/CompareList";
import { readFile } from "fs/promises";
import path from "path";

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
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-brand-mint text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Official Circulars & Live ROI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Compare <span className="text-brand-mint">Bank Home Loan Rates</span>
          </h1>
          <p className="text-lg text-gray-300">
            Compare official interest rates, salaried vs self-employed tiers, and rate sheet circulars across leading lenders in India.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20 pb-20">
        {/* Dynamic calculation results when URL has query params */}
        <Suspense fallback={
          <div className="bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200 mb-8">
            <div className="w-10 h-10 border-4 border-brand-mint/30 border-t-brand-mint rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm">Checking personalized loan matches...</p>
          </div>
        }>
          <CompareResultsClient />
        </Suspense>

        {/* Dynamic Full List of All Partner Banks from Admin ROI System */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Live Bank Rate Cards & Official Circulars</h2>
          <p className="text-sm text-slate-500 mb-6">
            Directly synced with official circulars and real-time bank rate sheets.
          </p>
          <CompareList initialLenders={allLenders} />
        </div>

        {/* Disclaimer / Additional Info */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-brand-deep mb-3">Things to keep in mind</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Interest rates mentioned are "starting from" and depend on your CIBIL score, loan amount, and employment profile.</li>
            <li>Click on <strong>Official Circular</strong> to view the bank&apos;s published rate sheet.</li>
            <li>Processing fees may be subject to GST at applicable rates (usually 18%).</li>
            <li>Final approval and applicable spread/markup are subject to the respective lender&apos;s credit underwriting.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
