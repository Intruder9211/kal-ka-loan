"use client"

import { useState } from "react"
import { HelpCircle, Plus, Edit2, Trash2, Search, Save, X, GripVertical } from "lucide-react"

// Mock FAQs data
const initialFaqs = [
  { id: "1", question: "What is the minimum CIBIL score required for a home loan?", answer: "Generally, a CIBIL score of 750 or above is considered excellent and can help you secure a home loan at the lowest interest rates. However, some lenders may approve loans with scores as low as 650, but usually at higher interest rates.", category: "Eligibility" },
  { id: "2", question: "What documents are required for a home loan?", answer: "The basic documents include KYC (PAN, Aadhaar), 6 months bank statements, 3 months salary slips, Form 16, and the property documents (Agreement to Sale, Builder NOC, etc).", category: "Documentation" },
  { id: "3", question: "Can I pre-close my home loan?", answer: "Yes, you can pre-close your home loan. As per RBI guidelines, there are no pre-payment or foreclosure charges on floating-rate home loans for individual borrowers.", category: "Repayment" },
  { id: "4", question: "What is the maximum loan tenure I can get?", answer: "The maximum home loan tenure usually goes up to 30 years, subject to your current age and retirement age. The loan must typically be fully repaid by the time you reach 60-65 years of age.", category: "Eligibility" }
]

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ question: "", answer: "", category: "" })
  const [searchTerm, setSearchTerm] = useState("")

  const startEdit = (faq: any) => {
    setEditingId(faq.id)
    setEditForm({ question: faq.question, answer: faq.answer, category: faq.category })
  }

  const saveEdit = () => {
    setFaqs(faqs.map(f => f.id === editingId ? { ...f, ...editForm } : f))
    setEditingId(null)
  }

  const deleteFaq = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(f => f.id !== id))
    }
  }

  const addNew = () => {
    const newId = Date.now().toString()
    setFaqs([...faqs, { id: newId, question: "New Question?", answer: "Answer here...", category: "General" }])
    setEditingId(newId)
    setEditForm({ question: "", answer: "", category: "General" })
  }

  const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.category.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-600" /> FAQs Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage the Frequently Asked Questions displayed on the public website.</p>
        </div>
        <button onClick={addNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add New FAQ
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search questions or categories..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Total FAQs: <span className="font-semibold text-slate-900">{faqs.length}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No FAQs found matching your search.</div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className={`p-4 sm:p-6 transition-colors group ${editingId === faq.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                {editingId === faq.id ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-blue-900">Editing FAQ</h4>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                      <input 
                        type="text" 
                        value={editForm.category}
                        onChange={e => setEditForm({...editForm, category: e.target.value})}
                        className="w-full sm:w-1/3 text-sm border border-slate-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Question</label>
                      <input 
                        type="text" 
                        value={editForm.question}
                        onChange={e => setEditForm({...editForm, question: e.target.value})}
                        className="w-full text-sm font-semibold border border-slate-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Answer</label>
                      <textarea 
                        rows={3}
                        value={editForm.answer}
                        onChange={e => setEditForm({...editForm, answer: e.target.value})}
                        className="w-full text-sm border border-slate-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                        Cancel
                      </button>
                      <button onClick={saveEdit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save FAQ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="cursor-grab text-slate-300 hover:text-slate-500 mt-1 hidden sm:block" title="Drag to reorder">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                          {faq.category}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-900">{faq.question}</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(faq)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit FAQ">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteFaq(faq.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete FAQ">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
