import Link from "next/link";
import { CheckCircle2, Home, Search, ShieldCheck } from "lucide-react";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolvedParams = await searchParams;
  const ref = resolvedParams.ref;

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14 max-w-2xl w-full text-center border border-gray-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 text-emerald-600">
          <CheckCircle2 size={42} />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-deep tracking-tight mb-3">
          Application Received!
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg mx-auto">
          Thank you for choosing Money Viora. Your application has been logged and our dedicated loan specialist will contact you shortly.
        </p>

        {ref && (
          <div className="bg-blue-50 border border-dashed border-blue-300 rounded-2xl p-4 max-w-md mx-auto mb-8 text-center">
            <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider block mb-1">
              Your Application Tracking Number
            </span>
            <div className="text-xl font-black font-mono text-slate-900 tracking-wider">
              {ref}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Use this reference number anytime to check the status of your approval.
            </p>
            <Link
              href={`/track?ref=${encodeURIComponent(ref)}`}
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-xl transition-colors"
            >
              <Search size={13} /> Live Track Status
            </Link>
          </div>
        )}
        
        <div className="bg-brand-light rounded-2xl p-6 text-left mb-8 border border-gray-100">
          <h3 className="font-bold text-brand-deep mb-3 flex items-center gap-2">
            <span className="bg-brand-mint text-brand-deep w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">1</span>
            What happens next?
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-2 shrink-0"></div>
              <span>Our team verifies your eligibility and matches you with top lenders.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-2 shrink-0"></div>
              <span>You receive a call to discuss the best interest rates available.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-2 shrink-0"></div>
              <span>We collect your documents online or arrange a free doorstep pickup.</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {ref && (
            <Link 
              href={`/track?ref=${encodeURIComponent(ref)}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-deep text-white font-bold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition-all text-sm"
            >
              Track Application
            </Link>
          )}
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold px-7 py-3.5 rounded-xl hover:bg-slate-200 transition-all text-sm"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
