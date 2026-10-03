"use client";

import { CheckCircle2, AlertTriangle, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function LoanReadinessScore() {
  const score = 80;
  
  const checklist = [
    { id: 1, label: "Profile completed", status: "complete" },
    { id: 2, label: "Mobile verified", status: "complete" },
    { id: 3, label: "PAN uploaded", status: "complete" },
    { id: 4, label: "Income details completed", status: "complete" },
    { id: 5, label: "Bank statement required", status: "pending" }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">Loan Readiness Score</h3>
        <span className="text-sm font-bold text-brand-deep">{score}%</span>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">Application Readiness</span>
            <span className="text-brand-deep font-bold">{score}% Ready</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div 
              className="bg-brand-mint h-2.5 rounded-full" 
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-4 mb-6 flex-1">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              {item.status === "complete" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              )}
              <span className={`text-sm ${item.status === 'complete' ? 'text-slate-600 line-through opacity-70' : 'text-slate-800 font-medium'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Link 
          href="/dashboard/documents" 
          className="w-full btn-interactive flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-2.5 rounded-lg hover:bg-slate-800 transition-colors mt-auto"
        >
          <UploadCloud size={18} /> Complete Pending Steps
        </Link>
      </div>
    </div>
  );
}
