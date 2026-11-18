"use client";

import { useState, useMemo, useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, Coins, Clock, ArrowRight, ShieldCheck, Check } from "lucide-react";

const BANKS = [
  { name: "SBI", rate: 8.4, type: "PSU", processingFee: 0.35 },
  { name: "Bank of Baroda", rate: 8.4, type: "PSU", processingFee: 0.25 },
  { name: "HDFC Bank", rate: 8.5, type: "Private", processingFee: 0.5 },
  { name: "ICICI Bank", rate: 8.6, type: "Private", processingFee: 0.5 },
  { name: "Axis Bank", rate: 8.7, type: "Private", processingFee: 0.5 },
];

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
    }
    if (nextVal !== value) {
      onChange(nextVal);
    }
  };

  return (
    <div className={`relative w-full py-1.5 select-none touch-none ${className}`}>
      {/* Track: pointer-events-none ensures clicking track will NOT change value */}
      <div
        ref={trackRef}
        className="relative h-2 w-full rounded-full bg-slate-800/90 overflow-hidden ring-1 ring-white/10 pointer-events-none"
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-brand-mint to-[#86efac] rounded-full shadow-[0_0_12px_rgba(117,232,122,0.5)] transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Handle: pointer-events-auto */}
      <div
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center transition-transform focus:outline-none focus:ring-2 focus:ring-brand-mint ${
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

export default function AdvancedEmiComparison() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(20);

  const calculateEMI = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const bankCalculations = useMemo(() => {
    return BANKS.map((bank) => {
      const emi = calculateEMI(loanAmount, bank.rate, tenureYears);
      const totalInterest = (emi * tenureYears * 12) - loanAmount;
      const processingFeeAmount = loanAmount * (bank.processingFee / 100);
      const totalRepayment = loanAmount + totalInterest + processingFeeAmount;
      return {
        ...bank,
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        processingFeeAmount: Math.round(processingFeeAmount),
        totalRepayment: Math.round(totalRepayment),
      };
    }).sort((a, b) => a.emi - b.emi);
  }, [loanAmount, tenureYears]);

  const bestBank = bankCalculations[0];
  const maxEMI = Math.max(...bankCalculations.map((b) => b.emi));
  const minEMI = Math.min(...bankCalculations.map((b) => b.emi));

  return (
    <div className="w-full text-left">
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#091511] text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl overflow-hidden p-4 sm:p-6 lg:p-8">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Title */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-brand-mint border border-emerald-500/20 mb-2">
            <Sparkles size={12} />
            Unbiased Bank Rate Matrix
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">Compare Bank Home Loan Rates Live</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time interest, EMI, and processing fee simulation across India's top lenders.
          </p>
        </div>

        {/* Sliders in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <Coins size={14} className="text-brand-mint" />
                Loan Amount
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-2 text-xs font-semibold text-brand-mint">₹</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  step={100000}
                  className="text-xs sm:text-sm font-bold text-white bg-slate-800/80 pl-5 pr-2 py-1 rounded-lg border border-emerald-500/20 w-32 text-right focus:outline-none focus:border-brand-mint"
                />
              </div>
            </div>
            <DragOnlySlider
              min={1000000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={setLoanAmount}
              ariaLabel="Loan Amount"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹10 Lakhs</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <Clock size={14} className="text-brand-mint" />
                Tenure
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="text-xs sm:text-sm font-bold text-white bg-slate-800/80 pl-2 pr-7 py-1 rounded-lg border border-emerald-500/20 w-20 text-right focus:outline-none focus:border-brand-mint"
                />
                <span className="absolute right-2 text-xs font-semibold text-slate-400">Yrs</span>
              </div>
            </div>
            <DragOnlySlider
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={setTenureYears}
              ariaLabel="Tenure"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Visual Result: Comparative Bank Bar Chart */}
        <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-emerald-500/20 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-300">Monthly EMI Benchmark (Lowest to Highest)</span>
            <span className="text-xs font-extrabold text-brand-mint bg-brand-mint/10 px-2.5 py-0.5 rounded-full border border-brand-mint/20">
              Lowest: {bestBank.name} (₹{bestBank.emi.toLocaleString('en-IN')}/mo)
            </span>
          </div>

          <div className="space-y-2">
            {bankCalculations.map((bank, i) => {
              const diff = maxEMI > minEMI ? ((bank.emi - minEMI) / (maxEMI - minEMI)) * 100 : 0;
              const isBest = i === 0;

              return (
                <div key={bank.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      {isBest && <Check size={12} className="text-brand-mint" />}
                      <span className={isBest ? "text-brand-mint font-bold" : "text-white"}>{bank.name}</span>
                      <span className="text-[10px] text-slate-400">({bank.rate}%)</span>
                    </span>
                    <span className={isBest ? "text-brand-mint font-bold" : "text-slate-200"}>
                      ₹{bank.emi.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isBest ? "bg-gradient-to-r from-emerald-500 to-brand-mint shadow-[0_0_8px_#75e87a]" : "bg-slate-600"
                      }`}
                      style={{ width: `${Math.max(30, 100 - diff * 0.4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">Bank</th>
                <th className="p-3">Rate</th>
                <th className="p-3 text-brand-mint">Monthly EMI</th>
                <th className="p-3">Total Interest</th>
                <th className="p-3">Processing Fee</th>
                <th className="p-3 text-right">Total Outflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {bankCalculations.map((bank, i) => (
                <tr key={bank.name} className={`hover:bg-emerald-950/20 transition-colors ${i === 0 ? "bg-emerald-950/30" : ""}`}>
                  <td className="p-3 font-bold text-white flex items-center gap-1.5">
                    {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />}
                    {bank.name}
                    <span className="text-[10px] text-slate-400 font-normal">({bank.type})</span>
                  </td>
                  <td className="p-3 text-slate-300">{bank.rate}%</td>
                  <td className="p-3 font-bold text-brand-mint">₹{bank.emi.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-300">₹{bank.totalInterest.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-300">{bank.processingFee}% (₹{bank.processingFeeAmount.toLocaleString('en-IN')})</td>
                  <td className="p-3 text-right font-bold text-white">₹{bank.totalRepayment.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
