"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  FileWarning, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  CheckCheck,
  Clock,
  Sparkles
} from "lucide-react";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "action" | "milestone">("all");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "action",
      title: "Action Required: Bank Statement Upload",
      desc: "HDFC Bank credit underwriting requires last 3 months operative bank statements showing salary credits to issue final in-principle approval.",
      time: "2 hours ago",
      unread: true,
      actionText: "Upload Statements",
      actionLink: "/dashboard/documents",
      category: "Document Request"
    },
    {
      id: "2",
      type: "milestone",
      title: "Aadhaar & PAN Identity KYC Cleared",
      desc: "Your identity documents have been authenticated with the government NSDL database with 100% verification score.",
      time: "Yesterday at 4:30 PM",
      unread: false,
      category: "KYC Verification"
    },
    {
      id: "3",
      type: "milestone",
      title: "Application Logged: Ref #MV-2026-HL948",
      desc: "Your primary home loan enquiry has been matched with 3 top partner banks offering starting rates from 7.25% p.a.",
      time: "Oct 01, 2026",
      unread: false,
      actionText: "View Application",
      actionLink: "/dashboard/applications",
      category: "Application Milestone"
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-brand-deep rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <span>Real-Time Alert Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Notifications &amp; Security Alerts
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Stay informed on underwriter document requests, legal clearance milestones, and formal sanction updates.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="bg-white/10 hover:bg-white text-white hover:text-brand-deep text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCheck size={16} />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Filter Tabs & Status Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-brand-deep text-brand-mint shadow-xs border border-brand-deep"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            All Updates ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("action")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === "action"
                ? "bg-brand-deep text-brand-mint shadow-xs border border-brand-deep"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Action Required</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("milestone")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "milestone"
                ? "bg-brand-deep text-brand-mint shadow-xs border border-brand-deep"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            Milestones &amp; Clearances
          </button>
        </div>

        <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{unreadCount} unread alert{unreadCount === 1 ? "" : "s"}</span>
        </div>
      </div>

      {/* 3. Notifications Feed */}
      <div className="space-y-4">
        {filteredNotifications.map((n) => {
          const isAction = n.type === "action";
          return (
            <div
              key={n.id}
              className={`group relative overflow-hidden rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col sm:flex-row items-start justify-between gap-4 ${
                n.unread 
                  ? "bg-white border-amber-300 shadow-md ring-1 ring-amber-200" 
                  : "bg-white border-slate-200/90 shadow-2xs hover:border-brand-mint/50 hover:shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                  isAction 
                    ? "bg-amber-500 text-white" 
                    : "bg-emerald-600 text-white"
                }`}>
                  {isAction ? <FileWarning size={20} /> : <ShieldCheck size={20} />}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isAction 
                        ? "bg-amber-100 text-amber-800 border border-amber-200" 
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}>
                      {n.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={11} />
                      <span>{n.time}</span>
                    </span>
                    {n.unread && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-brand-deep text-brand-mint px-2 py-0.2 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1 max-w-2xl">
                    {n.desc}
                  </p>
                </div>
              </div>

              {n.actionText && n.actionLink && (
                <Link
                  href={n.actionLink}
                  className={`shrink-0 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto ${
                    isAction
                      ? "bg-slate-900 hover:bg-amber-600 text-white"
                      : "bg-brand-deep hover:bg-emerald-800 text-brand-mint hover:text-white"
                  }`}
                >
                  <span>{n.actionText}</span>
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
