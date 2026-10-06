import { prisma } from "@/lib/prisma"
import { ApplicationClientList } from "@/components/admin/ApplicationClientList"

export const dynamic = "force-dynamic"

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
  })

  const formattedApplications = dbApplications.map(app => ({
    id: app.id,
    customer: app.customer.user.name || app.customer.user.email || 'Unknown',
    product: app.loanProduct.name,
    amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(app.requestedAmount),
    status: app.status,
    date: new Date(app.createdAt).toLocaleDateString('en-IN')
  }))

  return (
    <div className="space-y-6">
      <ApplicationClientList applications={formattedApplications} />
    </div>
  )
}

