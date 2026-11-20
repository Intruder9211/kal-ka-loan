import { prisma } from "@/lib/prisma"
import LoanProductsAdminClient, { ProductItem } from "@/components/admin/LoanProductsAdminClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function LoanProductsAdminPage() {
  const dbProducts = await prisma.loanProduct.findMany({
    orderBy: { createdAt: "asc" }
  }).catch(() => [])

  const products: ProductItem[] = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    interestRate: p.interestRate,
    minAmount: p.minAmount,
    maxAmount: p.maxAmount,
    minTenure: p.minTenure,
    maxTenure: p.maxTenure,
    status: p.status
  }))

  return (
    <div className="pb-12">
      <LoanProductsAdminClient products={products} />
    </div>
  )
}
