import type { Metadata } from "next";
import { promises as fs } from 'fs';
import path from 'path';
import LenderCard, { Lender } from "@/components/ui/LenderCard";
import CompareList from "@/components/compare/CompareList";

export const metadata: Metadata = {
  title: "Compare Home Loan Offers & Interest Rates | Kal Ka Loan",
  description: "Compare home loan interest rates, processing fees, and eligibility across top banks and NBFCs in India like HDFC, SBI, ICICI, and Axis.",
};

export default async function ComparePage() {
  // Read JSON data
  const lendersPath = path.join(process.cwd(), 'src/data/lenders.json');
  const fileContents = await fs.readFile(lendersPath, 'utf8');
  const lenders: Lender[] = JSON.parse(fileContents);

  return (
    <div className="flex-1 bg-gray-50/50">
      
      {/* Header section */}
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Compare <span className="text-brand-mint">Top Lenders</span>
          </h1>
          <p className="text-lg text-gray-300">
            Compare the latest interest rates and processing fees from India's leading banks and NBFCs. Find the right partner for your dream home.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Interactive Sorting and List */}
        <CompareList initialLenders={lenders} />

        {/* Disclaimer / Additional Info */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <h3 className="text-lg font-bold text-brand-deep mb-3">Things to keep in mind</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Interest rates mentioned are "starting from" and depend on your CIBIL score, loan amount, and profile.</li>
            <li>Processing fees may be subject to GST at applicable rates (usually 18%).</li>
            <li>Some banks offer special concessions for women co-applicants (usually 0.05% lower rate).</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
