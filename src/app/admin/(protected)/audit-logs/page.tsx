"use client"

import { useState } from "react"
import { ClipboardList, Search, Filter, Download, User, ShieldAlert, FileText, Settings, Key } from "lucide-react"

// Mock audit logs
const initialLogs = [
  { id: "al-101", timestamp: "2026-10-02 12:45:32", user: "Super Admin", email: "admin@example.com", action: "Updated Application Status", target: "APP-1001", details: "Changed status from UNDER_REVIEW to APPROVED", type: "application", ip: "192.168.1.45" },
  { id: "al-102", timestamp: "2026-10-02 12:30:15", user: "Rahul Verma", email: "rahul.v@kalkaloan.com", action: "Viewed Document", target: "APP-1002", details: "Viewed Income Proof (ITR)", type: "document", ip: "10.0.0.12" },
  { id: "al-103", timestamp: "2026-10-02 11:15:00", user: "Super Admin", email: "admin@example.com", action: "Modified System Settings", target: "Global Preferences", details: "Updated Auto-assign new applications toggle", type: "system", ip: "192.168.1.45" },
  { id: "al-104", timestamp: "2026-10-02 10:05:22", user: "Priya Sharma", email: "priya.s@kalkaloan.com", action: "User Login", target: "Authentication", details: "Successful login via Email/Password", type: "auth", ip: "172.16.0.5" },
  { id: "al-105", timestamp: "2026-10-01 16:45:10", user: "Amit Desai", email: "amit.d@kalkaloan.com", action: "Exported Data", target: "Customers List", details: "Exported 142 records to CSV", type: "system", ip: "10.0.0.18" },
  { id: "al-106", timestamp: "2026-10-01 14:20:05", user: "System", email: "system@kalkaloan.com", action: "Automated Credit Pull", target: "APP-1003", details: "Fetched CIBIL score via API", type: "api", ip: "localhost" },
  { id: "al-107", timestamp: "2026-10-01 09:12:45", user: "Super Admin", email: "admin@example.com", action: "Failed Login Attempt", target: "Authentication", details: "Invalid password provided", type: "auth", ip: "203.0.113.42" },
]

export default function AuditLogsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const getIconForType = (type: string) => {
    switch(type) {
      case 'application': return <FileText className="h-4 w-4 text-blue-500" />
      case 'auth': return <Key className="h-4 w-4 text-amber-500" />
      case 'system': return <Settings className="h-4 w-4 text-slate-500" />
      case 'document': return <ShieldAlert className="h-4 w-4 text-emerald-500" />
      case 'api': return <ClipboardList className="h-4 w-4 text-purple-500" />
      default: return <User className="h-4 w-4 text-slate-500" />
    }
  }

  const filteredLogs = initialLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || log.type === filterType;

    return matchesSearch && matchesType;
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-600" /> Audit Logs
          </h2>
          <p className="text-sm text-slate-500 mt-1">Immutable record of all administrative actions, data access, and system events.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search logs by user, action, or details..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select 
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="all">All Events</option>
                <option value="application">Applications</option>
                <option value="auth">Authentication</option>
                <option value="document">Documents</option>
                <option value="system">System Settings</option>
                <option value="api">API Calls</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Event Action</th>
                <th className="px-6 py-4">Target / Record</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[13px]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-sans">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <Search className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No audit logs found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 font-sans">
                      <div className="font-medium text-slate-900">{log.user}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{log.ip}</div>
                    </td>
                    <td className="px-6 py-4 font-sans">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center">
                          {getIconForType(log.type)}
                        </div>
                        <span className={`font-medium ${log.type === 'auth' && log.action.includes('Failed') ? 'text-red-600' : 'text-slate-900'}`}>
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">
                      {log.target}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">{filteredLogs.length}</span> log entries</span>
          <div className="flex gap-1 font-sans">
            <button disabled className="px-3 py-1 text-sm border border-slate-200 rounded text-slate-400 bg-white cursor-not-allowed">Previous</button>
            <button disabled className="px-3 py-1 text-sm border border-slate-200 rounded text-slate-400 bg-white cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
