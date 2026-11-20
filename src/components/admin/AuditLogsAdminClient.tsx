"use client"

import { useState } from "react"
import { ClipboardList, Search, Filter, Download, User, ShieldAlert, FileText, Settings, Key, CheckCircle2 } from "lucide-react"

export interface AuditItem {
  id: string
  timestamp: string
  user: string
  email: string
  action: string
  target: string
  details: string
  type: string
  ip: string
}

export default function AuditLogsAdminClient({ logs }: { logs: AuditItem[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const getIconForType = (type: string) => {
    switch(type) {
      case 'application': return <FileText className="h-4 w-4 text-blue-500" />
      case 'auth': return <Key className="h-4 w-4 text-amber-500" />
      case 'system': return <Settings className="h-4 w-4 text-slate-500" />
      case 'document': return <ShieldAlert className="h-4 w-4 text-emerald-500" />
      default: return <User className="h-4 w-4 text-slate-500" />
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === "all" || log.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-600" /> Security Audit Logs &amp; Events
          </h1>
          <p className="text-xs text-slate-500 mt-1">Immutable ledger tracking status modifications, applicant data access, and admin logins.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tamper-Proof Audit Active
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by user, action, target..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto p-1 bg-slate-50 rounded-2xl border border-slate-100">
            {["all", "application", "auth", "document", "system"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 capitalize ${
                  filterType === t
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Card View (< md) */}
        <div className="block md:hidden divide-y divide-slate-100 p-3 space-y-3">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    {getIconForType(log.type)} {log.action}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.timestamp}</div>
                </div>
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {log.target}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-200/60 text-xs text-slate-600">
                {log.details}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>By: <strong className="text-slate-700">{log.user}</strong></span>
                <span className="font-mono">IP: {log.ip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Admin User</th>
                <th className="px-6 py-4">Event Action</th>
                <th className="px-6 py-4">Target Entity</th>
                <th className="px-6 py-4">Metadata Details</th>
                <th className="px-6 py-4">Host IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {log.user}
                    </div>
                    <div className="text-[10px] text-slate-400">{log.email}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                      {getIconForType(log.type)} {log.action}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {log.target}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                    {log.details}
                  </td>

                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                    {log.ip}
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
