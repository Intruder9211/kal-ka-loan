"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, CheckCircle2, Clock, MapPin, Calendar, ArrowRight, ShieldCheck, PhoneCall, Building2 } from "lucide-react";
import Link from "next/link";

export default function TrackStatusClient() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [query, setQuery] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const fetchStatus = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/track/status?q=${encodeURIComponent(searchVal.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.found) {
        setError(data.message || "No application found. Please check your reference or mobile number.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Unable to connect to verification server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchStatus(initialRef);
    }
  }, [initialRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(query);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint/15 text-brand-deep text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck size={14} className="text-brand-mint" /> Real-time Application Status
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Track Your Application
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Enter your Application Reference Number (e.g. <span className="font-mono font-bold text-slate-800">MVHL...</span>) or registered mobile number to check instant progress.
        </p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Reference Number (MVHL...) or 10-digit Mobile"
          className="w-full py-4 pl-5 pr-32 text-slate-900 text-sm sm:text-base outline-none font-medium placeholder:text-slate-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 px-5 py-2.5 bg-brand-deep text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {loading ? (
            <span>Checking...</span>
          ) : (
            <>
              <Search size={16} /> <span>Track</span>
            </>
          )}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-700 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-up">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-brand-deep to-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-brand-mint tracking-wider block">
                {result.type === 'DOORSTEP_VISIT' ? 'Doorstep Visit' : 'Loan Application'}
              </span>
              <h2 className="text-2xl font-bold mt-0.5">{result.productName}</h2>
              <p className="text-xs text-slate-300 mt-1">Applicant: <span className="font-semibold text-white">{result.name}</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-right">
              <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Reference No.</span>
              <span className="font-mono font-bold text-sm tracking-wider text-brand-mint">{result.referenceNumber}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Status Steps Tracker */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Application Progress</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-emerald-500"></div>
                  <p className="text-xs font-bold text-slate-900">Received</p>
                  <p className="text-[10px] text-slate-400">Step 1</p>
                </div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded-full ${result.status !== 'NEW' && result.status !== 'DRAFT' ? 'bg-emerald-500' : 'bg-brand-mint'}`}></div>
                  <p className="text-xs font-bold text-slate-900">Review</p>
                  <p className="text-[10px] text-slate-400">Step 2</p>
                </div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded-full ${result.status === 'VERIFIED' || result.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  <p className="text-xs font-bold text-slate-900">Verification</p>
                  <p className="text-[10px] text-slate-400">Step 3</p>
                </div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded-full ${result.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  <p className="text-xs font-bold text-slate-900">Sanction</p>
                  <p className="text-[10px] text-slate-400">Step 4</p>
                </div>
              </div>
            </div>

            {/* Application Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
                <span className="inline-flex items-center gap-1.5 mt-1 font-bold text-sm text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 size={13} /> {result.status}
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Requested Amount</span>
                <span className="font-extrabold text-base text-slate-900 mt-1 block">
                  {result.amount ? `₹${Number(result.amount).toLocaleString('en-IN')}` : 'To Be Finalized'}
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">City / Locality</span>
                <span className="font-bold text-sm text-slate-900 mt-1 block flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" /> {result.city || 'NCR'}
                </span>
              </div>
            </div>

            {/* Note/Details banner */}
            {result.details && (
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Appointment Note:</strong> {result.details}
              </div>
            )}

            {/* Support contact bar */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm">Need immediate assistance or want to reschedule?</p>
                <p className="text-xs text-slate-400">Call our dedicated loan advisory desk directly.</p>
              </div>
              <a
                href="tel:+917303061282"
                className="shrink-0 px-5 py-2.5 bg-brand-mint text-brand-deep font-extrabold text-xs rounded-xl hover:bg-white transition-colors flex items-center gap-2"
              >
                <PhoneCall size={14} /> +91 73030 61282
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Helpful links */}
      <div className="text-center pt-4">
        <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          Back to Homepage <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
