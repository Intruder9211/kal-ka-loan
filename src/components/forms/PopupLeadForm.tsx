"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Building, User, Phone, Mail, MapPin, IndianRupee, Briefcase } from "lucide-react";

export default function PopupLeadForm({ onClose }: { onClose?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [residentType, setResidentType] = useState<"RI" | "NRI">("RI");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        mobile: formData.get('mobile'),
        countryCode: formData.get('countryCode') || '+91',
        residentType,
        email: formData.get('email'),
        employment: formData.get('employment'),
        monthlyIncome: formData.get('monthlyIncome'),
        loanAmount: formData.get('loanAmount'),
        city: formData.get('city'),
        source: residentType === "NRI" ? "NRI Eligibility" : "Instant Eligibility",
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok) {
        setReferenceNumber(resData.referenceNumber || "");
        setIsSuccess(true);
      } else {
        alert(resData.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-1">Application Received!</h3>
        <p className="text-sm text-gray-600 mb-4">Our {residentType === "NRI" ? "NRI Loan Specialist" : "loan expert"} will call you shortly to discuss your eligibility.</p>
        
        {referenceNumber && (
          <div className="bg-blue-50 border border-dashed border-blue-300 rounded-xl p-3 mb-6">
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-0.5">Reference Number</span>
            <span className="text-base font-black font-mono text-slate-900">{referenceNumber}</span>
          </div>
        )}

        <div className="flex gap-2">
          {referenceNumber && (
            <a
              href={`/track?ref=${encodeURIComponent(referenceNumber)}`}
              className="flex-1 py-3 bg-brand-deep text-white font-bold rounded-xl text-center text-sm hover:bg-slate-800 transition-colors"
            >
              Track Application
            </a>
          )}
          <button 
            onClick={() => {
              if (onClose) onClose();
              else window.dispatchEvent(new Event("close-lead-modal"));
            }}
            className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold py-3 rounded-xl text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl">
      <div className="text-center mb-6">
        <div className="relative w-40 h-10 mx-auto mb-4">
          <Image 
            src="/logo.png" 
            alt="Money Viora Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold text-brand-deep mb-1">Check Eligibility</h3>
        <p className="text-sm text-gray-500">Fill this quick form to see offers from 30+ lenders.</p>

        {/* Resident Indian vs NRI Tabs like HDFC */}
        <div className="flex bg-slate-100 p-1 rounded-xl mt-4 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setResidentType("RI")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              residentType === "RI" ? "bg-white text-brand-deep shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Resident Indian
          </button>
          <button
            type="button"
            onClick={() => setResidentType("NRI")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              residentType === "NRI" ? "bg-white text-brand-deep shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Non-Resident Indian (NRI)
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required name="name" type="text" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. Amit Kumar" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
              {residentType === "NRI" ? "Overseas Mobile" : "Mobile No."}
            </label>
            <div className="relative flex">
              {residentType === "NRI" ? (
                <select name="countryCode" defaultValue="+971" className="w-20 pl-2 pr-1 py-2.5 rounded-l-lg border border-r-0 border-gray-300 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none">
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
              ) : (
                <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-gray-300 bg-slate-50 text-xs text-slate-500 font-bold">
                  +91
                </span>
              )}
              <input 
                required 
                name="mobile" 
                type="tel" 
                className="w-full pl-3 pr-4 py-2.5 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" 
                placeholder={residentType === "NRI" ? "Phone number" : "10-digit number"} 
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
            <input required name="email" type="email" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="amit@example.com" />
          </div>
        </div>

        {/* Employment & Income */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Employment</label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
              <select required name="employment" defaultValue="" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 bg-white appearance-none">
                <option value="" disabled>Select Type</option>
                <option value="salaried">Salaried</option>
                <option value="self_employed">Self Employed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Net Monthly Inc.</label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required name="monthlyIncome" type="number" min="15000" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. 50000" />
            </div>
          </div>
        </div>

        {/* Loan Amount & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Loan Amount</label>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required name="loanAmount" type="number" min="500000" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. 2500000" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">City</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required name="city" type="text" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. Delhi" />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-interactive w-full bg-brand-deep text-white font-bold py-3.5 rounded-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-3">
          By submitting, you agree to our Terms of Service & Privacy Policy.
        </p>
      </form>
    </div>
  );
}
