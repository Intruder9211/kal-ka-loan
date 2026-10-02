"use client"

import { useState } from "react"
import { Search, Filter, ShieldAlert, Users, Eye } from "lucide-react"
import Link from "next/link"

export function CustomerClientList({ clients }: { clients: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase()
    return (
      (client.name?.toLowerCase() || "").includes(term) ||
      (client.email?.toLowerCase() || "").includes(term) ||
      (client.phone?.toLowerCase() || "").includes(term)
    )
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Customers</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and view all registered clients.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-64 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Applications</th>
                <th className="px-6 py-4 text-center">Active Loans</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No customers found</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {searchTerm ? "No customers match your search criteria." : "No customers have registered yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client: any) => (
                  <tr key={client.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {client.name?.charAt(0) || "C"}
                        </div>
                        <div className="font-medium text-slate-900">{client.name || "Unknown"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{client.email}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{client.phone || "No phone"}</div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-900">0</td>
                    <td className="px-6 py-4 text-center text-slate-900">0</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      Today
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/customers/${client.id || encodeURIComponent(client.email)}`} className="px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 border border-transparent" title="View Profile">
                          <Eye className="h-4 w-4" /> View
                        </Link>
                        <button className="px-3 py-1.5 text-sm font-semibold text-red-700 bg-white hover:bg-red-50 border border-slate-200 shadow-sm rounded-lg transition-colors flex items-center gap-1" title="Suspend customer">
                          <ShieldAlert className="h-4 w-4" /> Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">{filteredClients.length}</span> customers</span>
          <div className="flex gap-1">
            <button disabled className="px-3 py-1 text-sm border border-slate-200 rounded text-slate-400 bg-white cursor-not-allowed">Previous</button>
            <button disabled className="px-3 py-1 text-sm border border-slate-200 rounded text-slate-400 bg-white cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
