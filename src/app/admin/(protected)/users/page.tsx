import { prisma } from "@/lib/prisma"
import UsersAdminClient, { AdminUserItem } from "@/components/admin/UsersAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function UsersAdminPage() {
  const dbUsers = await prisma.user.findMany({
    orderBy: { createdAt: "asc" }
  }).catch(() => [])

  const users: AdminUserItem[] = dbUsers.map(u => ({
    id: u.id,
    name: u.name || "Team Member",
    email: u.email || "No email",
    role: u.role,
    status: "Active",
    lastLogin: u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : "Active"
  }))

  return (
    <div className="pb-12">
      <UsersAdminClient users={users} />
    </div>
  )
}
