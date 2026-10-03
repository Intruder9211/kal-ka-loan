"use client"

import { useState } from "react"
import { Users, Shield, Plus, Edit2, Trash2, Search, MoreVertical, CheckCircle2, XCircle } from "lucide-react"

// Mock internal users data
const initialUsers = [
  { id: "u1", name: "Super Admin", email: "admin@example.com", role: "SUPER_ADMIN", status: "Active", lastLogin: "Today, 10:42 AM" },
  { id: "u2", name: "Rahul Verma", email: "rahul.v@moneyviora.com", role: "ADMIN", status: "Active", lastLogin: "Yesterday, 4:15 PM" },
  { id: "u3", name: "Priya Sharma", email: "priya.s@moneyviora.com", role: "LOAN_OFFICER", status: "Active", lastLogin: "Oct 1, 2026" },
  { id: "u4", name: "Amit Desai", email: "amit.d@moneyviora.com", role: "SUPPORT", status: "Inactive", lastLogin: "Sep 28, 2026" }
]

export default function UsersAdminPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'ADMIN': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'LOAN_OFFICER': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'SUPPORT': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getRoleLabel = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" /> System Users & Roles
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage internal staff accounts, permissions, and roles.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Invite Team Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700">
              <option value="">All Roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="LOAN_OFFICER">Loan Officer</option>
              <option value="SUPPORT">Support</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No users found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-200">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "Active" ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                          <CheckCircle2 className="h-4 w-4" /> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs">
                          <XCircle className="h-4 w-4" /> Inactive
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {user.role !== "SUPER_ADMIN" && (
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revoke Access">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">{filteredUsers.length}</span> staff members</span>
        </div>
      </div>
    </div>
  )
}
