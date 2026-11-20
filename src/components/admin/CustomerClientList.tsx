"use client"

import { useState } from "react"
import { Search, Filter, ShieldAlert, Users, Eye, Phone, Mail, FileText, Wallet, Calendar, CheckCircle2, MessageCircle, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export interface CustomerItem {
  id: string
  name: string
  email: string
  phone: string | null
  image?: string | null
  role: string
  applicationsCount: number
  loansCount: number
  createdAt: string
  status: string
}

export function CustomerClientList({ clients }: { clients: CustomerItem[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"ALL" | "WITH_APPS" | "WITH_LOANS" | "NEW">("ALL")
  
  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      (client.name?.toLowerCase() || "").includes(term) ||
      (client.email?.toLowerCase() || "").includes(term) ||
      (client.phone?.toLowerCase() || "").includes(term)

    if (!matchesSearch) return false

    if (filterType === "WITH_APPS") return client.applicationsCount > 0
    if (filterType === "WITH_LOANS") return client.loansCount > 0
    if (filterType === "NEW") {
      const created = new Date(client.createdAt).getTime()
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
      return created >= thirtyDaysAgo
    }
    return true
  })

  const totalClients = clients.length
  const clientsWithApps = clients.filter(c => c.applicationsCount > 0).length
  const clientsWithLoans = clients.filter(c => c.loansCount > 0).length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Registered Customers</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Real-time registered customer directory synced directly with user authentication and profile data.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {totalClients} Live Accounts
          </span>
        </div>
      </div>

      {/* Mini KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Accounts</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{totalClients}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Website registered users</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Active Applicants</span>
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">{clientsWithApps}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Customers with submitted files</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Active Borrowers</span>
            <Wallet className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-600">{clientsWithLoans}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Disbursed loan portfolio</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden p-3.5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {[
              { id: "ALL", label: "All Customers", count: clients.length },
              { id: "WITH_APPS", label: "Applicants", count: clientsWithApps },
              { id: "WITH_LOANS", label: "Borrowers", count: clientsWithLoans },
              { id: "NEW", label: "Joined Recently", count: clients.length },
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
          {filteredClients.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No customers match your search query.
            </div>
          ) : (
            filteredClients.map((client) => {
              const cleanPhone = client.phone ? client.phone.replace(/[^0-9]/g, "") : null
              const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null

              return (
                <div 
                  key={client.id || client.email} 
                  className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {client.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{client.name}</div>
                        <div className="text-[10px] text-slate-400">{client.email}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                    <div className="text-slate-500 text-[11px]">
                      {client.phone ? (
                        <a href={`tel:${cleanPhone}`} className="text-blue-600 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {client.phone}
                        </a>
                      ) : (
                        <span className="italic text-slate-400">No phone</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Joined: {new Date(client.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Apps</span>
                        <strong className="text-slate-900 font-bold">{client.applicationsCount}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Loans</span>
                        <strong className="text-emerald-700 font-bold">{client.loansCount}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {cleanPhone && (
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                          title="Call"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-all border border-emerald-200"
                          title="WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link 
                        href={`/admin/customers/${client.id || encodeURIComponent(client.email)}`} 
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all font-bold"
                        title="View Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Desktop Data Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-center">Applications</th>
                <th className="px-6 py-4 text-center">Active Loans</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => {
                const cleanPhone = client.phone ? client.phone.replace(/[^0-9]/g, "") : null
                const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null

                return (
                  <tr key={client.id || client.email} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 p-0.5 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                            {client.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                            {client.name || "Customer"}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {client.id ? client.id.slice(0, 10) : "verified"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-semibold">{client.email}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {client.phone ? client.phone : <span className="italic text-slate-400">Not provided</span>}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        client.applicationsCount > 0 ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-400"
                      }`}>
                        {client.applicationsCount}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        client.loansCount > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-slate-400"
                      }`}>
                        {client.loansCount}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500 text-[11px] font-medium">
                      {new Date(client.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        {cleanPhone && (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Call customer"
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
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link 
                          href={`/admin/customers/${client.id || encodeURIComponent(client.email)}`} 
                          className="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors inline-flex items-center gap-1 font-bold" 
                          title="View Full Profile"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
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
