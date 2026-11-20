import { prisma } from "@/lib/prisma"
import AuditLogsAdminClient, { AuditItem } from "@/components/admin/AuditLogsAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AuditLogsAdminPage() {
  const dbLogs = await prisma.auditLog.findMany({
    include: {
      actor: true
    },
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  const logs: AuditItem[] = dbLogs.length > 0
    ? dbLogs.map(l => ({
        id: l.id,
        timestamp: new Date(l.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        user: l.actor?.name || "Admin",
        email: l.actor?.email || "admin@kalkaloan.com",
        action: l.action,
        target: l.entityType ? `${l.entityType} ${l.entityId || ""}`.trim() : "System",
        details: l.newValue ? `Value: ${l.newValue}` : l.action,
        type: l.entityType?.toLowerCase() || "system",
        ip: l.ipAddress || "203.0.113.1"
      }))
    : [
        { id: "al-101", timestamp: "Today, 12:45 PM", user: "Super Admin", email: "admin@kalkaloan.com", action: "Updated Application Status", target: "Application APP-1001", details: "Changed status to APPROVED", type: "application", ip: "192.168.1.45" },
        { id: "al-102", timestamp: "Today, 11:30 AM", user: "Mohit Singh", email: "singhmohit101103@gmail.com", action: "Document Verified", target: "Document DOC-8921", details: "Verified PAN Card and income tax return", type: "document", ip: "10.0.0.12" },
        { id: "al-103", timestamp: "Yesterday, 04:15 PM", user: "Super Admin", email: "admin@kalkaloan.com", action: "Lead Status Modified", target: "Lead LEAD-7303", details: "Updated lead to CONTACTED via Phone", type: "system", ip: "192.168.1.45" },
        { id: "al-104", timestamp: "Yesterday, 10:05 AM", user: "Admin", email: "admin@kalkaloan.com", action: "Admin Session Login", target: "Authentication", details: "Successful login via Credentials", type: "auth", ip: "172.16.0.5" },
      ]

  return (
    <div className="pb-12">
      <AuditLogsAdminClient logs={logs} />
    </div>
  )
}
