import Link from "next/link";
import { Phone, MessageCircle, FileCheck } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 px-2 py-2 flex justify-between items-center pb-safe">
      <a 
        href="tel:+917303061282" 
        className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-brand-deep transition-colors"
      >
        <Phone size={20} className="mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wide">Call Now</span>
      </a>
      
      <a 
        href="https://wa.me/917303061282?text=Hi%20Kal%20Ka%20Loan!%20I%20want%20to%20check%20my%20eligibility." 
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1 text-[#25D366] hover:text-[#1DA851] transition-colors"
      >
        <MessageCircle size={20} className="mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wide">WhatsApp</span>
      </a>

      <Link 
        href="#apply" 
        className="flex flex-1 items-center justify-center gap-1.5 bg-brand-deep text-white py-3 px-2 rounded-lg font-bold text-xs shadow-md shadow-brand-deep/20"
      >
        <FileCheck size={16} />
        Eligibility
      </Link>
    </div>
  );
}
