"use client"

import { useState } from "react"
import { Wallet, Search, Filter, Download, TrendingUp, AlertTriangle, CheckCircle2, Clock, Building2, Phone, Mail } from "lucide-react"

export interface LoanItem {
  id: string
  appRef: string
  customer: string
  email?: string
  phone?: string
  principal: string
  rawPrincipal: number
  outstanding: string
  rawOutstanding: number
  emi: string
  nextDueDate: string
  status: string
  lender: string
  tenure: string
  progress: number
}

export default function LoansAdminClient({ loans }: { loans: LoanItem[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = 
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.lender.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (filterStatus === "Active") matchesStatus = loan.status.includes("Active")
    else if (filterStatus === "Overdue") matchesStatus = loan.status.includes("Overdue")
    else if (filterStatus === "Closed") matchesStatus = loan.status.includes("Closed")

    return matchesSearch && matchesStatus
  })

  const totalPrincipal = loans.reduce((acc, l) => acc + l.rawPrincipal, 0)
  const totalOutstanding = loans.reduce((acc, l) => acc + l.rawOutstanding, 0)

  const formatCr = (val: number) => `₹${(val / 10000000).toFixed(2)} Cr`

  const getStatusBadge = (status: string) => {
    if (status.includes("On Track") || status === "ACTIVE") {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> Good Standing</span>
    }
    if (status.includes("Overdue")) {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><AlertTriangle className="h-3.5 w-3.5" /> Overdue</span>
    }
    if (status.includes("Closed")) {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800"><CheckCircle2 className="h-3.5 w-3.5" /> Closed</span>
    }
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200"><Clock className="h-3.5 w-3.5" /> Processing</span>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" /> Active Loans Portfolio
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Manage disbursed mortgage loans, track EMIs, outstanding balances, and lender allocations.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {loans.length} Active Loans
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Wallet className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total Disbursed</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{formatCr(totalPrincipal)}</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Current Outstanding</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">{formatCr(totalOutstanding)}</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Repayment Health</div>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">100% On-Track</div>
          </div>
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
              placeholder="Search by ID, Customer, Lender..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {["All", "Active", "Overdue", "Closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterStatus === s
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {s} Loans
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Responsive Cards View (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredLoans.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No loans matched your search query.
            </div>
          ) : (
            filteredLoans.map((loan) => (
              <div 
                key={loan.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-black text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
                      {loan.id}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2">REF: {loan.appRef}</span>
                  </div>
                  {getStatusBadge(loan.status)}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{loan.customer}</div>
                    {loan.phone && (
                      <a href={`tel:${loan.phone}`} className="text-[11px] text-blue-600 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" /> {loan.phone}
                      </a>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-xs">
                    <Building2 className="h-3.5 w-3.5 text-slate-500" /> {loan.lender}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Principal</div>
                    <div className="font-black text-slate-900 mt-0.5">{loan.principal}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Monthly EMI</div>
                    <div className="font-black text-slate-900 mt-0.5">{loan.emi}</div>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/60">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Outstanding: {loan.outstanding}</span>
                      <span>{loan.progress}% paid</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${loan.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Data Table View (>= md) with min-w-[720px] and smooth overflow scroll */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[720px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Loan Account</th>
                <th className="px-6 py-4">Borrower Name</th>
                <th className="px-6 py-4">Partner Lender</th>
                <th className="px-6 py-4">Principal Amount</th>
                <th className="px-6 py-4">Outstanding Balance</th>
                <th className="px-6 py-4">Monthly EMI</th>
                <th className="px-6 py-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                      {loan.id}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">REF: {loan.appRef}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {loan.customer}
                    </div>
                    {loan.phone && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3 text-slate-400" /> {loan.phone}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" /> {loan.lender}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-black text-slate-900 text-sm">
                    {loan.principal}
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-700">
                    {loan.outstanding}
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${loan.progress}%` }} />
                    </div>
                  </td>

                  <td className="px-6 py-4 font-black text-slate-900 text-sm">
                    {loan.emi}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(loan.status)}
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
