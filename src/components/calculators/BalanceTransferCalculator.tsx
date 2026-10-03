"use client";

import { useState } from "react";

export default function BalanceTransferCalculator() {
  const [outstandingPrincipal, setOutstandingPrincipal] = useState(5000000);
  const [currentInterestRate, setCurrentInterestRate] = useState(9.5);
  const [newInterestRate, setNewInterestRate] = useState(8.5);
  const [remainingTenureYears, setRemainingTenureYears] = useState(15);

  // Math for EMI
  const calculateEMI = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const currentEMI = calculateEMI(outstandingPrincipal, currentInterestRate, remainingTenureYears);
  const newEMI = calculateEMI(outstandingPrincipal, newInterestRate, remainingTenureYears);
  
  const currentTotalInterest = (currentEMI * remainingTenureYears * 12) - outstandingPrincipal;
  const newTotalInterest = (newEMI * remainingTenureYears * 12) - outstandingPrincipal;

  const monthlySavings = currentEMI - newEMI;
  const totalSavings = currentTotalInterest - newTotalInterest;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-brand-deep mb-6 text-center">Balance Transfer Savings Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outstanding Loan Amount: ₹{(outstandingPrincipal / 100000).toFixed(2)} Lakhs
            </label>
            <input 
              type="range" 
              min="500000" 
              max="20000000" 
              step="100000" 
              value={outstandingPrincipal} 
              onChange={(e) => setOutstandingPrincipal(Number(e.target.value))}
              className="w-full accent-brand-mint"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remaining Tenure: {remainingTenureYears} Years
            </label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              step="1" 
              value={remainingTenureYears} 
              onChange={(e) => setRemainingTenureYears(Number(e.target.value))}
              className="w-full accent-brand-mint"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Interest Rate: {currentInterestRate}%
            </label>
            <input 
              type="range" 
              min="7" 
              max="15" 
              step="0.1" 
              value={currentInterestRate} 
              onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
              className="w-full accent-brand-mint"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Interest Rate: {newInterestRate}%
            </label>
            <input 
              type="range" 
              min="7" 
              max="15" 
              step="0.1" 
              value={newInterestRate} 
              onChange={(e) => setNewInterestRate(Number(e.target.value))}
              className="w-full accent-brand-mint"
            />
          </div>
        </div>

        <div className="bg-brand-light rounded-xl p-6 flex flex-col justify-center space-y-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Monthly EMI Savings</p>
            <p className="text-3xl font-bold text-brand-mint">₹{Math.round(monthlySavings).toLocaleString('en-IN')}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Total Interest Savings</p>
            <p className="text-4xl font-extrabold text-brand-deep">₹{Math.round(totalSavings).toLocaleString('en-IN')}</p>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Current EMI</p>
              <p className="font-bold text-gray-800">₹{Math.round(currentEMI).toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">New EMI</p>
              <p className="font-bold text-brand-mint">₹{Math.round(newEMI).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
