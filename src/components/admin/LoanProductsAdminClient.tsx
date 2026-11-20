"use client"

import { useState } from "react"
import { Briefcase, Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, Percent, MoreVertical, Sparkles, Building2 } from "lucide-react"

export interface ProductItem {
  id: string
  name: string
  slug: string
  interestRate: number | null
  minAmount: number | null
  maxAmount: number | null
  minTenure: number | null
  maxTenure: number | null
  status: string
}

export default function LoanProductsAdminClient({ products: initialProducts }: { products: ProductItem[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" /> Loan Products Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">Configure interest rate bounds, maximum loan limits, and tenure criteria across all product lines.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="h-4 w-4 text-blue-600" />
            {products.length} Active Catalog Products
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by product name or slug..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Mobile Card View (< md) */}
        <div className="block md:hidden divide-y divide-slate-100 p-3 space-y-3">
          {filteredProducts.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">/{p.slug}</div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" /> Published
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-white border border-slate-200/60 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting ROI</span>
                  <span className="font-bold text-emerald-600 text-xs">
                    {p.interestRate ? `${p.interestRate}%` : "7.25%"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Max Loan</span>
                  <span className="font-bold text-slate-800 text-xs">
                    {p.maxAmount ? `₹${(p.maxAmount / 10000000).toFixed(1)} Cr` : "₹15 Cr"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Tenure</span>
                  <span className="font-semibold text-slate-600 text-xs">
                    {p.maxTenure ? `${Math.round(p.maxTenure / 12)}Y` : "30Y"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all">
                  Edit Product
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto pt-2">
          <table className="w-full min-w-[650px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Product Name &amp; Code</th>
                <th className="px-6 py-4">Starting Rate (ROI)</th>
                <th className="px-6 py-4">Maximum Sanction</th>
                <th className="px-6 py-4">Tenure Limit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">/{p.slug}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-1 text-emerald-600">
                      <Percent className="h-3.5 w-3.5" />
                      {p.interestRate ? `${p.interestRate}% p.a.` : "7.25% - 8.95%"}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-800">
                    {p.maxAmount ? `₹${(p.maxAmount / 10000000).toFixed(1)} Cr` : "Up to ₹15 Cr"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-600">
                    {p.maxTenure ? `${Math.round(p.maxTenure / 12)} Years` : "Up to 30 Years"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> Published
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs">
                      Edit Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
