"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import { 
  IndianRupee, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Clock, 
  Coins, 
  Percent, 
  ArrowRight, 
  Home, 
  Building, 
  Scale, 
  PiggyBank, 
  Award,
  Layers,
  FileCheck
} from "lucide-react";

// Re-export the newly redesigned BalanceTransferCalculator
export { default as BalanceTransferCalculator } from "./BalanceTransferCalculator";

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
 * Custom Drag-Only Slider (matching EMI Calculator):
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
  thumbColor = "mint",
  className = "",
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  ariaLabel?: string;
  thumbColor?: "mint" | "sky" | "amber";
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

  const getGlowGradient = () => {
    if (thumbColor === "amber") return "from-amber-500 via-orange-400 to-amber-300";
    if (thumbColor === "sky") return "from-sky-500 via-cyan-400 to-teal-300";
    return "from-emerald-500 via-brand-mint to-[#86efac]";
  };

  return (
    <div className={`relative w-full py-1.5 select-none touch-none ${className}`}>
      {/* Track: pointer-events-none guarantees clicking anywhere on track will NOT jump */}
      <div
        ref={trackRef}
        className="relative h-2 w-full rounded-full bg-slate-800/90 overflow-hidden pointer-events-none ring-1 ring-white/10"
      >
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getGlowGradient()} rounded-full shadow-[0_0_12px_rgba(117,232,122,0.6)] transition-all duration-75`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Handle: Only this element has pointer-events-auto */}
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
        {isDragging && (
          <div className="absolute inset-0 rounded-full bg-brand-mint/60 animate-ping pointer-events-none" />
        )}
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
 * Standardized High-Tech Input Group
 */
function CalcInputGroup({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  presets = [],
  icon: Icon,
  thumbColor = "mint",
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  presets?: { label: string; value: number }[];
  icon?: any;
  thumbColor?: "mint" | "sky" | "amber";
}) {
  return (
    <div className="bg-slate-900/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/5 space-y-1.5 min-w-0">
      <div className="flex justify-between items-center mb-0.5 gap-2">
        <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5 truncate min-w-0">
          {Icon && <Icon size={14} className="text-brand-mint shrink-0" />}
          <span className="truncate">{label}</span>
        </label>
        <div className="relative flex items-center shrink-0">
          {prefix && <span className="absolute left-2 text-xs sm:text-sm font-semibold text-brand-mint">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className={`text-xs sm:text-sm font-bold text-white bg-slate-800/80 ${prefix ? 'pl-4 sm:pl-5' : 'pl-2'} ${suffix ? 'pr-6 sm:pr-7' : 'pr-2'} py-0.5 sm:py-1 rounded-lg border border-emerald-500/20 w-16 sm:w-24 md:w-28 text-right focus:outline-none focus:border-brand-mint transition-all`}
          />
          {suffix && <span className="absolute right-1.5 sm:right-2 text-xs font-semibold text-slate-400">{suffix}</span>}
        </div>
      </div>

      <DragOnlySlider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        thumbColor={thumbColor}
        ariaLabel={label}
      />

      {presets && presets.length > 0 && (
        <div className="flex justify-between items-center text-[9px] sm:text-xs text-slate-400 pt-0.5">
          <span>{prefix}{formatCompact(min)}{suffix}</span>
          <div className="flex gap-1">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onChange(p.value)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  value === p.value
                    ? "bg-brand-mint text-slate-950 font-bold"
                    : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <span>{prefix}{formatCompact(max)}{suffix}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Standardized High-Tech Container with glowing ambience
 */
function CalcContainer({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full text-left">
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#091511] text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="p-3 sm:p-5 md:p-8">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-brand-mint border border-emerald-500/20 mb-2">
              <Sparkles size={12} />
              {title}
            </span>
            <p className="text-xs sm:text-sm text-slate-300">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 1. ELIGIBILITY CALCULATOR (Unique Result: Multi-Bar Capacity Meter & FOIR Gauge)
// =========================================================================
export function EligibilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [obligations, setObligations] = useState(10000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [creditScore, setCreditScore] = useState("excellent");

  const handleCreditScoreChange = (score: string) => {
    setCreditScore(score);
    if (score === "excellent") setRate(8.5);
    else if (score === "good") setRate(9.5);
    else if (score === "fair") setRate(10.5);
    else if (score === "critical") setRate(12.0);
  };

  const maxEmi = Math.max(0, (income * 0.70) - obligations);
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const eligibleLoan = maxEmi > 0 ? (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : 0;
  const foirPercent = Math.min(100, Math.round(((obligations + maxEmi) / income) * 100));

  return (
    <CalcContainer
      title="Borrowing Eligibility Engine"
      subtitle="Simulate your maximum sanctioned home loan eligibility based on 70% FOIR banking norms."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Net Monthly Income"
            value={income}
            onChange={setIncome}
            min={25000}
            max={500000}
            step={5000}
            prefix="₹"
            icon={Coins}
            presets={[
              { label: "₹50K", value: 50000 },
              { label: "₹1L", value: 100000 },
              { label: "₹2L", value: 200000 },
              { label: "₹3L", value: 300000 },
            ]}
          />

          <CalcInputGroup
            label="Existing Monthly EMIs"
            value={obligations}
            onChange={setObligations}
            min={0}
            max={200000}
            step={2000}
            prefix="₹"
            thumbColor="amber"
            icon={TrendingDown}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-slate-900/40 rounded-xl p-2.5 sm:p-3 border border-white/5 space-y-1">
              <label className="text-[11px] sm:text-xs font-semibold text-slate-300 block">Credit Score</label>
              <select
                value={creditScore}
                onChange={(e) => handleCreditScoreChange(e.target.value)}
                className="w-full bg-slate-800/80 border border-emerald-500/20 rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-brand-mint"
              >
                <option value="excellent">750+ (Excellent - 8.5%)</option>
                <option value="good">700-749 (Good - 9.5%)</option>
                <option value="fair">650-699 (Fair - 10.5%)</option>
                <option value="critical">&lt;650 (High - 12%)</option>
              </select>
            </div>

            <CalcInputGroup
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={5}
              max={30}
              step={1}
              suffix="Yrs"
              icon={Clock}
            />
          </div>
        </div>

        {/* Visual Result: Multi-Bar Capacity Meter */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sanction Eligibility Potential
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(eligibleLoan)}
          </div>

          <div className="text-xs text-emerald-300 font-medium">
            Max Monthly EMI: <strong>₹{Math.round(maxEmi).toLocaleString('en-IN')}/mo</strong>
          </div>

          {/* SVG Multi-Tier Horizontal Capacity Bar */}
          <div className="space-y-2 text-left pt-2">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>FOIR Capacity Utilized</span>
              <span className="text-brand-mint font-bold">{foirPercent}%</span>
            </div>
            <div className="h-3 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-white/10 flex gap-1">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_8px_#10b981]"
                style={{ width: `${Math.min(70, foirPercent)}%` }}
              />
              {obligations > 0 && (
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300 shadow-[0_0_8px_#f59e0b]"
                  style={{ width: `${Math.min(30, (obligations / income) * 100)}%` }}
                />
              )}
            </div>
            <div className="flex justify-between text-[9px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> New Loan Capacity</span>
              <span className="flex items-center gap-1 text-amber-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Existing Debt</span>
            </div>
          </div>

          <a
            href="/home-loan"
            className="w-full bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 hover:opacity-95 shadow-[0_0_15px_rgba(117,232,122,0.4)] transition-all"
          >
            <span>Apply for this Eligibility</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 2. AFFORDABILITY CALCULATOR (Unique Result: Curved Equity vs Loan Area Spline)
// =========================================================================
export function AffordabilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const maxEmi = income * 0.70;
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const eligibleLoan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  const maxPropertyCost = eligibleLoan + downPayment;

  const loanRatio = maxPropertyCost > 0 ? Math.round((eligibleLoan / maxPropertyCost) * 100) : 80;
  const dpRatio = 100 - loanRatio;

  return (
    <CalcContainer
      title="Home Affordability Engine"
      subtitle="Determine the maximum home purchase budget you can comfortably purchase."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Monthly Income"
            value={income}
            onChange={setIncome}
            min={25000}
            max={500000}
            step={5000}
            prefix="₹"
            icon={Coins}
          />
          <CalcInputGroup
            label="Available Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            min={100000}
            max={10000000}
            step={100000}
            prefix="₹"
            thumbColor="sky"
            icon={PiggyBank}
            presets={[
              { label: "₹5L", value: 500000 },
              { label: "₹10L", value: 1000000 },
              { label: "₹20L", value: 2000000 },
              { label: "₹50L", value: 5000000 },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <CalcInputGroup
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={7}
              max={15}
              step={0.1}
              suffix="%"
              icon={Percent}
            />
            <CalcInputGroup
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={5}
              max={30}
              step={1}
              suffix="Yrs"
              icon={Clock}
            />
          </div>
        </div>

        {/* Visual Result: Curved Equity vs Loan Area Graph */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Property Budget
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(maxPropertyCost)}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/80 rounded-lg p-2 border border-white/5 text-left">
            <div>
              <span className="text-sky-400 block font-bold">Down Payment ({dpRatio}%)</span>
              <span className="text-white font-bold">{formatCompact(downPayment)}</span>
            </div>
            <div>
              <span className="text-emerald-400 block font-bold">Bank Loan ({loanRatio}%)</span>
              <span className="text-white font-bold">{formatCompact(eligibleLoan)}</span>
            </div>
          </div>

          {/* SVG Dynamic Spline Arc */}
          <div className="h-16 w-full relative flex items-center justify-center">
            <svg viewBox="0 0 200 40" className="w-full h-full">
              <path
                d="M 10 35 Q 100 5 190 35"
                fill="none"
                stroke="#0284c7"
                strokeWidth="6"
                strokeLinecap="round"
                className="opacity-40"
              />
              <path
                d="M 10 35 Q 100 5 190 35"
                fill="none"
                stroke="#75e87a"
                strokeWidth="6"
                strokeDasharray={`${(loanRatio / 100) * 200} 200`}
                strokeLinecap="round"
                className="transition-all duration-300 shadow-[0_0_10px_#75e87a]"
              />
            </svg>
          </div>

          <a
            href="/home-loan"
            className="w-full bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 hover:opacity-95 shadow-[0_0_15px_rgba(117,232,122,0.4)] transition-all"
          >
            <span>Explore Properties</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 3. PREPAYMENT CALCULATOR (Unique Result: Dual-Pillar Comparison Bar Chart)
// =========================================================================
export function PrepaymentCalculator() {
  const [outstanding, setOutstanding] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [remainingTenure, setRemainingTenure] = useState(15);
  const [prepayment, setPrepayment] = useState(500000);

  const r = rate / 12 / 100;
  const n = remainingTenure * 12;
  const currentEmi = (outstanding * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterestWithout = (currentEmi * n) - outstanding;

  const newPrincipal = Math.max(0, outstanding - prepayment);
  const newEmi = (newPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterestWith = (newEmi * n) - newPrincipal;
  const savings = Math.max(0, totalInterestWithout - totalInterestWith);

  const interestReductionPercent = totalInterestWithout > 0 ? Math.round((savings / totalInterestWithout) * 100) : 0;

  return (
    <CalcContainer
      title="Loan Prepayment Benefit Engine"
      subtitle="Discover how much total interest and tenure you save with part-prepayments."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Outstanding Loan Amount"
            value={outstanding}
            onChange={setOutstanding}
            min={500000}
            max={20000000}
            step={100000}
            prefix="₹"
            icon={Coins}
          />
          <CalcInputGroup
            label="One-Time Prepayment Amount"
            value={prepayment}
            onChange={setPrepayment}
            min={50000}
            max={5000000}
            step={50000}
            prefix="₹"
            thumbColor="sky"
            icon={Sparkles}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <CalcInputGroup
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={7}
              max={15}
              step={0.1}
              suffix="%"
              icon={Percent}
            />
            <CalcInputGroup
              label="Remaining Tenure"
              value={remainingTenure}
              onChange={setRemainingTenure}
              min={1}
              max={30}
              step={1}
              suffix="Yrs"
              icon={Clock}
            />
          </div>
        </div>

        {/* Visual Result: Dual Pillar Comparison Bar Chart */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Interest Saved
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(savings)}
          </div>

          <div className="text-xs text-emerald-300 font-medium">
            New EMI: <strong>₹{Math.round(newEmi).toLocaleString('en-IN')}/mo</strong> (Save ₹{Math.round(currentEmi - newEmi).toLocaleString('en-IN')}/mo)
          </div>

          {/* Dual Bar Graphic */}
          <div className="flex justify-center items-end gap-6 h-24 pt-2">
            <div className="flex flex-col items-center gap-1.5 w-16">
              <span className="text-[9px] text-rose-400 font-bold">{formatCompact(totalInterestWithout)}</span>
              <div className="w-10 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg h-20 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
              <span className="text-[9px] text-slate-400">Old Interest</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-16">
              <span className="text-[9px] text-brand-mint font-bold">{formatCompact(totalInterestWith)}</span>
              <div
                className="w-10 bg-gradient-to-t from-emerald-600 to-brand-mint rounded-t-lg transition-all duration-300 shadow-[0_0_10px_rgba(117,232,122,0.5)]"
                style={{ height: `${Math.max(15, 80 * (1 - interestReductionPercent / 100))}px` }}
              />
              <span className="text-[9px] text-slate-400">New Interest</span>
            </div>
          </div>

          <div className="text-[11px] font-bold text-brand-mint bg-brand-mint/10 py-1 px-3 rounded-full border border-brand-mint/20 inline-block">
            Saves {interestReductionPercent}% of Total Interest!
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 4. TENURE CALCULATOR (Unique Result: Debt-Freedom Milestone Timeline)
// =========================================================================
export function TenureCalculator() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [desiredEmi, setDesiredEmi] = useState(50000);

  const r = rate / 12 / 100;
  let months = 0;
  if (desiredEmi > amount * r) {
    months = Math.log(desiredEmi / (desiredEmi - amount * r)) / Math.log(1 + r);
  }
  const tenureYears = months > 0 ? (months / 12).toFixed(1) : "0";

  return (
    <CalcContainer
      title="Payoff Tenure Estimator"
      subtitle="Calculate how quickly you will become completely debt-free with a targeted EMI."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Loan Amount"
            value={amount}
            onChange={setAmount}
            min={500000}
            max={20000000}
            step={100000}
            prefix="₹"
            icon={Coins}
          />
          <CalcInputGroup
            label="Desired Monthly EMI"
            value={desiredEmi}
            onChange={setDesiredEmi}
            min={10000}
            max={200000}
            step={2000}
            prefix="₹"
            thumbColor="sky"
            icon={Sparkles}
          />
          <CalcInputGroup
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            min={7}
            max={15}
            step={0.1}
            suffix="%"
            icon={Percent}
          />
        </div>

        {/* Visual Result: Debt-Freedom Milestone Timeline */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Time to Debt-Freedom
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {tenureYears} Years
          </div>

          <div className="text-xs text-slate-300">
            Total {Math.round(months)} Monthly Installments
          </div>

          {/* Timeline Nodes */}
          <div className="relative pt-4 pb-2 px-2">
            <div className="h-2 w-full bg-slate-800 rounded-full relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-brand-mint rounded-full transition-all duration-300 shadow-[0_0_10px_#75e87a]"
                style={{ width: `${Math.min(100, (Number(tenureYears) / 30) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>Day 1</span>
              <span>10 Years</span>
              <span>20 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 5. LOAN AMOUNT CALCULATOR (Unique Result: Semi-Circular Speedometer / Borrowing Power Gauge)
// =========================================================================
export function AmountCalculator() {
  const [emi, setEmi] = useState(43391);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const r = rate / 12 / 100;
  const n = tenure * 12;
  const amount = (emi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  return (
    <CalcContainer
      title="Borrowing Power Calculator"
      subtitle="Find the maximum loan amount you can secure based on your affordable monthly payment."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Affordable Monthly EMI"
            value={emi}
            onChange={setEmi}
            min={10000}
            max={200000}
            step={2000}
            prefix="₹"
            icon={Coins}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <CalcInputGroup
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={5}
              max={30}
              step={1}
              suffix="Yrs"
              icon={Clock}
            />
            <CalcInputGroup
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={7}
              max={15}
              step={0.1}
              suffix="%"
              icon={Percent}
            />
          </div>
        </div>

        {/* Visual Result: Semi-Circular Speedometer Gauge */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Maximum Borrowing Capacity
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(amount)}
          </div>

          <div className="relative flex justify-center py-2">
            <svg viewBox="0 0 160 90" className="w-36 h-auto">
              <path
                d="M 15 80 A 65 65 0 0 1 145 80"
                fill="none"
                stroke="#1e293b"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 15 80 A 65 65 0 0 1 145 80"
                fill="none"
                stroke="url(#btSavingsGrad)"
                strokeWidth="12"
                strokeDasharray={`${Math.min(205, (amount / 20000000) * 205)} 205`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          <div className="text-xs text-slate-300">
            Estimated for {tenure} years at {rate}% interest rate.
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 6. AMORTIZATION CALCULATOR (Unique Result: Stacked Principal vs Interest Equity Wave)
// =========================================================================
export function AmortizationCalculator() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterest = (emi * n) - amount;

  return (
    <CalcContainer
      title="Amortization & Interest Buildup"
      subtitle="View exact proportion of interest paid vs equity built across your loan tenure."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Loan Amount"
            value={amount}
            onChange={setAmount}
            min={500000}
            max={20000000}
            step={100000}
            prefix="₹"
            icon={Coins}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <CalcInputGroup
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={5}
              max={30}
              step={1}
              suffix="Yrs"
              icon={Clock}
            />
            <CalcInputGroup
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={7}
              max={15}
              step={0.1}
              suffix="%"
              icon={Percent}
            />
          </div>
        </div>

        {/* Visual Result: Stacked Wave Breakdown */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Monthly EMI
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            ₹{Math.round(emi).toLocaleString('en-IN')}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/80 rounded-lg p-2 border border-white/5 text-left">
            <div>
              <span className="text-emerald-400 block font-bold">Principal Repaid</span>
              <span className="text-white font-bold">{formatCompact(amount)}</span>
            </div>
            <div>
              <span className="text-sky-400 block font-bold">Total Interest</span>
              <span className="text-white font-bold">{formatCompact(totalInterest)}</span>
            </div>
          </div>

          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/10">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((amount / (amount + totalInterest)) * 100)}%` }}
            />
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((totalInterest / (amount + totalInterest)) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 7. DOWN PAYMENT CALCULATOR (Unique Result: Concentric Double Donut Ring)
// =========================================================================
export function DownPaymentCalculator() {
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [ltv, setLtv] = useState(80);

  const loanAmount = propertyValue * (ltv / 100);
  const downPayment = propertyValue - loanAmount;

  return (
    <CalcContainer
      title="Down Payment & Equity Estimator"
      subtitle="Calculate upfront cash required vs bank loan sanction based on RBI LTV guidelines."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Property Value"
            value={propertyValue}
            onChange={setPropertyValue}
            min={1000000}
            max={50000000}
            step={500000}
            prefix="₹"
            icon={Home}
          />
          <CalcInputGroup
            label="Bank Funding Ratio (LTV %)"
            value={ltv}
            onChange={setLtv}
            min={50}
            max={90}
            step={5}
            suffix="%"
            thumbColor="sky"
            icon={Percent}
          />
        </div>

        {/* Visual Result: Concentric Ring */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Required Cash Down Payment
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(downPayment)}
          </div>

          <div className="text-xs text-sky-400 font-bold">
            Bank Loan Sanction ({ltv}%): {formatCompact(loanAmount)}
          </div>

          {/* Visual Donut Ring */}
          <div className="relative flex justify-center py-1">
            <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0284c7" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#75e87a"
                strokeWidth="8"
                strokeDasharray={`${(ltv / 100) * 251} 251`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 8. PROPERTY COST CALCULATOR (Unique Result: Stacked Waterfall Cost Bar)
// =========================================================================
export function PropertyCostCalculator() {
  const [baseCost, setBaseCost] = useState(10000000);
  const [stampDuty, setStampDuty] = useState(5);
  const [registration, setRegistration] = useState(1);
  const [brokerage, setBrokerage] = useState(1);

  const extraCosts = baseCost * ((stampDuty + registration + brokerage) / 100);
  const totalCost = baseCost + extraCosts;

  return (
    <CalcContainer
      title="All-Inclusive Property Costing"
      subtitle="Calculate total on-road price including stamp duty, registration, and brokerage charges."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Base Agreement Cost"
            value={baseCost}
            onChange={setBaseCost}
            min={1000000}
            max={50000000}
            step={500000}
            prefix="₹"
            icon={Building}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <CalcInputGroup label="Stamp Duty" value={stampDuty} onChange={setStampDuty} min={1} max={10} step={0.5} suffix="%" />
            <CalcInputGroup label="Registration" value={registration} onChange={setRegistration} min={0.5} max={5} step={0.1} suffix="%" />
            <CalcInputGroup label="Brokerage" value={brokerage} onChange={setBrokerage} min={0} max={3} step={0.5} suffix="%" />
          </div>
        </div>

        {/* Visual Result: Waterfall Cost Bar */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total On-Road Acquisition Cost
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {formatCompact(totalCost)}
          </div>

          <div className="text-xs text-amber-400 font-bold">
            Total Extra Govt & Ancillary Fees: +{formatCompact(extraCosts)}
          </div>

          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/10">
            <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: `${Math.round((baseCost / totalCost) * 100)}%` }} />
            <div className="h-full bg-amber-500" style={{ width: `${Math.round(((baseCost * (stampDuty / 100)) / totalCost) * 100)}%` }} />
            <div className="h-full bg-sky-500 rounded-r-full" style={{ width: `${Math.round(((baseCost * ((registration + brokerage) / 100)) / totalCost) * 100)}%` }} />
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 9. TAX BENEFIT CALCULATOR (Unique Result: Dual Tax Savings Pillar)
// =========================================================================
export function TaxBenefitCalculator() {
  const [loanAmount, setLoanAmount] = useState(4000000);
  const [rate, setRate] = useState(8.5);
  const [taxSlab, setTaxSlab] = useState(30);

  const annualInterest = loanAmount * (rate / 100);
  const eligibleSec24b = Math.min(annualInterest, 200000);
  const eligibleSec80C = Math.min(loanAmount * 0.05, 150000);

  const totalDeduction = eligibleSec24b + eligibleSec80C;
  const annualTaxSaved = totalDeduction * (taxSlab / 100);

  return (
    <CalcContainer
      title="Income Tax Savings Engine"
      subtitle="Maximize dual tax deductions under Section 24(b) interest & Section 80C principal."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Total Home Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={500000}
            max={30000000}
            step={200000}
            prefix="₹"
            icon={Coins}
          />
          <CalcInputGroup
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={7}
            max={14}
            step={0.1}
            suffix="%"
            icon={Percent}
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Your Income Tax Slab</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {[10, 20, 30, 35].map((slab) => (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setTaxSlab(slab)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    taxSlab === slab ? "bg-brand-mint text-slate-950 border-brand-mint shadow-sm" : "bg-slate-800/60 text-slate-300 border-white/5 hover:bg-slate-700/60"
                  }`}
                >
                  {slab}% Slab
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Result: Dual Tax Savings Pillar */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Annual Direct Tax Saved
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            ₹{Math.round(annualTaxSaved).toLocaleString('en-IN')}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/80 rounded-lg p-2 border border-white/5 text-left">
            <div>
              <span className="text-emerald-400 block font-bold">Sec 24(b) Interest</span>
              <span className="text-white font-bold">₹{Math.round(eligibleSec24b).toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-sky-400 block font-bold">Sec 80C Principal</span>
              <span className="text-white font-bold">₹{Math.round(eligibleSec80C).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-xs text-slate-300">
            Total deduction against taxable income: <strong>₹{Math.round(totalDeduction).toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 10. PMAY 2.0 SUBSIDY CALCULATOR (Unique Result: Subsidy Relief Meter)
// =========================================================================
export function PmayCalculator() {
  const [annualIncome, setAnnualIncome] = useState(600000);
  const [loanAmount, setLoanAmount] = useState(2500000);

  let category = "MIG";
  let subsidyAmount = 180000;

  if (annualIncome <= 300000) {
    category = "EWS";
    subsidyAmount = 267280;
  } else if (annualIncome <= 600000) {
    category = "LIG";
    subsidyAmount = 267280;
  } else if (annualIncome <= 1200000) {
    category = "MIG-I";
    subsidyAmount = 235068;
  } else {
    category = "MIG-II";
    subsidyAmount = 180000;
  }

  const effectiveLoan = Math.max(0, loanAmount - subsidyAmount);

  return (
    <CalcContainer
      title="PMAY (Urban) 2.0 Subsidy Relief"
      subtitle="Calculate official government interest subsidy credited directly to your loan account."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Annual Household Income"
            value={annualIncome}
            onChange={setAnnualIncome}
            min={150000}
            max={1800000}
            step={50000}
            prefix="₹"
            icon={Coins}
          />
          <CalcInputGroup
            label="Requested Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={500000}
            max={5000000}
            step={100000}
            prefix="₹"
            thumbColor="sky"
            icon={Building}
          />
          <div className="p-2.5 bg-brand-mint/10 border border-brand-mint/20 rounded-xl text-xs text-brand-mint font-semibold">
            Government Category: <strong>{category}</strong> under PMAY Urban 2.0 guidelines.
          </div>
        </div>

        {/* Visual Result: Subsidy Relief Meter */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Govt Subsidy Credit Benefit
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            ₹{Math.round(subsidyAmount).toLocaleString('en-IN')}
          </div>

          <div className="text-xs text-emerald-300">
            Net Effective Loan Principal: <strong>{formatCompact(effectiveLoan)}</strong>
          </div>

          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/10">
            <div className="h-full bg-brand-mint rounded-full" style={{ width: `${Math.round((subsidyAmount / loanAmount) * 100)}%` }} />
            <div className="h-full bg-slate-600 rounded-full" style={{ width: `${Math.round((effectiveLoan / loanAmount) * 100)}%` }} />
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 11. STAMP DUTY CALCULATOR (Unique Result: State Govt Duty Ring Graph)
// =========================================================================
export function StampDutyCalculator() {
  const [propertyCost, setPropertyCost] = useState(8000000);
  const [selectedState, setSelectedState] = useState("MH");
  const [ownerGender, setOwnerGender] = useState<"male" | "female" | "joint">("male");
  const [states, setStates] = useState<any[]>([
    { code: "MH", name: "Maharashtra", maleStampDuty: 6, femaleStampDuty: 5, jointStampDuty: 5.5, registrationFeePercent: 1, maxRegistrationFee: 30000, cessPercent: 1 },
    { code: "DL", name: "Delhi", maleStampDuty: 6, femaleStampDuty: 4, jointStampDuty: 5, registrationFeePercent: 1, maxRegistrationFee: 0, cessPercent: 0 },
    { code: "KA", name: "Karnataka", maleStampDuty: 5, femaleStampDuty: 5, jointStampDuty: 5, registrationFeePercent: 1, maxRegistrationFee: 0, cessPercent: 0.6 },
    { code: "UP", name: "Uttar Pradesh", maleStampDuty: 7, femaleStampDuty: 6, jointStampDuty: 6.5, registrationFeePercent: 1, maxRegistrationFee: 20000, cessPercent: 0 },
    { code: "HR", name: "Haryana", maleStampDuty: 7, femaleStampDuty: 5, jointStampDuty: 6, registrationFeePercent: 0, maxRegistrationFee: 50000, cessPercent: 0 },
  ]);

  useEffect(() => {
    fetch("/api/admin/stamp-duty")
      .then((res) => res.json())
      .then((data) => {
        if (data.states && Array.isArray(data.states) && data.states.length > 0) {
          setStates(data.states);
        }
      })
      .catch((err) => console.error("Error fetching stamp duty:", err));
  }, []);

  const currentState = states.find((s) => s.code === selectedState) || states[0];
  const stampDutyRate =
    ownerGender === "female"
      ? currentState.femaleStampDuty
      : ownerGender === "joint"
      ? currentState.jointStampDuty
      : currentState.maleStampDuty;

  const stampDutyAmount = propertyCost * (stampDutyRate / 100);
  let registrationAmount = propertyCost * ((currentState.registrationFeePercent || 0) / 100);
  if (currentState.maxRegistrationFee > 0 && registrationAmount > currentState.maxRegistrationFee) {
    registrationAmount = currentState.maxRegistrationFee;
  }
  const cessAmount = propertyCost * ((currentState.cessPercent || 0) / 100);
  const totalGovtCharges = stampDutyAmount + registrationAmount + cessAmount;

  return (
    <CalcContainer
      title="State Stamp Duty & Registration"
      subtitle="Accurate government registry and revenue taxes computed across Indian states."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Property Agreement Value"
            value={propertyCost}
            onChange={setPropertyCost}
            min={500000}
            max={50000000}
            step={200000}
            prefix="₹"
            icon={Building}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-slate-900/40 rounded-xl p-2.5 border border-white/5 space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-800/80 border border-emerald-500/20 rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-brand-mint"
              >
                {states.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="bg-slate-900/40 rounded-xl p-2.5 border border-white/5 space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Ownership</label>
              <div className="grid grid-cols-3 gap-1">
                {(["male", "female", "joint"] as const).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setOwnerGender(gender)}
                    className={`py-1 text-[10px] font-bold rounded capitalize border transition-all ${
                      ownerGender === gender ? "bg-brand-mint text-slate-950 border-brand-mint font-extrabold" : "bg-slate-800/60 text-slate-300 border-white/5"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Result: Govt Duty Ring Graph */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Govt Registry Charges
          </span>

          <div className="text-2xl sm:text-4xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            ₹{Math.round(totalGovtCharges).toLocaleString('en-IN')}
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[9px] bg-slate-900/80 rounded-lg p-2 border border-white/5 text-left">
            <div>
              <span className="text-emerald-400 block font-bold">Stamp ({stampDutyRate}%)</span>
              <span className="text-white font-bold">{formatCompact(stampDutyAmount)}</span>
            </div>
            <div>
              <span className="text-sky-400 block font-bold">Reg. Fee</span>
              <span className="text-white font-bold">{formatCompact(registrationAmount)}</span>
            </div>
            <div>
              <span className="text-amber-400 block font-bold">Cess</span>
              <span className="text-white font-bold">{formatCompact(cessAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}

// =========================================================================
// 12. RENT VS BUY DECISION CALCULATOR (Unique Result: Diverging Wealth Curve)
// =========================================================================
export function RentVsBuyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(8000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [tenureYears, setTenureYears] = useState(15);
  const [propertyAppreciation, setPropertyAppreciation] = useState(6.0);
  const [investmentReturn, setInvestmentReturn] = useState(10.0);

  const loanAmount = propertyPrice * 0.8;
  const downPayment = propertyPrice * 0.2;
  const r = 8.5 / 12 / 100;
  const n = tenureYears * 12;
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const futurePropertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, tenureYears);
  const futureInvestedDownPayment = downPayment * Math.pow(1 + investmentReturn / 100, tenureYears);
  
  const monthlySavings = Math.max(0, emi - monthlyRent);
  const i = investmentReturn / 12 / 100;
  const futureSipValue = monthlySavings * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalRenterWealth = futureInvestedDownPayment + futureSipValue;

  const buyerNetWealth = futurePropertyValue;
  const winner = buyerNetWealth >= totalRenterWealth ? "Buying" : "Renting";
  const difference = Math.abs(buyerNetWealth - totalRenterWealth);

  return (
    <CalcContainer
      title="Rent vs Buy Wealth Analysis"
      subtitle="15-year net wealth projection comparing real estate ownership vs mutual fund SIP investing."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
          <CalcInputGroup
            label="Target Property Price"
            value={propertyPrice}
            onChange={setPropertyPrice}
            min={1000000}
            max={40000000}
            step={500000}
            prefix="₹"
            icon={Home}
          />
          <CalcInputGroup
            label="Current Monthly Rent"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={5000}
            max={150000}
            step={2000}
            prefix="₹"
            thumbColor="sky"
            icon={Building}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <CalcInputGroup label="Years" value={tenureYears} onChange={setTenureYears} min={5} max={25} step={1} suffix="Y" />
            <CalcInputGroup label="Property %" value={propertyAppreciation} onChange={setPropertyAppreciation} min={3} max={12} step={0.5} suffix="%" />
            <CalcInputGroup label="SIP CAGR %" value={investmentReturn} onChange={setInvestmentReturn} min={6} max={15} step={0.5} suffix="%" />
          </div>
        </div>

        {/* Visual Result: Diverging Wealth Curve */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Financial Recommendation
          </span>

          <div className="text-xl sm:text-3xl font-black text-brand-mint drop-shadow-[0_0_12px_rgba(117,232,122,0.4)]">
            {winner} is Better
          </div>

          <div className="text-xs text-emerald-300 font-bold">
            Projected Extra Wealth: +{formatCompact(difference)}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/80 rounded-lg p-2 border border-white/5 text-left">
            <div>
              <span className="text-emerald-400 block font-bold">Buyer Asset Value</span>
              <span className="text-white font-bold">{formatCompact(buyerNetWealth)}</span>
            </div>
            <div>
              <span className="text-sky-400 block font-bold">Renter Portfolio</span>
              <span className="text-white font-bold">{formatCompact(totalRenterWealth)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalcContainer>
  );
}
