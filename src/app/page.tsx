import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight, IndianRupee, Home as HomeIcon } from "lucide-react";
import PersonalizedLoanFinder from "@/components/home/PersonalizedLoanFinder";
import EmiCalculator from "@/components/calculators/EmiCalculator";
import TrustBar from "@/components/home/TrustBar";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import LoanTypes from "@/components/home/LoanTypes";
import PartnerBanksSection from "@/components/home/PartnerBanksSection";
import EligibilityDocs from "@/components/home/EligibilityDocs";
import RateComparison from "@/components/home/RateComparison";
import Testimonials from "@/components/home/Testimonials";
import PopularCities from "@/components/home/PopularCities";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import BlogGuides from "@/components/home/BlogGuides";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-deep text-white py-16 md:py-24 relative overflow-hidden">
        <Image 
          src="/images/hero-home.jpg" 
          alt="Happy Indian family with new home" 
          fill 
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-brand-deep/60 md:bg-transparent md:bg-gradient-to-r md:from-brand-deep/95 md:via-brand-deep/80 md:to-brand-deep/30"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Hero Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-sm font-semibold tracking-wide animate-fade-up backdrop-blur-sm shadow-lg shadow-brand-mint/5">
              <CheckCircle2 size={16} />
              <span>India's Most Transparent Loan Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] animate-fade-up stagger-1">
              The smartest way to get a <span className="text-brand-mint">home loan.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-200 animate-fade-up stagger-2 font-medium leading-relaxed">
              Compare offers from 30+ top banks, calculate your exact eligibility, and secure the lowest interest rate without the hidden fees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-up stagger-3">
              <Link 
                href="/affordability" 
                className="btn-interactive group inline-flex items-center justify-center gap-2 bg-brand-mint text-brand-deep font-bold px-8 py-4 rounded-xl hover:bg-white shadow-[0_0_30px_rgba(7,153,116,0.3)] transition-all"
              >
                Check Affordability <ChevronRight size={20} className="icon-slide" />
              </Link>
              <Link 
                href="/calculators" 
                className="btn-interactive inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all"
              >
                Compare Rates
              </Link>
            </div>
            
            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm text-slate-300 animate-fade-up stagger-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-mint/20 rounded-md"><IndianRupee size={16} className="text-brand-mint" /></div>
                <span className="font-medium">Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-mint/20 rounded-md"><HomeIcon size={16} className="text-brand-mint" /></div>
                <span className="font-medium">10,000+ Homes Funded</span>
              </div>
            </div>
          </div>
          
          {/* Personalized Loan Finder Component */}
          <div className="w-full lg:w-[450px] animate-fade-up stagger-3 shrink-0 h-[500px] relative">
            {/* Glowing Orbs */}
            <div className="absolute top-10 -left-10 w-48 h-48 bg-brand-mint/40 rounded-full mix-blend-screen filter blur-[60px] animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-brand-deep/50 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <PersonalizedLoanFinder />
          </div>
          
        </div>
      </section>

      {/* Step 2: Choose their loan requirement */}
      <LoanTypes />

      {/* Step 3: Calculate / check eligibility */}
      <section className="py-20 bg-gray-50 border-y border-gray-100 relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Calculate Your EMI Instantly</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plan your finances better with our interactive EMI calculator. See exactly how much your monthly payment will be and the total interest you'll pay over time.
            </p>
          </div>
          <EmiCalculator />
        </div>
      </section>

      {/* Step 4: Compare options */}
      <RateComparison />

      {/* Step 5: Understand the process */}
      <HowItWorks />

      {/* Step 6: Build Trust (Partners, Why Us, Eligibility, Reviews, Cities, FAQ) */}
      <TrustBar />
      <WhyChooseUs />
      <PartnerBanksSection />
      <EligibilityDocs />
      <Testimonials />
      <PopularCities />
      <FAQ />
      <BlogGuides />

      {/* Step 7: Take action */}
      <FinalCTA />

    </>
  );
}
