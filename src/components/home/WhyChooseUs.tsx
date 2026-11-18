"use client";

import { useState } from "react";
import { 
  Percent, 
  FastForward, 
  EyeOff, 
  HeadphonesIcon, 
  FileCheck, 
  ShieldCheck,
  Sparkles,
  Info
} from "lucide-react";

interface Benefit {
  id: string;
  icon: typeof Percent;
  title: string;
  highlight: string;
  desc: string;
  swingDuration: string;
  swingDelay: string;
  accentColor: string;
}

const benefits: Benefit[] = [
  {
    id: "lowest-rates",
    icon: Percent,
    title: "Lowest Interest Rates",
    highlight: "From 7.25% p.a.",
    desc: "Compare 50+ top lenders to lock in the cheapest interest rate tailored to your profile.",
    swingDuration: "3.6s",
    swingDelay: "0s",
    accentColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "fast-sanction",
    icon: FastForward,
    title: "Fastest Sanction",
    highlight: "Within 48 Hours",
    desc: "Express digital verification and instant lender sanction in as fast as 48 hours.",
    swingDuration: "4.2s",
    swingDelay: "0.6s",
    accentColor: "from-teal-500 to-emerald-600",
  },
  {
    id: "zero-charges",
    icon: EyeOff,
    title: "Zero Hidden Charges",
    highlight: "100% Free Advice",
    desc: "₹0 upfront fees, zero consultation charges. Complete transparency at every step.",
    swingDuration: "3.8s",
    swingDelay: "1.2s",
    accentColor: "from-brand-mint to-emerald-500",
  },
  {
    id: "expert-support",
    icon: HeadphonesIcon,
    title: "Expert Support",
    highlight: "Dedicated RM",
    desc: "A personal home loan advisor guides you from application to final fund disbursement.",
    swingDuration: "4.0s",
    swingDelay: "0.3s",
    accentColor: "from-emerald-600 to-brand-deep",
  },
  {
    id: "minimal-docs",
    icon: FileCheck,
    title: "Minimal Documentation",
    highlight: "Doorstep Pickup",
    desc: "Hassle-free digital upload with optional doorstep document pickup at your convenience.",
    swingDuration: "3.5s",
    swingDelay: "0.9s",
    accentColor: "from-teal-600 to-emerald-700",
  },
  {
    id: "secure",
    icon: ShieldCheck,
    title: "100% Secure",
    highlight: "Bank-Grade SSL",
    desc: "256-bit encrypted security. Your financial data is confidential and never sold.",
    swingDuration: "4.4s",
    swingDelay: "1.5s",
    accentColor: "from-emerald-500 to-teal-500",
  },
];

export default function WhyChooseUs() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200/60 relative overflow-hidden">
      {/* Background ambient decorative glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-mint/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-2">
            <Sparkles size={13} className="text-brand-mint" />
            The Money Viora Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight">
            Why Choose Money Viora?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Every home loan feature is crafted for your peace of mind. Hover over or tap any hanging key to reveal details.
          </p>
        </div>

        {/* 
          Overhead Wooden & Brass Mounting Bar 
          Acts as the physical horizontal rail from which all keychains suspend
        */}
        <div className="relative max-w-6xl mx-auto mb-2 sm:mb-4">
          {/* Wooden / Brass Rod */}
          <div className="h-3 sm:h-3.5 w-full bg-gradient-to-r from-stone-400 via-amber-700/80 to-stone-400 rounded-full shadow-md border-t border-amber-400/40 relative flex items-center justify-between px-4 sm:px-8">
            {/* Brass Mounting Brackets */}
            <div className="w-3.5 h-5 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-sm shadow border border-amber-200" />
            <div className="w-3.5 h-5 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-sm shadow border border-amber-200" />
          </div>
          {/* Drop shadow cast by the overhead rod */}
          <div className="h-2 w-full bg-stone-900/10 blur-sm rounded-full -mt-0.5" />
        </div>

        {/* 
          Hanging Keychains Grid
          Desktop: 6 columns in one single row
          Tablet/Mobile: 2 or 3 columns with realistic hanging physics
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto pt-1">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = activeId === benefit.id;

            return (
              <div
                key={benefit.id}
                className="relative flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveId(benefit.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === benefit.id ? null : benefit.id)}
              >
                {/* 
                  Swinging Assembly:
                  Anchor at top center (origin-top) swings gently left and right
                */}
                <div
                  className="w-full flex flex-col items-center transition-transform origin-top duration-300"
                  style={{
                    animation: isHovered
                      ? "none"
                      : `keychain-swing ${benefit.swingDuration} ease-in-out infinite alternate`,
                    animationDelay: benefit.swingDelay,
                  }}
                >
                  {/* Metal Ring Hook connecting to overhead rail */}
                  <div className="w-3 h-3 rounded-full border-2 border-amber-400 bg-stone-900 shadow-sm -mt-2.5 z-20" />

                  {/* Interlinked Metallic Chain Links */}
                  <div className="flex flex-col items-center -space-y-1 my-0.5 z-10">
                    <div className="w-1.5 h-3 rounded-full border border-stone-400 bg-gradient-to-b from-stone-200 to-stone-400 shadow-xs" />
                    <div className="w-1.5 h-3 rounded-full border border-stone-400 bg-gradient-to-b from-stone-300 to-stone-500 shadow-xs" />
                    <div className="w-1.5 h-3 rounded-full border border-stone-400 bg-gradient-to-b from-stone-200 to-stone-400 shadow-xs" />
                  </div>

                  {/* Keychain Split-Ring */}
                  <div className="w-5 h-5 rounded-full border-2 border-amber-400/90 bg-stone-100/80 shadow-inner flex items-center justify-center my-0.5 relative z-10">
                    <div className="w-2.5 h-2.5 rounded-full border border-amber-600/40" />
                  </div>

                  {/* 
                    House-Shaped Keychain Pendant:
                    Clearly resembles an authentic miniature house with roof, eaves, and chimney!
                  */}
                  <div
                    className={`relative w-full max-w-[170px] transition-all duration-300 flex flex-col items-center ${
                      isHovered
                        ? "scale-105 drop-shadow-[0_14px_28px_rgba(7,153,116,0.3)]"
                        : "drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] group-hover:scale-102"
                    }`}
                  >
                    {/* Keychain Eyelet Hole at Roof Peak */}
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 bg-stone-900 shadow-sm z-30 -mb-1 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                    </div>

                    {/* House Roof with Gable Peak, Overhanging Eaves & Chimney */}
                    <div className="relative w-full flex items-center justify-center">
                      {/* Chimney on the right roof slope */}
                      <div className="absolute -top-1 right-6 w-3 h-4 bg-gradient-to-b from-stone-500 to-brand-deep rounded-t-xs border-t border-x border-amber-400/60 shadow-xs z-10" />

                      {/* Triangular Roof Gable */}
                      <div 
                        className="relative z-20 w-0 h-0 border-l-[78px] border-l-transparent border-r-[78px] border-r-transparent border-b-[44px] border-b-[#0b1c16]"
                      />
                      {/* Roof Glowing Accent Border */}
                      <div className="absolute top-0 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[46px] border-b-emerald-500/40 -z-10" />
                    </div>

                    {/* House Body / Main Walls */}
                    <div className="relative w-[136px] -mt-0.5 bg-gradient-to-b from-[#0b1c16] to-[#07130f] text-white rounded-b-xl px-2.5 pb-3 pt-1 border-x-2 border-b-2 border-emerald-500/30 shadow-inner flex flex-col items-center text-center overflow-hidden z-20">
                      {/* Eaves Overhang Line */}
                      <div className="w-full h-1 bg-gradient-to-r from-emerald-600 via-brand-mint to-emerald-600 rounded-full mb-1.5 opacity-90" />

                      {/* Circular Attic Window with Feature Icon */}
                      <div
                        className={`w-10 h-10 rounded-full p-0.5 shadow-md mb-1.5 flex items-center justify-center bg-gradient-to-br ${benefit.accentColor} transition-transform duration-300 ${
                          isHovered ? "scale-110 rotate-6" : ""
                        }`}
                      >
                        <div className="w-full h-full rounded-full bg-brand-deep/90 flex items-center justify-center text-brand-mint border border-white/20">
                          <Icon size={18} strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Feature Title */}
                      <h3 className="font-extrabold text-xs text-white tracking-tight leading-snug line-clamp-2 px-1">
                        {benefit.title}
                      </h3>

                      {/* Bottom Keyhole Rivet & Highlight */}
                      <div className="mt-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-300/90">
                          {benefit.highlight}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Hanging Ring Link between House and Paper Tag */}
                  <div className="w-1 h-3 bg-stone-400 rounded-full my-0.5" />

                  {/* 
                    Hanging Paper-Like Card (Description Tag)
                    Reveals smoothly beneath the keychain on hover or tap
                  */}
                  <div
                    className={`w-full max-w-[170px] transition-all duration-400 ease-out origin-top ${
                      isHovered
                        ? "opacity-100 translate-y-0 scale-100 max-h-56 pointer-events-auto"
                        : "opacity-0 -translate-y-2 scale-95 max-h-0 pointer-events-none overflow-hidden"
                    }`}
                  >
                    <div className="relative bg-[#fffdfa] text-stone-800 rounded-xl p-3 border border-amber-200/80 shadow-xl shadow-stone-900/10 flex flex-col items-center text-center">
                      {/* Brass Grommet / Eyelet at top of tag */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-100 rounded-full border-2 border-amber-500 shadow-xs" />

                      {/* Tag Paper Details */}
                      <div className="w-full pt-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                          Key Benefit
                        </span>
                        <p className="text-[11px] leading-relaxed text-stone-600 font-medium">
                          {benefit.desc}
                        </p>
                      </div>

                      {/* Paper Tag Decorative Barcode / Notches at bottom */}
                      <div className="mt-2 pt-1.5 border-t border-dashed border-stone-200 w-full flex items-center justify-between text-[9px] text-stone-400 font-mono">
                        <span>#MV-{index + 1}0</span>
                        <span className="text-emerald-600 font-semibold">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle "Tap / Hover to View" prompt when not hovered on mobile */}
                  <div
                    className={`text-[9px] text-stone-400 font-medium mt-1 transition-opacity duration-300 ${
                      isHovered ? "opacity-0 h-0 overflow-hidden" : "opacity-80"
                    }`}
                  >
                    <span className="hidden sm:inline">Hover to reveal</span>
                    <span className="sm:hidden">Tap to reveal</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global CSS for keychain physics swing loop */}
      <style jsx global>{`
        @keyframes keychain-swing {
          0% {
            transform: rotate(3.5deg);
          }
          50% {
            transform: rotate(-3.5deg);
          }
          100% {
            transform: rotate(3.5deg);
          }
        }
      `}</style>
    </section>
  );
}
