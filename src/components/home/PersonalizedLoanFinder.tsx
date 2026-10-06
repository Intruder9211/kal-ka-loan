"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, IndianRupee, Calculator, Calendar } from "lucide-react";

export default function PersonalizedLoanFinder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    loanType: "Home Loan",
    amount: "5000000",
    income: "",
    employment: "Salaried",
    existingEmi: "0",
    tenure: "20"
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final step: Redirect to compare page with search params
      const params = new URLSearchParams(formData);
      router.push(`/compare?${params.toString()}`);
    }
  };

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col h-full border border-white/50 bg-white/85 backdrop-blur-xl">
      <div className="bg-brand-deep/90 backdrop-blur-md px-6 py-5 border-b border-white/10">
        <h3 className="text-xl font-bold text-white mb-1">Personalized Loan Finder</h3>
        <p className="text-sm text-brand-mint font-medium">Find your perfect match in 60 seconds</p>
      </div>

      {/* Progress Bar */}
      <div className="flex h-1 bg-gray-100">
        <div 
          className="bg-brand-mint transition-all duration-500" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">What do you need?</h4>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Loan Type</label>
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setDropdownOpen(prev => prev === 'loanType' ? null : 'loanType')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all flex justify-between items-center"
                >
                  <span>{formData.loanType}</span>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform ${dropdownOpen === 'loanType' ? 'rotate-90' : ''}`} />
                </button>
                
                {dropdownOpen === 'loanType' && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {["Home Loan", "Loan Against Property", "Balance Transfer", "Top Up Loan"].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          updateForm("loanType", option);
                          setDropdownOpen(null);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          formData.loanType === option 
                          ? "bg-brand-mint/20 text-brand-deep font-semibold" 
                          : "text-slate-700 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IndianRupee size={18} className="text-gray-400" />
                </div>
                <input 
                  type="number" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all"
                  value={formData.amount}
                  onChange={(e) => updateForm("amount", e.target.value)}
                  placeholder="5000000"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Financial Profile</h4>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Employment Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => updateForm("employment", "Salaried")}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    formData.employment === "Salaried" 
                    ? "bg-brand-mint/10 border-brand-mint text-brand-deep" 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Salaried
                </button>
                <button 
                  type="button"
                  onClick={() => updateForm("employment", "Self-Employed")}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    formData.employment === "Self-Employed" 
                    ? "bg-brand-mint/10 border-brand-mint text-brand-deep" 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Self-Employed
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Net Income (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IndianRupee size={18} className="text-gray-400" />
                </div>
                <input 
                  type="number" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all"
                  value={formData.income}
                  onChange={(e) => updateForm("income", e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Final Details</h4>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Preferred Tenure (Years)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <button 
                  type="button"
                  onClick={() => setDropdownOpen(prev => prev === 'tenure' ? null : 'tenure')}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all flex justify-between items-center"
                >
                  <span>{formData.tenure} Years</span>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform ${dropdownOpen === 'tenure' ? 'rotate-90' : ''}`} />
                </button>
                
                {dropdownOpen === 'tenure' && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 max-h-60 overflow-y-auto">
                    {["10", "15", "20", "25", "30"].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          updateForm("tenure", option);
                          setDropdownOpen(null);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          formData.tenure === option 
                          ? "bg-brand-mint/20 text-brand-deep font-semibold" 
                          : "text-slate-700 hover:bg-gray-50"
                        }`}
                      >
                        {option} Years
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-gray-700">Existing Monthly EMIs (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calculator size={18} className="text-gray-400" />
                </div>
                <input 
                  type="number" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all"
                  value={formData.existingEmi}
                  onChange={(e) => updateForm("existingEmi", e.target.value)}
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-gray-500">Total of all ongoing car, personal, or home loans.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in flex-1 text-center py-6">
            <div className="w-16 h-16 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator size={32} className="text-brand-mint" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Ready to Compare?</h4>
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
              We'll analyze your profile against 30+ lenders to find the most suitable options for you.
            </p>
          </div>
        )}

        <div className="pt-6 mt-auto flex gap-3">
          {step > 1 && (
            <button 
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
            >
              Back
            </button>
          )}
          <button 
            type="button"
            onClick={handleNext}
            disabled={step === 2 && !formData.income}
            className="flex-1 bg-brand-deep text-brand-mint font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-deep/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(15,23,42,0.39)]"
          >
            {step === 4 ? "Show My Matches" : "Continue"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
