"use client";

import { useState } from "react";
import { IndianRupee } from "lucide-react";

// --- Shared UI Components ---
const InputGroup = ({ label, value, onChange, min, max, step, icon: Icon, suffix }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex justify-between">
      {label}
      <span className="text-brand-deep font-bold">
        {Icon === IndianRupee && '₹'} {Number(value).toLocaleString('en-IN')} {suffix}
      </span>
    </label>
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
      />
    </div>
  </div>
);

const ResultCard = ({ title, value, prefix = "₹", suffix = "" }: any) => (
  <div className="bg-brand-deep/5 border border-brand-deep/10 p-4 rounded-xl text-center">
    <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
    <p className="text-2xl font-extrabold text-brand-deep">
      {prefix} {Number(value).toLocaleString('en-IN')} {suffix}
    </p>
  </div>
);

// 1. Eligibility Calculator
export function EligibilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [obligations, setObligations] = useState(10000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // Math: 50% FOIR (Fixed Obligation to Income Ratio)
  const maxEmi = (income * 0.5) - obligations;
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const eligibleLoan = maxEmi > 0 ? (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : 0;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Net Monthly Income" value={income} onChange={setIncome} min={25000} max={500000} step={5000} icon={IndianRupee} />
        <InputGroup label="Existing Monthly EMIs" value={obligations} onChange={setObligations} min={0} max={200000} step={1000} icon={IndianRupee} />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
        <InputGroup label="Tenure" value={tenure} onChange={setTenure} min={5} max={30} step={1} suffix="Yrs" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Eligible Loan Amount" value={Math.round(eligibleLoan)} />
        <ResultCard title="Estimated EMI" value={Math.round(maxEmi > 0 ? maxEmi : 0)} />
      </div>
    </div>
  );
}

// 2. Affordability Calculator
export function AffordabilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const maxEmi = income * 0.5;
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const eligibleLoan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  const maxPropertyCost = eligibleLoan + downPayment;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Net Monthly Income" value={income} onChange={setIncome} min={25000} max={500000} step={5000} icon={IndianRupee} />
        <InputGroup label="Available Down Payment" value={downPayment} onChange={setDownPayment} min={100000} max={10000000} step={100000} icon={IndianRupee} />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Max Property Value Afforded" value={Math.round(maxPropertyCost)} />
        <ResultCard title="Loan Required" value={Math.round(eligibleLoan)} />
      </div>
    </div>
  );
}

// 3. Prepayment Calculator
export function PrepaymentCalculator() {
  const [outstanding, setOutstanding] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [remainingTenure, setRemainingTenure] = useState(15);
  const [prepayment, setPrepayment] = useState(500000);

  const r = rate / 12 / 100;
  const n = remainingTenure * 12;
  const currentEmi = (outstanding * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterestWithout = (currentEmi * n) - outstanding;

  const newPrincipal = outstanding - prepayment;
  const newEmi = (newPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterestWith = (newEmi * n) - newPrincipal;
  const savings = totalInterestWithout - totalInterestWith;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Outstanding Loan" value={outstanding} onChange={setOutstanding} min={500000} max={20000000} step={100000} icon={IndianRupee} />
        <InputGroup label="Remaining Tenure" value={remainingTenure} onChange={setRemainingTenure} min={1} max={30} step={1} suffix="Yrs" />
        <InputGroup label="Prepayment Amount" value={prepayment} onChange={setPrepayment} min={50000} max={5000000} step={50000} icon={IndianRupee} />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Interest Saved" value={Math.round(savings > 0 ? savings : 0)} />
        <ResultCard title="Revised EMI (Same Tenure)" value={Math.round(newEmi)} />
      </div>
    </div>
  );
}

// 4. Balance Transfer Calculator
export function BalanceTransferCalculator() {
  const [outstanding, setOutstanding] = useState(5000000);
  const [currentRate, setCurrentRate] = useState(9.5);
  const [newRate, setNewRate] = useState(8.5);
  const [remainingTenure, setRemainingTenure] = useState(15);

  const n = remainingTenure * 12;
  const r1 = currentRate / 12 / 100;
  const emi1 = (outstanding * r1 * Math.pow(1 + r1, n)) / (Math.pow(1 + r1, n) - 1);
  
  const r2 = newRate / 12 / 100;
  const emi2 = (outstanding * r2 * Math.pow(1 + r2, n)) / (Math.pow(1 + r2, n) - 1);

  const totalSavings = (emi1 - emi2) * n;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Outstanding Loan" value={outstanding} onChange={setOutstanding} min={500000} max={20000000} step={100000} icon={IndianRupee} />
        <InputGroup label="Remaining Tenure" value={remainingTenure} onChange={setRemainingTenure} min={1} max={30} step={1} suffix="Yrs" />
        <InputGroup label="Current Interest Rate" value={currentRate} onChange={setCurrentRate} min={7} max={15} step={0.1} suffix="%" />
        <InputGroup label="New Interest Rate" value={newRate} onChange={setNewRate} min={7} max={12} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Total Savings" value={Math.round(totalSavings > 0 ? totalSavings : 0)} />
        <ResultCard title="New EMI" value={Math.round(emi2)} />
      </div>
    </div>
  );
}

// 5. Tenure Calculator
export function TenureCalculator() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [desiredEmi, setDesiredEmi] = useState(50000);

  const r = rate / 12 / 100;
  // Formula: n = log(EMI / (EMI - P*r)) / log(1 + r)
  let months = 0;
  if (desiredEmi > amount * r) {
    months = Math.log(desiredEmi / (desiredEmi - amount * r)) / Math.log(1 + r);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Loan Amount" value={amount} onChange={setAmount} min={500000} max={20000000} step={100000} icon={IndianRupee} />
        <InputGroup label="Desired Monthly EMI" value={desiredEmi} onChange={setDesiredEmi} min={10000} max={200000} step={1000} icon={IndianRupee} />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Required Tenure" value={months > 0 ? (months / 12).toFixed(1) : "N/A"} prefix="" suffix="Years" />
      </div>
    </div>
  );
}

// 6. Loan Amount Calculator
export function AmountCalculator() {
  const [emi, setEmi] = useState(43391);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const r = rate / 12 / 100;
  const n = tenure * 12;
  const amount = (emi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Monthly EMI You Can Pay" value={emi} onChange={setEmi} min={10000} max={200000} step={1000} icon={IndianRupee} />
        <InputGroup label="Tenure" value={tenure} onChange={setTenure} min={5} max={30} step={1} suffix="Yrs" />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Max Loan Amount" value={Math.round(amount)} />
      </div>
    </div>
  );
}

// 7. Amortization Calculator (Simplified Table View)
export function AmortizationCalculator() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalInterest = (emi * n) - amount;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Loan Amount" value={amount} onChange={setAmount} min={500000} max={20000000} step={100000} icon={IndianRupee} />
        <InputGroup label="Tenure" value={tenure} onChange={setTenure} min={5} max={30} step={1} suffix="Yrs" />
        <InputGroup label="Interest Rate" value={rate} onChange={setRate} min={7} max={15} step={0.1} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Monthly EMI" value={Math.round(emi)} />
        <ResultCard title="Total Interest Payable" value={Math.round(totalInterest)} />
      </div>
    </div>
  );
}

// 8. Down Payment Calculator
export function DownPaymentCalculator() {
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [ltv, setLtv] = useState(80);

  const loanAmount = propertyValue * (ltv / 100);
  const downPayment = propertyValue - loanAmount;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Property Value" value={propertyValue} onChange={setPropertyValue} min={1000000} max={50000000} step={500000} icon={IndianRupee} />
        <InputGroup label="LTV Ratio (Bank Funding %)" value={ltv} onChange={setLtv} min={50} max={90} step={5} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Required Down Payment" value={Math.round(downPayment)} />
        <ResultCard title="Bank Loan Amount" value={Math.round(loanAmount)} />
      </div>
    </div>
  );
}

// 9. Property Cost Calculator
export function PropertyCostCalculator() {
  const [baseCost, setBaseCost] = useState(10000000);
  const [stampDuty, setStampDuty] = useState(5);
  const [registration, setRegistration] = useState(1);
  const [brokerage, setBrokerage] = useState(1);

  const extraCosts = baseCost * ((stampDuty + registration + brokerage) / 100);
  const totalCost = baseCost + extraCosts;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <InputGroup label="Base Property Cost" value={baseCost} onChange={setBaseCost} min={1000000} max={50000000} step={500000} icon={IndianRupee} />
        <InputGroup label="Stamp Duty" value={stampDuty} onChange={setStampDuty} min={1} max={10} step={0.5} suffix="%" />
        <InputGroup label="Registration" value={registration} onChange={setRegistration} min={0.5} max={5} step={0.1} suffix="%" />
        <InputGroup label="Brokerage" value={brokerage} onChange={setBrokerage} min={0} max={3} step={0.5} suffix="%" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center space-y-4">
        <ResultCard title="Total Final Cost" value={Math.round(totalCost)} />
        <ResultCard title="Extra Charges (Taxes/Fees)" value={Math.round(extraCosts)} />
      </div>
    </div>
  );
}
