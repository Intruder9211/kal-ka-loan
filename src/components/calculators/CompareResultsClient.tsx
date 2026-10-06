"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Building2, IndianRupee, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

interface Match {
  lenderId: string;
  lenderName: string;
  lenderLogo: string | null;
  productId: string;
  productName: string;
  interestRate: number;
  processingFeePct: number;
  processingFeeAmt: number;
  emi: number;
  totalRepayment: number;
  isEligible: boolean;
  reason: string;
}

export default function CompareResultsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  const amount = searchParams.get("amount");
  const loanType = searchParams.get("loanType");
  const tenure = searchParams.get("tenure");

  useEffect(() => {
    async function fetchMatches() {
      if (!amount || !loanType) {
        setLoading(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams(searchParams.toString());
        const res = await fetch(`/api/recommendations?${queryParams.toString()}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        setError("We couldn't generate recommendations at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [searchParams, amount, loanType]);

  if (!amount || !loanType) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">No loan details provided</h3>
        <p className="text-gray-500 mb-8">Please use the Loan Finder on the homepage to see your personalized matches.</p>
        <Link href="/" className="inline-block bg-brand-deep text-brand-mint font-bold px-8 py-3 rounded-xl hover:bg-brand-deep/90 transition-all">
          Go to Loan Finder
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-200">
        <div className="w-16 h-16 border-4 border-brand-mint/30 border-t-brand-mint rounded-full animate-spin mx-auto mb-6"></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your profile...</h3>
        <p className="text-gray-500">Matching you with 30+ lenders in our database</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-red-200">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-200">
        <AlertCircle size={48} className="text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No exact matches found</h3>
        <p className="text-gray-500 mb-6">Your existing EMIs might be too high for the requested loan amount. Try increasing the tenure or decreasing the loan amount.</p>
        <button 
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 font-bold px-6 py-2 rounded-xl hover:bg-gray-200 transition-all"
        >
          Adjust Requirements
        </button>
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Request Summary */}
      <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">Your Request</p>
          <p className="text-xl font-bold text-brand-deep">{formatCurrency(parseInt(amount))} {loanType} over {tenure} Years</p>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-semibold text-brand-mint bg-brand-mint/10 px-4 py-2 rounded-lg hover:bg-brand-mint/20 transition-all"
        >
          Edit Details
        </button>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match, idx) => (
          <div 
            key={`${match.lenderId}-${idx}`} 
            className={`bg-white/80 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${
              idx === 0 ? 'border-brand-mint/50 shadow-[0_10px_40px_-15px_rgba(7,153,116,0.3)] relative' : 'border-white hover:border-brand-mint/30'
            }`}
          >
            {idx === 0 && (
              <div className="absolute -top-3 left-6 bg-brand-mint text-brand-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <CheckCircle2 size={14} /> Top Match
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                
                {/* Bank Info */}
                <div className="w-full md:w-1/4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                    {match.lenderLogo ? (
                      <Image src={match.lenderLogo} alt={match.lenderName} width={48} height={48} className="object-contain" />
                    ) : (
                      <Building2 size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{match.lenderName}</h3>
                    <p className="text-xs text-gray-500">{match.productName}</p>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="w-full md:flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                    <p className="text-lg font-bold text-gray-900">{match.interestRate.toFixed(2)}% <span className="text-xs font-normal text-gray-500">p.a.</span></p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                    <p className="text-lg font-bold text-brand-deep">{formatCurrency(match.emi)}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Processing Fee</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(match.processingFeeAmt)} <span className="text-xs font-normal text-gray-500">({match.processingFeePct}%)</span></p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Total Repayment</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(match.totalRepayment)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 justify-end mt-4 md:mt-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                  <button className="p-3 border border-gray-200 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all tooltip group relative">
                    <Heart size={20} />
                  </button>
                  <Link 
                    href={`/dashboard/applications/new?productId=${match.productId}&lenderId=${match.lenderId}`}
                    className="flex-1 md:flex-none bg-brand-deep text-brand-mint font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-deep/90 transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.2)]"
                  >
                    Apply Now <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              
              {/* Recommendation Reason */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2 text-sm">
                {match.isEligible ? (
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                )}
                <span className={match.isEligible ? "text-gray-600" : "text-yellow-700"}>
                  <strong className="font-semibold text-gray-900">Why this match?</strong> {match.reason}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
