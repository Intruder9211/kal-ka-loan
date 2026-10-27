"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, MapPin, Check, AlertCircle } from "lucide-react";

interface Branch {
  id: string;
  city: string;
  state: string;
  area: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  timing: string;
}

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await fetch("/api/admin/branches");
      const data = await res.json();
      if (data.branches) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error("Failed to fetch branches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch) return;

    try {
      const res = await fetch("/api/admin/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBranch),
      });

      const data = await res.json();
      if (data.success) {
        setBranches(data.branches);
        setShowModal(false);
        setEditingBranch(null);
        setMessage({ type: "success", text: "Branch saved successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save branch" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;

    try {
      const res = await fetch(`/api/admin/branches?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBranches(data.branches);
        setMessage({ type: "success", text: "Branch removed successfully" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete branch" });
    }
  };

  const openNewModal = () => {
    setEditingBranch({
      id: "",
      city: "",
      state: "",
      area: "",
      address: "",
      pincode: "",
      phone: "+91 ",
      email: "",
      timing: "Mon - Sat: 9:30 AM - 6:30 PM",
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-brand-mint" /> Branches & Service Centers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your physical branches, doorstep loan hubs, and partner service centers shown on the customer locator.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-deep hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Branch
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">Loading branches...</div>
        ) : branches.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">No branches added yet.</div>
        ) : (
          branches.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-mint/50 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {b.city}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">PIN: {b.pincode}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{b.area}</h3>
                <p className="text-xs text-slate-500 mt-1">{b.address}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-700">Phone:</strong> {b.phone}
                  </p>
                  <p>
                    <strong className="text-slate-700">Email:</strong> {b.email}
                  </p>
                  <p>
                    <strong className="text-slate-700">Hours:</strong> {b.timing}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingBranch(b);
                    setShowModal(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-deep hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && editingBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingBranch.id ? "Edit Branch" : "Add New Branch"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.city}
                    onChange={(e) => setEditingBranch({ ...editingBranch, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.state}
                    onChange={(e) => setEditingBranch({ ...editingBranch, state: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Area / Locality</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.area}
                    onChange={(e) => setEditingBranch({ ...editingBranch, area: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.pincode}
                    onChange={(e) => setEditingBranch({ ...editingBranch, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Address</label>
                <textarea
                  rows={2}
                  required
                  value={editingBranch.address}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.phone}
                    onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Support Email</label>
                  <input
                    type="email"
                    required
                    value={editingBranch.email}
                    onChange={(e) => setEditingBranch({ ...editingBranch, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Working Hours</label>
                <input
                  type="text"
                  required
                  value={editingBranch.timing}
                  onChange={(e) => setEditingBranch({ ...editingBranch, timing: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-deep hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-sm"
                >
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
