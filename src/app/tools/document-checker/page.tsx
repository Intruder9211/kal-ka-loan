import DocumentReadinessChecker from "@/components/tools/DocumentReadinessChecker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Readiness Checker | Money Viora",
  description: "Check if your documents are ready for a home loan application. Avoid underwriting delays with our automated scanner.",
};

export default function DocumentCheckerPage() {
  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen pb-20">
      <div className="bg-brand-deep text-white py-12 md:py-20 relative overflow-hidden mb-10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Document <span className="text-brand-mint">Readiness Checker</span>
          </h1>
          <p className="text-lg text-gray-300">
            Ensure your salary slips, bank statements, and tax returns are consistent before submitting them to avoid bank underwriting delays.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <DocumentReadinessChecker />
      </div>
    </div>
  );
}
