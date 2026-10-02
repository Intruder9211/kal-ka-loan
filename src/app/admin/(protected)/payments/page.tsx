"use client"

import { useState } from "react"
import { CreditCard, Search, Download, CheckCircle2, XCircle, Clock, Filter, ArrowUpRight, ArrowDownLeft, FileText, AlertCircle } from "lucide-react"

// Mock Payments Data
const initialPayments = [
  { id: "TXN-99821", appRef: "APP-1001", customer: "Rahul Sharma", amount: "₹14,500", type: "Processing Fee", method: "UPI", date: "Oct 02, 2026, 14:30", status: "Completed" },
  { id: "TXN-99822", appRef: "APP-1002", customer: "Priya Desai", amount: "₹45,200", type: "EMI Installment", method: "Auto-Debit (NACH)", date: "Oct 02, 2026, 09:15", status: "Completed" },
  { id: "TXN-99823", appRef: "APP-1004", customer: "Neha Gupta", amount: "₹12,000", type: "Processing Fee", method: "Credit Card", date: "Oct 01, 2026, 16:45", status: "Failed" },
  { id: "TXN-99824", appRef: "APP-1005", customer: "Suresh Kumar", amount: "₹38,900", type: "EMI Installment", method: "Net Banking", date: "Oct 01, 2026, 11:20", status: "Pending" },
  { id: "TXN-99825", appRef: "APP-1008", customer: "Amit Desai", amount: "₹2,50,000", type: "Part Pre-payment", method: "RTGS", date: "Sep 30, 2026, 10:00", status: "Completed" },
]

export default function PaymentsAdminPage() {
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredPayments = payments.filter(txn => {
    const matchesSearch = txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.appRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || txn.status === filterStatus;
    return matchesSearch && matchesStatus;
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Completed": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" /> Completed</span>
      case "Pending": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock className="h-3.5 w-3.5" /> Processing</span>
      case "Failed": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3.5 w-3.5" /> Failed</span>
      default: return null
    }
  }

  const getTypeIcon = (type: string) => {
    if (type.includes("Fee")) return <FileText className="h-4 w-4 text-purple-600" />
    if (type.includes("Pre-payment")) return <ArrowDownLeft className="h-4 w-4 text-blue-600" />
    return <ArrowUpRight className="h-4 w-4 text-emerald-600" />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-600" /> Payments & Transactions
          </h2>
          <p className="text-sm text-slate-500 mt-1">Monitor processing fees, EMI collections, and settlement statuses.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="h-4 w-4" /> Export Ledger
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Today's Collection</div>
          <div className="text-2xl font-bold text-slate-900">₹59,700</div>
          <div className="text-emerald-600 text-xs font-medium flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3" /> +12.5% from yesterday
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Pending Settlements</div>
          <div className="text-2xl font-bold text-slate-900">₹38,900</div>
          <div className="text-amber-600 text-xs font-medium flex items-center gap-1 mt-2">
            <Clock className="h-3 w-3" /> 1 transaction processing
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Failed Transactions</div>
          <div className="text-2xl font-bold text-slate-900">1</div>
          <div className="text-red-600 text-xs font-medium flex items-center gap-1 mt-2">
            <AlertCircle className="h-3 w-3" /> Requires attention
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-xl shadow-sm text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard className="h-16 w-16" />
          </div>
          <div className="text-slate-300 text-sm font-medium mb-1 relative z-10">Total MTD Collection</div>
          <div className="text-2xl font-bold text-white relative z-10">₹3,09,700</div>
          <div className="text-emerald-400 text-xs font-medium flex items-center gap-1 mt-2 relative z-10">
            <ArrowUpRight className="h-3 w-3" /> On track for monthly goal
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Txn ID, App ID, or Customer..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select 
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Customer & App</th>
                <th className="px-6 py-4">Amount & Method</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No transactions found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 flex-shrink-0">
                          {getTypeIcon(txn.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{txn.type}</div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{txn.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{txn.customer}</div>
                      <a href={`/admin/applications/${txn.appRef}`} className="text-xs text-blue-600 hover:underline font-mono mt-0.5 inline-block">{txn.appRef}</a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{txn.amount}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{txn.method}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {txn.date.split(',').map((part, i) => (
                        <div key={i} className={i === 1 ? "text-xs mt-0.5" : ""}>{part.trim()}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(txn.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
