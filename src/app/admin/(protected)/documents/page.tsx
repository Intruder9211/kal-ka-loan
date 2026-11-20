import { prisma } from "@/lib/prisma"
import DocumentsAdminClient, { DocItem } from "@/components/admin/DocumentsAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function DocumentsAdminPage() {
  const dbDocs = await prisma.document.findMany({
    include: {
      customer: {
        include: { user: true }
      },
      application: true
    },
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  const documents: DocItem[] = dbDocs.map(d => ({
    id: d.id,
    applicant: d.customer?.user?.name || "Applicant",
    email: d.customer?.user?.email || undefined,
    appRef: d.applicationId ? d.applicationId.slice(0, 10) : "N/A",
    type: d.type,
    fileName: d.name,
    fileUrl: d.url,
    size: "1.2 MB",
    uploadDate: new Date(d.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: d.status
  }))

  return (
    <div className="pb-12">
      <DocumentsAdminClient documents={documents} />
    </div>
  )
}
