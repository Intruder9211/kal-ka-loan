"use client"

import { useState } from "react"
import { Search, Filter, Eye, FileText, CheckCircle2, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export function ApplicationClientList({ applications }: { applications: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApps = applications.filter(app => {
    const term = searchTerm.toLowerCase()
    return (
      (app.id?.toLowerCase() || "").includes(term) ||
      (app.customer?.toLowerCase() || "").includes(term) ||
      (app.status?.toLowerCase() || "").includes(term)
    )
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-3 w-3"/> Approved</span>;
      case 'UNDER_REVIEW': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><Clock className="h-3 w-3"/> Under Review</span>;
      case 'DOCUMENTS_REQUIRED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><FileText className="h-3 w-3"/> Docs Required</span>;
      case 'REJECTED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800"><XCircle className="h-3 w-3"/> Rejected</span>;
      default: return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">{status}</span>;
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Applications</h2>
          <p className="text-sm text-slate-500 mt-1">Review and process incoming loan applications.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
           <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">App ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Loan Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No applications found</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {searchTerm ? "No applications match your search criteria." : "No applications have been submitted yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApps.map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{app.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{app.customer}</td>
                    <td className="px-6 py-4">{app.product}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{app.amount}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-slate-500">{app.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/applications/${app.id}`} className="inline-flex p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Review Application">
                        <Eye className="h-4 w-4" />
                      </Link>
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
