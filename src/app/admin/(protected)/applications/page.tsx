import { prisma } from "@/lib/prisma"
import { ApplicationClientList } from "@/components/admin/ApplicationClientList"

export const dynamic = "force-dynamic"

export default async function ApplicationsAdminPage() {
  const applications = await prisma.application.findMany() || []

  return (
    <div className="space-y-6">
      <ApplicationClientList applications={applications} />
    </div>
  )
}

