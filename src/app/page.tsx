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
import RotatingLoanWord from "@/components/home/RotatingLoanWord";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white relative overflow-hidden rounded-3xl md:rounded-[2.5rem] min-h-[calc(100vh-6.5rem)] md:min-h-[calc(100vh-7rem)] flex items-center border border-white/10 shadow-2xl">
          <Image 
            src="/images/hero-home.jpg" 
            alt="Happy Indian family with new home" 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-brand-deep/60 md:bg-transparent md:bg-gradient-to-r md:from-brand-deep/95 md:via-brand-deep/80 md:to-brand-deep/30"></div>
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-12 w-full">
            
            {/* Hero Content */}
            <div className="flex-1 space-y-4 sm:space-y-5 lg:space-y-6 text-center lg:text-left max-w-2xl min-w-0">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs sm:text-sm font-semibold tracking-wide animate-fade-up backdrop-blur-sm shadow-lg shadow-brand-mint/5 animate-pulse-subtle">
                <CheckCircle2 size={16} />
                <span>India's Most Transparent Loan Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] animate-fade-up stagger-1">
                The smartest way to get a <RotatingLoanWord />
              </h1>
              
              <p className="text-sm sm:text-base lg:text-xl text-slate-200 animate-fade-up stagger-2 font-medium leading-relaxed">
                Compare offers from 30+ top banks, calculate your exact eligibility, and secure the lowest interest rate without the hidden fees.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 animate-fade-up stagger-3">
                <Link 
                  href="/affordability" 
                  className="btn-interactive group inline-flex items-center justify-center gap-2 bg-brand-mint text-brand-deep font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white shadow-[0_0_30px_rgba(7,153,116,0.3)] transition-all text-sm sm:text-base"
                >
                  Check Affordability <ChevronRight size={18} className="icon-slide" />
                </Link>
                <Link 
                  href="/calculators" 
                  className="btn-interactive inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all text-sm sm:text-base"
                >
                  Compare Rates
                </Link>
              </div>
              
              <div className="pt-3 sm:pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 animate-fade-up stagger-4">
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
            <div className="w-full max-w-md lg:max-w-none lg:w-[420px] xl:w-[450px] shrink-0 min-h-[460px] sm:min-h-[480px] sm:h-[500px] relative z-20">
              {/* Glowing Orbs */}
              <div className="absolute top-10 -left-10 w-48 h-48 bg-brand-mint/40 rounded-full mix-blend-screen filter blur-[60px] animate-pulse pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-brand-deep/50 rounded-full mix-blend-screen filter blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
              
              <PersonalizedLoanFinder />
            </div>
            
          </div>
        </div>
      </section>

      {/* Step 2: Choose their loan requirement */}
      <LoanTypes />

      {/* Step 3: Calculate / check eligibility */}
      <section className="py-4 sm:py-10 md:py-16 bg-slate-50 border-y border-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-2.5 sm:px-4 max-w-6xl relative z-10">
          <div className="text-center mb-2.5 sm:mb-8 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              Instant Financial Planning
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight">Calculate Your EMI Instantly</h2>
            <p className="hidden sm:block text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-1.5">
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
