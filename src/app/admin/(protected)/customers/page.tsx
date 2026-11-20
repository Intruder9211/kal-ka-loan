import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { CustomerClientList } from "@/components/admin/CustomerClientList"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function CustomersAdminPage() {
  await auth()
  
  // Fetch real registered customers from database with their profiles, applications, and loans
  const users = await prisma.user.findMany({
    where: {
      role: { notIn: ["ADMIN", "SUPER_ADMIN"] }
    },
    include: {
      customerProfile: {
        include: {
          applications: true,
          loans: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  // Format customers for client view
  const formattedClients = users.map(u => ({
    id: u.id,
    name: u.name || "Customer",
    email: u.email || "No email",
    phone: u.customerProfile?.phone || null,
    image: u.image || null,
    role: u.role,
    applicationsCount: u.customerProfile?.applications?.length || 0,
    loansCount: u.customerProfile?.loans?.length || 0,
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
    status: "Active"
  }))

  return (
    <div className="space-y-6 pb-12">
      <CustomerClientList clients={formattedClients} />
    </div>
  )
}
