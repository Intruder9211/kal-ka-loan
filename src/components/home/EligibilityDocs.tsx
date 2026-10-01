"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EligibilityDocs() {
  const [tab, setTab] = useState<"salaried" | "self-employed">("salaried");

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Eligibility & Documents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Check if you qualify and keep these documents handy for a smooth process.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-up stagger-1">
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setTab("salaried")}
              className={cn("flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center gap-2", tab === "salaried" ? "bg-brand-light text-brand-deep border-b-2 border-brand-mint" : "text-gray-500 hover:bg-gray-50")}
            >
              <User size={20} /> Salaried
            </button>
            <button 
              onClick={() => setTab("self-employed")}
              className={cn("flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center gap-2", tab === "self-employed" ? "bg-brand-light text-brand-deep border-b-2 border-brand-mint" : "text-gray-500 hover:bg-gray-50")}
            >
              <Briefcase size={20} /> Self-Employed
            </button>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-brand-deep mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-brand-mint" /> Eligibility
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">Age</span>
                  <span className="font-medium text-brand-deep">21 - {tab === "salaried" ? "60" : "65"} years</span>
                </li>
                <li className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">Min Income</span>
                  <span className="font-medium text-brand-deep">{tab === "salaried" ? "₹25,000 / month" : "₹3 Lakhs ITR / yr"}</span>
                </li>
                <li className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">Work Experience</span>
                  <span className="font-medium text-brand-deep">{tab === "salaried" ? "2 Years" : "3 Years Business"}</span>
                </li>
                <li className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">CIBIL Score</span>
                  <span className="font-medium text-brand-deep">650+ (750+ for best rates)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-brand-deep mb-4 flex items-center gap-2">
                <FileText className="text-brand-mint" /> Required Documents
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 shrink-0"></div>
                  KYC (PAN, Aadhaar/Passport)
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 shrink-0"></div>
                  {tab === "salaried" ? "Last 3 months salary slips" : "Last 2 years ITR with computation"}
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 shrink-0"></div>
                  {tab === "salaried" ? "Last 6 months bank statement" : "Last 6 months current account statement"}
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 shrink-0"></div>
                  {tab === "salaried" ? "Form 16" : "Business Proof (GST/Udyam)"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
