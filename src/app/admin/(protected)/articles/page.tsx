import { prisma } from "@/lib/prisma"
import { ArticleClientList } from "@/components/admin/ArticleClientList"

export const dynamic = "force-dynamic";

export default async function ArticlesAdminPage() {
  const articles = await prisma.article.findMany() || []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ArticleClientList articles={articles} />
    </div>
  )
}

