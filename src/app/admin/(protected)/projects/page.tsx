"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit2, 
  Search, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  location: string;
  type: string;
  priceRange: string;
  reraNumber: string;
  status: string;
  approvedBanks: string[];
  highlights: string[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("2, 3 BHK Apartments");
  const [priceRange, setPriceRange] = useState("₹1 Cr - ₹2.5 Cr");
  const [reraNumber, setReraNumber] = useState("");
  const [status, setStatus] = useState("Ready to Move");
  const [approvedBanksStr, setApprovedBanksStr] = useState("HDFC Bank, SBI, ICICI Bank, Axis Bank");
  const [highlightsStr, setHighlightsStr] = useState("Pre-approved legal clearance\nZero processing fee offer\n24hr digital sanction");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch {
      console.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setName("");
    setDeveloper("");
    setCity("Delhi NCR");
    setLocation("");
    setType("2, 3 BHK Apartments");
    setPriceRange("₹1 Cr - ₹2.5 Cr");
    setReraNumber("");
    setStatus("Ready to Move");
    setApprovedBanksStr("HDFC Bank, SBI, ICICI Bank, Axis Bank");
    setHighlightsStr("Pre-approved legal verification\nFast-track sanction in 24 hours\nUp to 80% funding");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setName(p.name);
    setDeveloper(p.developer);
    setCity(p.city);
    setLocation(p.location);
    setType(p.type);
    setPriceRange(p.priceRange);
    setReraNumber(p.reraNumber);
    setStatus(p.status);
    setApprovedBanksStr(p.approvedBanks.join(", "));
    setHighlightsStr(p.highlights.join("\n"));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !developer.trim()) {
      alert("Project name and developer are required");
      return;
    }

    const payload = {
      id: editingProject ? editingProject.id : undefined,
      name,
      developer,
      city,
      location,
      type,
      priceRange,
      reraNumber,
      status,
      approvedBanks: approvedBanksStr.split(",").map(s => s.trim()).filter(Boolean),
      highlights: highlightsStr.split("\n").map(s => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        alert("Failed to save project");
      }
    } catch {
      alert("Error saving project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this verified project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("Error deleting project");
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.developer.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.reraNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-brand-mint" /> Verified Projects Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage RERA-verified residential and commercial projects with pre-approved banking partners displayed on the public /projects directory.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <span>View Public Directory</span>
            <ExternalLink size={14} />
          </Link>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-deep hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            <Plus size={16} /> Add Verified Project
          </button>
        </div>
      </div>

      {/* Search & Stats */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project, builder, RERA or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total Projects: <strong className="text-slate-900">{projects.length}</strong>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading verified projects...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No projects found. Click "Add Verified Project" to add your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Project & Developer</th>
                  <th className="py-3 px-4">City / Location</th>
                  <th className="py-3 px-4">Price Guide</th>
                  <th className="py-3 px-4">Approved Banks</th>
                  <th className="py-3 px-4">Status & RERA</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{project.name}</div>
                      <div className="text-xs text-slate-500 font-medium">By {project.developer}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-800 text-xs block">{project.city}</span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[180px] block">{project.location}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900 text-xs">
                      {project.priceRange}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.approvedBanks.slice(0, 3).map((bank) => (
                          <span key={bank} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {bank}
                          </span>
                        ))}
                        {project.approvedBanks.length > 3 && (
                          <span className="text-[10px] font-bold text-brand-mint">
                            +{project.approvedBanks.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block text-[11px] font-bold text-brand-mint bg-brand-mint/10 px-2 py-0.5 rounded-full mb-0.5">
                        {project.status}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {project.reraNumber.length > 16 ? `${project.reraNumber.slice(0, 16)}...` : project.reraNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-deep hover:bg-slate-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
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
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {editingProject ? "Edit Verified Project" : "Add New Verified Project"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Details saved here will be published instantly onto the public /projects directory.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Project Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Godrej Woods"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Developer / Builder *
                  </label>
                  <input
                    required
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    placeholder="e.g. Godrej Properties"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none bg-white"
                  >
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Locality / Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Sector 43, Noida"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Configuration Type
                  </label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. 2, 3, 4 BHK Apartments"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Price Range Guide
                  </label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="e.g. ₹1.45 Cr - ₹3.85 Cr"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    RERA Registration No.
                  </label>
                  <input
                    type="text"
                    value={reraNumber}
                    onChange={(e) => setReraNumber(e.target.value)}
                    placeholder="e.g. UPRERAPRJ704730"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Possession Status
                  </label>
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="e.g. Ready to Move, Possession 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Pre-Approved Partner Banks (comma separated)
                </label>
                <input
                  type="text"
                  value={approvedBanksStr}
                  onChange={(e) => setApprovedBanksStr(e.target.value)}
                  placeholder="HDFC Bank, SBI, ICICI Bank, Axis Bank"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Project Loan Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={highlightsStr}
                  onChange={(e) => setHighlightsStr(e.target.value)}
                  placeholder="Zero processing fee via Money Viora&#10;Fast-track sanction in 24 hours&#10;Up to 80% LTV financing"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-deep text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                  {editingProject ? "Save Changes" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
