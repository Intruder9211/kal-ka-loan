import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-24 md:pb-12 border-t border-brand-mint/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="relative w-60 h-16 overflow-hidden mb-2">
            <Image 
              src="/logo_white.png" 
              alt="Money Viora Logo" 
              fill 
              className="object-contain object-left"
            />
          </div>
          <p className="text-sm text-gray-400">
            Fast, transparent, hassle-free home loans. Aaj apply karo, kal paisa.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-brand-mint">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/home-loan" className="hover:text-white transition-colors">Home Loan</Link></li>
            <li><Link href="/compare" className="hover:text-white transition-colors">Compare Banks</Link></li>
            <li><Link href="/calculators" className="hover:text-white transition-colors">EMI Calculator</Link></li>
            <li><Link href="/variants/balance-transfer" className="hover:text-white transition-colors">Balance Transfer</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-brand-mint">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-brand-mint">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@moneyviora.com</li>
            <li>Phone: +91 73030 61282</li>
            <li>HQ: New Delhi, India</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500 text-center">
        <p className="mb-2">
          <strong>Disclaimer:</strong> Money Viora is a loan distribution/referral platform. Final approval, interest rates, and terms are decided entirely by the lending partner.
        </p>
        <p>&copy; {new Date().getFullYear()} Money Viora. All rights reserved.</p>
      </div>
    </footer>
  );
}
