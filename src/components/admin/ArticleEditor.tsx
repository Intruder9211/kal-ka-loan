"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export function ArticleEditor({ article }: { article: any }) {
  const router = useRouter()
  const isNew = !article
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: article?.title || "",
    category: article?.category || "Blog",
    desc: article?.desc || "",
    content: article?.content || ""
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate server action
    setTimeout(() => {
      setIsSaving(false)
      alert(isNew ? "Article published successfully!" : "Article updated successfully!")
      router.push("/admin/articles")
      router.refresh()
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin/articles" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-2 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isNew ? "Write New Article" : "Edit Article"}
          </h2>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isNew ? "Publish Post" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Article Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., How to improve your CIBIL score"
                className="w-full text-lg font-semibold border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Excerpt / Description</label>
              <textarea 
                rows={3} 
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="A brief summary that appears on the blog listing page..."
                className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
              <textarea 
                rows={15} 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Write your article content here... (Markdown supported)"
                className="w-full text-sm font-mono border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Publishing Settings</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Home Loan Tips">Home Loan Tips</option>
                <option value="Credit Score">Credit Score</option>
                <option value="Tax Planning">Tax Planning</option>
                <option value="Balance Transfer">Balance Transfer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image</label>
              <div className="mt-1 border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50/50">
                <ImageIcon className="h-8 w-8 mb-2 text-slate-400" />
                <span className="text-sm font-medium text-center">Click to upload featured image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
