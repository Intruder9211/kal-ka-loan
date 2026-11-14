"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Percent, 
  Check,
  X,
  AlertCircle
} from "lucide-react";
import BankLogo from "@/components/ui/BankLogo";

export interface LenderROI {
  id: string;
  name: string;
  logo: string;
  interestRate: string;
  salariedRate?: string;
  selfEmployedRate?: string;
  rateType?: string;
  officialUrl?: string;
  processingFee: string;
  maxTenure: string;
  maxAmount: string;
  type: string;
  tags: string[];
  status: "Active" | "Inactive";
  updatedAt?: string;
}

export default function LendersAdminPage() {
  const [lenders, setLenders] = useState<LenderROI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<Partial<LenderROI> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/lenders");
      const data = await res.json();
      if (data.lenders) {
        setLenders(data.lenders);
      }
    } catch (err) {
      console.error("Failed to load lenders:", err);
      showToast("error", "Failed to load bank ROI records.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingLender({
      id: "",
      name: "",
      logo: "",
      interestRate: "",
      salariedRate: "",
      selfEmployedRate: "",
      rateType: "Floating",
      officialUrl: "",
      processingFee: "Up to 0.5% + GST",
      maxTenure: "30 Years",
      maxAmount: "Up to ₹10 Cr",
      type: "Private Bank",
      tags: ["Lowest Rate", "Quick Sanction"],
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lender: LenderROI) => {
    setEditingLender({ ...lender });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLender?.name || !editingLender?.interestRate) {
      showToast("error", "Bank Name and Starting Interest Rate are required.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/lenders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLender)
      });
      const data = await res.json();
      if (data.success) {
        setLenders(data.lenders);
        setIsModalOpen(false);
        setEditingLender(null);
        showToast("success", `Bank ROI for "${editingLender.name}" saved and live on website!`);
      } else {
        showToast("error", data.error || "Failed to save bank ROI.");
      }
    } catch (err: any) {
      showToast("error", err.message || "An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ROI entry for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/lenders?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLenders(data.lenders);
        showToast("success", `Removed "${name}" from live bank list.`);
      } else {
        showToast("error", data.error || "Failed to delete.");
      }
    } catch (err: any) {
      showToast("error", "Failed to delete lender.");
    }
  };

  const filteredLenders = lenders.filter((l) => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.interestRate && l.interestRate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.type && l.type.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "All" || l.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold border animate-fade-down ${
          toastMessage.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {toastMessage.type === "success" ? <Check size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-red-600" />}
          {toastMessage.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Building2 className="h-7 w-7 text-emerald-600" /> Dynamic Bank ROI Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage live interest rates, circular sheets, salaried/self-employed rates across all lending partners. Updates reflect instantly across the entire platform.
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4 text-emerald-400" /> Add New Bank ROI
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Total Banks Active</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{lenders.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Lowest Starting ROI</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {lenders.length > 0 ? lenders[0].interestRate.split(" ")[0] : "7.25%"}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Official Rate Sheets Linked</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">
            {lenders.filter(l => l.officialUrl).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Sync Status</div>
          <div className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Dynamic & Live
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bank by name or ROI..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {["All", "Private Bank", "Public Sector Bank", "NBFC / HFC"].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterType === type 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table / Cards List */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Loading live bank rate cards...</p>
        </div>
      ) : filteredLenders.length === 0 ? (
        <div className="py-12 text-center bg-white border border-slate-200 rounded-xl">
          <Building2 className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900">No bank ROI records found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or add a new bank.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Bank / Institution</th>
                  <th className="px-6 py-4">Starting ROI (p.a.)</th>
                  <th className="px-6 py-4">Category Rates</th>
                  <th className="px-6 py-4">Rate Sheet / Circular</th>
                  <th className="px-6 py-4">Processing Fee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLenders.map((lender) => (
                  <tr key={lender.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Bank Name & Logo */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <BankLogo 
                          name={lender.name} 
                          logoUrl={lender.logo} 
                          className="w-10 h-10" 
                          size={40} 
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-base">{lender.name}</div>
                          <span className="inline-block text-[11px] font-semibold text-slate-500">
                            {lender.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Starting ROI */}
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-base text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-100">
                        {lender.interestRate}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{lender.rateType || "Floating"}</div>
                    </td>

                    {/* Category Breakdown */}
                    <td className="px-6 py-4 text-xs space-y-1">
                      {lender.salariedRate && (
                        <div className="text-slate-700">
                          <span className="font-semibold text-slate-500">Salaried:</span> {lender.salariedRate}
                        </div>
                      )}
                      {lender.selfEmployedRate && (
                        <div className="text-slate-700">
                          <span className="font-semibold text-slate-500">Self-Employed:</span> {lender.selfEmployedRate}
                        </div>
                      )}
                      {!lender.salariedRate && !lender.selfEmployedRate && (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Official Circular Link */}
                    <td className="px-6 py-4">
                      {lender.officialUrl ? (
                        <a 
                          href={lender.officialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline bg-blue-50/70 border border-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Official Circular <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No link</span>
                      )}
                    </td>

                    {/* Processing Fee */}
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                      {lender.processingFee || "—"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {lender.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button 
                          onClick={() => handleOpenEditModal(lender)}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit ROI Details"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(lender.id, lender.name)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Bank"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && editingLender && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingLender.id ? `Edit ${editingLender.name} ROI` : "Add New Bank ROI"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Changes will be saved and reflected on the frontend immediately.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bank / Institution Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. HDFC Bank, SBI, ICICI Bank"
                    value={editingLender.name || ""}
                    onChange={e => setEditingLender({ ...editingLender, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institution Type
                  </label>
                  <select 
                    value={editingLender.type || "Private Bank"}
                    onChange={e => setEditingLender({ ...editingLender, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <option value="Private Bank">Private Bank</option>
                    <option value="Public Sector Bank">Public Sector Bank</option>
                    <option value="NBFC / HFC">NBFC / HFC</option>
                    <option value="Foreign Bank">Foreign Bank</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Logo Image URL / Path
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. /images/banks/hdfc.svg or https://..."
                    value={editingLender.logo || ""}
                    onChange={e => setEditingLender({ ...editingLender, logo: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Rate Sheet / Circular URL
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://bank.com/home-loan-rates"
                    value={editingLender.officialUrl || ""}
                    onChange={e => setEditingLender({ ...editingLender, officialUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Starting ROI * (Live / Display)
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 7.45% – 13.55% or 7.40%+"
                    value={editingLender.interestRate || ""}
                    onChange={e => setEditingLender({ ...editingLender, interestRate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Salaried Rates
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 7.25% – 10.25%"
                    value={editingLender.salariedRate || ""}
                    onChange={e => setEditingLender({ ...editingLender, salariedRate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Self-Employed Rates
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 7.70% – 10.65%"
                    value={editingLender.selfEmployedRate || ""}
                    onChange={e => setEditingLender({ ...editingLender, selfEmployedRate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Processing Fee
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 0.50% or ₹3,000 + GST"
                    value={editingLender.processingFee || ""}
                    onChange={e => setEditingLender({ ...editingLender, processingFee: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Max Tenure
                  </label>
                  <input 
                    type="text" 
                    value={editingLender.maxTenure || "30 Years"}
                    onChange={e => setEditingLender({ ...editingLender, maxTenure: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select 
                    value={editingLender.status || "Active"}
                    onChange={e => setEditingLender({ ...editingLender, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : "Save & Update Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
