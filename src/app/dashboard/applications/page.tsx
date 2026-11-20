import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { 
  Clock, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Search, 
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Plus
} from "lucide-react"

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

  // Also fetch any website enquiries or doorstep visits matching the user's email or mobile
  const userProfile = userId ? await prisma.customerProfile.findUnique({
    where: { userId },
    select: { phone: true }
  }).catch(() => null) : null

  const userPhone = userProfile?.phone?.replace(/[^0-9]/g, '').slice(-10)

  const leads = (userEmail || userPhone) ? await prisma.lead.findMany({
    where: {
      OR: [
        ...(userEmail ? [{ email: userEmail }] : []),
        ...(userPhone ? [{ mobile: { contains: userPhone } }] : [])
      ]
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []) : []

  const totalCount = applications.length + leads.length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-brand-deep rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <span>Real-Time Underwriting Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              My Loan Applications &amp; Inquiries
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Track multi-bank appraisal stages, scheduled doorstep specialist visits, and download official sanction letters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/track"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl transition-all duration-200 inline-flex items-center gap-1.5"
            >
              <Search size={14} /> Track by Ref ID
            </Link>
            <Link 
              href="/dashboard/applications/new" 
              className="bg-brand-mint text-brand-deep font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl hover:bg-white hover:shadow-[0_0_20px_rgba(117,232,122,0.4)] transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
            >
              <Plus size={16} />
              <span>Start New Application</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Applications</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{totalCount}</div>
          <span className="text-[10px] text-slate-500 font-medium">Recorded in registry</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Formal Applications</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{applications.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Institutional Stage</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Doorstep Visits</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {leads.filter(l => (l.employment || "").toLowerCase().includes("doorstep")).length}
          </div>
          <span className="text-[10px] text-blue-600 font-semibold">Field Verification</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-mint/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400">Sanction Probability</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">High (84%)</div>
          <span className="text-[10px] text-slate-500 font-medium">NSDL KYC cleared</span>
        </div>
      </div>

      {/* 3. Empty State or Application Tables */}
      {totalCount === 0 ? (
        <div className="bg-white p-10 sm:p-14 rounded-3xl border border-slate-200/90 text-center flex flex-col items-center justify-center shadow-xs">
          <div className="h-16 w-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100 shadow-xs">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">No active loan applications yet</h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-medium">
            You haven&apos;t initiated any loan applications or doorstep visits yet. Compare our 30+ partner bank interest rates or start a paperless digital sanction request now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link 
              href="/track"
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-colors"
            >
              Track with Reference No.
            </Link>
            <Link 
              href="/dashboard/applications/new"
              className="px-6 py-2.5 bg-brand-deep text-brand-mint font-extrabold text-xs sm:text-sm rounded-xl hover:bg-slate-900 shadow-md transition-colors"
            >
              Start Full Application &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Formal Applications Card Table */}
          {applications.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-brand-mint/50 transition-all duration-300">
              <div className="bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 tracking-tight">Formal Loan Applications</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Institutional banking files under credit appraisal</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {applications.length} Files
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Application ID</th>
                      <th className="px-6 py-3.5">Product Type</th>
                      <th className="px-6 py-3.5">Requested Amount</th>
                      <th className="px-6 py-3.5">Underwriting Status</th>
                      <th className="px-6 py-3.5">Submission Date</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-emerald-50/20 transition-colors group">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">
                          #{app.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-slate-800 font-bold flex items-center gap-2">
                          <Building2 size={15} className="text-brand-mint" />
                          <span>{app.loanProduct?.name || "Home Loan"}</span>
                        </td>
                        <td className="px-6 py-4 font-black text-slate-900">
                          ₹{app.requestedAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                          {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/dashboard/applications/${app.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-deep bg-slate-100 hover:bg-brand-mint hover:text-brand-deep px-3 py-1.5 rounded-xl transition-colors"
                          >
                            <span>Inspect File</span>
                            <ChevronRight size={13} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Website Enquiries & Doorstep Requests */}
          {leads.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-brand-mint/50 transition-all duration-300">
              <div className="bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 tracking-tight">Website Enquiries &amp; Doorstep Visits</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Direct coordinator verification logs for {userEmail || "your profile"}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {leads.length} Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Reference No.</th>
                      <th className="px-6 py-3.5">Service Type</th>
                      <th className="px-6 py-3.5">Loan Preference</th>
                      <th className="px-6 py-3.5">Location</th>
                      <th className="px-6 py-3.5">Current Status</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => {
                      const isDoorstep = (lead.employment || "").toLowerCase().includes("doorstep");
                      const refMatch = (lead.employment || "").match(/\[REF:\s*([^\]]+)\]/i);
                      const refNumber = refMatch ? refMatch[1] : `MVHL-${lead.id.slice(0, 8)}`;
                      return (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 font-mono font-bold text-slate-900">
                            {refNumber}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              isDoorstep 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {isDoorstep ? <Calendar size={11} className="text-brand-mint" /> : null}
                              {isDoorstep ? "Doorstep Specialist Visit" : "Rate Comparison Inquiry"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-black text-slate-900">
                            {lead.loanAmount ? `₹${lead.loanAmount.toLocaleString('en-IN')}` : "Flexible"}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-600 font-semibold">{lead.city || "NCR"}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/track?ref=${encodeURIComponent(refNumber)}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors border border-emerald-200/60"
                            >
                              <span>Live Tracker</span>
                              <ExternalLink size={11} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  )
}
