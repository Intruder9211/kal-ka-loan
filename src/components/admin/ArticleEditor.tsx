"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft, Image as ImageIcon, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export function ArticleEditor({ article }: { article: any }) {
  const router = useRouter()
  const isNew = !article
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [formData, setFormData] = useState({
    title: article?.title || "",
    category: article?.category || "Home Loan Tips",
    author: article?.author || "Money Viora Editorial Team",
    readTime: article?.readTime || "5 min read",
    imageUrl: article?.imageUrl || "",
    desc: article?.desc || "",
    content: article?.content || ""
  })

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.desc.trim() || !formData.content.trim()) {
      alert("Please fill in Title, Excerpt description, and Content.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: article?.id || "new",
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save article");
      }

      alert(isNew ? "Article published successfully!" : "Article updated successfully!");
      router.push("/admin/articles");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  }

  const handleDelete = async () => {
    if (!article?.id) return;
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${article.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete article");
      }

      alert("Article deleted successfully.");
      router.push("/admin/articles");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin/articles" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Link>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {isNew ? "Write New Blog Article" : "Edit Blog Article"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Control live content displayed on /blog and the homepage.</p>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && article?.slug && (
            <Link
              href={`/blog/${article.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <Eye size={14} /> Preview Live
            </Link>
          )}

          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} /> {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-deep hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isNew ? "Publish Live" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Article Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. How to increase your CIBIL Score for a Home Loan in 60 Days"
                className="w-full text-lg font-bold border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Short Excerpt / Card Description</label>
              <textarea 
                rows={3} 
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="A compelling 2-line summary that appears on the blog cards and Google snippets..."
                className="w-full text-sm border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Article Content (HTML / Rich Text supported)
              </label>
              <textarea 
                rows={16} 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="<p>Write your article paragraphs here...</p><h3>Subheadings</h3><p>More guidance...</p>"
                className="w-full text-sm font-mono border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none bg-slate-50 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: You can use HTML tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;strong&gt; for rich typography.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">Article Metadata</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none bg-white font-medium"
              >
                <option value="Home Loan Tips">Home Loan Tips</option>
                <option value="Credit Score">Credit Score</option>
                <option value="Balance Transfer">Balance Transfer</option>
                <option value="Tax Planning">Tax Planning</option>
                <option value="Property Buying">Property Buying</option>
                <option value="Market News">Market News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Author Name</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                placeholder="e.g. 5 min read"
                className="w-full text-sm border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Featured Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-sm border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-brand-mint outline-none font-mono text-xs"
              />
              {formData.imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden h-32 border border-slate-200 bg-slate-50 relative">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
