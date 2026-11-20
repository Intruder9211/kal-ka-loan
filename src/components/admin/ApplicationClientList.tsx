"use client"

import { useState } from "react"
import { Search, Filter, Eye, FileText, CheckCircle2, Clock, XCircle, AlertCircle, Sparkles, Building2, ChevronRight, Phone } from "lucide-react"
import Link from "next/link"
import { updateApplicationStatus } from "@/app/actions/admin"
import { useRouter } from "next/navigation"

export interface AppItem {
  id: string
  customer: string
  email?: string
  phone?: string
  product: string
  amount: string
  rawAmount: number
  status: string
  date: string
}

export function ApplicationClientList({ applications }: { applications: AppItem[] }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("ALL")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setIsUpdating(appId)
    await updateApplicationStatus(appId, newStatus)
    setIsUpdating(null)
    router.refresh()
  }

  const filteredApps = applications.filter(app => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      (app.id?.toLowerCase() || "").includes(term) ||
      (app.customer?.toLowerCase() || "").includes(term) ||
      (app.product?.toLowerCase() || "").includes(term)

    if (!matchesSearch) return false

    if (filterStatus === "ALL") return true
    return app.status === filterStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="h-3 w-3"/> Approved</span>
      case 'UNDER_REVIEW': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200"><Clock className="h-3 w-3"/> Under Review</span>
      case 'DOCUMENTS_REQUIRED': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><AlertCircle className="h-3 w-3"/> Docs Required</span>
      case 'REJECTED': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200"><XCircle className="h-3 w-3"/> Rejected</span>
      default: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>
    }
  }

  const totalApps = applications.length
  const underReviewCount = applications.filter(a => a.status === "UNDER_REVIEW" || a.status === "SUBMITTED").length
  const approvedCount = applications.filter(a => a.status === "APPROVED").length
  const docsPendingCount = applications.filter(a => a.status === "DOCUMENTS_REQUIRED").length

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Loan Applications Hub</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Review, audit, verify credit documents, and approve home loan applications.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {totalApps} Total Applications
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Submissions</span>
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{totalApps}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Full application files</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">In Review</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">{underReviewCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Pending underwriting</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Approved</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">{approvedCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Sanctioned</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Action Needed</span>
            <AlertCircle className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-600">{docsPendingCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Missing documents</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden p-3.5 sm:p-6 space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, Product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {[
              { id: "ALL", label: "All" },
              { id: "SUBMITTED", label: "Submitted" },
              { id: "UNDER_REVIEW", label: "Review" },
              { id: "DOCUMENTS_REQUIRED", label: "Docs Needed" },
              { id: "APPROVED", label: "Approved" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterStatus === f.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Responsive Cards View (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredApps.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No applications matched your search query.
            </div>
          ) : (
            filteredApps.map((app) => (
              <div 
                key={app.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-black text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
                      {app.id}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">{app.date}</span>
                  </div>
                  <select
                    value={app.status}
                    disabled={isUpdating === app.id}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`text-xs font-bold rounded-lg px-2 py-1 border transition-all cursor-pointer ${
                      app.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      app.status === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                      app.status === 'DOCUMENTS_REQUIRED' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      app.status === 'REJECTED' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW</option>
                    <option value="DOCUMENTS_REQUIRED">DOCS REQ</option>
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{app.customer}</div>
                    {app.phone && (
                      <a href={`tel:${app.phone}`} className="text-[11px] text-blue-600 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" /> {app.phone}
                      </a>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-xs">
                    <Building2 className="h-3.5 w-3.5 text-slate-500" /> {app.product}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Amount</div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{app.amount}</div>
                  </div>
                  <Link 
                    href={`/admin/applications/${app.id}`} 
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs"
                  >
                    <Eye className="h-3.5 w-3.5" /> Review File
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[720px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Application ID</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Loan Product</th>
                <th className="px-6 py-4">Amount Requested</th>
                <th className="px-6 py-4">Workflow Status</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Review File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                      {app.id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {app.customer}
                    </div>
                    {app.phone && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3 text-slate-400" /> {app.phone}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      {app.product}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-black text-slate-900 text-sm">
                    {app.amount}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      disabled={isUpdating === app.id}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-all cursor-pointer ${
                        app.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        app.status === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        app.status === 'DOCUMENTS_REQUIRED' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        app.status === 'REJECTED' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="SUBMITTED">SUBMITTED</option>
                      <option value="UNDER_REVIEW">UNDER REVIEW</option>
                      <option value="DOCUMENTS_REQUIRED">DOCS REQUIRED</option>
                      <option value="VERIFIED">VERIFIED</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-[11px] font-medium">
                    {app.date}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/applications/${app.id}`} 
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all shadow-2xs hover:scale-105 active:scale-95" 
                      title="Review Application File"
                    >
                      <Eye className="h-3.5 w-3.5" /> Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
