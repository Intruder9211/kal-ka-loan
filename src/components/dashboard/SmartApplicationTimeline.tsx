"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  FileCheck, 
  Banknote,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface TimelineStage {
  id: number;
  title: string;
  shortLabel: string;
  icon: any;
  date: string;
  status: "completed" | "current" | "upcoming";
  completionPct: number;
  duration: string;
  description: string;
  action?: string;
  actionLink?: string;
}

export default function SmartApplicationTimeline() {
  const [selectedStageId, setSelectedStageId] = useState<number>(4);
  const [viewMode, setViewMode] = useState<"graph" | "steps">("graph");

  const timelineStages: TimelineStage[] = [
    { 
      id: 1, 
      title: "Application Started", 
      shortLabel: "Started",
      icon: FileText, 
      date: "Oct 01, 2026", 
      status: "completed",
      completionPct: 15,
      duration: "10 mins",
      description: "Digital profile created and initial home loan parameters registered."
    },
    { 
      id: 2, 
      title: "Application Submitted", 
      shortLabel: "Submitted",
      icon: CheckCircle2, 
      date: "Oct 02, 2026", 
      status: "completed",
      completionPct: 30,
      duration: "Same day",
      description: "Form validated and submitted to lead partner underwriting team."
    },
    { 
      id: 3, 
      title: "Under Review", 
      shortLabel: "In Review",
      icon: Clock, 
      date: "Oct 03, 2026", 
      status: "completed",
      completionPct: 45,
      duration: "24 Hours",
      description: "Primary credit appraisal and preliminary income eligibility assessed."
    },
    { 
      id: 4, 
      title: "Documents Required", 
      shortLabel: "Action Pending",
      icon: AlertCircle, 
      date: "Active Action", 
      status: "current",
      completionPct: 58,
      duration: "In Progress",
      description: "Last 3 months operative bank statements required for final debt-service FOIR ratio check.",
      action: "Upload Required Documents",
      actionLink: "/dashboard/documents"
    },
    { 
      id: 5, 
      title: "Documents Verified", 
      shortLabel: "Verification",
      icon: FileCheck, 
      date: "Estimated 24h", 
      status: "upcoming",
      completionPct: 75,
      duration: "Est. 24 Hrs",
      description: "Institutional legal and technical property title search valuation."
    },
    { 
      id: 6, 
      title: "Final Bank Sanction", 
      shortLabel: "Sanction",
      icon: CheckCircle, 
      date: "Estimated 48h", 
      status: "upcoming",
      completionPct: 90,
      duration: "Est. 48 Hrs",
      description: "Formal digital sanction letter issued with verified starting ROI."
    },
    { 
      id: 7, 
      title: "Loan Disbursed", 
      shortLabel: "Disbursal",
      icon: Banknote, 
      date: "Within 72h", 
      status: "upcoming",
      completionPct: 100,
      duration: "Est. 72 Hrs",
      description: "Direct fund credit transfer to builder or escrow account."
    }
  ];

  const currentStage = timelineStages.find(s => s.status === "current") || timelineStages[3];
  const selectedStage = timelineStages.find(s => s.id === selectedStageId) || currentStage;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xs overflow-hidden flex flex-col h-full hover:border-brand-mint/50 hover:shadow-md transition-all duration-300 w-full max-w-full">
      
      {/* Card Header with Graph / Steps Toggle */}
      <div className="border-b border-slate-100 bg-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">Application Timeline Graph</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Stage {currentStage.id} of {timelineStages.length} &bull; <strong className="text-emerald-700">{currentStage.completionPct}% Completed</strong>
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode("graph")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === "graph" 
                ? "bg-white text-slate-900 shadow-2xs" 
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Pipeline Graph
          </button>
          <button
            type="button"
            onClick={() => setViewMode("steps")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === "steps" 
                ? "bg-white text-slate-900 shadow-2xs" 
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Milestone Log
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        
        {viewMode === "graph" ? (
          <div className="space-y-6">
            
            {/* Top Interactive Metric Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 bg-slate-50/80 p-3 sm:p-3.5 rounded-2xl border border-slate-100">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 truncate">Current Velocity</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1 mt-0.5 truncate">
                  <Activity size={13} className="text-brand-mint shrink-0" /> <span className="truncate">Fast-Track</span>
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 truncate">Active Stage</p>
                <p className="text-xs sm:text-sm font-black text-amber-600 truncate mt-0.5">
                  Stage 04: Docs
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 truncate">Est. Disbursal</p>
                <p className="text-xs sm:text-sm font-black text-emerald-700 mt-0.5 truncate">
                  Within 72 Hrs
                </p>
              </div>
            </div>

            {/* Visual SVG Timeline Graph Track with horizontal overflow protection */}
            <div className="overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none w-full">
              <div className="min-w-[440px] sm:min-w-0 relative pt-4 pb-2">
                
                {/* Background Connecting Graph Line */}
                <div className="absolute top-[2.4rem] left-4 right-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-brand-mint to-emerald-400 transition-all duration-700 rounded-full"
                    style={{ width: `${currentStage.completionPct}%` }}
                  />
                </div>

                {/* Graphical Nodes */}
                <div className="relative z-10 flex items-center justify-between">
                  {timelineStages.map((stage) => {
                    const isSelected = stage.id === selectedStageId;
                    const isPast = stage.status === "completed";
                    const isCurrent = stage.status === "current";

                    let nodeBorder = "border-slate-200 bg-white text-slate-400";
                    if (isPast) nodeBorder = "border-emerald-500 bg-emerald-500 text-white shadow-xs";
                    if (isCurrent) nodeBorder = "border-brand-mint bg-white text-brand-mint ring-4 ring-brand-mint/20 shadow-md";

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setSelectedStageId(stage.id)}
                        className="group flex flex-col items-center focus:outline-none transition-transform hover:scale-105 cursor-pointer"
                        aria-label={`View stage ${stage.title}`}
                      >
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${nodeBorder} ${isSelected ? "scale-115 ring-2 ring-slate-900" : ""}`}>
                          {isPast ? (
                            <CheckCircle2 size={15} />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-ping" />
                          ) : (
                            <span>0{stage.id}</span>
                          )}
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-bold mt-2 truncate max-w-[54px] sm:max-w-[70px] text-center ${isCurrent ? "text-emerald-700 font-extrabold" : isPast ? "text-slate-700" : "text-slate-400"}`}>
                          {stage.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Stage Detail Insight Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-sm">
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-brand-mint border border-white/10">
                      Stage 0{selectedStage.id} of 07
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      Duration: {selectedStage.duration}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white break-words">
                    {selectedStage.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium break-words">
                    {selectedStage.description}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-mint flex items-center justify-center shrink-0 border border-white/10">
                  <selectedStage.icon size={20} />
                </div>
              </div>

              {selectedStage.action && selectedStage.actionLink && (
                <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>Action Required to Advance</span>
                  </span>
                  <Link 
                    href={selectedStage.actionLink}
                    className="inline-flex items-center justify-center gap-1.5 bg-brand-mint text-brand-deep font-extrabold text-xs px-3.5 py-2 rounded-xl hover:bg-white transition-colors w-full sm:w-auto"
                  >
                    <span>{selectedStage.action}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Step-by-Step Milestone Log View */
          <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
            {timelineStages.map((step, idx) => {
              const Icon = step.icon;
              const isPast = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <div 
                  key={step.id} 
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isCurrent 
                      ? "bg-emerald-50/50 border-emerald-300 shadow-xs" 
                      : isPast 
                      ? "bg-slate-50/70 border-slate-100" 
                      : "bg-white border-slate-100 opacity-60"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isPast 
                      ? "bg-emerald-500 text-white" 
                      : isCurrent 
                      ? "bg-brand-deep text-brand-mint animate-pulse" 
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? "text-emerald-900" : "text-slate-800"}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {step.description}
                    </p>
                    {step.action && isCurrent && (
                      <Link href={step.actionLink || "#"} className="inline-block mt-2">
                        <button className="text-xs bg-brand-deep text-brand-mint font-bold px-3 py-1 rounded-lg hover:bg-emerald-900 transition-colors">
                          {step.action} &rarr;
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Tracking ID: <strong className="text-slate-800 font-mono">MV-2026-HL948</strong></span>
          <Link href="/dashboard/applications" className="text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1">
            <span>View Full Log</span>
            <ChevronRight size={13} />
          </Link>
        </div>

      </div>

    </div>
  );
}
