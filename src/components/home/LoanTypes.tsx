"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ArrowRightLeft, 
  HandCoins, 
  Building, 
  Landmark, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Percent, 
  Clock, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileCheck2
} from "lucide-react";

export default function LoanTypes() {
  const [activeId, setActiveId] = useState<number>(0);

  const loanCards = [
    {
      id: 0,
      name: "Fresh Home Loan",
      shortName: "Home Loan",
      badge: "MOST POPULAR",
      href: "/home-loan",
      icon: Home,
      rate: "7.25% p.a.",
      tenure: "Up to 30 Yrs",
      maxFunding: "Up to 90%",
      tagline: "Finance your dream home with India's lowest interest rates.",
      desc: "Get subsidized rates from 30+ top partner banks with zero prepayment penalties and doorstep document pickup.",
      metrics: [
        { label: "Starting Rate", val: "7.25% p.a.", sub: "Lowest in market" },
        { label: "Max Tenure", val: "30 Years", sub: "Flexible EMI" },
        { label: "Sanction Time", val: "48 Hours", sub: "Fast-track digital" },
      ],
      benefits: [
        "Zero foreclosure & zero part-payment charges",
        "Instant digital in-principle sanction letter",
        "Special 0.05% interest concession for women applicants",
        "Free doorstep consultation & document collection"
      ],
      accentGradient: "from-emerald-500/20 via-brand-mint/10 to-transparent",
      badgeColor: "bg-brand-mint text-brand-deep",
    },
    {
      id: 1,
      name: "Balance Transfer",
      shortName: "Transfer",
      badge: "SAVE LAKHS",
      href: "/variants/balance-transfer",
      icon: ArrowRightLeft,
      rate: "8.30% p.a.",
      tenure: "Up to 25 Yrs",
      maxFunding: "100% Switch",
      tagline: "Switch your existing expensive loan to reduce monthly EMI.",
      desc: "Transfer your outstanding balance from high-cost lenders to premier banks and save ₹3 to ₹8 Lakhs in interest.",
      metrics: [
        { label: "Starting Rate", val: "8.30% p.a.", sub: "Save up to 1.5%" },
        { label: "EMI Reduction", val: "Up to 25%", sub: "Monthly relief" },
        { label: "Top-Up Facility", val: "Available", sub: "At home loan rates" },
      ],
      benefits: [
        "Reduce current monthly EMI payments instantly",
        "Transfer hassle-free from any bank or NBFC",
        "Add a high-value top-up loan at home loan rates",
        "Minimal paperwork with full liaison support"
      ],
      accentGradient: "from-blue-500/20 via-sky-400/10 to-transparent",
      badgeColor: "bg-blue-500 text-white",
    },
    {
      id: 2,
      name: "Top-Up Loan",
      shortName: "Top-Up",
      badge: "INSTANT CASH",
      href: "/variants/top-up",
      icon: HandCoins,
      rate: "8.50% p.a.",
      tenure: "Up to 20 Yrs",
      maxFunding: "Up to ₹50L",
      tagline: "Immediate liquidity on your active home loan.",
      desc: "Borrow additional funds against your existing mortgage at interest rates far lower than costly personal loans.",
      metrics: [
        { label: "Starting Rate", val: "8.50% p.a.", sub: "Far below personal loan" },
        { label: "Max Amount", val: "₹50 Lakhs+", sub: "Based on equity" },
        { label: "Disbursal", val: "24-48 Hours", sub: "Existing borrower perk" },
      ],
      benefits: [
        "Much cheaper than standard personal or credit card loans",
        "Zero end-use restrictions: home repair, wedding, or business",
        "Repayment linked directly to existing home loan tenure",
        "Expedited processing with pre-verified property title"
      ],
      accentGradient: "from-amber-500/20 via-orange-400/10 to-transparent",
      badgeColor: "bg-amber-500 text-slate-900 font-extrabold",
    },
    {
      id: 3,
      name: "Plot & Construction",
      shortName: "Plot & Build",
      badge: "CUSTOM BUILD",
      href: "/variants/plot",
      icon: Building,
      rate: "8.45% p.a.",
      tenure: "Up to 20 Yrs",
      maxFunding: "Plot + Build",
      tagline: "Buy residential land and construct your customized home.",
      desc: "Unified financing package covering both plot acquisition and phased house construction disbursements.",
      metrics: [
        { label: "Starting Rate", val: "8.45% p.a.", sub: "Composite facility" },
        { label: "Funding Type", val: "Land + House", sub: "All-in-one sanction" },
        { label: "Moratorium", val: "Up to 18 Mos", sub: "Pay interest only" },
      ],
      benefits: [
        "Combined loan for plot purchase & progressive construction",
        "Tranche-based disbursements matching civil work stages",
        "Interest-only moratorium period during active building",
        "Technical appraisal and title verification by experts"
      ],
      accentGradient: "from-indigo-500/20 via-purple-400/10 to-transparent",
      badgeColor: "bg-indigo-500 text-white",
    },
    {
      id: 4,
      name: "Loan Against Property",
      shortName: "LAP",
      badge: "HIGH VALUE",
      href: "/variants/lap",
      icon: Landmark,
      rate: "9.50% p.a.",
      tenure: "Up to 15 Yrs",
      maxFunding: "Up to ₹25+ Cr",
      tagline: "Unlock high-value liquidity against your property asset.",
      desc: "Leverage your self-occupied, commercial, or industrial property equity for business growth or debt consolidation.",
      metrics: [
        { label: "Starting Rate", val: "9.50% p.a.", sub: "Secured borrowing" },
        { label: "Max Funding", val: "₹25+ Crores", sub: "Up to 70% value" },
        { label: "Tenure", val: "15 Years", sub: "Comfortable EMIs" },
      ],
      benefits: [
        "Massive loan tickets for business expansion & working capital",
        "Residential, commercial, and industrial properties eligible",
        "Retain complete property ownership while unlocking cash",
        "Customized repayment structures for business owners"
      ],
      accentGradient: "from-teal-500/20 via-emerald-400/10 to-transparent",
      badgeColor: "bg-teal-500 text-white",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200/70 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-mint/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/15 border border-brand-mint/30 text-brand-deep text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-brand-mint" />
            <span>Tailored Mortgage Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Choose Your Perfect <span className="text-brand-mint">Loan.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Hover over any loan solution to explore interest rates, maximum tenures, and exclusive benefits.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP VIEW: Single Horizontal Row with Expanding Hover Accordion
            All 5 cards arranged side-by-side in one single row
           ========================================================================= */}
        <div 
          className="hidden lg:flex w-full h-[540px] gap-3 xl:gap-4 items-stretch select-none"
          onMouseLeave={() => setActiveId(0)} // Reset to primary popular card on mouse leave
        >
          {loanCards.map((loan, idx) => {
            const isExpanded = activeId === idx;
            const Icon = loan.icon;

            return (
              <div
                key={loan.id}
                onMouseEnter={() => setActiveId(idx)}
                onClick={() => setActiveId(idx)}
                className={`group relative rounded-3xl cursor-pointer overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
                  isExpanded
                    ? "flex-[3.5] bg-gradient-to-br from-brand-deep via-[#0d2a23] to-slate-900 text-white shadow-2xl border-2 border-brand-mint/40"
                    : "flex-[1] bg-white hover:bg-slate-50/90 text-slate-800 border border-slate-200/90 shadow-sm hover:border-brand-mint/40 hover:shadow-md"
                }`}
              >
                {/* Background decorative gradient for expanded card */}
                {isExpanded && (
                  <>
                    <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${loan.accentGradient} rounded-full blur-3xl pointer-events-none`}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none"></div>
                  </>
                )}

                {/* ----------------------------------------------------
                    COMPACT STATE: Sleek vertical strip when NOT hovered
                   ---------------------------------------------------- */}
                <div
                  className={`w-full h-full flex flex-col justify-between items-center py-6 px-2.5 transition-opacity duration-300 ${
                    isExpanded ? "opacity-0 pointer-events-none hidden" : "opacity-100"
                  }`}
                >
                  {/* Top: Index badge & Icon */}
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-brand-mint transition-colors">
                      0{loan.id + 1}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-brand-mint/15 text-slate-700 group-hover:text-brand-deep flex items-center justify-center transition-all duration-300 border border-slate-200/80 group-hover:border-brand-mint/30 shadow-xs">
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Middle: Rotated Vertical Name */}
                  <div className="flex-1 flex items-center justify-center my-6">
                    <span 
                      className="text-base font-extrabold tracking-wide text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                    >
                      {loan.name}
                    </span>
                  </div>

                  {/* Bottom: Rate Pill & Open Indicator */}
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-brand-mint/20 text-slate-600 group-hover:text-brand-deep transition-colors whitespace-nowrap">
                      {loan.rate}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-mint group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-all duration-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    EXPANDED STATE: Full rich card when hovered
                   ---------------------------------------------------- */}
                <div
                  className={`w-full h-full p-8 xl:p-10 flex flex-col justify-between transition-all duration-500 ${
                    isExpanded ? "opacity-100 relative z-10" : "opacity-0 pointer-events-none hidden"
                  }`}
                >
                  {/* Top: Badge & Category Indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-sm ${loan.badgeColor}`}>
                          {loan.badge}
                        </span>
                        <span className="text-xs font-mono text-white/50">
                          Option 0{loan.id + 1} of 05
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-brand-mint font-semibold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <ShieldCheck size={13} />
                        <span>Pre-approved Lenders</span>
                      </div>
                    </div>

                    {/* Header Title with Big Icon */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-brand-mint text-brand-deep flex items-center justify-center shrink-0 shadow-lg shadow-brand-mint/20">
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl xl:text-3xl font-black text-white tracking-tight">
                          {loan.name}
                        </h3>
                        <p className="text-xs xl:text-sm text-brand-mint font-semibold mt-0.5">
                          {loan.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 mb-6 leading-relaxed line-clamp-2">
                      {loan.desc}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      {loan.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-left">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                            {m.label}
                          </p>
                          <p className="text-sm xl:text-base font-extrabold text-white tracking-tight">
                            {m.val}
                          </p>
                          <p className="text-[10px] text-brand-mint font-medium">
                            {m.sub}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2 mb-6">
                      <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Key Advantages:</p>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                        {loan.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-200">
                            <div className="w-4 h-4 rounded-full bg-brand-mint/20 text-brand-mint flex items-center justify-center shrink-0">
                              <CheckCircle2 size={12} />
                            </div>
                            <span className="truncate">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <Link
                      href={loan.href}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-brand-mint hover:bg-white text-brand-deep font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-mint/20 group/btn"
                    >
                      <span>Explore &amp; Apply</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/calculators"
                      className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                    >
                      <Percent size={14} className="text-brand-mint" />
                      <span>Calculate EMI</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE / TABLET VIEW: Interactive Horizontal Cards & Pill Switcher
           ========================================================================= */}
        <div className="lg:hidden space-y-6">
          {/* Quick Filter Pills on Mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {loanCards.map((loan, idx) => (
              <button
                key={loan.id}
                onClick={() => setActiveId(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  activeId === idx
                    ? "bg-brand-deep text-white shadow-md border border-brand-mint/30"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <loan.icon size={13} className={activeId === idx ? "text-brand-mint" : "text-slate-400"} />
                <span>{loan.shortName}</span>
              </button>
            ))}
          </div>

          {/* Active Featured Card on Mobile */}
          {(() => {
            const activeLoan = loanCards[activeId] || loanCards[0];
            const Icon = activeLoan.icon;

            return (
              <div className="bg-gradient-to-br from-brand-deep via-[#0d2a23] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-brand-mint/30 animate-fade-up">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${activeLoan.badgeColor}`}>
                    {activeLoan.badge}
                  </span>
                  <span className="text-xs font-mono text-brand-mint font-bold">
                    0{activeLoan.id + 1} / 05
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-deep flex items-center justify-center shrink-0 shadow-md">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{activeLoan.name}</h3>
                    <p className="text-xs text-brand-mint font-semibold">{activeLoan.tagline}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {activeLoan.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 mb-5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  {activeLoan.metrics.map((m, i) => (
                    <div key={i} className="text-left">
                      <p className="text-[9px] uppercase font-bold text-slate-400">{m.label}</p>
                      <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">{m.val}</p>
                      <p className="text-[9px] text-brand-mint font-medium">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {activeLoan.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 size={14} className="text-brand-mint shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                  <Link
                    href={activeLoan.href}
                    className="flex-1 py-3 px-4 rounded-xl bg-brand-mint text-brand-deep font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/calculators"
                    className="py-3 px-3.5 rounded-xl bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 border border-white/10"
                  >
                    <Percent size={13} className="text-brand-mint" />
                    <span>EMI Calc</span>
                  </Link>
                </div>
              </div>
            );
          })()}

          {/* Mini Cards Horizontal Scroll Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {loanCards.map((loan, idx) => {
              const Icon = loan.icon;
              const isSelected = activeId === idx;
              return (
                <button
                  key={loan.id}
                  onClick={() => setActiveId(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? "bg-brand-deep text-white border-brand-mint/50 shadow-md"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={16} className={isSelected ? "text-brand-mint" : "text-slate-500"} />
                    <span className="text-[10px] font-mono text-slate-400">0{loan.id + 1}</span>
                  </div>
                  <p className="text-xs font-bold leading-tight truncate">{loan.name}</p>
                  <p className={`text-[10px] mt-1 font-semibold ${isSelected ? "text-brand-mint" : "text-slate-500"}`}>
                    {loan.rate}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
