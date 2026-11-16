import { prisma } from "@/lib/prisma"
import { Users, Phone, Mail, MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function LeadsAdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Website Enquiries &amp; Doorstep Visits</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Real-time enquiries submitted via Doorstep Booking, Contact Us, and Instant Eligibility forms.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
            Total: {leads.length} leads
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Applicant &amp; Reference</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">City / Locality</th>
                <th className="px-6 py-4">Type / Request Details</th>
                <th className="px-6 py-4">Loan Required</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-12 w-12 text-slate-300 mb-3" />
                      <p className="text-base font-bold text-slate-700">No leads or enquiries yet</p>
                      <p className="text-xs text-slate-400 mt-1">When users book a doorstep visit or submit an inquiry, it shows immediately here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep");
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5">{lead.id.slice(0, 12)}...</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <Phone size={13} className="text-slate-400" />
                          <a href={`tel:${lead.mobile.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 transition-colors">
                            {lead.mobile}
                          </a>
                        </div>
                        {lead.email && !lead.email.includes("@leads.moneyviora.com") && (
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Mail size={12} className="text-slate-400" />
                            <a href={`mailto:${lead.email}`} className="hover:underline">
                              {lead.email}
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-medium flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" />
                          {lead.city || 'NCR / Not specified'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {isDoorstep ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Calendar size={12} /> Doorstep Visit
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                              Website Enquiry
                            </span>
                          )}
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {lead.employment || 'General Loan Inquiry'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {lead.loanAmount ? `₹${lead.loanAmount.toLocaleString('en-IN')}` : 'Flexible'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          lead.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                          lead.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
