import FinancialHealthView from "@/components/calculators/FinancialHealthView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Health & Affordability | Money Viora",
  description: "Get a comprehensive view of your home loan affordability range.",
};

export default function AffordabilityPage() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {/* Header / Hero Section */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white py-12 md:py-16 relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Your Financial <span className="text-brand-mint">Health View</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              See exactly how much you can comfortably afford before you start your application.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-20 max-w-6xl">
        <FinancialHealthView />
      </div>
    </div>
  );
}
