"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Briefcase, User, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EligibilityDocs() {
  const [tab, setTab] = useState<"salaried" | "self-employed">("salaried");

  const salariedCriteria = [
    { label: "Eligible Age Range", value: "21 – 60 years", hint: "At loan maturity" },
    { label: "Minimum Monthly Income", value: "₹25,000 / month", hint: "Net in-hand credit" },
    { label: "Job Continuity", value: "2+ Years total", hint: "Min 6 months in current company" },
    { label: "Recommended CIBIL", value: "650+ Score", hint: "750+ unlocks prime bank ROI" },
  ];

  const selfEmployedCriteria = [
    { label: "Eligible Age Range", value: "23 – 65 years", hint: "At loan maturity" },
    { label: "Annual Net Profit (ITR)", value: "₹3,00,000+ / year", hint: "Audited / Computed ITR" },
    { label: "Business Vintage", value: "3+ Years operational", hint: "GST / Udyam registration" },
    { label: "Recommended CIBIL", value: "680+ Score", hint: "750+ unlocks maximum sanction" },
  ];

  const salariedDocs = [
    { title: "Identity & Address Proof", desc: "PAN Card + Aadhaar Card / Passport" },
    { title: "Proof of Employment", desc: "Official Employee ID Card + Offer/Appointment letter" },
    { title: "Income Verification", desc: "Latest 3 months salary slips with deductions" },
    { title: "Banking Records", desc: "Last 6 months salary account bank statements (PDF)" },
    { title: "Tax Returns", desc: "Latest 2 years Form 16 (Part A & B)" },
  ];

  const selfEmployedDocs = [
    { title: "KYC & Business Identity", desc: "PAN, Aadhaar, GST Certificate / Udyam Aadhar" },
    { title: "Business Proof & Vintage", desc: "Shop Act / MOA / Partnership Deed (3+ years)" },
    { title: "Financial Statements", desc: "Last 2-3 years ITR with CA audited balance sheets" },
    { title: "Current Account Banking", desc: "Last 12 months primary operative business statements" },
    { title: "Tax Compliance", desc: "GSTR-3B filings for current financial year" },
  ];

  const activeCriteria = tab === "salaried" ? salariedCriteria : selfEmployedCriteria;
  const activeDocs = tab === "salaried" ? salariedDocs : selfEmployedDocs;

  return (
    <section className="py-20 md:py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-deep text-xs font-semibold mb-3">
            <Sparkles size={14} className="text-brand-mint" /> 100% Paperless & Transparent
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Eligibility & <span className="text-brand-mint">Documents</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg font-medium">
            Check if you qualify and keep these documents handy for immediate bank verification.
          </p>
        </div>

        {/* Outer Modern Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden animate-fade-up stagger-1">
          
          {/* Animated Segmented Tabs (Horizontally scrollable on mobile without wrapping) */}
          <div className="p-2.5 sm:p-3 bg-slate-100/70 border-b border-slate-200/80">
            <div className="flex overflow-x-auto no-scrollbar gap-2 bg-slate-200/60 p-1.5 rounded-2xl relative">
              <button 
                type="button"
                onClick={() => setTab("salaried")}
                className={`relative z-10 py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 whitespace-nowrap shrink-0 flex-1 ${
                  tab === "salaried" 
                    ? "bg-white text-brand-deep shadow-md shadow-slate-900/5" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${tab === "salaried" ? "bg-brand-mint/20 text-brand-deep" : "bg-transparent text-slate-400"}`}>
                  <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span>Salaried Professional</span>
              </button>

              <button 
                type="button"
                onClick={() => setTab("self-employed")}
                className={`relative z-10 py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 whitespace-nowrap shrink-0 flex-1 ${
                  tab === "self-employed" 
                    ? "bg-white text-brand-deep shadow-md shadow-slate-900/5" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${tab === "self-employed" ? "bg-brand-mint/20 text-brand-deep" : "bg-transparent text-slate-400"}`}>
                  <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span>Self-Employed / Business</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panel with Smooth Key Transition */}
          <div 
            key={tab} 
            className="p-6 sm:p-8 md:p-10 grid md:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            
            {/* Left: Eligibility Criteria Cards */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-brand-deep font-bold text-lg">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3>Eligibility Criteria</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Instant Assessment
                </span>
              </div>

              <div className="space-y-3">
                {activeCriteria.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-deep transition-colors mt-0.5">
                        {item.value}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shrink-0 font-medium">
                      {item.hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Required Documents */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-brand-deep font-bold text-lg">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                    <FileText size={18} />
                  </div>
                  <h3>Required Documents</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Digital Uploads
                </span>
              </div>

              <div className="space-y-3">
                {activeDocs.map((doc, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-mint/15 text-brand-deep font-bold flex items-center justify-center shrink-0 text-xs mt-0.5 group-hover:bg-brand-mint group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-brand-deep transition-colors">
                        {doc.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Card Footer Action */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-mint" />
              <span>Zero branch visits required. Upload digital copies for in-principle approval.</span>
            </div>
            <Link 
              href="/affordability"
              className="font-bold text-brand-deep hover:text-brand-mint flex items-center gap-1 transition-colors"
            >
              <span>Calculate exact loan eligibility</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
