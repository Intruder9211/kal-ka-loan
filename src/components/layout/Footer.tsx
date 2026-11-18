"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, ChevronRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07130f] text-white pt-14 pb-24 md:pb-12 border-t border-emerald-500/15 overflow-hidden">
      {/* Subtle Futuristic Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-mint/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Cyber Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mint/40 to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <Link href="/" className="relative block w-56 h-14 overflow-hidden group">
            <Image 
              src="/logo_white.png" 
              alt="Money Viora Logo" 
              fill 
              sizes="240px"
              className="object-contain object-left transition-transform duration-300 group-hover:scale-102"
            />
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Fast, transparent, hassle-free home loans. Aaj apply karo, kal paisa.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
            <ShieldCheck size={14} className="text-brand-mint" />
            <span>Bank-Grade 256-Bit SSL Security</span>
          </div>
        </div>
        
        {/* Col 2: Quick Links */}
        <div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-mint">Quick Links</h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
            {[
              { href: "/home-loan", label: "Home Loan" },
              { href: "/compare", label: "Compare Banks" },
              { href: "/calculators", label: "EMI Calculator" },
              { href: "/blog", label: "Blog & Knowledge Center" },
              { href: "/variants/balance-transfer", label: "Balance Transfer" },
            ].map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="inline-flex items-center gap-1.5 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                >
                  <ChevronRight size={12} className="text-slate-600 group-hover:text-brand-mint transition-colors" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Col 3: Legal */}
        <div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-mint">Legal</h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="inline-flex items-center gap-1.5 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                >
                  <ChevronRight size={12} className="text-slate-600 group-hover:text-brand-mint transition-colors" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Col 4: Contact */}
        <div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-mint">Contact</h4>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
            <li>
              <a 
                href="mailto:singhmohit101103@gmail.com" 
                className="flex items-start gap-2 hover:text-white hover:translate-x-0.5 transition-all duration-200 group"
              >
                <Mail size={14} className="text-brand-mint mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">singhmohit101103@gmail.com</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-brand-mint shrink-0" />
              <span>+91 73030 61282</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-brand-mint mt-0.5 shrink-0" />
              <span>HQ: New Delhi, India</span>
            </li>
          </ul>

          {/* Quick Back-to-Top Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-mint bg-slate-900/60 hover:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-200 group"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Disclaimer & Copyright */}
      <div className="container mx-auto px-4 max-w-7xl mt-12 pt-6 border-t border-white/5 text-[11px] text-slate-500 text-center relative z-10 space-y-2">
        <p className="max-w-3xl mx-auto leading-relaxed">
          <strong className="text-slate-400 font-semibold">Disclaimer:</strong> Money Viora is a loan distribution and referral platform. Final approval, interest rates, and loan terms are decided entirely by partner lending institutions.
        </p>
        <p>&copy; {new Date().getFullYear()} Money Viora. All rights reserved.</p>
      </div>
    </footer>
  );
}
