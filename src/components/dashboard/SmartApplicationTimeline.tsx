"use client";

import { CheckCircle2, Clock, FileText, AlertCircle, CheckCircle, FileCheck, Banknote } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SmartApplicationTimeline() {
  const currentStep = 4; // "Documents Required" is the current active step
  
  const timelineSteps = [
    { id: 1, title: "Application Started", icon: FileText, date: "Oct 01, 2026", status: "completed" },
    { id: 2, title: "Application Submitted", icon: CheckCircle2, date: "Oct 02, 2026", status: "completed" },
    { id: 3, title: "Under Review", icon: Clock, date: "Oct 03, 2026", status: "completed" },
    { 
      id: 4, 
      title: "Documents Required", 
      icon: AlertCircle, 
      date: "Action Pending", 
      status: "current",
      action: "Upload PAN Card",
      actionLink: "/dashboard/documents"
    },
    { id: 5, title: "Documents Verified", icon: FileCheck, date: "Pending", status: "upcoming" },
    { id: 6, title: "Approved", icon: CheckCircle, date: "Pending", status: "upcoming" },
    { id: 7, title: "Disbursed", icon: Banknote, date: "Pending", status: "upcoming" }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">Application Timeline</h3>
        <Link href="/dashboard/applications" className="text-sm text-brand-mint hover:underline flex items-center gap-1 font-medium">
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="p-6 overflow-y-auto max-h-[400px]">
        <div className="space-y-6">
          {timelineSteps.map((step, index) => {
            const isLast = index === timelineSteps.length - 1;
            
            let circleStyle = "";
            let iconStyle = "";
            let lineStyle = "";
            
            if (step.status === "completed") {
              circleStyle = "bg-brand-mint border-brand-mint text-brand-deep";
              lineStyle = "bg-brand-mint";
            } else if (step.status === "current") {
              circleStyle = "bg-white border-2 border-brand-mint text-brand-mint shadow-[0_0_10px_rgba(7,153,116,0.2)]";
              lineStyle = "bg-slate-200";
            } else {
              circleStyle = "bg-slate-100 border-slate-200 text-slate-400";
              lineStyle = "bg-slate-100";
            }

            const Icon = step.icon;

            return (
              <div key={step.id} className="relative flex gap-4">
                {!isLast && (
                  <div className={`absolute left-4 top-10 -bottom-6 w-0.5 ${lineStyle} -ml-[1px]`}></div>
                )}
                
                <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${circleStyle}`}>
                  <Icon size={14} className="font-bold" />
                </div>
                
                <div className="pt-1.5 pb-2">
                  <h4 className={`text-sm font-semibold ${step.status === 'current' ? 'text-brand-mint' : (step.status === 'completed' ? 'text-slate-800' : 'text-slate-500')}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                  
                  {step.action && step.status === "current" && (
                    <Link href={step.actionLink || "#"}>
                      <button className="mt-3 text-xs bg-brand-mint/10 text-brand-deep font-bold px-4 py-2 rounded-lg border border-brand-mint/20 hover:bg-brand-mint hover:text-white transition-colors">
                        {step.action}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
