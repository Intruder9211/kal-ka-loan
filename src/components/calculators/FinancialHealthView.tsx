"use client";

import { useState } from "react";
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

// Helper for Input with Touch-Scroll Protection on Mobile & Tablet
const InputSlider = ({ label, value, setter, min, max, step, prefix = "₹", suffix = "" }: any) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [textValue, setTextValue] = useState<string | null>(null);

  // Keep display string in sync when value changes from outside (e.g. slider)
  const isPercent = suffix.includes("%");
  const displayValue = textValue !== null 
    ? textValue 
    : (value !== undefined ? (prefix === "₹" ? Number(value).toLocaleString('en-IN') : String(value)) : '');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="font-medium text-sm text-slate-700">{label}</label>
        <div className="relative flex items-center">
          {prefix && <span className="absolute left-3 font-medium text-gray-500">{prefix}</span>}
          <input 
            type="text" 
            suppressHydrationWarning
            value={displayValue}
            onFocus={() => {
              if (value !== undefined) {
                setTextValue(String(value));
              }
            }}
            onBlur={() => {
              setTextValue(null);
            }}
            onChange={(e) => {
              const raw = e.target.value;
              setTextValue(raw);
              const cleaned = raw.replace(/,/g, '');
              if (cleaned === '' || cleaned === '.') return;
              const val = Number(cleaned);
              if (!isNaN(val)) setter(val);
            }}
            className={`text-xl font-bold text-brand-deep bg-white ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} py-1.5 rounded-md shadow-sm border border-gray-200 w-36 text-right focus:outline-none focus:ring-2 focus:ring-brand-mint transition-all`}
          />
          {suffix && <span className="absolute right-3 font-medium text-gray-500">{suffix}</span>}
        </div>
      </div>
      <div className="relative py-1">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          onChange={(e) => {
            setTextValue(null);
            setter(Number(e.target.value));
          }} 
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint touch-pan-y" 
        />
      </div>
    </div>
  );
};

export default function FinancialHealthView() {
  // Inputs
  const [income, setIncome] = useState(120000);
  const [existingEmis, setExistingEmis] = useState(15000);
  const [expenses, setExpenses] = useState(40000);
  const [interestRate, setInterestRate] = useState(8.5); // Expected ROI (%)
  const [desiredLoan, setDesiredLoan] = useState(4000000);
  const [tenure, setTenure] = useState(20);

  // Math
  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  
  // What they want
  const desiredEmi = (desiredLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalDesiredCommitment = desiredEmi + existingEmis + expenses;
  const leftoverCash = income - totalDesiredCommitment;

  // Affordability Ranges (Max EMI based on updated FOIR thresholds: 70% Comfortable, 80% Stretched, 85% Absolute Limit)
  const comfortableEmi = (income * 0.70) - existingEmis; // 70% FOIR
  const stretchedEmi = (income * 0.80) - existingEmis;   // 80% FOIR
  const maxEmi = (income * 0.85) - existingEmis;         // 85%+ FOIR (Absolute Limit)

  const calcLoanFromEmi = (emiAmt: number) => {
    if (emiAmt <= 0) return 0;
    return (emiAmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  };

  const comfortableLoan = calcLoanFromEmi(comfortableEmi);
  const stretchedLoan = calcLoanFromEmi(stretchedEmi);
  const maxLoan = calcLoanFromEmi(maxEmi);

  // Health Status (Strictly following user FOIR bands: <= 70% Comfortable, > 70% & <= 80% Stretched, > 80% Critical)
  let healthStatus = "Comfortable";
  let healthColor = "text-emerald-600";
  let healthBg = "bg-emerald-50/70";
  let healthBorder = "border-emerald-200";
  let HealthIcon = CheckCircle2;
  
  const totalDebtEmi = desiredEmi + existingEmis;
  // Calculate exact integer/rounded FOIR to perfectly match the displayed meter percentage
  const foirPercent = Math.round((totalDebtEmi / income) * 100);

  if (foirPercent > 80) {
    healthStatus = "Critical";
    healthColor = "text-rose-600";
    healthBg = "bg-rose-50/70";
    healthBorder = "border-rose-200";
    HealthIcon = AlertTriangle;
  } else if (foirPercent > 70) {
    healthStatus = "Stretched";
    healthColor = "text-amber-600";
    healthBg = "bg-amber-50/70";
    healthBorder = "border-amber-200";
    HealthIcon = TrendingUp;
  } else {
    healthStatus = "Comfortable";
    healthColor = "text-emerald-600";
    healthBg = "bg-emerald-50/70";
    healthBorder = "border-emerald-200";
    HealthIcon = CheckCircle2;
  }


  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Col: Inputs */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-3">Financial Profile</h3>
        
        <InputSlider label="Net Monthly Income" value={income} setter={setIncome} min={30000} max={1000000} step={5000} />
        <InputSlider label="Existing EMIs" value={existingEmis} setter={setExistingEmis} min={0} max={500000} step={1000} />
        <InputSlider label="Monthly Expenses" value={expenses} setter={setExpenses} min={10000} max={500000} step={5000} />
        
        <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-3 mt-8">Loan Requirement</h3>
        <InputSlider label="Desired Loan Amount" value={desiredLoan} setter={setDesiredLoan} min={1000000} max={50000000} step={100000} />
        <InputSlider label="Expected Rate of Interest (ROI)" value={interestRate} setter={setInterestRate} min={6.5} max={16} step={0.05} prefix="" suffix="%" />
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-medium text-sm text-slate-700">Preferred Tenure (Years)</label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="text-xl font-bold text-brand-deep bg-white pl-3 pr-14 py-1.5 rounded-md shadow-sm border border-gray-200 w-32 text-right focus:outline-none focus:ring-2 focus:ring-brand-mint transition-all"
              />
              <span className="absolute right-3 font-medium text-gray-500">Yrs</span>
            </div>
          </div>
          <input type="range" min={5} max={30} step={1} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint" />
        </div>
      </div>

      {/* Right Col: Affordability Dashboard */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Status Card with Animated Glow, Expressive Face Avatar, and Gauge */}
        <div className={`p-6 sm:p-7 rounded-3xl border ${healthBorder} ${healthBg} shadow-sm relative overflow-hidden transition-all duration-500`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              
              {/* Expressive Animated Avatar Character (Realistic 3D Depth) */}
              <div className="relative shrink-0">
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-500 overflow-hidden ${
                    healthStatus === "Comfortable" 
                      ? "bg-gradient-to-b from-amber-50 via-emerald-100 to-emerald-200 border-emerald-400 shadow-emerald-500/25" 
                      : healthStatus === "Stretched"
                      ? "bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 border-amber-400 shadow-amber-500/25"
                      : "bg-gradient-to-b from-rose-50 via-rose-100 to-rose-200 border-rose-400 shadow-rose-500/25"
                  }`}
                >
                  {/* Comfortable: Realistic Joyful Smiling Face with 3D Depth, Catchlights & Soft Blushes */}
                  {healthStatus === "Comfortable" && (
                    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 animate-pulse-subtle">
                      <defs>
                        <radialGradient id="comfySkin" cx="40%" cy="35%" r="60%">
                          <stop offset="0%" stopColor="#fff8ed" />
                          <stop offset="60%" stopColor="#ffdfba" />
                          <stop offset="100%" stopColor="#f5b977" />
                        </radialGradient>
                        <linearGradient id="smileGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#881337" />
                          <stop offset="100%" stopColor="#4c0519" />
                        </linearGradient>
                      </defs>

                      {/* Head Base with 3D shading */}
                      <circle cx="50" cy="50" r="44" fill="url(#comfySkin)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />

                      {/* Soft Cheerful Blush */}
                      <ellipse cx="24" cy="56" rx="8" ry="4.5" fill="#f43f5e" opacity="0.25" />
                      <ellipse cx="76" cy="56" rx="8" ry="4.5" fill="#f43f5e" opacity="0.25" />

                      {/* Eyebrows */}
                      <path d="M24 35 Q34 29 44 33" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M56 33 Q66 29 76 35" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />

                      {/* Expressive Eyes with Sparkle & Eyelashes */}
                      <g>
                        <ellipse cx="34" cy="44" rx="6.5" ry="7.5" fill="#1e293b" />
                        <circle cx="32" cy="41" r="2.8" fill="#ffffff" />
                        <circle cx="36.5" cy="46" r="1.2" fill="#ffffff" />
                      </g>
                      <g>
                        <ellipse cx="66" cy="44" rx="6.5" ry="7.5" fill="#1e293b" />
                        <circle cx="64" cy="41" r="2.8" fill="#ffffff" />
                        <circle cx="68.5" cy="46" r="1.2" fill="#ffffff" />
                      </g>

                      {/* Cute Nose */}
                      <path d="M48 50 Q50 53 52 50" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

                      {/* Big Realistic Warm Smile */}
                      <path d="M28 58 Q50 86 72 58 Q50 63 28 58 Z" fill="url(#smileGrad)" stroke="#4c0519" strokeWidth="1.5" />
                      
                      {/* Upper White Teeth */}
                      <path d="M33 59 Q50 64 67 59 Q50 68 33 59 Z" fill="#ffffff" />
                      
                      {/* Tongue */}
                      <path d="M40 73 Q50 84 60 73 Q50 71 40 73 Z" fill="#fb7185" />
                    </svg>
                  )}

                  {/* Stretched: Realistic Thinking / Pondering / Nervous Face */}
                  {healthStatus === "Stretched" && (
                    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16">
                      <defs>
                        <radialGradient id="stretchSkin" cx="40%" cy="35%" r="60%">
                          <stop offset="0%" stopColor="#fffbeb" />
                          <stop offset="60%" stopColor="#fef08a" />
                          <stop offset="100%" stopColor="#fde047" />
                        </radialGradient>
                        <linearGradient id="sweatGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                      </defs>

                      {/* Head Base */}
                      <circle cx="50" cy="50" r="44" fill="url(#stretchSkin)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />

                      {/* Puzzled / Concerned Eyebrows (One cocked higher, one furrowed) */}
                      <path d="M24 35 Q34 32 44 38" stroke="#854d0e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      <path d="M56 31 Q66 26 76 30" stroke="#854d0e" strokeWidth="3.5" fill="none" strokeLinecap="round" />

                      {/* Realistic Looking-Away / Thinking Eyes */}
                      <g>
                        <ellipse cx="35" cy="45" rx="7" ry="7.5" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
                        <circle cx="37.5" cy="44" r="4.2" fill="#1e293b" />
                        <circle cx="36" cy="42" r="1.6" fill="#ffffff" />
                      </g>
                      <g>
                        <ellipse cx="65" cy="45" rx="7" ry="7.5" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
                        <circle cx="67.5" cy="44" r="4.2" fill="#1e293b" />
                        <circle cx="66" cy="42" r="1.6" fill="#ffffff" />
                      </g>

                      {/* Soft Nose */}
                      <path d="M49 51 Q50 54 52 51" stroke="#ca8a04" strokeWidth="2" fill="none" strokeLinecap="round" />

                      {/* Animated 3D Sweat Drop */}
                      <g className="animate-bounce" style={{ animationDuration: '1.8s' }}>
                        <path d="M76 22 C76 18 80 13 80 13 C80 13 84 18 84 22 C84 24.5 82.2 26.5 80 26.5 C77.8 26.5 76 24.5 76 22 Z" fill="url(#sweatGrad)" />
                        <ellipse cx="79" cy="22" rx="1" ry="2" fill="#ffffff" opacity="0.7" />
                      </g>

                      {/* Wavy / Nervous Uncertain Mouth */}
                      <path d="M34 66 C40 61, 46 72, 54 64 C60 58, 66 69, 70 63" stroke="#713f12" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}

                  {/* Critical: Realistic Stressed / Anxious / Crying Face */}
                  {healthStatus === "Critical" && (
                    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16">
                      <defs>
                        <radialGradient id="critSkin" cx="40%" cy="35%" r="60%">
                          <stop offset="0%" stopColor="#fff1f2" />
                          <stop offset="60%" stopColor="#fecdd3" />
                          <stop offset="100%" stopColor="#fda4af" />
                        </radialGradient>
                        <linearGradient id="tearGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>

                      {/* Head Base with flushed red tint */}
                      <circle cx="50" cy="50" r="44" fill="url(#critSkin)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />

                      {/* Anguished Forehead Wrinkles */}
                      <path d="M43 27 Q50 24 57 27" stroke="#9f1239" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                      <path d="M45 31 Q50 28 55 31" stroke="#9f1239" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />

                      {/* Slanted Stressed Eyebrows */}
                      <path d="M23 37 Q33 44 43 42" stroke="#9f1239" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                      <path d="M77 37 Q67 44 57 42" stroke="#9f1239" strokeWidth="4.5" fill="none" strokeLinecap="round" />

                      {/* Tightly Squeezed Crying Eyes (> <) with Eyelashes */}
                      <path d="M26 48 L35 44 L26 40" stroke="#881337" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M74 48 L65 44 L74 40" stroke="#881337" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Realistic Flowing Tear Waterfalls */}
                      <path d="M32 50 C30 60 26 75 26 82 C26 86 29 88 32 88 C35 88 38 86 38 82 C38 75 34 60 32 50 Z" fill="url(#tearGrad)" opacity="0.85" className="animate-pulse" />
                      <ellipse cx="32" cy="82" rx="2" ry="4" fill="#ffffff" opacity="0.8" />
                      
                      <path d="M68 50 C70 60 74 75 74 82 C74 86 71 88 68 88 C65 88 62 86 62 82 C62 75 66 60 68 50 Z" fill="url(#tearGrad)" opacity="0.85" className="animate-pulse" />
                      <ellipse cx="68" cy="82" rx="2" ry="4" fill="#ffffff" opacity="0.8" />

                      {/* Open Distressed Trembling Mouth */}
                      <path d="M36 68 Q50 56 64 68 Q50 82 36 68 Z" fill="#881337" stroke="#4c0519" strokeWidth="2" />
                      <ellipse cx="50" cy="73" rx="7" ry="4" fill="#fb7185" />
                    </svg>
                  )}
                </div>

                {/* Status Dot */}
                <span 
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white shadow-xs" 
                  style={{ backgroundColor: healthStatus === 'Comfortable' ? '#10b981' : healthStatus === 'Stretched' ? '#f59e0b' : '#ef4444' }}
                ></span>
              </div>

              {/* Text Status */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Loan Health Verdict</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-black ${healthColor} tracking-tight`}>
                  {healthStatus}
                </h2>
                <p className="text-xs sm:text-sm font-medium mt-1 text-slate-700 max-w-sm leading-relaxed">
                  {healthStatus === "Comfortable" && "Your desired loan amount fits perfectly within your budget. High bank approval rate with prime ROI."}
                  {healthStatus === "Stretched" && "High approval chance, but monthly budget will be tighter. Consider extending tenure or adjusting down payment."}
                  {healthStatus === "Critical" && "This loan amount exceeds standard FOIR guidelines. Lenders may reject or demand higher co-borrower income."}
                </p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-xs text-left sm:text-right shrink-0">
              <p className="text-xs font-semibold text-slate-500 mb-0.5">Estimated Monthly EMI</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ₹{Math.round(desiredEmi).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">at {interestRate}% for {tenure} Yrs</p>
            </div>
          </div>

          {/* Interactive Affordability Gauge Needle */}
          <div className="mt-6 pt-5 border-t border-slate-200/60 relative z-10">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-emerald-700 flex items-center gap-1">● Comfortable (Up to 70% FOIR)</span>
              <span className="text-amber-700 flex items-center gap-1">● Stretched (70% - 80%)</span>
              <span className="text-rose-700 flex items-center gap-1">● Critical (&gt; 80%)</span>
            </div>
            
            <div className="h-3 w-full bg-slate-200 rounded-full relative overflow-hidden flex">
              <div className="w-[70%] bg-emerald-400 h-full"></div>
              <div className="w-[10%] bg-amber-400 h-full"></div>
              <div className="w-[20%] bg-rose-400 h-full"></div>
            </div>
            
            {/* Position Pointer based on actual FOIR */}
            <div 
              className="relative transition-all duration-500 ease-out flex flex-col items-center -mt-1"
              style={{ 
                left: `${Math.min(96, Math.max(4, ((desiredEmi + existingEmis) / income) * 100))}%`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-900"></div>
              <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-full shadow-md whitespace-nowrap mt-0.5">
                Your Loan: {Math.round(((desiredEmi + existingEmis) / income) * 100)}% FOIR
              </span>
            </div>
          </div>
        </div>

        {/* Affordability Spectrum with Active Zone Highlight */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Your Affordability Range</h3>
              <p className="text-xs text-slate-500 mt-0.5">Calculated in real-time across institutional lending limits</p>
            </div>
            <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-3 py-1 rounded-full border border-brand-mint/20">
              Live FOIR Analysis
            </span>
          </div>
          
          <div className="space-y-4">
            {/* 1. Comfortable */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-5 ${
              healthStatus === "Comfortable" 
                ? "border-emerald-400 bg-emerald-50/80 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-400/30 scale-[1.01]" 
                : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 opacity-90"
            }`}>
              {healthStatus === "Comfortable" && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-xs">
                  Active Zone
                </div>
              )}
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h4 className="font-bold text-emerald-950 text-base">Comfortable Zone</h4>
                  </div>
                  <p className="text-xs text-emerald-700 font-medium mt-1">Safe repayment buffer (Up to 70% FOIR)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight">
                    ₹{Math.round(comfortableLoan).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-0.5">Up to ₹{Math.round(comfortableEmi).toLocaleString('en-IN')}/mo EMI</p>
                </div>
              </div>
            </div>

            {/* 2. Stretched */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-5 ${
              healthStatus === "Stretched" 
                ? "border-amber-400 bg-amber-50/80 shadow-md shadow-amber-500/10 ring-2 ring-amber-400/30 scale-[1.01]" 
                : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 opacity-90"
            }`}>
              {healthStatus === "Stretched" && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-xs">
                  Active Zone
                </div>
              )}
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h4 className="font-bold text-amber-950 text-base">Stretched Zone</h4>
                  </div>
                  <p className="text-xs text-amber-700 font-medium mt-1">High approval chance, tighter budget (70% - 80% FOIR)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-black text-amber-800 tracking-tight">
                    ₹{Math.round(stretchedLoan).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-amber-600 font-semibold mt-0.5">Up to ₹{Math.round(stretchedEmi).toLocaleString('en-IN')}/mo EMI</p>
                </div>
              </div>
            </div>

            {/* 3. Max Limit */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-5 ${
              healthStatus === "Critical" 
                ? "border-rose-400 bg-rose-50/80 shadow-md shadow-rose-500/10 ring-2 ring-rose-400/30 scale-[1.01]" 
                : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 opacity-90"
            }`}>
              {healthStatus === "Critical" && (
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-xs">
                  Active Zone
                </div>
              )}
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <h4 className="font-bold text-rose-950 text-base">Critical Zone (Absolute Limit)</h4>
                  </div>
                  <p className="text-xs text-rose-700 font-medium mt-1">Exceeds standard limits (&gt; 80% FOIR) - requires co-borrower</p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-black text-rose-800 tracking-tight">
                    ₹{Math.round(maxLoan).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-rose-600 font-semibold mt-0.5">Max ₹{Math.round(maxEmi).toLocaleString('en-IN')}/mo EMI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Cashflow Breakdown with Fluid Percentages */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Post-Loan Monthly Cashflow</h3>
              <p className="text-xs text-slate-500 mt-0.5">Visual breakdown of where your monthly income goes</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Income: </span>
              <span className="text-xs font-bold text-slate-900">₹{income.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          {/* Animated Multi-segment Bar */}
          <div className="flex h-9 w-full rounded-2xl overflow-hidden p-1 bg-slate-100 border border-slate-200/80 gap-1 transition-all">
            <div 
              className="bg-slate-400 rounded-xl transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs overflow-hidden" 
              style={{ width: `${Math.min(100, (existingEmis / income) * 100)}%` }}
              title={`Existing EMIs: ₹${existingEmis.toLocaleString('en-IN')}`}
            >
              {(existingEmis / income) > 0.08 && `${Math.round((existingEmis / income) * 100)}%`}
            </div>
            <div 
              className="bg-amber-400 rounded-xl transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-amber-950 shadow-xs overflow-hidden" 
              style={{ width: `${Math.min(100, (expenses / income) * 100)}%` }}
              title={`Expenses: ₹${expenses.toLocaleString('en-IN')}`}
            >
              {(expenses / income) > 0.08 && `${Math.round((expenses / income) * 100)}%`}
            </div>
            <div 
              className="bg-emerald-500 rounded-xl transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs overflow-hidden" 
              style={{ width: `${Math.min(100, (desiredEmi / income) * 100)}%` }}
              title={`New EMI: ₹${Math.round(desiredEmi).toLocaleString('en-IN')}`}
            >
              {(desiredEmi / income) > 0.08 && `${Math.round((desiredEmi / income) * 100)}%`}
            </div>
            {leftoverCash > 0 && (
              <div 
                className="bg-brand-mint/40 rounded-xl transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-emerald-900 shadow-xs overflow-hidden" 
                style={{ width: `${Math.min(100, (leftoverCash / income) * 100)}%` }}
                title={`Leftover Surplus: ₹${Math.round(leftoverCash).toLocaleString('en-IN')}`}
              >
                {(leftoverCash / income) > 0.08 && `${Math.round((leftoverCash / income) * 100)}%`}
              </div>
            )}
          </div>
          
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-3.5 h-3.5 rounded-md bg-slate-400 shrink-0"></div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Existing EMIs</p>
                <p className="font-bold text-slate-800">₹{existingEmis.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-3.5 h-3.5 rounded-md bg-amber-400 shrink-0"></div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Monthly Living</p>
                <p className="font-bold text-slate-800">₹{expenses.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-3.5 h-3.5 rounded-md bg-emerald-500 shrink-0"></div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">New Loan EMI</p>
                <p className="font-bold text-slate-800">₹{Math.round(desiredEmi).toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-3.5 h-3.5 rounded-md bg-brand-mint/40 border border-emerald-300 shrink-0"></div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Leftover Savings</p>
                <p className={`font-bold ${leftoverCash < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  ₹{Math.round(leftoverCash).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
