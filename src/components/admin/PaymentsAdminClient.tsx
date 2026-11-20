"use client"

import { useState } from "react"
import { CreditCard, Search, Download, CheckCircle2, XCircle, Clock, ArrowUpRight, ArrowDownLeft, FileText, AlertCircle, ShieldCheck } from "lucide-react"

export interface PaymentItem {
  id: string
  appRef: string
  customer: string
  amount: string
  rawAmount: number
  type: string
  method: string
  date: string
  status: string
}

export default function PaymentsAdminClient({ payments }: { payments: PaymentItem[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredPayments = payments.filter(txn => {
    const matchesSearch = 
      txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.appRef.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || txn.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalCollected = payments.filter(p => p.status === "Completed").reduce((acc, p) => acc + p.rawAmount, 0)
  const formatCur = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Completed": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> Completed</span>
      case "Pending": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><Clock className="h-3.5 w-3.5" /> Processing</span>
      case "Failed": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><XCircle className="h-3.5 w-3.5" /> Failed</span>
      default: return null
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" /> Payments &amp; Settlement Ledger
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Audit processing fee collections, e-NACH mandates, and EMI settlement logs.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> NPCI Gateway Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Total Settled Collections</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{formatCur(totalCollected)}</div>
          <div className="text-emerald-600 text-xs font-bold flex items-center gap-1 mt-1.5">
            <ArrowUpRight className="h-3 w-3" /> 100% verified ledger
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Active Mandates</div>
          <div className="text-xl sm:text-2xl font-black text-blue-600">{payments.length} Accounts</div>
          <div className="text-slate-500 text-xs font-medium flex items-center gap-1 mt-1.5">
            <Clock className="h-3 w-3" /> Automated e-NACH
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Gateway Health</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">99.8%</div>
          <div className="text-emerald-600 text-xs font-bold flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="h-3 w-3" /> Zero chargebacks
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden p-3.5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Txn ID, App ID, Customer..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {["All", "Completed", "Pending", "Failed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterStatus === s
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Cards (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredPayments.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No transactions match your search query.
            </div>
          ) : (
            filteredPayments.map((txn) => (
              <div 
                key={txn.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-black text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
                      {txn.id}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2">REF: {txn.appRef}</span>
                  </div>
                  {getStatusBadge(txn.status)}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">{txn.customer}</div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {txn.method}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{txn.type}</div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{txn.amount}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {txn.date}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Payment Purpose</th>
                <th className="px-6 py-4">Collection Channel</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Settled At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                      {txn.id}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">REF: {txn.appRef}</div>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {txn.customer}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <FileText className="h-3.5 w-3.5 text-blue-500" /> {txn.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {txn.method}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-black text-slate-900 text-sm">
                    {txn.amount}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(txn.status)}
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-[11px] font-medium">
                    {txn.date}
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
