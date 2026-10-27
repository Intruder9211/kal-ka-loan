"use client";

import { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  Edit2, 
  Download, 
  CheckCircle2, 
  Search, 
  Save, 
  X,
  FileCheck,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

interface FormItem {
  id: string;
  title: string;
  category: "Tax" | "Application" | "Legal" | "Disbursement";
  description: string;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: string;
  format: string;
  updatedAt?: string;
}

export default function AdminFormsPage() {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form inputs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FormItem["category"]>("Application");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState("100 KB");
  const [format, setFormat] = useState("PDF");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/admin/forms");
      const data = await res.json();
      if (data.forms) {
        setForms(data.forms);
      }
    } catch {
      console.error("Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const openAddModal = () => {
    setEditingForm(null);
    setTitle("");
    setCategory("Application");
    setDescription("");
    setFileUrl(null);
    setFileName(null);
    setFileSize("120 KB");
    setFormat("PDF");
    setIsModalOpen(true);
  };

  const openEditModal = (form: FormItem) => {
    setEditingForm(form);
    setTitle(form.title);
    setCategory(form.category);
    setDescription(form.description);
    setFileUrl(form.fileUrl);
    setFileName(form.fileName);
    setFileSize(form.fileSize);
    setFormat(form.format);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/forms/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setFileUrl(data.fileUrl);
        setFileName(data.fileName);
        setFileSize(data.fileSize);
        setFormat(data.format);
        if (!title) {
          // Pre-populate title with friendly name from file
          setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
        }
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const payload = {
      id: editingForm ? editingForm.id : undefined,
      title,
      category,
      description,
      fileUrl,
      fileName,
      fileSize,
      format,
    };

    try {
      const res = await fetch("/api/admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchForms();
      } else {
        alert("Failed to save draft");
      }
    } catch {
      alert("Error saving draft");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document draft?")) return;

    try {
      const res = await fetch(`/api/admin/forms?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchForms();
      } else {
        alert("Failed to delete draft");
      }
    } catch {
      alert("Error deleting draft");
    }
  };

  const filtered = forms.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-brand-mint" /> Forms & Guides Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload custom PDFs, tax certificates, legal declarations, and templates displayed on the public /forms page.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-deep hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          <Plus size={16} /> Upload New Draft PDF
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total Documents: <strong className="text-slate-900">{forms.length}</strong>
        </div>
      </div>

      {/* Forms Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading forms...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">No documents found. Click "Upload New Draft PDF" to add one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Uploaded PDF File</th>
                  <th className="py-3 px-4">Size & Format</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((form) => (
                  <tr key={form.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{form.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{form.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {form.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {form.fileUrl ? (
                        <a
                          href={form.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-mint hover:underline"
                        >
                          <FileCheck size={14} />
                          <span className="truncate max-w-[150px]">{form.fileName || "Uploaded PDF"}</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                          Auto-Generated Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500 font-mono">
                      {form.format} ({form.fileSize})
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(form)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-deep hover:bg-slate-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(form.id)}
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
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {editingForm ? "Edit Document Draft" : "Upload New Document Draft"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              The uploaded file and details will appear instantly for users on the /forms page.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Document Title *
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Form 16A Provisional Interest Certificate"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none bg-white"
                  >
                    <option value="Tax">Tax</option>
                    <option value="Application">Application</option>
                    <option value="Legal">Legal</option>
                    <option value="Disbursement">Disbursement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Format
                  </label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    placeholder="PDF, DOCX"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain when and why borrowers need this document..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none resize-none"
                />
              </div>

              {/* Upload PDF Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                {fileUrl ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <FileCheck className="text-green-600" size={20} />
                      <span className="truncate max-w-[220px]">{fileName || "Document file attached"}</span>
                      <span className="text-xs text-slate-400 font-normal">({fileSize})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-brand-mint hover:underline"
                    >
                      Replace File
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm hover:bg-slate-50"
                    >
                      {uploading ? "Uploading..." : "Attach PDF / Document File"}
                    </button>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Upload .pdf or .docx (If omitted, system creates dynamic template draft)
                    </p>
                  </div>
                )}
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
                  {editingForm ? "Save Changes" : "Publish Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
