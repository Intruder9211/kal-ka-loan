"use client"

import { useState } from "react"
import { Wallet, Search, Filter, Download, ArrowRight, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

// Mock Disbursed Loans Data
const initialLoans = [
  { id: "LN-5501", appRef: "APP-1001", customer: "Rahul Sharma", principal: "₹75,00,000", outstanding: "₹73,45,200", emi: "₹63,200", nextDueDate: "Oct 15, 2026", status: "Active (On Track)", lender: "HDFC Bank", tenure: "15 Years", progress: 8 },
  { id: "LN-5502", appRef: "APP-0984", customer: "Priya Desai", principal: "₹45,00,000", outstanding: "₹42,10,000", emi: "₹41,500", nextDueDate: "Oct 05, 2026", status: "Active (On Track)", lender: "SBI", tenure: "20 Years", progress: 14 },
  { id: "LN-5503", appRef: "APP-0912", customer: "Amit Patel", principal: "₹1,20,00,000", outstanding: "₹1,18,50,000", emi: "₹1,05,000", nextDueDate: "Sep 28, 2026", status: "Payment Overdue", lender: "Axis Bank", tenure: "25 Years", progress: 4 },
  { id: "LN-5504", appRef: "APP-0877", customer: "Suresh Kumar", principal: "₹30,00,000", outstanding: "₹0", emi: "₹0", nextDueDate: "-", status: "Closed", lender: "ICICI Bank", tenure: "10 Years", progress: 100 },
  { id: "LN-5505", appRef: "APP-0995", customer: "Neha Gupta", principal: "₹50,00,000", outstanding: "₹49,80,000", emi: "₹46,200", nextDueDate: "Oct 10, 2026", status: "Active (On Track)", lender: "Bajaj Finserv", tenure: "15 Years", progress: 1 },
]

export default function ActiveLoansPage() {
  const [loans, setLoans] = useState(initialLoans)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loan.lender.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status matching logic since we have specific strings
    let matchesStatus = true;
    if (filterStatus === "Active") matchesStatus = loan.status.includes("Active");
    else if (filterStatus === "Overdue") matchesStatus = loan.status.includes("Overdue");
    else if (filterStatus === "Closed") matchesStatus = loan.status.includes("Closed");

    return matchesSearch && matchesStatus;
  })

  const getStatusBadge = (status: string) => {
    if (status.includes("On Track")) {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" /> Good Standing</span>
    }
    if (status.includes("Overdue")) {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertTriangle className="h-3.5 w-3.5" /> Overdue</span>
    }
    if (status.includes("Closed")) {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800"><CheckCircle2 className="h-3.5 w-3.5" /> Closed</span>
    }
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="h-3.5 w-3.5" /> Processing</span>
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Wallet className="h-6 w-6 text-blue-600" /> Active Loans Portfolio
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage disbursed loans, track EMIs, outstanding balances, and defaults.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="h-4 w-4" /> Export Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">Total Active Portfolio</div>
            <div className="text-2xl font-bold text-slate-900">₹32.5 Cr</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">Monthly Expected EMI</div>
            <div className="text-2xl font-bold text-slate-900">₹45.2 L</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">NPA / Overdue Total</div>
            <div className="text-2xl font-bold text-slate-900">₹1.18 Cr</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Loan ID, Customer, or Lender..." 
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
                <option value="All">All Loans</option>
                <option value="Active">Active (Good Standing)</option>
                <option value="Overdue">Overdue / Default</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Loan Account</th>
                <th className="px-6 py-4">Lender & Terms</th>
                <th className="px-6 py-4">Financials</th>
                <th className="px-6 py-4">EMI Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No loans found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{loan.customer}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-slate-500">{loan.id}</span>
                        <a href={`/admin/applications/${loan.appRef}`} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded hover:bg-slate-200" title="View Application">
                          {loan.appRef}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{loan.lender}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{loan.tenure}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500">Principal</span>
                        <span className="font-semibold text-slate-900">{loan.principal}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-500">Outstanding</span>
                        <span className="font-semibold text-slate-700">{loan.outstanding}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${loan.progress}%` }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="mb-1.5">{getStatusBadge(loan.status)}</div>
                      <div className="text-xs text-slate-500">
                        EMI: <span className="font-medium text-slate-900">{loan.emi}</span>
                        {loan.nextDueDate !== "-" && <span className="block mt-0.5">Due: {loan.nextDueDate}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        Manage <ArrowRight className="h-3 w-3" />
                      </button>
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
