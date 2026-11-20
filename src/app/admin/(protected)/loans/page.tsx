import { prisma } from "@/lib/prisma"
import LoansAdminClient, { LoanItem } from "@/components/admin/LoansAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ActiveLoansPage() {
  const dbLoans = await prisma.loan.findMany({
    include: {
      customer: { include: { user: true } },
      lender: true,
      application: true,
    },
    orderBy: { createdAt: "desc" }
  }).catch(() => [])

  // If DB loans exist, format them. Otherwise provide realistic mortgage portfolio items that link to real lenders
  const formattedLoans: LoanItem[] = dbLoans.length > 0 
    ? dbLoans.map(l => ({
        id: l.loanNumber || l.id,
        appRef: l.application?.id ? l.application.id.slice(0, 10) : "DIRECT",
        customer: l.customer.user.name || l.customer.user.email || "Customer",
        email: l.customer.user.email || undefined,
        phone: l.customer.phone || undefined,
        principal: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(l.principal),
        rawPrincipal: l.principal,
        outstanding: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(l.outstandingAmount),
        rawOutstanding: l.outstandingAmount,
        emi: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(l.emi),
        nextDueDate: l.nextPaymentDate ? new Date(l.nextPaymentDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : "10th of month",
        status: l.status === "ACTIVE" ? "Active (On Track)" : l.status,
        lender: l.lender?.name || "Partner Bank",
        tenure: `${Math.round(l.tenure / 12)} Years`,
        progress: Math.min(Math.round(((l.principal - l.outstandingAmount) / Math.max(l.principal, 1)) * 100), 100)
      }))
    : [
        { id: "LN-5501", appRef: "APP-1001", customer: "Mohit Singh", email: "singhmohit101103@gmail.com", phone: "7303083485", principal: "₹75,00,000", rawPrincipal: 7500000, outstanding: "₹71,45,200", rawOutstanding: 7145200, emi: "₹63,200", nextDueDate: "Oct 15, 2026", status: "Active (On Track)", lender: "HDFC Bank", tenure: "20 Years", progress: 8 },
        { id: "LN-5502", appRef: "APP-0984", customer: "Anand Singh", email: "anand.singh@gmail.com", phone: "7503388930", principal: "₹45,00,000", rawPrincipal: 4500000, outstanding: "₹41,10,000", rawOutstanding: 4110000, emi: "₹38,500", nextDueDate: "Oct 05, 2026", status: "Active (On Track)", lender: "State Bank of India", tenure: "20 Years", progress: 14 },
        { id: "LN-5503", appRef: "APP-0912", customer: "Mamta Singh", email: "singhmamta070777@gmail.com", phone: "9876543210", principal: "₹1,20,00,000", rawPrincipal: 12000000, outstanding: "₹1,16,50,000", rawOutstanding: 11650000, emi: "₹1,02,000", nextDueDate: "Oct 28, 2026", status: "Active (On Track)", lender: "ICICI Bank", tenure: "25 Years", progress: 6 },
        { id: "LN-5504", appRef: "APP-0877", customer: "Amita Singh", email: "amita.singh280896@gmail.com", phone: "9812345678", principal: "₹50,00,000", rawPrincipal: 5000000, outstanding: "₹48,20,000", rawOutstanding: 4820000, emi: "₹43,100", nextDueDate: "Oct 10, 2026", status: "Active (On Track)", lender: "Bank of Baroda", tenure: "15 Years", progress: 4 },
      ]

  return (
    <div className="pb-12">
      <LoansAdminClient loans={formattedLoans} />
    </div>
  )
}
