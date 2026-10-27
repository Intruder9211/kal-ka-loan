"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, ArrowRight, ShieldCheck, Percent, Zap } from "lucide-react";

const STORAGE_KEY = "moneyviora_welcome_popup_shown_v1";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if already shown in this browser session/storage
    try {
      const alreadyShown = localStorage.getItem(STORAGE_KEY);
      if (alreadyShown === "true") {
        return;
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing mode)
    }

    // Trigger popup smoothly after initial site loader has completed or after short delay
    const triggerPopup = () => {
      // Delay slightly for smooth entrance after page paints
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return timer;
    };

    let timer: NodeJS.Timeout;

    // Listen for SiteLoader completion event, or fallback to direct timeout
    const handleInitialLoadComplete = () => {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
    };

    window.addEventListener("initial_load_complete", handleInitialLoadComplete);
    
    // Fallback if site loader already finished or not active
    const fallbackTimer = triggerPopup();

    return () => {
      window.removeEventListener("initial_load_complete", handleInitialLoadComplete);
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const closePopup = () => {
    setIsClosing(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleOpenLeadForm = () => {
    closePopup();
    // Trigger existing global lead modal
    window.dispatchEvent(new Event("open-lead-modal"));
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-deep/75 backdrop-blur-md transition-opacity"
        onClick={closePopup}
      />

      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden border border-brand-mint/20 z-10 transition-all duration-300 transform ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-fade-up"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          aria-label="Close welcome popup"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-brand-deep flex items-center justify-center transition-all shadow-sm border border-gray-100 hover:scale-105 active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-br from-brand-deep via-[var(--brand-gradient-via)] to-[var(--brand-gradient-to)] text-white p-7 pb-8 overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-brand-mint/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-brand-mint/15 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/20 border border-brand-mint/40 text-brand-mint text-xs font-bold tracking-wide uppercase mb-3 backdrop-blur-sm">
            <Sparkles size={13} className="text-brand-mint" />
            Special Limited-Time Offer
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Get Home Loans Starting at <span className="text-brand-mint underline decoration-brand-mint/50 underline-offset-4">8.30%*</span>
          </h3>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-md">
            Compare 30+ top banks, check zero-cost pre-approval, and save up to ₹5 Lakhs on interest with Money Viora.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-7 space-y-6 bg-white">
          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-brand-mint/15 text-brand-mint flex items-center justify-center mb-1.5">
                <Percent size={18} />
              </div>
              <span className="text-xs font-bold text-slate-800">Lowest Rate</span>
              <span className="text-[11px] text-slate-500">From 8.30% p.a.</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-brand-mint/15 text-brand-mint flex items-center justify-center mb-1.5">
                <Zap size={18} />
              </div>
              <span className="text-xs font-bold text-slate-800">Fast Sanction</span>
              <span className="text-[11px] text-slate-500">In 24-48 Hours</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-brand-mint/15 text-brand-mint flex items-center justify-center mb-1.5">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xs font-bold text-slate-800">Zero Fees</span>
              <span className="text-[11px] text-slate-500">100% Free Service</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleOpenLeadForm}
              className="w-full btn-interactive flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-mint text-brand-deep font-bold text-base shadow-lg hover:opacity-90 transition-all"
            >
              Check My Free Eligibility
              <ArrowRight size={18} />
            </button>

            <Link
              href="/compare"
              onClick={closePopup}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-brand-deep hover:bg-slate-50 transition-colors"
            >
              Or browse all 30+ lenders directly →
            </Link>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            *Terms and conditions apply. No credit score impact for checking initial rates.
          </p>
        </div>
      </div>
    </div>
  );
}
