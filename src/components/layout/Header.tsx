"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, User, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export default function Header({ session }: { session?: any }) {
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
          <div className="relative w-60 h-16 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <Image 
              src="/logo_white.png" 
              alt="Money Viora Logo" 
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
          <Link href="/affordability" className="link-underline pb-1">
            Affordability
          </Link>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
            {session ? (
              <>
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-2 text-brand-mint hover:text-white transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 ml-2">
                  <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-brand-mint">
                    {session.user?.name?.charAt(0) || <User size={16} />}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-brand-mint transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="btn-interactive flex items-center gap-2 rounded-full bg-brand-mint px-5 py-2.5 text-brand-deep font-bold hover:bg-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
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
          mobileMenuOpen ? "max-h-[400px] border-b py-4" : "max-h-0 border-b-0 py-0"
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
          <Link href="/affordability" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Affordability
          </Link>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            {session ? (
              <>
                <Link 
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-brand-mint font-bold"
                >
                  <LayoutDashboard size={18} /> Go to Dashboard
                </Link>
                <button 
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-white/70 hover:text-white text-left"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-brand-mint transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-mint px-5 py-2.5 text-brand-deep font-bold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
