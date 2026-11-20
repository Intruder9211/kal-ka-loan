"use client"

import { useState } from "react"
import { FolderOpen, Search, Download, Eye, CheckCircle2, XCircle, Clock, Filter, FileText, Check, ShieldCheck, AlertCircle } from "lucide-react"
import { updateDocumentStatus } from "@/app/actions/admin"
import { useRouter } from "next/navigation"

export interface DocItem {
  id: string
  applicant: string
  email?: string
  appRef: string
  type: string
  fileName: string
  fileUrl: string
  size: string
  uploadDate: string
  status: "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED"
}

export default function DocumentsAdminClient({ documents }: { documents: DocItem[] }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("ALL")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleStatusUpdate = async (docId: string, newStatus: any) => {
    setIsUpdating(docId)
    await updateDocumentStatus(docId, newStatus)
    setIsUpdating(null)
    router.refresh()
  }

  const filteredDocs = documents.filter(doc => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      doc.applicant.toLowerCase().includes(term) || 
      doc.appRef.toLowerCase().includes(term) ||
      doc.type.toLowerCase().includes(term) ||
      doc.fileName.toLowerCase().includes(term)

    if (!matchesSearch) return false
    if (filterStatus === "ALL") return true
    return doc.status === filterStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "VERIFIED": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>
      case "PENDING":
      case "SUBMITTED": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><Clock className="h-3.5 w-3.5" /> Pending Audit</span>
      case "REJECTED": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><XCircle className="h-3.5 w-3.5" /> Rejected</span>
      default: return null
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" /> Document Vault &amp; Pre-Audit
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Review uploaded PAN cards, income tax returns, and bank statements with 1-click verification.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> 256-Bit Vault Synced
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden p-3.5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Applicant, Document Type..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 max-w-full">
            {[
              { id: "ALL", label: "All Documents" },
              { id: "PENDING", label: "Pending" },
              { id: "VERIFIED", label: "Verified" },
              { id: "REJECTED", label: "Rejected" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setFilterStatus(s.id)}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterStatus === s.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Cards (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No documents matched your search query.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div 
                key={doc.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{doc.applicant}</div>
                    <span className="font-mono text-[10px] text-slate-400">REF: {doc.appRef}</span>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{doc.type}</div>
                  <div className="font-bold text-blue-600 text-xs flex items-center gap-1.5 truncate">
                    <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.fileName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">{doc.uploadDate}</span>
                  <div className="flex items-center gap-1.5">
                    {doc.fileUrl && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="View File"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(doc.id, "VERIFIED")}
                      disabled={isUpdating === doc.id || doc.status === "VERIFIED"}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> Verify
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(doc.id, "REJECTED")}
                      disabled={isUpdating === doc.id || doc.status === "REJECTED"}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Application REF</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Uploaded File</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4 text-right">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {doc.applicant}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                      {doc.appRef}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-800">
                    {doc.type}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-blue-600 truncate max-w-xs">
                      <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.fileName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-[11px] font-medium">
                    {doc.uploadDate}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-1.5">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View / Download Document"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleStatusUpdate(doc.id, "VERIFIED")}
                        disabled={isUpdating === doc.id || doc.status === "VERIFIED"}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                        title="Mark Verified"
                      >
                        <Check className="h-3 w-3" /> Verify
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(doc.id, "REJECTED")}
                        disabled={isUpdating === doc.id || doc.status === "REJECTED"}
                        className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Reject File"
                      >
                        <XCircle className="h-3 w-3" /> Reject
                      </button>
                    </div>
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
