"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Calendar, Save, Share2 } from "lucide-react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleType, setScheduleType] = useState<"yearly" | "monthly">("yearly");
  const [saved, setSaved] = useState(false);

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

  const schedule = useMemo(() => {
    if (principal === 0 || rate === 0 || tenureYears === 0) return [];
    
    let bal = principal;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;
    const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const result = [];
    let periodInterest = 0;
    let periodPrincipal = 0;
    
    for (let i = 1; i <= n; i++) {
      const intComp = bal * r;
      const prinComp = emiValue - intComp;
      bal -= prinComp;
      
      if (scheduleType === "monthly") {
        result.push({
          period: i,
          principal: Math.round(prinComp),
          interest: Math.round(intComp),
          balance: Math.max(0, Math.round(bal))
        });
      } else {
        periodInterest += intComp;
        periodPrincipal += prinComp;
        
        if (i % 12 === 0 || i === n) {
          result.push({
            period: Math.ceil(i / 12),
            principal: Math.round(periodPrincipal),
            interest: Math.round(periodInterest),
            balance: Math.max(0, Math.round(bal))
          });
          periodInterest = 0;
          periodPrincipal = 0;
        }
      }
    }
    
    return result;
  }, [principal, rate, tenureYears, scheduleType]);

  const handleSave = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to save the PDF.");
      return;
    }
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>EMI Schedule - Money Viora</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #079974; padding-bottom: 20px; }
            .header h1 { color: #0f2820; margin: 0 0 10px 0; }
            .summary { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .summary-item { margin: 10px 20px; }
            .summary-item strong { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .summary-item span { font-size: 20px; font-weight: bold; color: #0f2820; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 12px 16px; text-align: right; }
            th { background-color: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
            th:first-child, td:first-child { text-align: left; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; }
            @media print {
              body { padding: 0; }
              .summary { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Money Viora</h1>
            <p>Home Loan Amortization Schedule</p>
          </div>
          
          <div class="summary">
            <div class="summary-item"><strong>Loan Amount</strong><span>₹${principal.toLocaleString('en-IN')}</span></div>
            <div class="summary-item"><strong>Interest Rate</strong><span>${rate}% p.a.</span></div>
            <div class="summary-item"><strong>Tenure</strong><span>${tenureYears} Years</span></div>
            <div class="summary-item"><strong>Monthly EMI</strong><span style="color: #079974;">₹${emi.toLocaleString('en-IN')}</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>${scheduleType === 'monthly' ? 'Month' : 'Year'}</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              ${schedule.map(row => `
                <tr>
                  <td>${scheduleType === 'monthly' ? 'Month ' : 'Year '}${row.period}</td>
                  <td>₹${row.principal.toLocaleString('en-IN')}</td>
                  <td>₹${row.interest.toLocaleString('en-IN')}</td>
                  <td style="font-weight: bold; color: #0f2820;">₹${row.balance.toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            Generated by Money Viora Calculator &bull; Not a final bank offer
          </div>

          <script>
            window.onload = () => {
              window.print();
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleShare = async () => {
    const text = `My Home Loan EMI for ${formatCurrency(principal)} at ${rate}% over ${tenureYears} years is ${formatCurrency(emi)} per month.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EMI Calculation',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert("Share feature is not available on this browser. \\n\\n" + text);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="flex flex-col lg:flex-row">
      {/* Controls */}
      <div className="p-8 lg:w-1/2 space-y-8 bg-gray-50/50">
        <h2 className="text-2xl font-bold text-brand-deep">EMI Calculator</h2>
        
        {/* Principal Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-medium text-sm text-gray-700">Loan Amount</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 font-medium text-gray-500">₹</span>
              <input 
                type="text" 
                value={principal ? principal.toLocaleString('en-IN') : ''}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/,/g, ''));
                  if (!isNaN(val)) setPrincipal(val);
                }}
                className="text-xl font-bold text-brand-deep bg-white pl-7 pr-3 py-1.5 rounded-md shadow-sm border border-gray-200 w-44 text-right focus:outline-none focus:ring-2 focus:ring-brand-mint transition-all"
              />
            </div>
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
            <div className="relative flex items-center">
              <input 
                type="number" 
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="text-xl font-bold text-brand-deep bg-white pl-3 pr-8 py-1.5 rounded-md shadow-sm border border-gray-200 w-28 text-right focus:outline-none focus:ring-2 focus:ring-brand-mint transition-all"
              />
              <span className="absolute right-3 font-medium text-gray-500">%</span>
            </div>
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
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="text-xl font-bold text-brand-deep bg-white pl-3 pr-14 py-1.5 rounded-md shadow-sm border border-gray-200 w-32 text-right focus:outline-none focus:ring-2 focus:ring-brand-mint transition-all"
              />
              <span className="absolute right-3 font-medium text-gray-500">Yrs</span>
            </div>
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
            <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Total Amount Payable</p>
            <p className="font-bold text-brand-deep text-2xl">{formatCurrency(totalPayment)}</p>
          </div>
        </div>

        {/* Action Buttons: Schedule, Save, Share */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button 
            onClick={() => setShowSchedule(!showSchedule)}
            className="flex-1 min-w-[100px] bg-slate-100 text-slate-700 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar size={16} /> Schedule
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 min-w-[100px] bg-slate-100 text-slate-700 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Save size={16} /> Save as PDF
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 min-w-[100px] bg-slate-100 text-slate-700 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* Contextual CTAs (Point 7) */}
        <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a 
            href="/home-loan" 
            className="flex-1 bg-brand-mint text-brand-deep font-bold py-3.5 px-4 rounded-xl text-center hover:bg-opacity-90 transition-all shadow-[0_4px_14px_rgba(7,153,116,0.2)] flex items-center justify-center gap-2"
          >
            Apply for this EMI
          </a>
          <a 
            href="/affordability" 
            className="flex-1 bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl text-center border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
          >
            Check Eligibility
          </a>
        </div>
      </div>
      </div>

      {/* Schedule Table */}
      {showSchedule && (
        <div className="p-8 border-t border-gray-100 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h3 className="font-bold text-lg text-brand-deep flex items-center gap-2">
              <Calendar size={20} className="text-brand-mint" /> 
              Amortization Schedule
            </h3>
            
            <div className="flex bg-slate-100 rounded-lg p-1 self-start sm:self-auto">
              <button 
                onClick={() => setScheduleType("yearly")} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scheduleType === 'yearly' ? 'bg-white shadow text-brand-deep' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Yearly
              </button>
              <button 
                onClick={() => setScheduleType("monthly")} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scheduleType === 'monthly' ? 'bg-white shadow text-brand-deep' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium sticky top-0 shadow-sm">
                <tr>
                  <th className="px-4 py-3 border-b border-slate-200">{scheduleType === 'monthly' ? 'Month' : 'Year'}</th>
                  <th className="px-4 py-3 text-right border-b border-slate-200">Principal</th>
                  <th className="px-4 py-3 text-right border-b border-slate-200">Interest</th>
                  <th className="px-4 py-3 text-right border-b border-slate-200">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{scheduleType === 'monthly' ? 'Month ' : 'Year '}{row.period}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(row.principal)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-3 text-right font-medium text-brand-deep">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
