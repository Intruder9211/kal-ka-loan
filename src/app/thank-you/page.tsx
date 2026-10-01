import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 max-w-2xl w-full text-center border border-gray-100">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-8">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-deep tracking-tight mb-4">
          Application Received!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          Thank you for choosing Kal Ka Loan. One of our loan experts will call you shortly to discuss your personalized offers.
        </p>
        
        <div className="bg-brand-light rounded-2xl p-6 text-left mb-10 border border-gray-100">
          <h3 className="font-bold text-brand-deep mb-3 flex items-center gap-2">
            <span className="bg-brand-mint text-brand-deep w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
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
              <span>We collect your documents online and process the sanction.</span>
            </li>
          </ul>
        </div>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 bg-brand-deep text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all"
        >
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
