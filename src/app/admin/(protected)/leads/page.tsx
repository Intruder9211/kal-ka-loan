import { prisma } from "@/lib/prisma"
import { Users } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function LeadsAdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Website Leads</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage inquiries submitted via the public website forms.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Loan Required</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-base font-medium text-slate-700">No leads found</p>
                      <p className="text-sm">Wait for users to submit the website form.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500 capitalize">{lead.employment || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{lead.mobile}</div>
                      <div className="text-slate-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.city || 'N/A'}</td>
                    <td className="px-6 py-4 font-medium text-brand-deep">
                      {lead.loanAmount ? `₹${lead.loanAmount.toLocaleString('en-IN')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {lead.createdAt.toLocaleDateString()}
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
