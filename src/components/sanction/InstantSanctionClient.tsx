"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Clock, 
  IndianRupee 
} from "lucide-react";

export default function InstantSanctionClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(120000);
  const [loanAmount, setLoanAmount] = useState(4500000);
  const [tenureYears, setTenureYears] = useState(20);
  const [city, setCity] = useState("Mumbai");
  const [employmentType, setEmploymentType] = useState("Salaried");
  const [sanctionNumber, setSanctionNumber] = useState("");
  const [sanctionDate, setSanctionDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // EMI math: 8.40% interest p.a.
  const rate = 8.4;
  const r = rate / 12 / 100;
  const n = tenureYears * 12;
  const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const randomNum = `MV-SANCT-${Math.floor(100000 + Math.random() * 900000)}`;
      const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setSanctionNumber(randomNum);
      setSanctionDate(today);
      setIsGenerating(false);
      setStep(2);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-lg">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-bold tracking-wide uppercase mb-3">
                <Sparkles size={15} /> 2-Minute Digital Eligibility
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Instant <span className="text-brand-mint">In-Principle Sanction</span> Letter
              </h1>
              <p className="text-slate-500 text-sm md:text-base mt-2">
                Generate a bank-grade preliminary home loan sanction certificate to book builder flats, negotiate with sellers, and lock in preferential lending rates.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name (as per PAN Card)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">City of Property</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Pune, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Employment Profile</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
                  >
                    <option value="Salaried">Salaried (Private / MNC / Govt)</option>
                    <option value="Self-Employed Professional">Doctor / CA / Architect</option>
                    <option value="Self-Employed Business">Business Owner / Trader</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Net Monthly In-Hand (₹)</label>
                  <input
                    type="number"
                    step={5000}
                    required
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700">Requested Loan Amount</label>
                    <span className="text-sm font-extrabold text-brand-deep">₹ {loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={20000000}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700">Repayment Tenure</label>
                    <span className="text-sm font-extrabold text-brand-deep">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Monthly EMI</span>
                  <p className="text-2xl font-black text-brand-deep mt-0.5">₹ {emi.toLocaleString("en-IN")}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sanction Rate</span>
                  <p className="text-base font-bold text-emerald-600 mt-0.5">8.40% p.a.*</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-brand-deep hover:bg-slate-800 text-white rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <span>Evaluating Credit Matrix & Generating Letter...</span>
                ) : (
                  <>
                    <span>Generate In-Principle Sanction Letter</span> <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Certificate Display */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between no-print">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-brand-deep"
              >
                ← Back to Edit Details
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-brand-deep hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer size={15} /> Print / Save as PDF
                </button>
              </div>
            </div>

            {/* Printable Sanction Letter */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-300 shadow-xl text-slate-800 font-sans print:border-none print:shadow-none print:p-0">
              {/* Top Bank Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-brand-deep tracking-tight">MONEY VIORA</span>
                    <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-2 py-0.5 rounded">Digital Lending</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Regulated Multi-Bank Mortgage Aggregation Platform</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sanction Reference</span>
                  <span className="text-sm font-mono font-bold text-brand-deep">{sanctionNumber}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Date: {sanctionDate}</span>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                  ✓ Pre-Approved In-Principle Sanction
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Subject: In-Principle Sanction Letter for Home Loan
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Dear <strong className="text-slate-800">{fullName}</strong>, we are pleased to inform you that based on your credit appraisal criteria, you qualify for an In-Principle Home Loan Sanction.
                </p>
              </div>

              {/* Sanction Terms Table */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Approved Loan Parameters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Sanctioned Amount</span>
                    <span className="text-xl font-black text-brand-deep mt-0.5 block">
                      ₹ {loanAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Sanctioned Tenure</span>
                    <span className="text-lg font-bold text-slate-800 mt-0.5 block">{tenureYears} Years</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Indicative Interest Rate</span>
                    <span className="text-lg font-bold text-emerald-600 mt-0.5 block">8.40% p.a. (Floating)</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Indicative Monthly EMI</span>
                    <span className="text-lg font-bold text-slate-800 mt-0.5 block">
                      ₹ {emi.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed mb-8">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Special Terms & Conditions:
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>This In-Principle Sanction is valid for <strong>90 days</strong> from the date of issue ({sanctionDate}).</li>
                  <li>Final disbursal is subject to satisfactory legal title search and technical valuation of the property located in {city}.</li>
                  <li>Zero prepayment / foreclosure penalty applicable on floating rate home loans as per regulatory directives.</li>
                  <li>Our assigned Relationship Manager will contact you at <strong>+91 {mobile}</strong> to facilitate door-step physical documentation.</li>
                </ul>
              </div>

              {/* Signatures */}
              <div className="flex items-end justify-between border-t border-slate-200 pt-6">
                <div>
                  <div className="h-10 w-28 bg-slate-100 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    [Digital Seal]
                  </div>
                  <span className="text-xs font-bold text-slate-800 block mt-2">Money Viora Underwriting Desk</span>
                  <span className="text-[11px] text-slate-400 block">Credit & Risk Evaluation Committee</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Customer Acceptance</span>
                  <span className="text-xs font-bold text-slate-800 block mt-1">{fullName}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
