import { prisma } from "@/lib/prisma"
import AdminOverviewVisuals, { OverviewItem } from "@/components/admin/AdminOverviewVisuals"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboardOverview() {
  // Concurrently fetch all live dynamic data from database
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
  ])

  const totalVisitors = siteAnalytics?.visits || 1

  // Dynamic calculations across real DB entries
  const totalAppsCount = applications.length
  const totalLeadsCount = leads.length
  const totalSubmissions = totalAppsCount + totalLeadsCount

  // Doorstep visits: Leads that have "doorstep" anywhere in employment/notes
  const doorstepLeads = leads.filter(l => (l.employment || "").toLowerCase().includes("doorstep"))

  // Pending items requiring action: new leads + under review applications
  const pendingApps = applications.filter(app => app.status === "UNDER_REVIEW" || app.status === "SUBMITTED").length
  const pendingLeads = leads.filter(lead => lead.status === "NEW").length
  const totalPendingAction = pendingApps + pendingLeads

  // Currency Formatter
  const formatCurrency = (val: number) => {
    if (!val || val === 0) return "₹0"
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)
  }

  // Requested Volume calculation
  const appsRequestedTotal = applications.reduce((sum, app) => sum + (app.requestedAmount || 0), 0)
  const leadsRequestedTotal = leads.reduce((sum, l) => sum + (l.loanAmount || 0), 0)
  const totalRequestedVolume = appsRequestedTotal + leadsRequestedTotal

  // Interleave and format dynamic feed items
  const recentItems: OverviewItem[] = [
    ...applications.map(app => ({
      id: app.id,
      type: "APPLICATION" as const,
      name: app.customer?.user?.name || app.customer?.user?.email || "Applicant",
      contact: app.customer?.phone || app.customer?.user?.email || "N/A",
      rawMobile: app.customer?.phone || undefined,
      amount: formatCurrency(app.requestedAmount),
      rawAmount: app.requestedAmount || 0,
      status: app.status,
      city: app.propertyCity || "N/A",
      date: new Date(app.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawDate: new Date(app.createdAt).getTime(),
      link: `/admin/applications/${app.id}`,
    })),
    ...leads.map(l => {
      const isDoorstep = (l.employment || "").toLowerCase().includes("doorstep")
      const isContact = (l.employment || "").toLowerCase().includes("inquiry")
      const leadType = isDoorstep ? ("DOORSTEP" as const) : isContact ? ("CONTACT" as const) : ("LEAD" as const)
      return {
        id: l.id,
        type: leadType,
        name: l.name,
        contact: l.mobile || l.email,
        rawMobile: l.mobile,
        amount: l.loanAmount ? formatCurrency(l.loanAmount) : "Enquiry",
        rawAmount: l.loanAmount || 0,
        status: l.status,
        city: l.city || "N/A",
        date: new Date(l.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        rawDate: new Date(l.createdAt).getTime(),
        link: "/admin/leads",
      }
    }),
  ].sort((a, b) => b.rawDate - a.rawDate)

  const pendingFollowUps = leads
    .filter(l => l.status === "NEW")
    .map(l => ({
      id: l.id,
      name: l.name,
      mobile: l.mobile,
      city: l.city || "NCR",
      amount: l.loanAmount ? formatCurrency(l.loanAmount) : "Enquiry",
      date: new Date(l.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    }))

  return (
    <div className="pb-12">
      <AdminOverviewVisuals
        totalSubmissions={totalSubmissions}
        totalLeadsCount={totalLeadsCount}
        totalAppsCount={totalAppsCount}
        doorstepCount={doorstepLeads.length}
        pendingActionCount={totalPendingAction}
        pendingLeadsCount={pendingLeads}
        pendingAppsCount={pendingApps}
        liveVisitors={totalVisitors}
        totalPipelineVolume={totalRequestedVolume}
        formattedPipelineVolume={formatCurrency(totalRequestedVolume)}
        recentItems={recentItems}
        pendingFollowUps={pendingFollowUps}
      />
    </div>
  )
}
