import FinancialHealthView from "@/components/calculators/FinancialHealthView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Health & Affordability | Money Viora",
  description: "Get a comprehensive view of your home loan affordability range.",
};

export default function AffordabilityPage() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-deep text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Your Financial <span className="text-brand-mint">Health View</span>
          </h1>
          <p className="text-slate-300">
            See exactly how much you can comfortably afford before you start your application.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-6 relative z-20 max-w-6xl">
        <FinancialHealthView />
      </div>
    </div>
  );
}
