"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, User, LayoutDashboard, LogOut, ChevronDown, Building2, Zap, MapPin, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { CALCULATORS_CONFIG } from "@/lib/calculators-data";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

export default function Header({ session }: { session?: Session | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
              sizes="240px"
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
          
          <div className="group/nav relative py-4 flex items-center">
            <Link href="/calculators" className="link-underline flex items-center gap-1.5 cursor-pointer">
              <span>Calculators</span> 
              <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform inline-block" />
            </Link>
            
            {/* Mega Menu */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50 p-6 grid grid-cols-4 gap-4 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
              {CALCULATORS_CONFIG.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link 
                    key={calc.id}
                    href={`/calculators?tab=${calc.id}`}
                    className="flex flex-col gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
                  >
                    <div className="h-10 w-10 bg-brand-mint/10 text-brand-mint rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm leading-tight group-hover/item:text-brand-mint transition-colors">{calc.title.replace('Calculator', '').trim()}</h4>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-2">{calc.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <Link href="/affordability" className="link-underline pb-1">
            Affordability
          </Link>

          {/* Explore & Services Dropdown */}
          <div className="group/services relative py-4 flex items-center">
            <span className="link-underline flex items-center gap-1.5 cursor-pointer">
              <span>Explore & Services</span>
              <ChevronDown size={14} className="group-hover/services:rotate-180 transition-transform inline-block" />
            </span>

            {/* Services Dropdown Menu */}
            <div className="absolute top-[100%] right-0 w-[520px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border border-gray-100 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-300 z-50 p-4 grid grid-cols-2 gap-3 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
              {/* 1. Verified Projects */}
              <Link
                href="/projects"
                className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
              >
                <div className="h-10 w-10 bg-brand-mint/10 text-brand-mint rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-slate-900 font-bold text-sm leading-tight group-hover/item:text-brand-mint transition-colors">
                      Verified Projects
                    </h4>
                    <span className="text-[10px] bg-brand-mint/20 text-brand-mint font-bold px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">
                    Bank-approved builder homes with rapid 48-hr loan sanctions.
                  </p>
                </div>
              </Link>

              {/* 2. Instant Sanction */}
              <Link
                href="/instant-sanction"
                className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
              >
                <div className="h-10 w-10 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-slate-900 font-bold text-sm leading-tight group-hover/item:text-brand-mint transition-colors">
                      Instant Sanction
                    </h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">
                      Fast
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">
                    Download official In-Principle approval letter in 2 mins.
                  </p>
                </div>
              </Link>

              {/* 3. Branches */}
              <Link
                href="/branches"
                className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
              >
                <div className="h-10 w-10 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight group-hover/item:text-brand-mint transition-colors">
                    Branches & Hubs
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">
                    Find nearest consultation center or book doorstep manager.
                  </p>
                </div>
              </Link>

              {/* 4. Forms & Guides */}
              <Link
                href="/forms"
                className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
              >
                <div className="h-10 w-10 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight group-hover/item:text-brand-mint transition-colors">
                    Forms & Guides
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">
                    Download printable draft agreements, affidavits & checklists.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
            {/* Theme Color Palette Switcher */}
            <ThemeSwitcher />

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

        {/* Mobile Actions: Theme Switcher & Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button 
            className="p-2 text-brand-mint active:scale-95 transition-transform" 
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
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
          <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors flex items-center justify-between">
            <span>Verified Projects</span>
            <span className="text-[10px] bg-brand-mint/20 text-brand-mint font-bold px-2 py-0.5 rounded-full">New</span>
          </Link>
          <Link href="/instant-sanction" onClick={() => setMobileMenuOpen(false)} className="text-brand-mint font-bold flex items-center justify-between">
            <span>Instant Sanction Letter</span>
            <span className="text-[10px] bg-brand-mint/20 px-2 py-0.5 rounded-full">Fast</span>
          </Link>
          <Link href="/branches" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Branches & Hubs
          </Link>
          <Link href="/forms" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-mint transition-colors">
            Forms & Guides
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
