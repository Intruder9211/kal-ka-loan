"use client"

import { useState, useEffect } from "react"
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Send, 
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Sparkles,
  BarChart2,
  ChevronRight,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { updateLeadStatus, updateApplicationStatus } from "@/app/actions/admin"

export interface OverviewItem {
  id: string
  type: "APPLICATION" | "DOORSTEP" | "LEAD" | "CONTACT"
  name: string
  contact: string
  amount: string
  rawAmount: number
  status: string
  city: string
  date: string
  rawDate: number
  link: string
  rawMobile?: string
}

interface OverviewVisualsProps {
  totalSubmissions: number
  totalLeadsCount: number
  totalAppsCount: number
  doorstepCount: number
  pendingActionCount: number
  pendingLeadsCount: number
  pendingAppsCount: number
  liveVisitors: number
  totalPipelineVolume: number
  formattedPipelineVolume: string
  recentItems: OverviewItem[]
  pendingFollowUps: {
    id: string
    name: string
    mobile: string
    city: string
    amount: string
    date: string
  }[]
}

export default function AdminOverviewVisuals({
  totalSubmissions,
  totalLeadsCount,
  totalAppsCount,
  doorstepCount,
  pendingActionCount,
  pendingLeadsCount,
  pendingAppsCount,
  liveVisitors,
  totalPipelineVolume,
  formattedPipelineVolume,
  recentItems,
  pendingFollowUps,
}: OverviewVisualsProps) {
  const router = useRouter()
  const [filterType, setFilterType] = useState<"ALL" | "APPLICATION" | "DOORSTEP" | "LEAD">("ALL")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefreshSecs, setAutoRefreshSecs] = useState(30)
  const [activeChartTab, setActiveChartTab] = useState<"velocity" | "distribution">("velocity")

  // Auto-refresh countdown to keep dashboard live with real inquiries
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoRefreshSecs((prev) => {
        if (prev <= 1) {
          router.refresh()
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => {
      setIsRefreshing(false)
      setAutoRefreshSecs(30)
    }, 600)
  }

  // Quick Status change directly from the dashboard overview
  const handleQuickStatus = async (item: OverviewItem, newStatus: string) => {
    if (item.type === "APPLICATION") {
      await updateApplicationStatus(item.id, newStatus)
    } else {
      await updateLeadStatus(item.id, newStatus)
    }
    router.refresh()
  }

  const filteredItems = recentItems.filter((item) => {
    if (filterType === "ALL") return true
    if (filterType === "DOORSTEP") return item.type === "DOORSTEP"
    if (filterType === "APPLICATION") return item.type === "APPLICATION"
    return item.type === "LEAD" || item.type === "CONTACT"
  })

  // Format Doorstep Ratio
  const doorstepRatio = totalSubmissions > 0 ? Math.round((doorstepCount / totalSubmissions) * 100) : 0
  const actionUrgencyRatio = totalSubmissions > 0 ? Math.min(Math.round((pendingActionCount / totalSubmissions) * 100), 100) : 0

  return (
    <div className="space-y-8">
      {/* Header with Live Engine Telemetry */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Database Connected
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Auto-sync in {autoRefreshSecs}s
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Executive Command Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline metrics, doorstep visit bookings, and live visitor conversions.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="Refresh database live sync"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
            {isRefreshing ? "Syncing..." : "Sync Now"}
          </button>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-slate-900/10 active:scale-95"
          >
            Manage Leads ({totalLeadsCount})
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-blue-600/10 active:scale-95"
          >
            Applications ({totalAppsCount})
          </Link>
        </div>
      </div>

      {/* 5 Distinct Visual KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        
        {/* 1. Total Submissions - Mini Sparkline Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Submissions</span>
            <div className="h-9 w-9 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-slate-900 tracking-tight">{totalSubmissions}</div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">100% Real</span>
          </div>
          {/* Mini Sparkline Graphic */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[11px] font-medium text-slate-500">
              {totalLeadsCount} Leads &bull; {totalAppsCount} Full Apps
            </div>
            <svg className="w-16 h-5 text-blue-500 overflow-visible" viewBox="0 0 60 20">
              <path d="M0,15 Q15,5 30,12 T60,4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 2. Doorstep Visits - Radial Ring Presentation */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Doorstep Visits</span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-black text-emerald-600 tracking-tight">{doorstepCount}</div>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">At-home appointments</p>
            </div>
            {/* Circular Progress Gauge */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90">
                <circle cx="24" cy="24" r="18" stroke="#f1f5f9" strokeWidth="3.5" fill="none" />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="18" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeDasharray="113" 
                  strokeDashoffset={113 - (113 * (doorstepRatio || 25)) / 100}
                  strokeLinecap="round"
                  fill="none" 
                />
              </svg>
              <span className="absolute text-[10px] font-black text-emerald-700">{doorstepRatio}%</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Direct home consultation
          </div>
        </div>

        {/* 3. Action Required - Priority Radar Bar Presentation */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action Required</span>
            <div className="h-9 w-9 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-amber-600 tracking-tight">{pendingActionCount}</div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {pendingLeadsCount} New &bull; {pendingAppsCount} Review
            </span>
          </div>
          {/* Urgency Progress Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(actionUrgencyRatio, 15)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1.5">
              <span>Attention Needed</span>
              <span>{pendingActionCount} tasks</span>
            </div>
          </div>
        </div>

        {/* 4. Live Visitors - Pulse Velocity Wave */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Visitors</span>
            <div className="h-9 w-9 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-slate-900 tracking-tight">{liveVisitors}</div>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" /> Active
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Unique Site Sessions</span>
            <span className="text-[11px] font-bold text-indigo-600">Real Tracking</span>
          </div>
        </div>

        {/* 5. Pipeline Volume - Executive Stacked Currency Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="flex items-center justify-between pb-3 relative z-10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pipeline Volume</span>
            <div className="h-9 w-9 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white relative z-10 tracking-tight">
            {formattedPipelineVolume}
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between relative z-10 text-[11px]">
            <span className="text-slate-400 font-medium">Total Loan Demand</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> Live Demand
            </span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Graph Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Loan Inflow &amp; Conversion Pipeline</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Graphical breakdown of incoming website leads vs verified full applications
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveChartTab("velocity")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeChartTab === "velocity" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Pipeline Velocity
            </button>
            <button
              onClick={() => setActiveChartTab("distribution")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeChartTab === "distribution" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Category Share
            </button>
          </div>
        </div>

        {/* Graphical Representation */}
        {activeChartTab === "velocity" ? (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">Inquiries Velocity</div>
                <div className="text-2xl font-black text-blue-700 mt-1">{totalLeadsCount} Leads</div>
                <div className="w-full bg-blue-200/60 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: "100%" }} />
                </div>
                <div className="text-[11px] text-blue-600 font-medium mt-1.5">Direct form submissions from website</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Doorstep Rate</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">{doorstepCount} Visits</div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${Math.max(doorstepRatio, 15)}%` }} />
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1.5">{doorstepRatio}% booked in-person advisor</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Full KYC Applications</div>
                <div className="text-2xl font-black text-indigo-700 mt-1">{totalAppsCount} Files</div>
                <div className="w-full bg-indigo-200/60 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(totalAppsCount * 25, 100)}%` }} />
                </div>
                <div className="text-[11px] text-indigo-600 font-medium mt-1.5">Full multi-step credit underwriting</div>
              </div>
            </div>

            {/* Visual SVG Flowchart Pipeline */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Pipeline Conversion Funnel</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">1. Site Visitors</div>
                  <div className="text-lg font-black text-slate-900 mt-1">{liveVisitors}</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Top of Funnel</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-xs bg-blue-50/20">
                  <div className="text-[11px] font-bold text-blue-600 uppercase">2. Inquiries</div>
                  <div className="text-lg font-black text-blue-700 mt-1">{totalLeadsCount}</div>
                  <div className="text-[10px] text-blue-600 font-bold mt-0.5">Interested</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs bg-amber-50/20">
                  <div className="text-[11px] font-bold text-amber-600 uppercase">3. Action Ready</div>
                  <div className="text-lg font-black text-amber-700 mt-1">{pendingActionCount}</div>
                  <div className="text-[10px] text-amber-600 font-bold mt-0.5">Needs Review</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/20">
                  <div className="text-[11px] font-bold text-emerald-600 uppercase">4. Full Apps</div>
                  <div className="text-lg font-black text-emerald-700 mt-1">{totalAppsCount}</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Sanction Stage</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">General Inquiries</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{totalLeadsCount - doorstepCount}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Online home loan interest</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                {Math.round(((totalLeadsCount - doorstepCount) / Math.max(totalSubmissions, 1)) * 100)}%
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Doorstep Appointments</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">{doorstepCount}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Physical document pickup</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                {doorstepRatio}%
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Full Applications</div>
                <div className="text-2xl font-black text-indigo-600 mt-1">{totalAppsCount}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Uploaded PAN &amp; ITR</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {Math.round((totalAppsCount / Math.max(totalSubmissions, 1)) * 100)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Live Feed & Quick Action Panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left 2 Cols: Live Website Enquiries & Applications Feed */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-black text-base text-slate-900 tracking-tight">Live Website Enquiries &amp; Applications</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Every enquiry submitted on the live site appears here dynamically in real time.
              </p>
            </div>
            
            {/* Filter Pills with Hover Effects */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-stretch sm:self-auto overflow-x-auto">
              {(["ALL", "DOORSTEP", "APPLICATION", "LEAD"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterType === t
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t === "ALL" ? "All" : t === "DOORSTEP" ? "Doorstep" : t === "APPLICATION" ? "Full Apps" : "Leads"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto max-h-[580px]">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <FileText className="h-12 w-12 text-slate-200 mb-3" />
                <h4 className="text-base font-bold text-slate-900">No submissions found</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Submissions from live website forms will automatically appear here as users submit them.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const cleanPhone = (item.rawMobile || item.contact || "").replace(/[^0-9]/g, "")
                const waLink = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null
                
                return (
                  <div key={item.id} className="p-5 hover:bg-slate-50/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs transition-transform group-hover:scale-105 ${
                        item.type === "DOORSTEP" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                        item.type === "APPLICATION" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                        item.type === "CONTACT" ? "bg-purple-100 text-purple-800 border border-purple-200" :
                        "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}>
                        {item.type === "DOORSTEP" ? "VISIT" : item.type === "APPLICATION" ? "APP" : "LEAD"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {item.id.slice(0, 10)}
                          </span>
                          {item.type === "DOORSTEP" && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                              Doorstep Visit
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                          <span className="font-medium">{item.contact}</span>
                          {item.city && item.city !== "N/A" && <span>&bull; {item.city}</span>}
                          <span className="font-bold text-slate-900">&bull; {item.amount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Direct Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        {cleanPhone && (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Call customer directly"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link
                          href={item.link}
                          className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                          title="View Details"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      {/* Status Tag */}
                      <div className="text-right">
                        <select
                          value={item.status}
                          onChange={(e) => handleQuickStatus(item, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-all cursor-pointer ${
                            item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            item.status === 'NEW' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            item.status === 'REJECTED' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                            'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="UNDER_REVIEW">UNDER REVIEW</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Follow-Ups & Live Email Sync */}
        <div className="space-y-6">
          
          {/* Pending Quick Follow-ups Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-base text-slate-900 tracking-tight">Pending Quick Follow-ups</h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {pendingFollowUps.length} Pending
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              New website leads requiring customer advisor callbacks within the 2-hour SLA.
            </p>

            {pendingFollowUps.length === 0 ? (
              <div className="text-center py-8 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">All leads caught up!</p>
                <p className="text-xs text-slate-400">Zero pending uncontacted requests.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingFollowUps.slice(0, 5).map((lead) => {
                  const rawNum = lead.mobile.replace(/[^0-9]/g, "")
                  const waUrl = rawNum ? `https://wa.me/${rawNum.length === 10 ? '91' + rawNum : rawNum}` : null
                  return (
                    <div 
                      key={lead.id} 
                      className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {lead.mobile} &bull; {lead.city || "NCR"}
                        </div>
                        {lead.amount && lead.amount !== "Enquiry" && (
                          <div className="text-[10px] font-bold text-slate-700 mt-0.5">
                            Amount: {lead.amount}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`tel:${rawNum}`}
                          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                          title="Call now"
                        >
                          <Phone className="h-3 w-3" />
                        </a>
                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-all border border-emerald-200"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}

                <Link
                  href="/admin/leads"
                  className="block text-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100/60 py-2.5 rounded-xl transition-all mt-2"
                >
                  View All {pendingFollowUps.length} Pending Leads &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Live Email Sync Telemetry Card */}
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h4 className="font-black text-xs uppercase tracking-wider text-emerald-950">
                  Live Dispatch &amp; Email Sync
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                Active Relay
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All website forms, doorstep visit bookings, and applications automatically trigger instant email notifications and deliver tracking references to applicants.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Notification Recipient:</span>
                <span className="font-bold text-slate-900 font-mono text-[11px] truncate max-w-[170px]" title="singhmohit101103@gmail.com">
                  singhmohit101103@gmail.com
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Delivery Engine:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Gmail SMTP Relay
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Instant Reference:</span>
                <span className="font-bold text-blue-700 font-mono text-[11px]">MVHL-2026-XXXX</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
