"use client";

import { useState } from "react";
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export default function FinancialHealthView() {
  // Inputs
  const [income, setIncome] = useState(120000);
  const [existingEmis, setExistingEmis] = useState(15000);
  const [expenses, setExpenses] = useState(40000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [desiredLoan, setDesiredLoan] = useState(4000000);
  const [tenure, setTenure] = useState(20);
  const interestRate = 8.5; // Standard market rate assumption

  // Math
  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  
  // What they want
  const desiredEmi = (desiredLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalDesiredCommitment = desiredEmi + existingEmis + expenses;
  const leftoverCash = income - totalDesiredCommitment;

  // Affordability Ranges (Max EMI based on different FOIR thresholds)
  const comfortableEmi = (income * 0.40) - existingEmis; // 40% FOIR
  const stretchedEmi = (income * 0.55) - existingEmis;   // 55% FOIR
  const maxEmi = (income * 0.65) - existingEmis;         // 65% FOIR (Absolute Limit)

  const calcLoanFromEmi = (emiAmt: number) => {
    if (emiAmt <= 0) return 0;
    return (emiAmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  };

  const comfortableLoan = calcLoanFromEmi(comfortableEmi);
  const stretchedLoan = calcLoanFromEmi(stretchedEmi);
  const maxLoan = calcLoanFromEmi(maxEmi);

  // Health Status
  let healthStatus = "Excellent";
  let healthColor = "text-green-600";
  let healthBg = "bg-green-50";
  let healthBorder = "border-green-200";
  let HealthIcon = ShieldCheck;
  
  if (leftoverCash < income * 0.1) {
    healthStatus = "Critical";
    healthColor = "text-red-600";
    healthBg = "bg-red-50";
    healthBorder = "border-red-200";
    HealthIcon = AlertTriangle;
  } else if (desiredEmi > stretchedEmi) {
    healthStatus = "Stretched";
    healthColor = "text-amber-600";
    healthBg = "bg-amber-50";
    healthBorder = "border-amber-200";
    HealthIcon = TrendingUp;
  } else if (desiredEmi <= comfortableEmi) {
    healthStatus = "Comfortable";
    healthColor = "text-brand-mint";
    healthBg = "bg-brand-mint/10";
    healthBorder = "border-brand-mint/30";
    HealthIcon = CheckCircle2;
  }

  // Helper for Input
  const InputSlider = ({ label, value, setter, min, max, step }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-900">₹{value.toLocaleString('en-IN')}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full accent-brand-mint" />
    </div>
  );

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Col: Inputs */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-3">Financial Profile</h3>
        
        <InputSlider label="Net Monthly Income" value={income} setter={setIncome} min={30000} max={1000000} step={5000} />
        <InputSlider label="Existing EMIs" value={existingEmis} setter={setExistingEmis} min={0} max={500000} step={1000} />
        <InputSlider label="Monthly Expenses" value={expenses} setter={setExpenses} min={10000} max={500000} step={5000} />
        
        <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-3 mt-8">Loan Requirement</h3>
        <InputSlider label="Down Payment Available" value={downPayment} setter={setDownPayment} min={100000} max={20000000} step={100000} />
        <InputSlider label="Desired Loan Amount" value={desiredLoan} setter={setDesiredLoan} min={1000000} max={50000000} step={100000} />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700">Preferred Tenure (Years)</span>
            <span className="font-bold text-slate-900">{tenure} Years</span>
          </div>
          <input type="range" min={5} max={30} step={1} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-brand-mint" />
        </div>
      </div>

      {/* Right Col: Affordability Dashboard */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Status Card */}
        <div className={`p-6 rounded-2xl border ${healthBorder} ${healthBg} flex items-center justify-between`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-70">Application Status</p>
            <h2 className={`text-3xl font-extrabold ${healthColor} flex items-center gap-2`}>
              <HealthIcon size={28} strokeWidth={3} /> {healthStatus}
            </h2>
            <p className="text-sm mt-2 text-slate-700">
              {healthStatus === "Comfortable" && "Your desired loan amount fits perfectly within your budget."}
              {healthStatus === "Stretched" && "You can get this loan, but it leaves less room for emergencies."}
              {healthStatus === "Critical" && "This loan amount is too risky based on your current expenses and EMIs."}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-500 mb-1">Estimated EMI for Desired Loan</p>
            <p className="text-2xl font-bold text-slate-900">₹{Math.round(desiredEmi).toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Affordability Spectrum */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Your Affordability Range</h3>
          
          <div className="space-y-4">
            {/* Comfortable */}
            <div className="relative overflow-hidden rounded-xl border border-green-100 bg-green-50/50 p-4">
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h4 className="font-bold text-green-800">Comfortable Zone</h4>
                  <p className="text-xs text-green-600 font-medium mt-0.5">Recommended (Leaves 60% for expenses)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-700">₹{Math.round(comfortableLoan).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-green-600 mt-0.5">Up to ₹{Math.round(comfortableEmi).toLocaleString('en-IN')}/mo</p>
                </div>
              </div>
            </div>

            {/* Stretched */}
            <div className="relative overflow-hidden rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h4 className="font-bold text-amber-800">Stretched Zone</h4>
                  <p className="text-xs text-amber-600 font-medium mt-0.5">High approval chance, tighter budget</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-amber-700">₹{Math.round(stretchedLoan).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-amber-600 mt-0.5">Up to ₹{Math.round(stretchedEmi).toLocaleString('en-IN')}/mo</p>
                </div>
              </div>
            </div>

            {/* Max Limit */}
            <div className="relative overflow-hidden rounded-xl border border-red-100 bg-red-50/50 p-4">
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h4 className="font-bold text-red-800">Absolute Limit</h4>
                  <p className="text-xs text-red-600 font-medium mt-0.5">Requires bank exception (65% FOIR)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-700">₹{Math.round(maxLoan).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-red-600 mt-0.5">Max ₹{Math.round(maxEmi).toLocaleString('en-IN')}/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cashflow Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Post-Loan Monthly Cashflow</h3>
          
          <div className="flex h-8 w-full rounded-full overflow-hidden">
            <div className="bg-slate-300" style={{ width: `${(existingEmis / income) * 100}%` }}></div>
            <div className="bg-amber-300" style={{ width: `${(expenses / income) * 100}%` }}></div>
            <div className="bg-brand-mint" style={{ width: `${(desiredEmi / income) * 100}%` }}></div>
            <div className="bg-green-100" style={{ width: `${(Math.max(0, leftoverCash) / income) * 100}%` }}></div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-300"></div> Existing EMIs</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-300"></div> Expenses</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-brand-mint"></div> New EMI</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div> Leftover</div>
          </div>
        </div>

      </div>
    </div>
  );
}
