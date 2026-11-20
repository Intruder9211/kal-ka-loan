"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { 
  Calendar, 
  Save, 
  Share2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Percent,
  Clock,
  Coins
} from "lucide-react";

// Helper for compact INR formatting (e.g. ₹50 L, ₹1.5 Cr)
function formatCompact(val: number): string {
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} Cr`;
  }
  if (val >= 100000) {
    const l = val / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`;
  }
  return formatCurrency(val);
}

/**
 * Custom Drag-Only Slider:
 * Moves ONLY when the handle is directly clicked and dragged.
 * Clicking elsewhere on the slider track does NOT jump or move the handle.
 */
function DragOnlySlider({
  min,
  max,
  step,
  value,
  onChange,
  ariaLabel,
  className = "",
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  ariaLabel?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary mouse click or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    
    e.preventDefault();
    e.stopPropagation();

    const thumb = e.currentTarget;
    try {
      thumb.setPointerCapture(e.pointerId);
    } catch {}

    setIsDragging(true);

    const updateFromClientX = (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawVal = min + ratio * (max - min);
      const stepped = Math.round((rawVal - min) / step) * step + min;
      const precision = step < 1 ? 2 : 0;
      const clamped = Math.max(min, Math.min(max, Number(stepped.toFixed(precision))));
      onChange(clamped);
    };

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      updateFromClientX(moveEvent.clientX);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      setIsDragging(false);
      try {
        thumb.releasePointerCapture(upEvent.pointerId);
      } catch {}
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextVal = value;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      nextVal = Math.min(max, value + step);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      nextVal = Math.max(min, value - step);
      e.preventDefault();
    } else if (e.key === "PageUp") {
      nextVal = Math.min(max, value + step * 10);
      e.preventDefault();
    } else if (e.key === "PageDown") {
      nextVal = Math.max(min, value - step * 10);
      e.preventDefault();
    } else if (e.key === "Home") {
      nextVal = min;
      e.preventDefault();
    } else if (e.key === "End") {
      nextVal = max;
      e.preventDefault();
    }
    if (nextVal !== value) {
      const precision = step < 1 ? 2 : 0;
      onChange(Number(nextVal.toFixed(precision)));
    }
  };

  return (
    <div className={`relative w-full py-1.5 select-none touch-none ${className}`}>
      {/* 
        The Track:
        `pointer-events-none` guarantees that clicking anywhere on the track will NOT jump or move the handle.
      */}
      <div
        ref={trackRef}
        className="relative h-2 w-full rounded-full bg-slate-800/90 overflow-hidden pointer-events-none ring-1 ring-white/10"
      >
        {/* Glow fill from 0 to thumb position */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-brand-mint to-[#86efac] rounded-full shadow-[0_0_12px_rgba(117,232,122,0.6)] transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 
        The Green Slider Thumb:
        Only this element has `pointer-events-auto`.
        Dragging begins ONLY when clicking directly on this handle.
      */}
      <div
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center transition-transform focus:outline-none focus:ring-2 focus:ring-brand-mint focus:ring-offset-2 focus:ring-offset-slate-900 ${
          isDragging ? "scale-125 cursor-grabbing z-20" : "hover:scale-110 z-10"
        }`}
        style={{ left: `${percentage}%` }}
      >
        {/* Pulsing glow ring when active */}
        {isDragging && (
          <div className="absolute inset-0 rounded-full bg-brand-mint/60 animate-ping pointer-events-none" />
        )}
        {/* High-tech green puck */}
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-500 via-brand-mint to-[#9effa3] p-0.5 shadow-[0_0_14px_rgba(117,232,122,0.85)] border border-white">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-mint shadow-[0_0_6px_#75e87a]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dynamic Futuristic Animated SVG Circular Graph:
 * Features concentric glowing neon arcs for Principal and Interest,
 * dynamic animated stroke offsets, rotating HUD radar ticks, and live center EMI readout.
 */
function DynamicFuturisticGauge({
  principal,
  totalInterest,
  totalPayment,
  emi,
  size = 190,
  strokeWidth = 12,
  compact = false,
}: {
  principal: number;
  totalInterest: number;
  totalPayment: number;
  emi: number;
  size?: number;
  strokeWidth?: number;
  compact?: boolean;
}) {
  const pRatio = totalPayment > 0 ? principal / totalPayment : 0.5;
  const iRatio = totalPayment > 0 ? totalInterest / totalPayment : 0.5;

  const principalPercent = Math.round(pRatio * 100);
  const interestPercent = 100 - principalPercent;

  // Geometry
  const center = size / 2;
  const radius = center - strokeWidth - (compact ? 3 : 6);
  const circumference = 2 * Math.PI * radius;

  // Gap between arcs
  const gap = compact ? 3 : 5;
  const principalLen = Math.max(0, pRatio * circumference - gap);
  const interestLen = Math.max(0, iRatio * circumference - gap);

  // Tip indicator position (boundary point between Principal and Interest)
  const tipAngleDeg = pRatio * 360 - 90;
  const tipAngleRad = (tipAngleDeg * Math.PI) / 180;
  const tipX = center + radius * Math.cos(tipAngleRad);
  const tipY = center + radius * Math.sin(tipAngleRad);

  return (
    <div 
      className="relative flex items-center justify-center select-none shrink-0" 
      style={{ width: size, height: size }}
    >
      {/* Dynamic Animated SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible -rotate-90 transform"
      >
        {/* Outer futuristic dashed radar ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + strokeWidth / 2 + (compact ? 3.5 : 5)}
          fill="none"
          stroke="rgba(117, 232, 122, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          className="animate-[spin_50s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />

        {/* Ambient background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Principal Arc (Neon Mint / Emerald Gradient) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#calcPrincipalGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${principalLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ filter: "drop-shadow(0 0 6px rgba(117, 232, 122, 0.65))" }}
        />

        {/* Interest Arc (Electric Sky / Cyan Gradient) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#calcInterestGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${interestLen} ${circumference}`}
          strokeDashoffset={-(principalLen + gap)}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ filter: "drop-shadow(0 0 6px rgba(56, 189, 248, 0.65))" }}
        />

        {/* Glowing Head Particle at boundary */}
        <circle
          cx={tipX}
          cy={tipY}
          r={compact ? 2.5 : Math.max(2, strokeWidth / 2 - 2)}
          fill="#ffffff"
          className="transition-all duration-700 ease-out"
          style={{ filter: "drop-shadow(0 0 8px #ffffff)" }}
        />
      </svg>

      {/* Center Readout HUD */}
      {compact ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-1">
          <span className="text-[8px] uppercase font-bold tracking-wider text-slate-400 leading-none mb-0.5">
            EMI
          </span>
          <span className="text-xs sm:text-sm font-black text-white tracking-tight whitespace-nowrap leading-tight drop-shadow-[0_0_8px_rgba(117,232,122,0.4)]">
            ₹{emi.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1 text-[8px] font-bold mt-0.5">
            <span className="text-emerald-400">{principalPercent}%</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400">{interestPercent}%</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
            <span className="uppercase font-semibold tracking-wider text-slate-400 text-[10px]">
              Monthly EMI
            </span>
          </div>

          <div className="font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(117,232,122,0.4)] text-2xl sm:text-3xl">
            ₹{emi.toLocaleString('en-IN')}
          </div>

          <div className="text-slate-400 font-medium text-[10px]">
            / month
          </div>

          {/* Dual Percentage Pills */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-0.5 font-bold text-emerald-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
              {principalPercent}% Principal
            </span>
            <span className="text-[10px] text-slate-600">|</span>
            <span className="inline-flex items-center gap-0.5 font-bold text-sky-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {interestPercent}% Interest
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleType, setScheduleType] = useState<"yearly" | "monthly">("yearly");
  const [copied, setCopied] = useState(false);

  // EMI and totals calculation
  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;

    if (p === 0 || r === 0 || n === 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - p;

    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInterestValue),
      totalPayment: Math.round(totalPaymentValue),
    };
  }, [principal, rate, tenureYears]);

  // Amortization schedule
  const schedule = useMemo(() => {
    if (principal === 0 || rate === 0 || tenureYears === 0) return [];

    let bal = principal;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;
    const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const result = [];
    let periodInterest = 0;
    let periodPrincipal = 0;

    for (let i = 1; i <= n; i++) {
      const intComp = bal * r;
      const prinComp = emiValue - intComp;
      bal -= prinComp;

      if (scheduleType === "monthly") {
        result.push({
          period: i,
          principal: Math.round(prinComp),
          interest: Math.round(intComp),
          balance: Math.max(0, Math.round(bal)),
        });
      } else {
        periodInterest += intComp;
        periodPrincipal += prinComp;

        if (i % 12 === 0 || i === n) {
          result.push({
            period: Math.ceil(i / 12),
            principal: Math.round(periodPrincipal),
            interest: Math.round(periodInterest),
            balance: Math.max(0, Math.round(bal)),
          });
          periodInterest = 0;
          periodPrincipal = 0;
        }
      }
    }

    return result;
  }, [principal, rate, tenureYears, scheduleType]);

  // Save amortization as PDF
  const handleSave = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print/save the PDF.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>EMI Schedule - Money Viora</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #75e87a; padding-bottom: 20px; }
            .header h1 { color: #0f2820; margin: 0 0 10px 0; }
            .summary { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .summary-item { margin: 10px 20px; }
            .summary-item strong { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .summary-item span { font-size: 20px; font-weight: bold; color: #0f2820; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 12px 16px; text-align: right; }
            th { background-color: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
            th:first-child, td:first-child { text-align: left; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; }
            @media print {
              body { padding: 0; }
              .summary { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Money Viora</h1>
            <p>Home Loan Amortization Schedule</p>
          </div>
          
          <div class="summary">
            <div class="summary-item"><strong>Loan Amount</strong><span>₹${principal.toLocaleString('en-IN')}</span></div>
            <div class="summary-item"><strong>Interest Rate</strong><span>${rate}% p.a.</span></div>
            <div class="summary-item"><strong>Tenure</strong><span>${tenureYears} Years</span></div>
            <div class="summary-item"><strong>Monthly EMI</strong><span style="color: #079974;">₹${emi.toLocaleString('en-IN')}</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>${scheduleType === 'monthly' ? 'Month' : 'Year'}</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              ${schedule
                .map(
                  (row) => `
                <tr>
                  <td>${scheduleType === 'monthly' ? 'Month ' : 'Year '}${row.period}</td>
                  <td>₹${row.principal.toLocaleString('en-IN')}</td>
                  <td>₹${row.interest.toLocaleString('en-IN')}</td>
                  <td style="font-weight: bold; color: #0f2820;">₹${row.balance.toLocaleString('en-IN')}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          
          <div class="footer">
            Generated by Money Viora AI Calculator &bull; Not a final bank offer
          </div>

          <script>
            window.onload = () => {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Share calculation
  const handleShare = async () => {
    const text = `My Home Loan EMI for ${formatCurrency(principal)} at ${rate}% over ${tenureYears} years is ${formatCurrency(emi)} per month (Money Viora).`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Money Viora EMI Calculation",
          text: text,
          url: window.location.href,
        });
        return;
      } catch (err) {}
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      alert("Calculation summary copied:\n\n" + text);
    }
  };

  return (
    <div className="w-full">
      {/* SVG Global Gradients for Circular Gauge */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="calcPrincipalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#75e87a" />
          </linearGradient>
          <linearGradient id="calcInterestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Futuristic Container */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#091511] text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* 
          =======================================================
          MOBILE VIEW (< lg): ULTRA-COMPACT SINGLE-SCREEN COCKPIT
          Fits sliders + animated circular graph in a single screen!
          =======================================================
        */}
        <div className="block lg:hidden p-3.5 sm:p-5">
          {/* Top HUD: Circular Gauge + Monthly EMI Readout side-by-side */}
          <div className="flex items-center justify-between gap-3 bg-emerald-950/40 rounded-xl p-2.5 sm:p-3 border border-emerald-500/15 mb-3">
            {/* Dynamic Animated Circular Graph (Compact) */}
            <div className="shrink-0">
              <DynamicFuturisticGauge
                principal={principal}
                totalInterest={totalInterest}
                totalPayment={totalPayment}
                emi={emi}
                size={114}
                strokeWidth={8}
                compact={true}
              />
            </div>

            {/* Live EMI & Financial Breakdown Summary */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1">
                  <Sparkles size={11} className="text-brand-mint" />
                  Monthly EMI
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {rate}% &bull; {tenureYears}Y
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-black text-brand-mint tracking-tight leading-none mb-1.5 drop-shadow-[0_0_10px_rgba(117,232,122,0.4)]">
                {formatCurrency(emi)}
              </div>

              {/* Compact Breakdown Stats */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-slate-900/60 rounded-lg p-1.5 border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[9px] leading-tight">Principal</span>
                  <span className="font-bold text-white leading-tight truncate block">
                    {formatCompact(principal)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] leading-tight">Interest</span>
                  <span className="font-bold text-sky-400 leading-tight truncate block">
                    {formatCompact(totalInterest)}
                  </span>
                </div>
              </div>

              {/* Total Payable & Quick Action Icons */}
              <div className="flex items-center justify-between mt-1 text-[9px]">
                <span className="text-slate-400">
                  Total: <strong className="text-white font-semibold">{formatCompact(totalPayment)}</strong>
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    onClick={handleShare}
                    aria-label="Share calculation"
                    className="hover:text-brand-mint transition-colors"
                  >
                    {copied ? <Check size={12} className="text-brand-mint" /> : <Share2 size={12} />}
                  </button>
                  <button
                    onClick={handleSave}
                    aria-label="Save Amortization PDF"
                    className="hover:text-brand-mint transition-colors"
                  >
                    <Save size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Compact Drag-Only Sliders */}
          <div className="space-y-2.5">
            {/* Slider 1: Loan Amount */}
            <div className="bg-slate-900/40 rounded-xl p-2 sm:p-2.5 border border-white/5">
              <div className="flex justify-between items-center mb-0.5">
                <label htmlFor="mobile-emi-principal" className="text-xs font-semibold text-slate-300 flex items-center gap-1 cursor-pointer">
                  <Coins size={12} className="text-brand-mint" />
                  Loan Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-2 text-xs font-semibold text-slate-400">₹</span>
                  <input
                    id="mobile-emi-principal"
                    aria-label="Loan Amount in Rupees"
                    type="text"
                    value={principal ? principal.toLocaleString("en-IN") : ""}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/,/g, ""));
                      if (!isNaN(val)) setPrincipal(val);
                    }}
                    className="text-xs font-bold text-white bg-slate-800/80 pl-5 pr-2 py-0.5 rounded border border-emerald-500/20 w-28 text-right focus:outline-none focus:border-brand-mint transition-all"
                  />
                </div>
              </div>

              {/* Drag-Only Slider: track click is disabled, handle moves strictly on direct drag */}
              <DragOnlySlider
                min={100000}
                max={100000000}
                step={100000}
                value={principal}
                onChange={setPrincipal}
                ariaLabel="Loan Amount Slider"
              />

              {/* Quick Presets */}
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-0.5">
                <span>₹1 L</span>
                <div className="flex gap-1">
                  {[2500000, 5000000, 7500000, 10000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPrincipal(amt)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        principal === amt
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {formatCompact(amt).replace("₹", "")}
                    </button>
                  ))}
                </div>
                <span>₹10 Cr</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div className="bg-slate-900/40 rounded-xl p-2 sm:p-2.5 border border-white/5">
              <div className="flex justify-between items-center mb-0.5">
                <label htmlFor="mobile-emi-rate" className="text-xs font-semibold text-slate-300 flex items-center gap-1 cursor-pointer">
                  <Percent size={12} className="text-brand-mint" />
                  Interest Rate (p.a.)
                </label>
                <div className="relative flex items-center">
                  <input
                    id="mobile-emi-rate"
                    aria-label="Interest Rate per annum"
                    type="number"
                    step="0.05"
                    value={rate}
                    onChange={(e) => setRate(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="text-xs font-bold text-white bg-slate-800/80 pl-2 pr-5 py-0.5 rounded border border-emerald-500/20 w-16 text-right focus:outline-none focus:border-brand-mint transition-all"
                  />
                  <span className="absolute right-1.5 text-xs font-semibold text-slate-400">%</span>
                </div>
              </div>

              {/* Drag-Only Slider */}
              <DragOnlySlider
                min={5}
                max={20}
                step={0.05}
                value={rate}
                onChange={setRate}
                ariaLabel="Interest Rate Slider"
              />

              {/* Quick Rate Presets */}
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-0.5">
                <span>5%</span>
                <div className="flex gap-1">
                  {[7.5, 8.5, 9.0, 9.5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRate(r)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        rate === r
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
                <span>20%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div className="bg-slate-900/40 rounded-xl p-2 sm:p-2.5 border border-white/5">
              <div className="flex justify-between items-center mb-0.5">
                <label htmlFor="mobile-emi-tenure" className="text-xs font-semibold text-slate-300 flex items-center gap-1 cursor-pointer">
                  <Clock size={12} className="text-brand-mint" />
                  Loan Tenure
                </label>
                <div className="relative flex items-center">
                  <input
                    id="mobile-emi-tenure"
                    aria-label="Loan Tenure in years"
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="text-xs font-bold text-white bg-slate-800/80 pl-2 pr-7 py-0.5 rounded border border-emerald-500/20 w-16 text-right focus:outline-none focus:border-brand-mint transition-all"
                  />
                  <span className="absolute right-1.5 text-xs font-semibold text-slate-400">Yrs</span>
                </div>
              </div>

              {/* Drag-Only Slider */}
              <DragOnlySlider
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={setTenureYears}
                ariaLabel="Tenure Slider"
              />

              {/* Quick Tenure Presets */}
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-0.5">
                <span>1 Yr</span>
                <div className="flex gap-1">
                  {[10, 15, 20, 25, 30].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTenureYears(y)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        tenureYears === y
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {y}Y
                    </button>
                  ))}
                </div>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Action Bar */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
            <a
              href="/home-loan"
              className="flex-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-extrabold py-2 px-3 rounded-xl text-center text-xs hover:opacity-95 shadow-[0_0_15px_rgba(117,232,122,0.4)] flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Apply for this EMI</span>
              <ArrowRight size={13} />
            </a>

            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs border border-white/10 flex items-center justify-center gap-1 transition-all"
            >
              <Calendar size={13} className="text-brand-mint" />
              <span>{showSchedule ? "Hide Table" : "Schedule"}</span>
              {showSchedule ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {/* 
          =======================================================
          DESKTOP VIEW (>= lg): EXPANSIVE DUAL-COLUMN COCKPIT
          =======================================================
        */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 p-8 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-brand-mint border border-emerald-500/20 mb-2">
                  <Sparkles size={13} />
                  Precision Financial Engine
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">Interactive Controls</h3>
              </div>
              <div className="text-xs text-slate-400 font-medium bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
                Drag handles directly to adjust
              </div>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="desktop-emi-principal" className="font-semibold text-sm text-slate-200 flex items-center gap-2 cursor-pointer">
                  <Coins size={16} className="text-brand-mint" />
                  Loan Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-semibold text-slate-400">₹</span>
                  <input
                    id="desktop-emi-principal"
                    aria-label="Loan Amount in Rupees"
                    type="text"
                    value={principal ? principal.toLocaleString("en-IN") : ""}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/,/g, ""));
                      if (!isNaN(val)) setPrincipal(val);
                    }}
                    className="text-lg font-bold text-white bg-slate-800/90 pl-7 pr-3 py-1 rounded-lg border border-emerald-500/20 w-44 text-right focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint transition-all"
                  />
                </div>
              </div>

              {/* Drag-Only Slider */}
              <DragOnlySlider
                min={100000}
                max={100000000}
                step={100000}
                value={principal}
                onChange={setPrincipal}
                ariaLabel="Loan Amount"
              />

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>₹1 Lakh</span>
                <div className="flex gap-1.5">
                  {[2500000, 5000000, 7500000, 10000000, 20000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPrincipal(amt)}
                      className={`px-2 py-0.5 rounded text-xs transition-all ${
                        principal === amt
                          ? "bg-brand-mint text-slate-950 font-bold shadow-[0_0_8px_rgba(117,232,122,0.5)]"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                    >
                      {formatCompact(amt)}
                    </button>
                  ))}
                </div>
                <span>₹10 Crore</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="desktop-emi-rate" className="font-semibold text-sm text-slate-200 flex items-center gap-2 cursor-pointer">
                  <Percent size={16} className="text-brand-mint" />
                  Interest Rate (p.a.)
                </label>
                <div className="relative flex items-center">
                  <input
                    id="desktop-emi-rate"
                    aria-label="Interest Rate per annum"
                    type="number"
                    step="0.05"
                    value={rate}
                    onChange={(e) => setRate(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="text-lg font-bold text-white bg-slate-800/90 pl-3 pr-8 py-1 rounded-lg border border-emerald-500/20 w-28 text-right focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint transition-all"
                  />
                  <span className="absolute right-3 font-semibold text-slate-400">%</span>
                </div>
              </div>

              {/* Drag-Only Slider */}
              <DragOnlySlider
                min={5}
                max={20}
                step={0.05}
                value={rate}
                onChange={setRate}
                ariaLabel="Interest Rate"
              />

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>5.0%</span>
                <div className="flex gap-1.5">
                  {[7.5, 8.0, 8.5, 9.0, 9.5, 10.5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRate(r)}
                      className={`px-2 py-0.5 rounded text-xs transition-all ${
                        rate === r
                          ? "bg-brand-mint text-slate-950 font-bold shadow-[0_0_8px_rgba(117,232,122,0.5)]"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
                <span>20.0%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="desktop-emi-tenure" className="font-semibold text-sm text-slate-200 flex items-center gap-2 cursor-pointer">
                  <Clock size={16} className="text-brand-mint" />
                  Loan Tenure
                </label>
                <div className="relative flex items-center">
                  <input
                    id="desktop-emi-tenure"
                    aria-label="Loan Tenure in years"
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="text-lg font-bold text-white bg-slate-800/90 pl-3 pr-12 py-1 rounded-lg border border-emerald-500/20 w-28 text-right focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint transition-all"
                  />
                  <span className="absolute right-3 font-semibold text-slate-400">Yrs</span>
                </div>
              </div>

              {/* Drag-Only Slider */}
              <DragOnlySlider
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={setTenureYears}
                ariaLabel="Loan Tenure"
              />

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>1 Year</span>
                <div className="flex gap-1.5">
                  {[5, 10, 15, 20, 25, 30].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTenureYears(y)}
                      className={`px-2.5 py-0.5 rounded text-xs transition-all ${
                        tenureYears === y
                          ? "bg-brand-mint text-slate-950 font-bold shadow-[0_0_8px_rgba(117,232,122,0.5)]"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                    >
                      {y} Years
                    </button>
                  ))}
                </div>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Circular Gauge Cockpit */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-900/60 rounded-2xl p-7 border border-emerald-500/15 backdrop-blur-md">
            {/* Dynamic Animated Circular Graph (Desktop size 215px) */}
            <div className="mb-5">
              <DynamicFuturisticGauge
                principal={principal}
                totalInterest={totalInterest}
                totalPayment={totalPayment}
                emi={emi}
                size={215}
                strokeWidth={13}
                compact={false}
              />
            </div>

            {/* Financial Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 w-full bg-slate-950/60 p-4 rounded-xl border border-white/5 mb-5">
              <div className="border-r border-white/5 pr-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-brand-mint shadow-[0_0_5px_#75e87a]" />
                  <span>Principal Amount</span>
                </div>
                <div className="text-base font-bold text-white">
                  {formatCurrency(principal)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {((principal / totalPayment) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="pl-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_5px_#38bdf8]" />
                  <span>Total Interest</span>
                </div>
                <div className="text-base font-bold text-sky-400">
                  {formatCurrency(totalInterest)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {((totalInterest / totalPayment) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="col-span-2 pt-2 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Total Amount Payable
                  </span>
                  <div className="text-xl font-black text-brand-mint">
                    {formatCurrency(totalPayment)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>{tenureYears * 12} payments</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2.5">
              <div className="flex gap-2">
                <a
                  href="/home-loan"
                  className="flex-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-bold py-3 px-4 rounded-xl text-center hover:opacity-95 shadow-[0_0_20px_rgba(117,232,122,0.35)] flex items-center justify-center gap-2 transition-all"
                >
                  <span>Apply for this EMI</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/affordability"
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-xl text-center border border-white/10 transition-all flex items-center justify-center text-sm"
                >
                  Eligibility
                </a>
              </div>

              {/* Utility Tools */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="flex-1 bg-slate-800/60 hover:bg-slate-800 text-slate-300 py-2 px-3 rounded-lg text-xs font-semibold border border-white/5 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar size={14} className="text-brand-mint" />
                  <span>{showSchedule ? "Hide Schedule" : "Amortization"}</span>
                  {showSchedule ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 bg-slate-800/60 hover:bg-slate-800 text-slate-300 py-2 px-3 rounded-lg text-xs font-semibold border border-white/5 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save size={14} />
                  <span>Save PDF</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 bg-slate-800/60 hover:bg-slate-800 text-slate-300 py-2 px-3 rounded-lg text-xs font-semibold border border-white/5 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check size={14} className="text-brand-mint" /> : <Share2 size={14} />}
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 
          =======================================================
          COLLAPSIBLE AMORTIZATION SCHEDULE TABLE
          =======================================================
        */}
        {showSchedule && (
          <div className="p-4 sm:p-8 border-t border-white/10 bg-slate-950/80 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div>
                <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <Calendar size={18} className="text-brand-mint" />
                  Amortization Schedule
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detailed payment breakdown over your loan tenure
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setScheduleType("yearly")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      scheduleType === "yearly"
                        ? "bg-brand-mint text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Yearly
                  </button>
                  <button
                    onClick={() => setScheduleType("monthly")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      scheduleType === "monthly"
                        ? "bg-brand-mint text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                <button
                  onClick={handleSave}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-white/10 transition-colors"
                >
                  <Save size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 max-h-[380px] overflow-y-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-900 text-slate-400 font-semibold sticky top-0 shadow-sm border-b border-white/10">
                  <tr>
                    <th className="px-3 sm:px-4 py-2.5">
                      {scheduleType === "monthly" ? "Month" : "Year"}
                    </th>
                    <th className="px-3 sm:px-4 py-2.5 text-right">Principal</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right">Interest</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {schedule.map((row) => (
                    <tr key={row.period} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-3 sm:px-4 py-2 font-sans font-medium text-slate-300">
                        {scheduleType === "monthly" ? "Month " : "Year "}
                        {row.period}
                      </td>
                      <td className="px-3 sm:px-4 py-2 text-right text-emerald-400">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="px-3 sm:px-4 py-2 text-right text-sky-400">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="px-3 sm:px-4 py-2 text-right font-bold text-white">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
