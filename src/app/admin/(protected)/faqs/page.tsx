"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Plus, Edit2, Trash2, Search, Save, X, CheckCircle2, Sparkles, Loader2 } from "lucide-react"

interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  order?: number
}

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ question: "", answer: "", category: "General" })
  const [searchTerm, setSearchTerm] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/faqs")
      const data = await res.json()
      if (data.faqs) {
        setFaqs(data.faqs)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (faq: FaqItem) => {
    setEditingId(faq.id)
    setEditForm({ question: faq.question, answer: faq.answer, category: faq.category || "General" })
  }

  const saveEdit = async () => {
    if (!editForm.question || !editForm.answer) return
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          ...editForm
        })
      })
      if (res.ok) {
        await fetchFaqs()
        setEditingId(null)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteFaq = async (id: string) => {
    if (confirm("Are you sure you want to remove this FAQ?")) {
      try {
        const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" })
        if (res.ok) {
          setFaqs(faqs.filter(f => f.id !== id))
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const addNew = () => {
    const tempId = `new-${Date.now()}`
    setFaqs([{ id: tempId, question: "New FAQ Question?", answer: "Clear answer here...", category: "General" }, ...faqs])
    setEditingId(tempId)
    setEditForm({ question: "", answer: "", category: "General" })
  }

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (f.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-600" /> FAQs &amp; Help Desk Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage public questions, underwriting answers, and eligibility help articles.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addNew}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New FAQ
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search FAQs by question or category..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {faqs.length} Live FAQ Articles
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" /> Loading FAQs from database...
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFaqs.map((faq) => {
              const isCurrentEdit = editingId === faq.id
              return (
                <div key={faq.id} className="py-4 space-y-3 group">
                  {isCurrentEdit ? (
                    <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Question</label>
                          <input
                            type="text"
                            value={editForm.question}
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                            placeholder="e.g. What is the minimum loan tenure?"
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category</label>
                          <input
                            type="text"
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            placeholder="Eligibility / Documents"
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Answer</label>
                        <textarea
                          rows={3}
                          value={editForm.answer}
                          onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                          placeholder="Comprehensive explanation..."
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-2 justify-end pt-2">
                        <button
                          onClick={saveEdit}
                          disabled={isSaving}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                          Save to Database
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4 p-2 rounded-2xl hover:bg-slate-50/80 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {faq.category || "General"}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                            {faq.question}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => startEdit(faq)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteFaq(faq.id)}
                          className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors"
                          title="Delete FAQ"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
