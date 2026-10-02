"use client"

import { useState } from "react"
import { Building2, Plus, Edit2, Trash2, Search, Link as LinkIcon, CheckCircle2, XCircle, Phone, Mail, MoreVertical } from "lucide-react"

// Mock Lenders data
const initialLenders = [
  { id: "L-001", name: "HDFC Bank", type: "Private Bank", contactName: "Rajiv Menon", email: "rajiv.m@hdfcbank.com", phone: "+91 9876543210", status: "Active", apiConnected: true, activeLoans: 1420 },
  { id: "L-002", name: "State Bank of India (SBI)", type: "Public Sector Bank", contactName: "Sunita Sharma", email: "sunita.s@sbi.co.in", phone: "+91 9876543211", status: "Active", apiConnected: true, activeLoans: 2150 },
  { id: "L-003", name: "Axis Bank", type: "Private Bank", contactName: "Karan Johar", email: "partners@axisbank.com", phone: "+91 9876543212", status: "Active", apiConnected: false, activeLoans: 850 },
  { id: "L-004", name: "Bajaj Housing Finance", type: "NBFC", contactName: "Amitabh B", email: "amitabh@bajajfinserv.in", phone: "+91 9876543213", status: "Inactive", apiConnected: false, activeLoans: 320 },
  { id: "L-005", name: "ICICI Bank", type: "Private Bank", contactName: "Neha Gupta", email: "neha.g@icicibank.com", phone: "+91 9876543214", status: "Active", apiConnected: true, activeLoans: 1100 }
]

export default function LendersAdminPage() {
  const [lenders, setLenders] = useState(initialLenders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")

  const filteredLenders = lenders.filter(lender => {
    const matchesSearch = lender.name.toLowerCase().includes(searchTerm.toLowerCase()) || lender.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || lender.type === filterType;
    return matchesSearch && matchesType;
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" /> Lending Partners
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage banks, NBFCs, and financial institutions providing loans on the platform.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add New Lender
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search lenders by name or contact person..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {["All", "Private Bank", "Public Sector Bank", "NBFC"].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${filterType === type ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLenders.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white border border-slate-200 rounded-xl">
            <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-medium text-slate-900">No lending partners found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
          </div>
        ) : (
          filteredLenders.map((lender) => (
            <div key={lender.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{lender.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                    {lender.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Active Loans</div>
                    <div className="font-semibold text-slate-900">{lender.activeLoans.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">API Integration</div>
                    <div className="flex items-center gap-1.5 font-medium text-sm">
                      {lender.apiConnected ? (
                        <span className="text-emerald-600 flex items-center gap-1"><LinkIcon className="h-3 w-3" /> Connected</span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1"><LinkIcon className="h-3 w-3" /> Manual</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Relationship Manager</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {lender.contactName.charAt(0)}
                      </div>
                      <span className="font-medium">{lender.contactName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 ml-11">
                      <Mail className="h-3.5 w-3.5 text-slate-400" /> {lender.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 ml-11">
                      <Phone className="h-3.5 w-3.5 text-slate-400" /> {lender.phone}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                {lender.status === "Active" ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                    <CheckCircle2 className="h-4 w-4" /> Active Partner
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-600 font-medium text-xs">
                    <XCircle className="h-4 w-4" /> Onboard Pending
                  </div>
                )}
                <div className="text-xs text-slate-400 font-mono">{lender.id}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
