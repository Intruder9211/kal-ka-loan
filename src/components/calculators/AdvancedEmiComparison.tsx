"use client";

import { useState } from "react";

const BANKS = [
  { name: "SBI", rate: 8.4, type: "PSU", processingFee: 0.35 },
  { name: "HDFC", rate: 8.5, type: "Private", processingFee: 0.5 },
  { name: "ICICI", rate: 8.6, type: "Private", processingFee: 0.5 },
  { name: "Bank of Baroda", rate: 8.4, type: "PSU", processingFee: 0.25 },
  { name: "Axis Bank", rate: 8.7, type: "Private", processingFee: 0.5 },
];

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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-deep mb-2">Unbiased EMI & Eligibility Comparison</h3>
        <p className="text-gray-600">Simulate tenure vs interest impact across multiple banks—no email required.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount: ₹{(loanAmount / 100000).toFixed(2)} Lakhs
          </label>
          <input 
            type="range" min="1000000" max="50000000" step="100000" 
            value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-brand-mint"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenure: {tenureYears} Years
          </label>
          <input 
            type="range" min="5" max="30" step="1" 
            value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-brand-mint"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-bold text-gray-700 rounded-tl-xl">Lender</th>
              <th className="p-4 font-bold text-gray-700">Monthly EMI</th>
              <th className="p-4 font-bold text-gray-700">Total Interest</th>
              <th className="p-4 font-bold text-gray-700">Processing Fee</th>
              <th className="p-4 font-bold text-gray-700 text-brand-deep">Total Repayment</th>
              <th className="p-4 font-bold text-gray-700 rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {BANKS.sort((a, b) => a.rate - b.rate).map((bank, idx) => {
              const emi = calculateEMI(loanAmount, bank.rate, tenureYears);
              const totalInterest = (emi * tenureYears * 12) - loanAmount;
              const processingFeeAmount = loanAmount * (bank.processingFee / 100);
              const totalRepayment = loanAmount + totalInterest + processingFeeAmount;
              
              return (
                <tr key={idx} className="border-b border-gray-100 hover:bg-brand-light/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-brand-deep text-base">{bank.name} <span className="text-xs font-normal text-gray-500">({bank.rate}%)</span></div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
                      {bank.type}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-800">₹{Math.round(emi).toLocaleString('en-IN')}</td>
                  <td className="p-4 text-slate-600">₹{Math.round(totalInterest).toLocaleString('en-IN')}</td>
                  <td className="p-4 text-slate-600">
                    ₹{Math.round(processingFeeAmount).toLocaleString('en-IN')}
                    <div className="text-[10px] text-slate-400">({bank.processingFee}%)</div>
                  </td>
                  <td className="p-4 font-extrabold text-brand-mint text-base">₹{Math.round(totalRepayment).toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <button className="bg-brand-deep text-white text-xs px-4 py-2 rounded-lg hover:bg-brand-mint hover:text-brand-deep transition-colors font-semibold shadow-sm">
                      Apply Now
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
        <p>* Principal Loan Amount: <strong>₹{loanAmount.toLocaleString('en-IN')}</strong></p>
        <p>* Rates are indicative. Final rates depend on your credit score and profile.</p>
      </div>
    </div>
  );
}
