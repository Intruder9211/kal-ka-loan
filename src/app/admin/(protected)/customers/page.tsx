import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { CustomerClientList } from "@/components/admin/CustomerClientList"

export const dynamic = "force-dynamic"

export default async function CustomersAdminPage() {
  const session = await auth()
  
  // Fetch clients from database
  const users = await prisma.user.findMany?.() || []
  const clients = users.filter((u: any) => u.role === "CLIENT")

  return (
    <div className="space-y-6 pb-12">
      <CustomerClientList clients={clients} />
    </div>
  )
}
