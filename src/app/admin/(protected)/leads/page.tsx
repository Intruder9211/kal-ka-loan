import { prisma } from "@/lib/prisma"
import { LeadsClientList } from "@/components/admin/LeadsClientList"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function LeadsAdminPage() {
  const dbLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  const leads = dbLeads.map(l => ({
    id: l.id,
    name: l.name,
    mobile: l.mobile,
    email: l.email,
    employment: l.employment,
    monthlyIncome: l.monthlyIncome,
    loanAmount: l.loanAmount,
    city: l.city,
    status: l.status,
    createdAt: l.createdAt.toISOString()
  }))

  return (
    <div className="space-y-6 pb-12">
      <LeadsClientList leads={leads} />
    </div>
  )
}
