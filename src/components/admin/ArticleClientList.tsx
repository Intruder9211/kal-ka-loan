"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Plus, Edit3, Calendar, User, Eye, Search, Trash2 } from "lucide-react"

export function ArticleClientList({ articles: initialArticles }: { articles: any[] }) {
  const [articles, setArticles] = useState(initialArticles)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredArticles = articles.filter(article => {
    const term = searchTerm.toLowerCase()
    return (
      (article.title?.toLowerCase() || "").includes(term) ||
      (article.category?.toLowerCase() || "").includes(term) ||
      (article.author?.toLowerCase() || "").includes(term) ||
      (article.desc?.toLowerCase() || "").includes(term)
    )
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
      } else {
        alert("Failed to delete article.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Blog &amp; Knowledge Articles</h2>
          <p className="text-sm text-slate-500 mt-1">Publish, edit, and manage articles that appear live on /blog and the website homepage.</p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-deep text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Write New Article
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, category, or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-mint outline-none bg-white font-medium"
            />
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center">
            <div className="h-14 w-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              {searchTerm ? "No articles matched your search." : "Your blog is currently empty. Start by creating an article."}
            </p>
            {!searchTerm && (
              <Link 
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-deep text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                <Plus className="h-4 w-4" /> Create First Article
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredArticles.map((article: any) => (
              <div key={article.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="flex gap-4 items-start sm:items-center">
                  {article.imageUrl ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                        {article.category || "Blog"}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="h-3 w-3" /> {article.date}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <User className="h-3 w-3" /> {article.author}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{article.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{article.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link 
                    href={`/blog/${article.slug}`} 
                    target="_blank" 
                    className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-xl shadow-xs transition-colors" 
                    title="View on Live Site"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link 
                    href={`/admin/articles/${article.id}`} 
                    className="px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    disabled={deletingId === article.id}
                    className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-xl shadow-xs transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
