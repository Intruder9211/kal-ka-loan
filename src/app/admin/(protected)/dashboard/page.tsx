import { Users, FileText, CheckCircle2, Landmark, Clock, ArrowUpRight, TrendingUp, Calendar, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminDashboardOverview() {
  // Fetch real data from both applications and leads tables concurrently
  const [applications, leads, siteAnalytics] = await Promise.all([
    prisma.application.findMany({
      include: {
        customer: { include: { user: true } },
        loanProduct: true,
      },
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
    prisma.siteAnalytics.findUnique({ where: { id: "main" } }).catch(() => null),
  ]);

  const totalVisitors = siteAnalytics?.visits || 0

  // Combine and calculate dynamic real-time stats
  const totalAppsCount = applications.length;
  const totalLeadsCount = leads.length;
  const totalSubmissions = totalAppsCount + totalLeadsCount;

  // Doorstep visits (leads that have Doorstep Visit in details)
  const doorstepLeads = leads.filter(l => (l.employment || "").toLowerCase().includes("doorstep"));
  
  // Pending reviews: applications under review + leads that are "NEW"
  const pendingApps = applications.filter(app => app.status === "UNDER_REVIEW" || app.status === "SUBMITTED").length;
  const pendingLeads = leads.filter(lead => lead.status === "NEW").length;
  const totalPendingAction = pendingApps + pendingLeads;

  // Active / Approved loans
  const approvedApps = applications.filter(app => app.status === "APPROVED").length;

  // Total requested amount across both applications and leads
  const appsRequestedTotal = applications.reduce((sum, app) => sum + (app.requestedAmount || 0), 0);
  const leadsRequestedTotal = leads.reduce((sum, l) => sum + (l.loanAmount || 0), 0);
  const totalRequestedVolume = appsRequestedTotal + leadsRequestedTotal;

  // Format currency
  const formatCurrency = (val: number) => {
    if (!val || val === 0) return "₹0";
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  }

  // Unified recent activity feed (interleaving applications and leads by date)
  type UnifiedItem = {
    id: string;
    type: "APPLICATION" | "DOORSTEP" | "LEAD" | "CONTACT";
    name: string;
    contact: string;
    amount: string;
    status: string;
    city: string;
    date: Date;
    link: string;
  };

  const unifiedList: UnifiedItem[] = [
    ...applications.map(app => ({
      id: app.id,
      type: "APPLICATION" as const,
      name: app.customer?.user?.name || app.customer?.user?.email || "Applicant",
      contact: app.customer?.phone || app.customer?.user?.email || "N/A",
      amount: formatCurrency(app.requestedAmount),
      status: app.status,
      city: app.propertyCity || "N/A",
      date: new Date(app.createdAt),
      link: `/admin/applications/${app.id}`,
    })),
    ...leads.map(l => {
      const isDoorstep = (l.employment || "").toLowerCase().includes("doorstep");
      const isContact = (l.employment || "").toLowerCase().includes("inquiry");
      const leadType: "DOORSTEP" | "CONTACT" | "LEAD" = isDoorstep ? "DOORSTEP" : isContact ? "CONTACT" : "LEAD";
      return {
        id: l.id,
        type: leadType,
        name: l.name,
        contact: l.mobile || l.email,
        amount: l.loanAmount ? formatCurrency(l.loanAmount) : "Enquiry",
        status: l.status,
        city: l.city || "N/A",
        date: new Date(l.createdAt),
        link: "/admin/leads",
      };
    })
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Live Overview</h2>
          <p className="text-slate-500 mt-1">Real-time dynamic submissions, doorstep bookings, and active applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2 bg-brand-deep text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            Manage Leads ({totalLeadsCount})
          </Link>
          <Link
            href="/admin/applications"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            View Applications ({totalAppsCount})
          </Link>
        </div>
      </div>

      {/* Dynamic Metric Cards (No Static Mock Offsets) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        
        {/* Total Live Submissions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Submissions</h3>
            <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalSubmissions}</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            {totalLeadsCount} Leads &bull; {totalAppsCount} Full Apps
          </div>
        </div>

        {/* Doorstep Visits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doorstep Visits</h3>
            <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{doorstepLeads.length}</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            At-home document appointments
          </div>
        </div>

        {/* Action Required */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Action Required</h3>
            <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{totalPendingAction}</div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {pendingLeads} new leads &bull; {pendingApps} apps
          </p>
        </div>

        {/* Website Traffic */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Visitors</h3>
            <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalVisitors}</div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Unique site sessions
          </p>
        </div>

        {/* Total Pipeline Volume */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-sm text-white relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 relative z-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Volume</h3>
            <Landmark className="h-5 w-5 text-brand-mint" />
          </div>
          <div className="text-2xl font-black text-white relative z-10">{formatCurrency(totalRequestedVolume)}</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-medium text-brand-mint relative z-10">
            <ArrowUpRight className="h-3.5 w-3.5" /> Total loan demand
          </div>
        </div>
      </div>

      {/* Unified Live Activity Table */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Submissions Feed */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-slate-100 bg-white px-6 py-5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Live Website Enquiries &amp; Applications</h3>
              <p className="text-xs text-slate-500">Every doorstep visit, loan application, and contact query appears here dynamically.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
              View All Leads
            </Link>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {unifiedList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <FileText className="h-12 w-12 text-slate-200 mb-4" />
                <h4 className="text-base font-semibold text-slate-900">No submissions received yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">When users submit a Doorstep Visit, Contact Form, or Loan Application, it will automatically show here in real-time.</p>
              </div>
            ) : (
              unifiedList.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      item.type === "DOORSTEP" ? "bg-emerald-100 text-emerald-800" :
                      item.type === "APPLICATION" ? "bg-blue-100 text-blue-800" :
                      item.type === "CONTACT" ? "bg-purple-100 text-purple-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {item.type === "DOORSTEP" ? "VISIT" : item.type === "APPLICATION" ? "APP" : "LEAD"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {item.id.slice(0, 10)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                        <span>{item.contact}</span>
                        {item.city && item.city !== "N/A" && <span>&bull; {item.city}</span>}
                        <span className="font-semibold text-slate-700">&bull; {item.amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                      item.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {item.date.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Panel & Quick Follow-Up */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 mb-2">Pending Quick Follow-Ups</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              New website leads and doorstep requests needing advisor assignment or verification.
            </p>

            {leads.filter(l => l.status === "NEW").length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">All leads caught up!</p>
                <p className="text-xs text-slate-400">Zero pending uncontacted requests.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.filter(l => l.status === "NEW").slice(0, 4).map(lead => (
                  <div key={lead.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{lead.name}</p>
                      <p className="text-[11px] text-slate-500">{lead.mobile} &bull; {lead.city || "NCR"}</p>
                    </div>
                    <a
                      href={`tel:${(lead.mobile || '').replace(/[^0-9+]/g, '')}`}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Phone size={11} /> Call
                    </a>
                  </div>
                ))}
                <Link
                  href="/admin/leads"
                  className="block text-center text-xs font-bold text-blue-600 hover:underline pt-2"
                >
                  View All Pending Leads &rarr;
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-brand-mint/30 bg-emerald-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900">Live Email Sync</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              All website forms automatically dispatch branded notifications to <strong>singhmohit101103@gmail.com</strong> and deliver tracking reference numbers to clients.
            </p>
            <div className="text-[11px] font-mono bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700">
              Target Email: singhmohit101103@gmail.com<br/>
              Status: Active &bull; Gmail SMTP Relay
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
