import DocumentReadinessChecker from "@/components/tools/DocumentReadinessChecker";
import type { Metadata } from "next";
import { ShieldCheck, FileCheck2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Document Vault & AI Verification | Money Viora Dashboard",
  description: "Securely upload and pre-audit your loan documents with instant AI validation.",
};

export default function DashboardDocumentsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Executive Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-xl border border-slate-800/80">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5" /> AI Pre-Underwriting Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Document Vault & Verification</h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Pre-audit your salary slips, ITRs, and bank statements before bank submission to prevent underwriting rejection delays.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Encryption</div>
              <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="h-4 w-4" /> 256-Bit Vault
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <DocumentReadinessChecker />
      </div>
    </div>
  );
}
