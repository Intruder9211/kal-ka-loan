"use client"

import { useState } from "react"
import { FolderOpen, Search, Download, Eye, CheckCircle2, XCircle, Clock, Filter, FileText } from "lucide-react"

// Mock Documents Data
const initialDocs = [
  { id: "DOC-8921", applicant: "Rahul Sharma", appRef: "APP-1001", type: "PAN Card", file: "PAN_Rahul.pdf", size: "1.2 MB", uploadDate: "Oct 2, 2026", status: "Verified" },
  { id: "DOC-8922", applicant: "Priya Desai", appRef: "APP-1002", type: "Income Proof (ITR)", file: "ITR_2025_Priya.pdf", size: "4.5 MB", uploadDate: "Oct 2, 2026", status: "Pending Verification" },
  { id: "DOC-8923", applicant: "Amit Patel", appRef: "APP-1003", type: "Property Agreement", file: "Agreement_To_Sale.pdf", size: "8.1 MB", uploadDate: "Oct 1, 2026", status: "Pending Verification" },
  { id: "DOC-8924", applicant: "Neha Gupta", appRef: "APP-1004", type: "Aadhaar Card", file: "Aadhaar_Neha.jpg", size: "800 KB", uploadDate: "Oct 1, 2026", status: "Verified" },
  { id: "DOC-8925", applicant: "Suresh Kumar", appRef: "APP-1005", type: "6 Months Bank Statement", file: "HDFC_Statement.pdf", size: "3.2 MB", uploadDate: "Sep 30, 2026", status: "Rejected" },
]

export default function DocumentsAdminPage() {
  const [docs, setDocs] = useState(initialDocs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.applicant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.appRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  })

  const handleVerify = (id: string) => {
    setDocs(docs.map(doc => doc.id === id ? { ...doc, status: "Verified" } : doc))
  }

  const handleReject = (id: string) => {
    setDocs(docs.map(doc => doc.id === id ? { ...doc, status: "Rejected" } : doc))
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Verified": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>
      case "Pending Verification": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock className="h-3.5 w-3.5" /> Pending</span>
      case "Rejected": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3.5 w-3.5" /> Rejected</span>
      default: return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-blue-600" /> Document Vault
          </h2>
          <p className="text-sm text-slate-500 mt-1">Global view of all KYC and financial documents uploaded across applications.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="h-4 w-4" /> Bulk Download (.zip)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by applicant, App ID, or document type..." 
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
                <option value="Pending Verification">Pending Verification</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Document Details</th>
                <th className="px-6 py-4">Applicant Link</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Verification Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <FolderOpen className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No documents found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100 flex-shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{doc.type}</div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{doc.file} • {doc.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{doc.applicant}</div>
                      <a href={`/admin/applications/${doc.appRef}`} className="text-xs text-blue-600 hover:underline font-mono mt-0.5 inline-block">{doc.appRef}</a>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Document">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        
                        {doc.status === "Pending Verification" && (
                          <>
                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                            <button onClick={() => handleVerify(doc.id)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Verify Document">
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleReject(doc.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject Document">
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
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
