"use client";

import { useState, useMemo, useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import { 
  Sparkles, 
  Share2, 
  Save, 
  Check, 
  ArrowRight, 
  TrendingDown, 
  ArrowRightLeft, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Coins, 
  Percent,
  ShieldCheck,
  CheckCircle2,
  Table,
  AlertCircle
} from "lucide-react";

// Helper for compact INR formatting
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
 * Dynamic Real-Time Savings Visualizer:
 * Accurately renders before-vs-after loan curves without text overlaps or negative bugs.
 */
function DynamicSavingsWave({
  currentEMI,
  newEMI,
  currentInterestRate,
  newInterestRate,
  monthlySavings,
  totalSavings,
  compact = false,
}: {
  currentEMI: number;
  newEMI: number;
  currentInterestRate: number;
  newInterestRate: number;
  monthlySavings: number;
  totalSavings: number;
  compact?: boolean;
}) {
  const hasSavings = currentInterestRate > newInterestRate;
  const isSame = currentInterestRate === newInterestRate;
  const isHigher = currentInterestRate < newInterestRate;
  const rateReduction = Math.max(0, currentInterestRate - newInterestRate);

  const safeCurrent = Math.max(1, currentEMI);
  const ratio = Math.min(0.5, Math.max(0.05, Math.abs(currentEMI - newEMI) / safeCurrent));
  const savingsHeight = Math.round(ratio * (compact ? 35 : 55));

  const height = compact ? 70 : 100;
  const width = compact ? 260 : 360;

  // Curves positioning
  const yOldStart = compact ? 20 : 25;
  const yOldEnd = compact ? 18 : 22;
  const yNewStart = hasSavings ? yOldStart + savingsHeight : isHigher ? Math.max(6, yOldStart - savingsHeight) : yOldStart;
  const yNewEnd = hasSavings ? yOldEnd + Math.round(savingsHeight * 1.1) : isHigher ? Math.max(6, yOldEnd - Math.round(savingsHeight * 1.1)) : yOldEnd;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full space-y-1.5">
      {/* HUD Readout (Cleanly positioned above the curves, no text collisions) */}
      <div className="text-center w-full px-2">
        {hasSavings ? (
          <>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Monthly EMI Savings
            </span>
            <div className="text-xl sm:text-3xl font-black text-brand-mint tracking-tight leading-tight drop-shadow-[0_0_10px_rgba(117,232,122,0.5)] my-0.5">
              Save ₹{monthlySavings.toLocaleString('en-IN')}<span className="text-[11px] font-normal text-slate-300">/mo</span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium block">
              Total Lifetime Savings: <strong className="text-white font-extrabold">{formatCompact(totalSavings)}</strong> (-{rateReduction.toFixed(2)}% drop)
            </span>
          </>
        ) : isSame ? (
          <>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Same Interest Rate ({currentInterestRate}%)
            </span>
            <div className="text-lg sm:text-2xl font-bold text-slate-200 my-0.5">
              ₹0 Monthly Difference
            </div>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium block">
              Drag New Rate lower than {currentInterestRate}% to calculate savings.
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1">
              <AlertCircle size={11} /> New Rate is Higher (+{(newInterestRate - currentInterestRate).toFixed(1)}%)
            </span>
            <div className="text-lg sm:text-2xl font-bold text-amber-300 my-0.5">
              +₹{Math.round(newEMI - currentEMI).toLocaleString('en-IN')}<span className="text-[11px] font-normal text-slate-300">/mo more</span>
            </div>
            <span className="text-[10px] sm:text-xs text-amber-200/80 font-medium block">
              Switching to a higher rate will increase your EMI. Select a lower rate to save.
            </span>
          </>
        )}
      </div>

      {/* SVG Wave Visualization */}
      <div className="w-full px-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="waveSavingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveWarningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Shaded Area between curves */}
          {hasSavings && (
            <path
              d={`M 15 ${yOldStart} Q ${width / 2} ${yOldStart - 6} ${width - 15} ${yOldEnd} L ${width - 15} ${yNewEnd} Q ${width / 2} ${yNewStart + 6} 15 ${yNewStart} Z`}
              fill="url(#waveSavingsGrad)"
              className="transition-all duration-300 ease-out"
            />
          )}

          {isHigher && (
            <path
              d={`M 15 ${yNewStart} Q ${width / 2} ${yNewStart - 6} ${width - 15} ${yNewEnd} L ${width - 15} ${yOldEnd} Q ${width / 2} ${yOldStart + 6} 15 ${yOldStart} Z`}
              fill="url(#waveWarningGrad)"
              className="transition-all duration-300 ease-out"
            />
          )}

          {/* Old Rate Curve (Rose/Red) */}
          <path
            d={`M 15 ${yOldStart} Q ${width / 2} ${yOldStart - 6} ${width - 15} ${yOldEnd}`}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={compact ? 2.5 : 3}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            style={{ filter: "drop-shadow(0 0 6px rgba(244, 63, 94, 0.4))" }}
          />

          {/* New Rate Curve */}
          <path
            d={`M 15 ${yNewStart} Q ${width / 2} ${yNewStart + (hasSavings ? 6 : -6)} ${width - 15} ${yNewEnd}`}
            fill="none"
            stroke={hasSavings ? "#75e87a" : isSame ? "#94a3b8" : "#f59e0b"}
            strokeWidth={compact ? 3 : 3.5}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            style={{ filter: hasSavings ? "drop-shadow(0 0 8px rgba(117, 232, 122, 0.6))" : undefined }}
          />

          {/* Node Dots */}
          <circle cx={15} cy={yOldStart} r={compact ? 3 : 3.5} fill="#f43f5e" />
          <circle cx={width - 15} cy={yOldEnd} r={compact ? 3 : 3.5} fill="#f43f5e" />
          <circle cx={15} cy={yNewStart} r={compact ? 3.5 : 4} fill={hasSavings ? "#75e87a" : isSame ? "#94a3b8" : "#f59e0b"} />
          <circle cx={width - 15} cy={yNewEnd} r={compact ? 3.5 : 4} fill={hasSavings ? "#75e87a" : isSame ? "#94a3b8" : "#f59e0b"} />
        </svg>
      </div>
    </div>
  );
}

export default function BalanceTransferCalculator() {
  const [outstandingPrincipal, setOutstandingPrincipal] = useState(5000000);
  const [currentInterestRate, setCurrentInterestRate] = useState(9.5);
  const [newInterestRate, setNewInterestRate] = useState(8.25);
  const [remainingTenureYears, setRemainingTenureYears] = useState(15);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Exact math calculation
  const calculateEMI = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const currentEMI = useMemo(() => calculateEMI(outstandingPrincipal, currentInterestRate, remainingTenureYears), [outstandingPrincipal, currentInterestRate, remainingTenureYears]);
  const newEMI = useMemo(() => calculateEMI(outstandingPrincipal, newInterestRate, remainingTenureYears), [outstandingPrincipal, newInterestRate, remainingTenureYears]);
  
  const currentTotalInterest = useMemo(() => (currentEMI * remainingTenureYears * 12) - outstandingPrincipal, [currentEMI, remainingTenureYears, outstandingPrincipal]);
  const newTotalInterest = useMemo(() => (newEMI * remainingTenureYears * 12) - outstandingPrincipal, [newEMI, remainingTenureYears, outstandingPrincipal]);

  const hasSavings = currentInterestRate > newInterestRate;
  const isSame = currentInterestRate === newInterestRate;
  const isHigher = currentInterestRate < newInterestRate;
  const monthlySavings = useMemo(() => (hasSavings ? Math.round(currentEMI - newEMI) : 0), [hasSavings, currentEMI, newEMI]);
  const totalSavings = useMemo(() => (hasSavings ? Math.round(currentTotalInterest - newTotalInterest) : 0), [hasSavings, currentTotalInterest, newTotalInterest]);

  const currentTotalPayment = useMemo(() => currentEMI * remainingTenureYears * 12, [currentEMI, remainingTenureYears]);
  const newTotalPayment = useMemo(() => newEMI * remainingTenureYears * 12, [newEMI, remainingTenureYears]);
  const rateReduction = useMemo(() => Math.max(0, currentInterestRate - newInterestRate), [currentInterestRate, newInterestRate]);

  // Share calculation
  const handleShare = async () => {
    const text = hasSavings
      ? `Switching my home loan of ${formatCompact(outstandingPrincipal)} from ${currentInterestRate}% to ${newInterestRate}% saves ₹${monthlySavings.toLocaleString('en-IN')}/month and ₹${totalSavings.toLocaleString('en-IN')} in total interest (Money Viora Balance Transfer Calculator).`
      : `Comparing home loan balance transfer: ${formatCompact(outstandingPrincipal)} at ${newInterestRate}% vs ${currentInterestRate}% on Money Viora.`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Money Viora Balance Transfer Savings",
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

  // Print/Save PDF
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
          <title>Balance Transfer Savings Report - Money Viora</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #75e87a; padding-bottom: 20px; }
            .header h1 { color: #061410; margin: 0 0 8px 0; }
            .savings-badge { display: inline-block; background: #ecfdf5; color: #059669; padding: 6px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px; margin-top: 8px; }
            .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
            .card { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .card.highlight { background: #f0fdf4; border-color: #86efac; }
            .card h3 { margin-top: 0; color: #0f2820; }
            .stat { margin-bottom: 12px; }
            .stat-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; }
            .stat-value { font-size: 20px; font-weight: bold; color: #0f172a; }
            .stat-value.green { color: #059669; }
            .summary-box { background: #061410; color: #ffffff; padding: 24px; border-radius: 12px; text-align: center; margin-top: 30px; }
            .summary-box h2 { margin: 0 0 6px 0; color: #75e87a; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Money Viora Home Loan Balance Transfer Report</h1>
            <p>Official Savings Calculation Summary</p>
            <div class="savings-badge">Estimated Interest Reduction: ${rateReduction.toFixed(2)}% p.a.</div>
          </div>

          <div class="comparison">
            <div class="card">
              <h3>Current Home Loan</h3>
              <div class="stat">
                <div class="stat-label">Outstanding Principal</div>
                <div class="stat-value">₹${outstandingPrincipal.toLocaleString('en-IN')}</div>
              </div>
              <div class="stat">
                <div class="stat-label">Current Interest Rate</div>
                <div class="stat-value">${currentInterestRate}%</div>
              </div>
              <div class="stat">
                <div class="stat-label">Remaining Tenure</div>
                <div class="stat-value">${remainingTenureYears} Years</div>
              </div>
              <div class="stat">
                <div class="stat-label">Current Monthly EMI</div>
                <div class="stat-value">₹${Math.round(currentEMI).toLocaleString('en-IN')}</div>
              </div>
              <div class="stat">
                <div class="stat-label">Total Outflow</div>
                <div class="stat-value">₹${Math.round(currentTotalPayment).toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div class="card highlight">
              <h3>New Transferred Loan</h3>
              <div class="stat">
                <div class="stat-label">Loan Amount</div>
                <div class="stat-value">₹${outstandingPrincipal.toLocaleString('en-IN')}</div>
              </div>
              <div class="stat">
                <div class="stat-label">New Offered Rate</div>
                <div class="stat-value green">${newInterestRate}%</div>
              </div>
              <div class="stat">
                <div class="stat-label">Tenure</div>
                <div class="stat-value">${remainingTenureYears} Years</div>
              </div>
              <div class="stat">
                <div class="stat-label">New Monthly EMI</div>
                <div class="stat-value green">₹${Math.round(newEMI).toLocaleString('en-IN')}</div>
              </div>
              <div class="stat">
                <div class="stat-label">New Total Outflow</div>
                <div class="stat-value">₹${Math.round(newTotalPayment).toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          <div class="summary-box">
            <p style="margin: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: #94a3b8;">Total Lifetime Savings</p>
            <h2>₹${totalSavings.toLocaleString('en-IN')}</h2>
            <p style="margin: 8px 0 0 0; font-size: 16px; color: #ffffff;">Monthly Reduction: <strong style="color: #75e87a;">₹${monthlySavings.toLocaleString('en-IN')} per month</strong></p>
          </div>

          <div class="footer">
            Generated by Money Viora AI Balance Transfer Calculator &bull; Subject to bank sanction terms
          </div>

          <script>
            window.onload = () => { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="w-full text-left">
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#091511] text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* 
          =======================================================
          MOBILE VIEW (< lg): ULTRA-COMPACT SINGLE SCREEN COCKPIT
          =======================================================
        */}
        <div className="block lg:hidden p-3 sm:p-4">
          {/* Top HUD: Real-time Dynamic Savings Wave Visualizer */}
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-500/20 mb-3 relative">
            <DynamicSavingsWave
              currentEMI={currentEMI}
              newEMI={newEMI}
              currentInterestRate={currentInterestRate}
              newInterestRate={newInterestRate}
              monthlySavings={monthlySavings}
              totalSavings={totalSavings}
              compact={true}
            />

            {/* Quick compare tags */}
            <div className="grid grid-cols-2 gap-1 text-[10px] bg-slate-900/80 rounded-lg p-2 mt-2 border border-white/5">
              <div className="flex justify-between items-center px-1">
                <span className="text-slate-400">Old EMI:</span>
                <span className="font-bold text-slate-200">₹{Math.round(currentEMI).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center px-1 border-l border-white/10">
                <span className={hasSavings ? "text-emerald-400" : "text-amber-400"}>New EMI:</span>
                <span className={`font-extrabold ${hasSavings ? "text-brand-mint" : "text-amber-300"}`}>
                  ₹{Math.round(newEMI).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Clean Spaced Mobile Sliders */}
          <div className="space-y-2">
            {/* Slider 1: Outstanding Loan */}
            <div className="bg-slate-900/40 rounded-xl p-2.5 border border-white/5 space-y-1">
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Coins size={12} className="text-brand-mint" />
                  Loan Amount
                </label>
                <span className="text-xs font-black text-brand-mint font-mono">
                  ₹{(outstandingPrincipal / 100000).toFixed(0)} Lakhs
                </span>
              </div>

              <DragOnlySlider
                min={500000}
                max={20000000}
                step={100000}
                value={outstandingPrincipal}
                onChange={setOutstandingPrincipal}
                ariaLabel="Outstanding Loan Amount"
              />

              <div className="flex justify-between items-center text-[9px] text-slate-400 pt-0.5">
                <span>₹5L</span>
                <div className="flex gap-1">
                  {[2500000, 5000000, 7500000, 10000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setOutstandingPrincipal(amt)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        outstandingPrincipal === amt
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {amt >= 10000000 ? `₹${amt / 10000000}Cr` : `₹${amt / 100000}L`}
                    </button>
                  ))}
                </div>
                <span>₹2Cr</span>
              </div>
            </div>

            {/* Slider 2: Remaining Tenure */}
            <div className="bg-slate-900/40 rounded-xl p-2.5 border border-white/5 space-y-1">
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Clock size={12} className="text-brand-mint" />
                  Tenure
                </label>
                <span className="text-xs font-black text-white font-mono">
                  {remainingTenureYears} Years
                </span>
              </div>

              <DragOnlySlider
                min={1}
                max={30}
                step={1}
                value={remainingTenureYears}
                onChange={setRemainingTenureYears}
                ariaLabel="Remaining Tenure"
              />

              <div className="flex justify-between items-center text-[9px] text-slate-400 pt-0.5">
                <span>1Y</span>
                <div className="flex gap-1">
                  {[5, 10, 15, 20, 25].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setRemainingTenureYears(y)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        remainingTenureYears === y
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {y}Y
                    </button>
                  ))}
                </div>
                <span>30Y</span>
              </div>
            </div>

            {/* Dual Rate Block (Clean full-width rows on mobile to prevent squishing) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Current Rate */}
              <div className="bg-slate-900/40 rounded-xl p-2.5 border border-white/5 space-y-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-semibold text-rose-300">Current Loan Rate</span>
                  <span className="text-xs font-black text-rose-400 font-mono">{currentInterestRate}% p.a.</span>
                </div>
                <DragOnlySlider
                  min={7}
                  max={15}
                  step={0.1}
                  value={currentInterestRate}
                  onChange={setCurrentInterestRate}
                  thumbColor="amber"
                  ariaLabel="Current Rate"
                />
              </div>

              {/* New Rate */}
              <div className="bg-slate-900/40 rounded-xl p-2.5 border border-emerald-500/20 bg-emerald-950/20 space-y-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-semibold text-emerald-300">New Offered Rate</span>
                  <span className="text-xs font-black text-brand-mint font-mono">{newInterestRate}% p.a.</span>
                </div>
                <DragOnlySlider
                  min={7}
                  max={15}
                  step={0.1}
                  value={newInterestRate}
                  onChange={setNewInterestRate}
                  thumbColor="mint"
                  ariaLabel="New Rate"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
            <a
              href="#apply"
              className="flex-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-extrabold py-2 px-3 rounded-xl text-center text-xs hover:opacity-95 shadow-[0_0_15px_rgba(117,232,122,0.4)] flex items-center justify-center gap-1 transition-all"
            >
              <span>{hasSavings ? "Transfer & Save Now" : "Apply for Sanction"}</span>
              <ArrowRight size={13} />
            </a>

            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold py-2 px-2.5 rounded-xl text-xs border border-white/10 flex items-center justify-center gap-1 transition-all"
            >
              <Table size={12} className="text-brand-mint" />
              <span>{showBreakdown ? "Hide" : "Details"}</span>
            </button>
            <button
              onClick={handleShare}
              aria-label="Share"
              className="bg-slate-800/80 p-2 rounded-xl text-xs border border-white/10 text-slate-200"
            >
              {copied ? <Check size={12} className="text-brand-mint" /> : <Share2 size={12} />}
            </button>
          </div>
        </div>

        {/* 
          =======================================================
          DESKTOP VIEW (>= lg): DUAL-COLUMN COCKPIT
          =======================================================
        */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 p-8 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-brand-mint border border-emerald-500/20 mb-2">
                  <ArrowRightLeft size={13} />
                  Precision Switch & Save Engine
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">Balance Transfer Simulator</h3>
              </div>
              <div className="text-xs text-slate-400 font-medium bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
                Instant real-time update
              </div>
            </div>

            {/* Slider 1: Outstanding Loan Amount */}
            <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-5 border border-white/5 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                  <Coins size={16} className="text-brand-mint" />
                  Outstanding Loan Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-sm font-semibold text-brand-mint">₹</span>
                  <input
                    type="number"
                    value={outstandingPrincipal}
                    onChange={(e) => setOutstandingPrincipal(Number(e.target.value))}
                    step={100000}
                    className="text-sm font-bold text-white bg-slate-800/80 pl-6 pr-3 py-1 rounded-lg border border-emerald-500/20 w-36 text-right focus:outline-none focus:border-brand-mint transition-all"
                  />
                </div>
              </div>

              <DragOnlySlider
                min={500000}
                max={20000000}
                step={100000}
                value={outstandingPrincipal}
                onChange={setOutstandingPrincipal}
                ariaLabel="Outstanding Principal"
              />

              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>₹5 Lakhs</span>
                <div className="flex gap-1.5">
                  {[2500000, 5000000, 7500000, 10000000, 15000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setOutstandingPrincipal(amt)}
                      className={`px-2 py-0.5 rounded text-xs transition-all ${
                        outstandingPrincipal === amt
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {amt >= 10000000 ? `₹${amt / 10000000} Cr` : `₹${amt / 100000} L`}
                    </button>
                  ))}
                </div>
                <span>₹2 Crores</span>
              </div>
            </div>

            {/* Slider 2: Remaining Tenure */}
            <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-5 border border-white/5 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                  <Clock size={16} className="text-brand-mint" />
                  Remaining Tenure
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={remainingTenureYears}
                    onChange={(e) => setRemainingTenureYears(Number(e.target.value))}
                    className="text-sm font-bold text-white bg-slate-800/80 pl-3 pr-8 py-1 rounded-lg border border-emerald-500/20 w-24 text-right focus:outline-none focus:border-brand-mint transition-all"
                  />
                  <span className="absolute right-2 text-xs font-semibold text-slate-400">Yrs</span>
                </div>
              </div>

              <DragOnlySlider
                min={1}
                max={30}
                step={1}
                value={remainingTenureYears}
                onChange={setRemainingTenureYears}
                ariaLabel="Remaining Tenure"
              />

              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>1 Year</span>
                <div className="flex gap-1.5">
                  {[5, 10, 15, 20, 25, 30].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setRemainingTenureYears(y)}
                      className={`px-2 py-0.5 rounded text-xs transition-all ${
                        remainingTenureYears === y
                          ? "bg-brand-mint text-slate-950 font-bold"
                          : "bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {y} Yrs
                    </button>
                  ))}
                </div>
                <span>30 Years</span>
              </div>
            </div>

            {/* Dual Rate Controls in 2 Columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Current Interest Rate */}
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-xs text-slate-300 flex items-center gap-1.5">
                    <Percent size={14} className="text-rose-400" />
                    Current Bank Rate
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      step={0.1}
                      value={currentInterestRate}
                      onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                      className="text-xs font-bold text-rose-300 bg-slate-800/80 pl-2 pr-5 py-0.5 rounded border border-rose-500/20 w-16 text-right focus:outline-none focus:border-rose-400"
                    />
                    <span className="absolute right-1 text-xs text-slate-400">%</span>
                  </div>
                </div>

                <DragOnlySlider
                  min={7}
                  max={15}
                  step={0.1}
                  value={currentInterestRate}
                  onChange={setCurrentInterestRate}
                  thumbColor="amber"
                  ariaLabel="Current Rate"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>7%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* New Offered Rate */}
              <div className="bg-emerald-950/20 rounded-2xl p-4 border border-emerald-500/20 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-xs text-emerald-300 flex items-center gap-1.5">
                    <TrendingDown size={14} className="text-brand-mint" />
                    New Offered Rate
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      step={0.1}
                      value={newInterestRate}
                      onChange={(e) => setNewInterestRate(Number(e.target.value))}
                      className="text-xs font-bold text-brand-mint bg-slate-800/80 pl-2 pr-5 py-0.5 rounded border border-emerald-500/30 w-16 text-right focus:outline-none focus:border-brand-mint"
                    />
                    <span className="absolute right-1 text-xs text-slate-400">%</span>
                  </div>
                </div>

                <DragOnlySlider
                  min={7}
                  max={15}
                  step={0.1}
                  value={newInterestRate}
                  onChange={setNewInterestRate}
                  thumbColor="mint"
                  ariaLabel="New Rate"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>7%</span>
                  <span className={hasSavings ? "text-brand-mint font-bold" : "text-amber-400 font-bold"}>
                    {hasSavings ? `Save -${rateReduction.toFixed(1)}%` : isSame ? "0% diff" : `+${(newInterestRate - currentInterestRate).toFixed(1)}%`}
                  </span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Savings Cockpit */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/30 rounded-2xl sm:rounded-3xl p-6 border border-emerald-500/20 shadow-xl flex flex-col items-center text-center space-y-5">
            {/* Real-time Dynamic Savings Wave */}
            <div className="w-full bg-slate-950/60 rounded-2xl p-4 border border-emerald-500/20">
              <DynamicSavingsWave
                currentEMI={currentEMI}
                newEMI={newEMI}
                currentInterestRate={currentInterestRate}
                newInterestRate={newInterestRate}
                monthlySavings={monthlySavings}
                totalSavings={totalSavings}
                compact={false}
              />
            </div>

            {/* Current vs New Side-by-Side Comparison */}
            <div className="w-full grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-900/70 rounded-xl p-3 border border-white/5">
                <span className="text-xs text-slate-400 block mb-0.5">Current EMI</span>
                <span className="text-lg font-bold text-slate-300 block">
                  ₹{Math.round(currentEMI).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-rose-400 font-medium">@ {currentInterestRate}% p.a.</span>
              </div>
              <div className="bg-emerald-950/50 rounded-xl p-3 border border-emerald-500/20">
                <span className="text-xs text-emerald-400 block mb-0.5">New EMI</span>
                <span className={`text-lg font-extrabold ${hasSavings ? "text-brand-mint" : "text-amber-300"} block`}>
                  ₹{Math.round(newEMI).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-300 font-medium">@ {newInterestRate}% p.a.</span>
              </div>
            </div>

            {/* Monthly Savings Highlight Banner */}
            <div className="w-full bg-emerald-900/30 border border-brand-mint/20 rounded-xl p-3 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-slate-300 font-medium block">
                  {hasSavings ? "Monthly Cashflow Gain" : "Net Monthly Change"}
                </span>
                <span className={`text-xl font-black ${hasSavings ? "text-brand-mint" : "text-slate-300"}`}>
                  {hasSavings
                    ? `+ ₹${monthlySavings.toLocaleString('en-IN')} / mo`
                    : isSame
                    ? `₹0 / mo change`
                    : `+ ₹${Math.round(newEMI - currentEMI).toLocaleString('en-IN')} / mo higher`}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center shrink-0">
                <TrendingDown className="text-brand-mint" size={18} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2.5 pt-1">
              <a
                href="#apply"
                className="w-full bg-gradient-to-r from-emerald-500 via-brand-mint to-[#9effa3] text-slate-950 font-black py-3 px-6 rounded-xl hover:opacity-95 shadow-[0_0_20px_rgba(117,232,122,0.4)] flex items-center justify-center gap-2 transition-all text-sm group"
              >
                <span>{hasSavings ? `Transfer Loan & Save ${formatCompact(totalSavings)}` : "Apply for Balance Transfer"}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="flex-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Table size={13} className="text-brand-mint" />
                  <span>{showBreakdown ? "Hide Breakdown" : "View Outflow Comparison"}</span>
                  {showBreakdown ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>

                <button
                  onClick={handleShare}
                  aria-label="Share Calculation"
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 p-2 rounded-xl text-xs border border-white/10 transition-all flex items-center justify-center"
                >
                  {copied ? <Check size={14} className="text-brand-mint" /> : <Share2 size={14} />}
                </button>

                <button
                  onClick={handleSave}
                  aria-label="Save PDF Report"
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 p-2 rounded-xl text-xs border border-white/10 transition-all flex items-center justify-center"
                >
                  <Save size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Breakdown Drawer */}
        {showBreakdown && (
          <div className="border-t border-emerald-500/20 bg-slate-950/80 p-4 sm:p-6 lg:p-8 animate-fade-down">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-brand-mint" />
                  Total Financial Outflow Comparison
                </h4>
                <p className="text-xs text-slate-400">
                  Exact before vs after breakdown for ₹{(outstandingPrincipal / 100000).toFixed(0)} Lakhs over {remainingTenureYears} years
                </p>
              </div>
              <div className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-3 py-1 rounded-full border border-brand-mint/20">
                {hasSavings ? `Net Interest Saved: ₹${totalSavings.toLocaleString('en-IN')}` : "Direct Bank Outflow Comparison"}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Parameter</th>
                    <th className="py-2.5 px-3">Current Loan</th>
                    <th className="py-2.5 px-3 text-emerald-400">Transferred Loan</th>
                    <th className="py-2.5 px-3 text-brand-mint">Your Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Interest Rate</td>
                    <td className="py-2.5 px-3 text-slate-300">{currentInterestRate}% p.a.</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{newInterestRate}% p.a.</td>
                    <td className="py-2.5 px-3 text-brand-mint font-bold">
                      {hasSavings ? `-${rateReduction.toFixed(2)}% drop` : isSame ? "0% diff" : `+${(newInterestRate - currentInterestRate).toFixed(2)}%`}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Monthly EMI</td>
                    <td className="py-2.5 px-3 text-slate-300">₹{Math.round(currentEMI).toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">₹{Math.round(newEMI).toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-brand-mint font-bold">
                      {hasSavings ? `-₹${monthlySavings.toLocaleString('en-IN')}/mo` : isSame ? "₹0" : `+₹${Math.round(newEMI - currentEMI).toLocaleString('en-IN')}/mo`}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Total Interest Payable</td>
                    <td className="py-2.5 px-3 text-slate-300">₹{Math.round(currentTotalInterest).toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">₹{Math.round(newTotalInterest).toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-brand-mint font-bold">
                      {hasSavings ? `-₹${totalSavings.toLocaleString('en-IN')}` : isSame ? "₹0" : `+₹${Math.round(newTotalInterest - currentTotalInterest).toLocaleString('en-IN')}`}
                    </td>
                  </tr>
                  <tr className="bg-emerald-950/20 font-bold">
                    <td className="py-3 px-3 text-white">Total Amount Paid (P + I)</td>
                    <td className="py-3 px-3 text-slate-300">₹{Math.round(currentTotalPayment).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-emerald-400">₹{Math.round(newTotalPayment).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-brand-mint text-base font-extrabold">
                      {hasSavings ? `Save ${formatCompact(totalSavings)}` : isSame ? "Zero Change" : `+${formatCompact(newTotalPayment - currentTotalPayment)}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-mint" />
                Zero penalty on floating balance transfers as per RBI guidelines.
              </span>
              <a
                href="#apply"
                className="text-brand-mint font-bold hover:underline flex items-center gap-1"
              >
                Apply for fast balance transfer sanction <ArrowRight size={12} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
