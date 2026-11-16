import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Clock, CheckCircle2, Calendar, FileText, Search, ArrowRight } from "lucide-react"

export default async function ApplicationsPage() {
  const session = await auth()
  const userId = session?.user?.id
  const userEmail = session?.user?.email

  // Fetch formal applications
  const applications = userId ? await prisma.application.findMany({
    where: { customer: { userId: userId } },
    include: { loanProduct: true },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []) : []

  // Also fetch any website enquiries or doorstep visits matching the user's email
  const leads = userEmail ? await prisma.lead.findMany({
    where: { email: userEmail },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []) : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Loan Applications &amp; Doorstep Requests</h2>
          <p className="text-sm text-slate-500 mt-1">Track the real-time review, doorstep visits, and sanction progress.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/track"
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
          >
            <Search size={14} /> Track by Reference ID
          </Link>
          <Link 
            href="/dashboard/applications/new"
            className="px-4 py-2 bg-brand-deep text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors inline-block"
          >
            New Application
          </Link>
        </div>
      </div>

      {applications.length === 0 && leads.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No active applications yet</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">You haven't initiated any applications or doorstep visits yet. Explore our home loan offers or book a free doorstep specialist.</p>
          <div className="flex gap-3 mt-6">
            <Link 
              href="/track"
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50"
            >
              Track with Reference No.
            </Link>
            <Link 
              href="/dashboard/applications/new"
              className="px-5 py-2.5 bg-brand-mint text-brand-deep font-bold text-sm rounded-xl hover:bg-emerald-300"
            >
              Start Full Application
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Formal Applications List */}
          {applications.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h3 className="font-bold text-sm text-slate-800">Formal Loan Applications</h3>
              </div>
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Application ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">#{app.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{app.loanProduct?.name || "Home Loan"}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">₹{app.requestedAmount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Website Enquiries & Doorstep Requests */}
          {leads.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800">Website Enquiries &amp; Doorstep Visits</h3>
                <span className="text-xs text-slate-500">Linked to {userEmail}</span>
              </div>
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Reference No.</th>
                    <th className="px-6 py-4">Service Type</th>
                    <th className="px-6 py-4">Requested Amount</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => {
                    const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep");
                    const refMatch = (lead.employment || "").match(/\[REF:\s*([^\]]+)\]/i);
                    const refNumber = refMatch ? refMatch[1] : `MVHL-${lead.id.slice(0, 8)}`;
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">{refNumber}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isDoorstep ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {isDoorstep ? <Calendar size={12} /> : null}
                            {isDoorstep ? "Doorstep Visit" : "Loan Enquiry"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {lead.loanAmount ? `₹${lead.loanAmount.toLocaleString('en-IN')}` : "Flexible"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{lead.city || "NCR"}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700">
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/track?ref=${encodeURIComponent(refNumber)}`}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                          >
                            Live Track <ArrowRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
