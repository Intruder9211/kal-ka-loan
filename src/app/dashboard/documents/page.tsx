import DocumentReadinessChecker from "@/components/tools/DocumentReadinessChecker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Documents | Money Viora Dashboard",
  description: "Upload and verify your loan documents.",
};

export default function DashboardDocumentsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">My Documents</h2>
          <p className="text-slate-400 font-medium">
            Upload, manage, and verify your loan documents to ensure a smooth application process.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <DocumentReadinessChecker />
      </div>
    </div>
  );
}
