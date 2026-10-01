import Link from "next/link";
import { CheckCircle2, Building, Building2, Wallet, Landmark } from "lucide-react";

export interface Lender {
  id: string;
  name: string;
  logo: string;
  interestRate: string;
  processingFee: string;
  maxTenure: string;
  maxAmount: string;
  tags: string[];
}

// Function to pick a random icon based on name just for visuals
const getBankIcon = (name: string) => {
  if (name.includes("HDFC") || name.includes("Axis")) return <Building size={32} />;
  if (name.includes("SBI")) return <Landmark size={32} />;
  if (name.includes("Bajaj")) return <Wallet size={32} />;
  return <Building2 size={32} />;
};

export default function LenderCard({ lender }: { lender: Lender }) {
  return (
    <div className="card-interactive bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center group">
      
      {/* Lender Logo & Name */}
      <div className="w-full md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
        <div className="card-icon w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand-deep mb-3">
          {getBankIcon(lender.name)}
        </div>
        <h3 className="font-bold text-lg text-brand-deep text-center">{lender.name}</h3>
        <div className="flex flex-wrap gap-1 mt-2 justify-center">
          {lender.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-brand-mint/10 text-brand-deep px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Lender Details */}
      <div className="w-full md:w-2/4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center md:text-left">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Interest Rate</p>
          <p className="font-bold text-xl text-brand-deep mt-1">{lender.interestRate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Processing Fee</p>
          <p className="font-bold text-gray-800 mt-1">{lender.processingFee}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Max Tenure</p>
          <p className="font-bold text-gray-800 mt-1">{lender.maxTenure}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Max Amount</p>
          <p className="font-bold text-gray-800 mt-1">{lender.maxAmount}</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="w-full md:w-1/4 flex flex-col items-center md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-3">
          <CheckCircle2 size={16} /> Pre-approved offers
        </div>
        <Link 
          href={`#apply`} 
          className="btn-interactive w-full md:w-auto text-center bg-brand-deep text-white font-bold py-3 px-6 rounded-lg group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:shadow-md"
        >
          Check Offer
        </Link>
      </div>

    </div>
  );
}
