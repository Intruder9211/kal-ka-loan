import { prisma } from "@/lib/prisma"
import { ApplicationClientList } from "@/components/admin/ApplicationClientList"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ApplicationsAdminPage() {
  const dbApplications = await prisma.application.findMany({
    include: {
      customer: {
        include: {
          user: true
        }
      },
      loanProduct: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  }).catch(() => [])

  const formattedApplications = dbApplications.map(app => ({
    id: app.id,
    customer: app.customer?.user?.name || app.customer?.user?.email || 'Applicant',
    email: app.customer?.user?.email || undefined,
    phone: app.customer?.phone || undefined,
    product: app.loanProduct?.name || "Home Loan",
    amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(app.requestedAmount || 0),
    rawAmount: app.requestedAmount || 0,
    status: app.status,
    date: new Date(app.createdAt).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }))

  return (
    <div className="space-y-6">
      <ApplicationClientList applications={formattedApplications} />
    </div>
  )
}
