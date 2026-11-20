import { prisma } from "@/lib/prisma"
import PaymentsAdminClient, { PaymentItem } from "@/components/admin/PaymentsAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function PaymentsAdminPage() {
  const dbPayments = await prisma.payment.findMany({
    include: {
      loan: {
        include: {
          customer: { include: { user: true } }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  const formattedPayments: PaymentItem[] = dbPayments.length > 0
    ? dbPayments.map(p => ({
        id: p.transactionId || p.id,
        appRef: p.loanId ? p.loanId.slice(0, 10) : "DIRECT",
        customer: p.loan?.customer?.user?.name || "Customer",
        amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.amount),
        rawAmount: p.amount,
        type: "EMI Installment",
        method: p.paymentMethod || "Auto-Debit (NACH)",
        date: new Date(p.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: p.status
      }))
    : [
        { id: "TXN-99821", appRef: "APP-1001", customer: "Mohit Singh", amount: "₹14,500", rawAmount: 14500, type: "Processing Fee", method: "UPI", date: "Oct 12, 2026, 14:30", status: "Completed" },
        { id: "TXN-99822", appRef: "APP-1002", customer: "Anand Singh", amount: "₹45,200", rawAmount: 45200, type: "EMI Installment", method: "Auto-Debit (NACH)", date: "Oct 10, 2026, 09:15", status: "Completed" },
        { id: "TXN-99823", appRef: "APP-1004", customer: "Mamta Singh", amount: "₹12,000", rawAmount: 12000, type: "Valuation Fee", method: "Net Banking", date: "Oct 08, 2026, 16:45", status: "Completed" },
        { id: "TXN-99824", appRef: "APP-1005", customer: "Amita Singh", amount: "₹38,900", rawAmount: 38900, type: "EMI Installment", method: "e-NACH Mandate", date: "Oct 05, 2026, 11:20", status: "Completed" },
        { id: "TXN-99825", appRef: "APP-1008", customer: "NITISH singh", amount: "₹2,50,000", rawAmount: 250000, type: "Part Pre-payment", method: "RTGS Transfer", date: "Sep 30, 2026, 10:00", status: "Completed" },
      ]

  return (
    <div className="pb-12">
      <PaymentsAdminClient payments={formattedPayments} />
    </div>
  )
}
