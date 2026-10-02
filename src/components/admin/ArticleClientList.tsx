"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Plus, Edit3, Calendar, User, Eye, Search } from "lucide-react"

export function ArticleClientList({ articles }: { articles: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter(article => {
    const term = searchTerm.toLowerCase()
    return (
      (article.title?.toLowerCase() || "").includes(term) ||
      (article.category?.toLowerCase() || "").includes(term) ||
      (article.author?.toLowerCase() || "").includes(term) ||
      (article.desc?.toLowerCase() || "").includes(term)
    )
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Blog & Articles</h2>
          <p className="text-sm text-slate-500 mt-1">Manage blog posts, guides, and articles that appear on the public site.</p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Write New Article
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, category, or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-medium text-slate-900">No articles found</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              {searchTerm ? "Try adjusting your search filters." : "Get started by creating a new blog post."}
            </p>
            {!searchTerm && (
              <Link 
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Plus className="h-4 w-4" /> Create Article
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredArticles.map((article: any) => (
              <div key={article.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex gap-4 items-start sm:items-center">
                  <div className="hidden sm:flex h-12 w-12 bg-blue-50 text-blue-600 rounded-lg items-center justify-center border border-blue-100 flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {article.category || "Blog"}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {article.date}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <User className="h-3 w-3" /> {article.author}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{article.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{article.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${article.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-lg shadow-sm transition-colors" title="View on Live Site">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link href={`/admin/articles/${article.id}`} className="px-3 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors flex items-center gap-2" title="Edit Article">
                    <Edit3 className="h-4 w-4" /> Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
