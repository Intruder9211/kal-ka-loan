"use client"

import { useState } from "react"
import { updateApplicationStatus } from "@/app/actions/admin"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function StatusUpdater({ applicationId, currentStatus }: { applicationId: string, currentStatus: string }) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleUpdate = async (newStatus: string) => {
    setIsPending(true)
    const result = await updateApplicationStatus(applicationId, newStatus)
    setIsPending(false)
    if (result.success) {
      router.refresh()
    } else {
      alert("Failed to update status")
    }
  }

  return (
    <div className="flex gap-2 items-center relative">
      <div className="relative">
        <select 
          className="appearance-none text-sm font-medium border border-slate-300 rounded-lg py-2.5 pl-4 pr-10 text-slate-700 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer min-w-[160px]"
          value={currentStatus}
          onChange={(e) => handleUpdate(e.target.value)}
          disabled={isPending}
        >
          <option value="SUBMITTED" className="font-medium text-slate-700 py-1">Submitted</option>
          <option value="UNDER_REVIEW" className="font-medium text-blue-700 py-1">Under Review</option>
          <option value="DOCUMENTS_REQUIRED" className="font-medium text-amber-700 py-1">Docs Required</option>
          <option value="VERIFIED" className="font-medium text-emerald-700 py-1">Verified</option>
          <option value="APPROVED" className="font-medium text-emerald-700 py-1">Approved</option>
          <option value="REJECTED" className="font-medium text-red-700 py-1">Rejected</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {isPending && <Loader2 className="h-5 w-5 animate-spin text-blue-500 ml-1" />}
    </div>
  )
}
