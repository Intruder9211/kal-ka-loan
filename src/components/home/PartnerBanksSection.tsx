"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import BankLogo from "@/components/ui/BankLogo";

// The 4 requested partner banks & NBFCs with their complete details
const TARGET_BANKS = [
  {
    id: "bajaj-housing-finance",
    name: "Bajaj Housing Finance",
    shortName: "Bajaj",
    logo: "/images/banks/bajaj.svg",
    interestRate: "7.25% - 10.25%",
    salariedRate: "7.25% – 10.25%",
    selfEmployedRate: "7.70% – 10.65%",
    rateType: "Floating Rate",
    officialUrl: "https://www.bajajhousingfinance.in/home-loan-interest-rates",
    processingFee: "Up to 0.5% + GST",
    maxTenure: "30 Years",
    maxAmount: "Up to ₹15 Cr",
    type: "NBFC / HFC",
    tags: ["Lowest Rate", "Express Sanction", "Zero Foreclosure"],
    themeBadge: "Premier NBFC Partner",
  },
  {
    id: "natbank",
    name: "NatBank",
    shortName: "NatBank",
    logo: "/images/banks/karnataka.svg",
    interestRate: "7.30% - 11.79%",
    salariedRate: "7.30% – 11.79%",
    selfEmployedRate: "7.50% – 12.00%",
    rateType: "Floating Rate",
    officialUrl: "https://karnatakabank.com/personal/loans/home-loan",
    processingFee: "0.40% to 0.50%",
    maxTenure: "30 Years",
    maxAmount: "Up to ₹5 Cr",
    type: "Scheduled Commercial Bank",
    tags: ["Low Starting Rate", "Flexible Tenure", "Fast Processing"],
    themeBadge: "National Partner Bank",
  },
  {
    id: "federal-bank",
    name: "Federal Bank",
    shortName: "Federal",
    logo: "/images/banks/federal.svg",
    interestRate: "7.40%+",
    salariedRate: "7.40%+",
    selfEmployedRate: "7.65%+",
    rateType: "Floating Rate",
    officialUrl: "https://www.federalbank.co.in/home-loan",
    processingFee: "0.5% (Min ₹3,000)",
    maxTenure: "30 Years",
    maxAmount: "Up to ₹15 Cr",
    type: "Private Sector Bank",
    tags: ["Quick Processing", "Digital Journey", "Minimal Paperwork"],
    themeBadge: "Digital-First Bank",
  },
  {
    id: "hdfc-bank",
    name: "HDFC Bank",
    shortName: "HDFC",
    logo: "/images/banks/hdfc.svg",
    interestRate: "7.45% - 13.55%",
    salariedRate: "7.45% – 13.55%",
    selfEmployedRate: "7.60% – 13.75%",
    rateType: "Floating Rate",
    officialUrl: "https://homeloans.hdfc.bank.in/ps/home-loans-in-india/interest-rates",
    processingFee: "0.50% or ₹3,000 + GST",
    maxTenure: "30 Years",
    maxAmount: "Up to ₹10 Cr",
    type: "Premier Banking Partner",
    tags: ["Market Leader", "Instant Sanction", "Trusted Nationwide"],
    themeBadge: "Industry Benchmark",
  },
];

export default function PartnerBanksSection() {
  const [banks, setBanks] = useState(TARGET_BANKS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  // Sync with live database/api if available while guaranteeing the 4 requested partners
  useEffect(() => {
    async function loadLenders() {
      try {
        const res = await fetch("/api/lenders");
        if (res.ok) {
          const data = await res.json();
          if (data.lenders && data.lenders.length > 0) {
            const updated = TARGET_BANKS.map((tb) => {
              const live = data.lenders.find(
                (l: any) =>
                  l.id === tb.id ||
                  l.name.toLowerCase().includes(tb.shortName.toLowerCase())
              );
              return live ? { ...tb, ...live } : tb;
            });
            setBanks(updated);
          }
        }
      } catch (e) {}
    }
    loadLenders();
  }, []);

  // Smooth Auto-Play Transition (cycles smoothly every 4.5 seconds when not hovered)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banks.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, banks.length]);

  // Mouse Wheel Scroll Transition over the Container
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    if (e.deltaY > 25 && activeIndex < banks.length - 1) {
      lastWheelTime.current = now;
      setActiveIndex((prev) => prev + 1);
    } else if (e.deltaY < -25 && activeIndex > 0) {
      lastWheelTime.current = now;
      setActiveIndex((prev) => prev - 1);
    }
  };

  // Mobile Touch Swipe support for silky smooth card change
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) {
        setActiveIndex((prev) => (prev + 1) % banks.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + banks.length) % banks.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentBank = banks[activeIndex] || banks[0];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-50/80 border-b border-stone-200/70 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-1.5">
            <Sparkles size={12} className="text-brand-mint" />
            Verified Institutional Tie-ups
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight">
            Our Partner Banks &amp; NBFCs
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto mt-1">
            Compare real-time rates and official circular terms from India&apos;s most trusted institutions.
          </p>
        </div>

        {/* 
          ========================================================================
          THE SINGLE UNIFIED CONTAINER (Strictly 1 container card)
          Contains Bank Name & Icon on one side, and all existing details on the other.
          Sequentially replaces each bank with a smooth zoom-in transition.
          Equal padding, NO blank space!
          ========================================================================
        */}
        <div 
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 overflow-hidden backdrop-blur-sm select-none transition-all duration-300"
        >
          {/* Top Interactive Progress & Step Navigation Bar inside container */}
          <div className="bg-stone-50/90 border-b border-stone-200/80 px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-2">
            {/* Category indicator (clean, 04/04 removed) */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentBank.themeBadge}</span>
            </div>

            {/* Bank selector pills inside the container */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {banks.map((bank, idx) => (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1 ${
                    idx === activeIndex
                      ? "bg-brand-deep text-white shadow-sm scale-105"
                      : "bg-white text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx === activeIndex ? "bg-brand-mint animate-pulse" : "bg-stone-300"
                    }`}
                  />
                  <span>{bank.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continuous dynamic progress indicator */}
          <div className="h-0.5 w-full bg-stone-100 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-brand-mint to-teal-500 transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / banks.length) * 100}%` }}
            />
          </div>

          {/* 
            Main Body inside the Single Container:
            Keyed by currentBank.id to trigger the smooth ZOOM-IN transition
          */}
          <div
            key={currentBank.id}
            className="animate-bank-zoom-in p-5 sm:p-7 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* 
              SIDE 1: Bank Name with its Icon & Institutional Credentials
            */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left pb-5 lg:pb-0 border-b lg:border-b-0 lg:border-r border-stone-100 lg:pr-8">
              {/* Bank Icon with glowing badge */}
              <div className="relative mb-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 p-2.5 border border-stone-200/90 shadow-md flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
                  <BankLogo
                    name={currentBank.name}
                    logoUrl={currentBank.logo}
                    className="w-full h-full object-contain"
                    size={64}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow">
                  <ShieldCheck size={13} />
                </span>
              </div>

              {/* Bank Name */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-deep tracking-tight leading-snug">
                {currentBank.name}
              </h3>

              {/* Bank Type / Classification */}
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/70 mt-1.5 inline-block">
                {currentBank.type}
              </div>

              {/* Institutional Feature Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3 justify-center lg:justify-start">
                {currentBank.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-[11px] text-stone-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>RBI Compliant &bull; Direct API Partner</span>
              </div>
            </div>

            {/* 
              SIDE 2: All Existing Details (ROI, Rates, Circular, Fees, Tenure & Action)
            */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              {/* Details Metrics 4-Box Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {/* Metric 1: Starting ROI */}
                <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-100 transition-all hover:bg-emerald-50/40">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Starting ROI
                  </span>
                  <div className="text-base sm:text-lg font-black text-emerald-700 tracking-tight mt-0.5">
                    {currentBank.interestRate}
                  </div>
                  {currentBank.salariedRate && (
                    <span className="text-[10px] text-stone-500 font-medium block truncate mt-0.5">
                      Sal: {currentBank.salariedRate}
                    </span>
                  )}
                </div>

                {/* Metric 2: Official Circular Rate Sheet */}
                <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-100 transition-all hover:bg-emerald-50/40">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Rate Sheet
                  </span>
                  <div className="mt-0.5">
                    {currentBank.officialUrl ? (
                      <a
                        href={currentBank.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        Circular <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium">Standard</span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    {currentBank.rateType}
                  </span>
                </div>

                {/* Metric 3: Processing Fee */}
                <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-100 transition-all hover:bg-emerald-50/40">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Processing Fee
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 truncate">
                    {currentBank.processingFee}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    Exclusive waiver
                  </span>
                </div>

                {/* Metric 4: Max Tenure & Loan Amount */}
                <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-100 transition-all hover:bg-emerald-50/40">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Tenure &amp; Amount
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                    {currentBank.maxTenure}
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium block mt-0.5">
                    {currentBank.maxAmount}
                  </span>
                </div>
              </div>

              {/* Additional Details: Self-Employed Rate if available */}
              {currentBank.selfEmployedRate && (
                <div className="flex items-center justify-between bg-stone-50/60 rounded-xl px-3.5 py-2 border border-stone-100 text-xs text-stone-600">
                  <span className="font-medium">
                    Self-Employed Rate:{" "}
                    <strong className="text-stone-800">{currentBank.selfEmployedRate}</strong>
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    Lowest in category
                  </span>
                </div>
              )}

              {/* Bottom Actions inside the single container */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <CheckCircle2 size={14} />
                  <span>Instant Digital Pre-Approval Eligible</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/compare"
                    className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors text-center"
                  >
                    Compare All
                  </Link>

                  <Link
                    href="/affordability"
                    className="bg-brand-deep text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl hover:bg-emerald-900 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 group"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for the ultra-smooth zoom-in transition */}
      <style jsx global>{`
        @keyframes bankZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bank-zoom-in {
          animation: bankZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
