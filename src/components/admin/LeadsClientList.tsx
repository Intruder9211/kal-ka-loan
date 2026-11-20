"use client"

import { useState } from "react"
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  MessageCircle, 
  Trash2, 
  Building2, 
  Sparkles,
  ArrowUpRight
} from "lucide-react"
import { updateLeadStatus, deleteLead } from "@/app/actions/admin"
import { useRouter } from "next/navigation"

export interface LeadItem {
  id: string
  name: string
  mobile: string
  email: string
  employment: string | null
  monthlyIncome: number | null
  loanAmount: number | null
  city: string | null
  status: string
  createdAt: string
}

export function LeadsClientList({ leads }: { leads: LeadItem[] }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"ALL" | "DOORSTEP" | "PENDING" | "HIGH_VALUE">("ALL")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setIsUpdating(leadId)
    await updateLeadStatus(leadId, newStatus)
    setIsUpdating(null)
    router.refresh()
  }

  const handleDelete = async (leadId: string, leadName: string) => {
    if (confirm(`Are you sure you want to delete lead for ${leadName}?`)) {
      await deleteLead(leadId)
      router.refresh()
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      (lead.name?.toLowerCase() || "").includes(term) ||
      (lead.mobile?.toLowerCase() || "").includes(term) ||
      (lead.email?.toLowerCase() || "").includes(term) ||
      (lead.city?.toLowerCase() || "").includes(term) ||
      (lead.employment?.toLowerCase() || "").includes(term)

    if (!matchesSearch) return false

    const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep")
    if (filterType === "DOORSTEP") return isDoorstep
    if (filterType === "PENDING") return lead.status === "NEW"
    if (filterType === "HIGH_VALUE") return (lead.loanAmount || 0) >= 5000000

    return true
  })

  // Format currency
  const formatCurrency = (val: number | null) => {
    if (!val || val === 0) return "Flexible"
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`
    return `₹${val.toLocaleString("en-IN")}`
  }

  const doorstepCount = leads.filter(l => (l.employment || "").toLowerCase().includes("doorstep")).length
  const pendingCount = leads.filter(l => l.status === "NEW").length
  const highValueCount = leads.filter(l => (l.loanAmount || 0) >= 5000000).length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Website Enquiries &amp; Doorstep Visits</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Real-time live inquiries submitted via Doorstep Booking, Instant Sanction, and Website Contact forms.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync: {leads.length} Leads
          </span>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{leads.length}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Form submissions</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Doorstep Visits</span>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">{doorstepCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Home appointments</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Action</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">{pendingCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Uncontacted leads</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">₹50L+ Prime</span>
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-600">{highValueCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">High ticket demand</p>
        </div>
      </div>

      {/* Main Leads Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden p-3.5 sm:p-6 space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, mobile, city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {[
              { id: "ALL", label: "All Leads", count: leads.length },
              { id: "DOORSTEP", label: "Doorstep Visits", count: doorstepCount },
              { id: "PENDING", label: "Pending", count: pendingCount },
              { id: "HIGH_VALUE", label: "₹50L+ Prime", count: highValueCount },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterType === f.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span>{f.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  filterType === f.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Responsive Cards View (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No leads match your search query.
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep")
              const cleanPhone = lead.mobile.replace(/[^0-9]/g, "")
              const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null

              return (
                <div 
                  key={lead.id} 
                  className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                      <span className="text-[10px] font-mono text-slate-400">REF: {lead.id.slice(0, 10)}</span>
                    </div>
                    <select
                      value={lead.status}
                      disabled={isUpdating === lead.id}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`text-xs font-bold rounded-lg px-2 py-1 border transition-all cursor-pointer ${
                        lead.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        lead.status === 'CONTACTED' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                        lead.status === 'NEW' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="text-slate-600 flex items-center gap-1 font-medium">
                      <MapPin className="h-3 w-3 text-slate-400" /> {lead.city || "NCR"}
                    </div>
                    {isDoorstep ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Calendar className="h-3 w-3" /> Doorstep Visit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Website Lead
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Amount Required</div>
                      <div className="font-black text-slate-900 text-sm mt-0.5">{formatCurrency(lead.loanAmount)}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {cleanPhone && (
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
                          title="Call Lead"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all border border-emerald-200"
                          title="WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(lead.id, lead.name)}
                        className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

          {/* Desktop Table View (>= md) */}
          <div className="hidden md:block overflow-x-auto pt-2">
            <table className="w-full min-w-[780px] text-left text-xs text-slate-600">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Applicant &amp; Reference</th>
                  <th className="px-6 py-4">Direct Contact</th>
                  <th className="px-6 py-4">City / Location</th>
                  <th className="px-6 py-4">Lead Type / Notes</th>
                  <th className="px-6 py-4">Loan Required</th>
                  <th className="px-6 py-4">Workflow Status</th>
                  <th className="px-6 py-4">Date &amp; Time</th>
                  <th className="px-6 py-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep")
                  const cleanPhone = lead.mobile.replace(/[^0-9]/g, "")
                  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          REF: {lead.id.slice(0, 12)}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <a href={`tel:${cleanPhone}`} className="hover:text-blue-600 transition-colors">
                            {lead.mobile}
                          </a>
                        </div>
                        {lead.email && !lead.email.includes("@leads.moneyviora.com") && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <a href={`mailto:${lead.email}`} className="hover:underline">
                              {lead.email}
                            </a>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {lead.city || "NCR"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {isDoorstep ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Calendar className="h-3 w-3" /> Doorstep Visit
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              Website Lead
                            </span>
                          )}
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {lead.employment || "Home Loan Inquiry"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-black text-slate-900 text-sm">
                        {formatCurrency(lead.loanAmount)}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          disabled={isUpdating === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-all cursor-pointer ${
                            lead.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            lead.status === 'CONTACTED' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                            lead.status === 'NEW' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-[11px] text-slate-500 font-medium">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-1.5">
                          {cleanPhone && (
                            <a
                              href={`tel:${cleanPhone}`}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Call Lead"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                              title="WhatsApp Customer"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}
