import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArticleEditor } from "@/components/admin/ArticleEditor"

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const isNew = resolvedParams.id === "new"
  
  let article = null
  if (!isNew) {
    article = await prisma.article.findUnique({ where: { id: resolvedParams.id } })
    if (!article) {
      notFound()
    }
  }

  return <ArticleEditor article={article} />
}
