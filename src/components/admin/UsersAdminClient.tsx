"use client"

import { useState } from "react"
import { Users, Shield, Plus, Edit2, Trash2, Search, CheckCircle2, Mail, Key } from "lucide-react"

export interface AdminUserItem {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

export default function UsersAdminClient({ users }: { users: AdminUserItem[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'SUPER_ADMIN': return 'bg-purple-50 text-purple-800 border-purple-200'
      case 'ADMIN': return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'STAFF': return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" /> Admin Users &amp; Team Roles
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage privileged staff accounts, administrative roles, and permission levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Key className="h-4 w-4 text-purple-600" />
            {users.length} Authorized Team Accounts
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Mobile Card View (< md) */}
        <div className="block md:hidden divide-y divide-slate-100 p-3 space-y-3">
          {filteredUsers.map((u) => (
            <div key={u.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{u.email}</div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadge(u.role)}`}>
                  {u.role.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {u.status}
                </span>
                <span className="text-[10px] text-slate-400">
                  Active: {u.lastLogin}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[650px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Permission Role</th>
                <th className="px-6 py-4">Access Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {u.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{u.id.slice(0, 10)}</div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {u.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getRoleBadge(u.role)}`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-[11px] font-medium">
                    {u.lastLogin}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs">
                      Edit Role
                    </button>
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
