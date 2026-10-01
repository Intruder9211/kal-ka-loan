"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

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
      totalPayment: Math.round(totalPaymentValue)
    };
  }, [principal, rate, tenureYears]);

  const chartData = [
    { name: "Principal", value: principal, color: "#75e87a" }, // brand-mint
    { name: "Total Interest", value: totalInterest, color: "#1a3b32" } // brand-deep
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
      {/* Controls */}
      <div className="p-8 lg:w-1/2 space-y-8 bg-gray-50/50">
        <h2 className="text-2xl font-bold text-brand-deep">EMI Calculator</h2>
        
        {/* Principal Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-medium text-sm text-gray-700">Loan Amount</label>
            <span className="text-xl font-bold text-brand-deep bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">
              {formatCurrency(principal)}
            </span>
          </div>
          <input 
            type="range" 
            min={100000} 
            max={100000000} 
            step={100000} 
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>₹1 L</span>
            <span>₹10 Cr</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-medium text-sm text-gray-700">Interest Rate (p.a.)</label>
            <span className="text-xl font-bold text-brand-deep bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">
              {rate}%
            </span>
          </div>
          <input 
            type="range" 
            min={5} 
            max={20} 
            step={0.1} 
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-medium text-sm text-gray-700">Loan Tenure</label>
            <span className="text-xl font-bold text-brand-deep bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">
              {tenureYears} Years
            </span>
          </div>
          <input 
            type="range" 
            min={1} 
            max={30} 
            step={1} 
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 Yr</span>
            <span>30 Yrs</span>
          </div>
        </div>
      </div>

      {/* Results & Chart */}
      <div className="p-8 lg:w-1/2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
        <div className="text-center mb-8">
          <p className="text-gray-500 font-medium mb-1">Your Monthly EMI</p>
          <div className="text-5xl font-black text-brand-deep tracking-tight">
            {formatCurrency(emi)}
          </div>
        </div>
        
        <div className="h-64 w-full relative -mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Total Principal</p>
            <p className="font-bold text-gray-800 text-lg">{formatCurrency(principal)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Total Interest</p>
            <p className="font-bold text-gray-800 text-lg">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="col-span-2 pt-2">
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Total Amount Payable</p>
            <p className="font-bold text-brand-deep text-xl">{formatCurrency(totalPayment)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
