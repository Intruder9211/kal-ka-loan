"use client"

import { useState } from "react"
import { Briefcase, Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, Percent, MoreVertical } from "lucide-react"

// Mock Loan Products Data
const initialProducts = [
  { id: "PRD-01", name: "Standard Home Loan", code: "HL-STD", minRate: "8.35%", maxRate: "10.50%", maxTenure: "30 Years", maxAmount: "₹5 Cr", status: "Active" },
  { id: "PRD-02", name: "Home Construction Loan", code: "HL-CONST", minRate: "8.50%", maxRate: "11.00%", maxTenure: "20 Years", maxAmount: "₹3 Cr", status: "Active" },
  { id: "PRD-03", name: "Plot Purchase Loan", code: "HL-PLOT", minRate: "8.90%", maxRate: "11.50%", maxTenure: "15 Years", maxAmount: "₹2 Cr", status: "Active" },
  { id: "PRD-04", name: "Home Renovation Loan", code: "HL-RENOV", minRate: "9.25%", maxRate: "12.00%", maxTenure: "10 Years", maxAmount: "₹50 L", status: "Active" },
  { id: "PRD-05", name: "NRI Home Loan", code: "HL-NRI", minRate: "8.50%", maxRate: "10.75%", maxTenure: "20 Years", maxAmount: "₹10 Cr", status: "Inactive" },
]

export default function LoanProductsAdminPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" /> Loan Products
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure the types of loans offered, interest rate bounds, and constraints.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Create Product
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by product name or code..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Product Name & Code</th>
                <th className="px-6 py-4">Interest Rate Range</th>
                <th className="px-6 py-4">Constraints</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900">No products found</h3>
                      <p className="text-sm text-slate-500 mt-1">Try adjusting your search query.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{product.code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium bg-slate-100 w-fit px-2.5 py-1 rounded-md">
                        <Percent className="h-3.5 w-3.5 text-blue-600" />
                        {product.minRate} - {product.maxRate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div>Max Tenure: <span className="font-medium text-slate-700">{product.maxTenure}</span></div>
                      <div className="mt-0.5">Max Amount: <span className="font-medium text-slate-700">{product.maxAmount}</span></div>
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "Active" ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                          <CheckCircle2 className="h-4 w-4" /> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs">
                          <XCircle className="h-4 w-4" /> Inactive
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Product">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
