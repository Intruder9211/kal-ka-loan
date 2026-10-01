"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out border-b",
        scrolled 
          ? "bg-brand-deep/90 backdrop-blur-md border-brand-mint/20 shadow-md py-1" 
          : "bg-brand-deep border-transparent py-3"
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative">
          <div className="relative w-48 h-12 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <Image 
              src="/logo.png" 
              alt="Kal Ka Loan Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/home-loan" className="link-underline pb-1">
            Home Loans
          </Link>
          <Link href="/compare" className="link-underline pb-1">
            Compare Lenders
          </Link>
          <Link href="/calculators" className="link-underline pb-1">
            Calculators
          </Link>
          
          <a
            href="tel:+917503388930"
            className="btn-interactive flex items-center gap-2 rounded-full bg-brand-mint px-5 py-2.5 text-brand-deep font-bold hover:bg-white"
          >
            <Phone size={16} />
            <span>Apply Now</span>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-brand-mint active:scale-95 transition-transform" 
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-brand-deep/95 backdrop-blur-md border-b border-brand-mint/20 overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-64 border-b py-4" : "max-h-0 border-b-0 py-0"
        )}
      >
        <nav className="flex flex-col px-4 space-y-4 text-white">
          <Link href="/home-loan" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Home Loans
          </Link>
          <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Compare Lenders
          </Link>
          <Link href="/calculators" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Calculators
          </Link>
          <a
            href="tel:+917503388930"
            className="flex items-center gap-2 text-brand-mint font-bold pt-2 border-t border-white/10"
          >
            <Phone size={16} /> Apply Now
          </a>
        </nav>
      </div>
    </header>
  );
}
