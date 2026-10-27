"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  FolderCheck, 
  FileCheck, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

interface FormItem {
  id: string;
  title: string;
  category: "Tax" | "Application" | "Legal" | "Disbursement";
  description: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize: string;
  format: string;
}

export default function DownloadFormsClient({ initialForms = [] }: { initialForms?: FormItem[] }) {
  const [forms, setForms] = useState<FormItem[]>(initialForms);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Dynamically fetch live forms managed from the admin dashboard
    fetch("/api/admin/forms")
      .then((res) => res.json())
      .then((data) => {
        if (data.forms && data.forms.length > 0) {
          setForms(data.forms);
        }
      })
      .catch((err) => console.error("Error fetching live forms:", err));
  }, []);

  const categories = ["All", "Tax", "Application", "Legal", "Disbursement"];

  const filteredForms = forms.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (form: FormItem) => {
    // If admin uploaded a real PDF/file, download it directly
    if (form.fileUrl) {
      const link = document.createElement("a");
      link.href = form.fileUrl;
      link.download = form.fileName || `${form.title.replace(/[^a-zA-Z0-9]/g, "_")}.${form.format.toLowerCase()}`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Fallback: Generate a clean text download file on the fly with the legal template content
    const content = `MONEY VIORA - OFFICIAL BORROWER TEMPLATE
------------------------------------------------------------
Document: ${form.title}
Category: ${form.category}
Standardized Format for Indian Banks & Financial Institutions
------------------------------------------------------------

TO WHOMSOEVER IT MAY CONCERN / THE BRANCH MANAGER,

Subject: Application / Declaration regarding ${form.title}

Respected Sir / Madam,

I/We hereby submit this document with reference to our Home Loan application / account.
All necessary KYC particulars, loan account references, and declarations are enclosed.

Name of Applicant: ___________________________
Loan Account / Application ID: ________________
Property Address: ____________________________
Contact Phone: _______________________________
Date: ________________________________________

Applicant Signature: _________________________

------------------------------------------------------------
* Generated via Money Viora Digital Loan Assistance Platform.`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-bold tracking-wide uppercase mb-4">
            <FolderCheck size={16} /> Official Resource Center
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Download Home Loan <span className="text-brand-mint">Forms & Formats</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Standard legal templates, tax certificates, builder NOC drafts, and LOD checklists accepted by HDFC, SBI, ICICI, and all partner banks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search forms, tax certificates, NOCs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-deep text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-brand-mint bg-brand-mint/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {form.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {form.format} &bull; {form.fileSize}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{form.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{form.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <ShieldCheck size={14} className="text-green-500" />
                  {form.fileUrl ? "Official Bank PDF" : "Verified Legal Format"}
                </span>
                <button
                  onClick={() => handleDownload(form)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-brand-mint hover:text-brand-deep text-slate-700 font-bold text-xs transition-colors border border-slate-200 hover:border-brand-mint"
                >
                  <Download size={15} />
                  {form.fileUrl ? "Download PDF" : "Download Draft"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Home Buyer's Guide Interactive Section */}
        <div className="mt-16 bg-gradient-to-br from-brand-deep via-[#0d2a23] to-[#061e18] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block mb-2">
              Free Education &bull; Step-By-Step
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              First-Time Home Buyer's Handbook (2026 Edition)
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              Learn the 7 critical stages of buying property in India: from initial budget calculation, RERA checks, sanction letters, agreement drafting, to registry and final key handover.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="btn-interactive inline-flex items-center gap-2 px-6 py-3.5 bg-brand-mint text-brand-deep font-bold rounded-xl text-sm"
              >
                Read Home Buyer's Guide <ArrowRight size={16} />
              </Link>
              <Link
                href="/tools/document-checker"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 font-bold rounded-xl text-sm transition-colors"
              >
                Test Document Readiness
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
