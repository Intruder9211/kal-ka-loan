"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Building, User, Phone, Mail, MapPin, IndianRupee, Briefcase } from "lucide-react";

export default function PopupLeadForm({ onClose }: { onClose?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl">
        <div className="w-16 h-16 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-mint">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-brand-deep mb-2">Application Received!</h3>
        <p className="text-gray-600 mb-6">Our loan expert will call you shortly to discuss your eligibility and best offers.</p>
        <button 
          onClick={() => {
            if (onClose) onClose();
            else window.dispatchEvent(new Event("close-lead-modal"));
          }}
          className="btn-interactive w-full bg-brand-deep text-white font-bold py-3 rounded-lg"
        >
          Close Window
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl">
      <div className="text-center mb-6">
        <div className="relative w-40 h-10 mx-auto mb-4">
          <Image 
            src="/logo.png" 
            alt="Kal Ka Loan Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold text-brand-deep mb-1">Check Eligibility</h3>
        <p className="text-sm text-gray-500">Fill this quick form to see offers from 50+ lenders.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required type="text" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. Amit Kumar" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Mobile No.</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required type="tel" pattern="[0-9]{10}" maxLength={10} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="10-digit number" />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
            <input required type="email" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="amit@example.com" />
          </div>
        </div>

        {/* Employment & Income */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Employment</label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
              <select required defaultValue="" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 bg-white appearance-none">
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
              <input required type="number" min="15000" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. 50000" />
            </div>
          </div>
        </div>

        {/* Loan Amount & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Loan Amount</label>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required type="number" min="500000" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. 2500000" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">City</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
              <input required type="text" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-sm text-gray-900 placeholder-gray-400" placeholder="e.g. Delhi" />
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
