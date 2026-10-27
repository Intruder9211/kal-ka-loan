"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ShieldCheck, Check, AlertCircle } from "lucide-react";

interface StateDuty {
  code: string;
  name: string;
  maleStampDuty: number;
  femaleStampDuty: number;
  jointStampDuty: number;
  registrationFeePercent: number;
  maxRegistrationFee: number;
  cessPercent: number;
}

export default function AdminStampDutyPage() {
  const [states, setStates] = useState<StateDuty[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingState, setEditingState] = useState<StateDuty | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await fetch("/api/admin/stamp-duty");
      const data = await res.json();
      if (data.states) {
        setStates(data.states);
      }
    } catch (err) {
      console.error("Failed to fetch stamp duty data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingState) return;

    try {
      const res = await fetch("/api/admin/stamp-duty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingState),
      });

      const data = await res.json();
      if (data.success) {
        setStates(data.states);
        setShowModal(false);
        setEditingState(null);
        setMessage({ type: "success", text: "Stamp duty rates updated successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save state" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    }
  };

  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to remove state ${code}?`)) return;

    try {
      const res = await fetch(`/api/admin/stamp-duty?code=${code}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setStates(data.states);
        setMessage({ type: "success", text: "State removed successfully" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete state" });
    }
  };

  const openNewModal = () => {
    setEditingState({
      code: "",
      name: "",
      maleStampDuty: 6.0,
      femaleStampDuty: 5.0,
      jointStampDuty: 5.5,
      registrationFeePercent: 1.0,
      maxRegistrationFee: 30000,
      cessPercent: 0.0,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-brand-mint" /> State Stamp Duty & Registration Rates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Dynamically configure real-time stamp duty, registration charges, and gender concession percentages for each Indian state.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-deep hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> Add State
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

      {/* States Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">State</th>
                <th className="py-3.5 px-4">Male Rate</th>
                <th className="py-3.5 px-4">Female Rate</th>
                <th className="py-3.5 px-4">Joint Rate</th>
                <th className="py-3.5 px-4">Registration Fee</th>
                <th className="py-3.5 px-4">Cess / Surcharge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    Loading state rates...
                  </td>
                </tr>
              ) : states.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No states found. Add one above!
                  </td>
                </tr>
              ) : (
                states.map((s) => (
                  <tr key={s.code} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {s.name} <span className="text-xs text-slate-400 font-mono">({s.code})</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{s.maleStampDuty}%</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">{s.femaleStampDuty}%</td>
                    <td className="py-3 px-4 text-slate-700">{s.jointStampDuty}%</td>
                    <td className="py-3 px-4 text-slate-600">
                      {s.registrationFeePercent > 0 ? `${s.registrationFeePercent}%` : "Fixed"}
                      {s.maxRegistrationFee > 0 && (
                        <span className="text-xs text-slate-400 block">
                          Cap: ₹{s.maxRegistrationFee.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{s.cessPercent > 0 ? `${s.cessPercent}%` : "None"}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingState(s);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-brand-deep hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.code)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {states.some((s) => s.code === editingState.code) ? "Edit State Rates" : "Add New State"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State Code (e.g. MH, DL)</label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    value={editingState.code}
                    onChange={(e) => setEditingState({ ...editingState, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State Name</label>
                  <input
                    type="text"
                    required
                    value={editingState.name}
                    onChange={(e) => setEditingState({ ...editingState, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Male Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingState.maleStampDuty}
                    onChange={(e) => setEditingState({ ...editingState, maleStampDuty: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Female Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingState.femaleStampDuty}
                    onChange={(e) => setEditingState({ ...editingState, femaleStampDuty: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Joint Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingState.jointStampDuty}
                    onChange={(e) => setEditingState({ ...editingState, jointStampDuty: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Registration (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingState.registrationFeePercent}
                    onChange={(e) =>
                      setEditingState({ ...editingState, registrationFeePercent: parseFloat(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Max Reg Fee (₹)</label>
                  <input
                    type="number"
                    value={editingState.maxRegistrationFee}
                    onChange={(e) =>
                      setEditingState({ ...editingState, maxRegistrationFee: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Cess / Surcharge (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingState.cessPercent}
                    onChange={(e) => setEditingState({ ...editingState, cessPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
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
                  Save Rates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
