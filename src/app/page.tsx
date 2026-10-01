import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight, IndianRupee, Home as HomeIcon } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
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
        <div className="absolute inset-0 bg-brand-deep/50 md:bg-transparent md:bg-gradient-to-r md:from-brand-deep/90 md:via-brand-deep/60 md:to-brand-deep/20"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Hero Content */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-sm font-medium animate-fade-up">
              <CheckCircle2 size={16} />
              <span>Lowest Interest Rates in Market</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight animate-fade-up stagger-1">
              Fast, transparent, hassle-free <span className="text-brand-mint">home loans.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-up stagger-2">
              Compare offers from top banks, check eligibility instantly, and get your loan sanctioned. 
              <br className="hidden md:block"/> <strong className="text-white">Aaj apply karo, kal paisa.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up stagger-3">
              <Link 
                href="/home-loan" 
                className="btn-interactive group inline-flex items-center justify-center gap-2 bg-brand-mint text-brand-deep font-bold px-8 py-4 rounded-full hover:bg-white"
              >
                Apply Now <ChevronRight size={20} className="icon-slide" />
              </Link>
              <Link 
                href="/compare" 
                className="btn-interactive inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/20 font-bold px-8 py-4 rounded-full hover:bg-white/10"
              >
                Compare Banks
              </Link>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-sm text-gray-300 animate-fade-up stagger-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <IndianRupee size={16} className="text-brand-mint" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <HomeIcon size={16} className="text-brand-mint" />
                <span><span className="font-bold tabular-nums">10,000+</span> Indian Homes Funded</span>
              </div>
            </div>
          </div>
          
          {/* Quick Lead Form Component */}
          <div className="flex-1 w-full max-w-md animate-fade-up stagger-2">
            <MultiStepLeadForm />
          </div>
          
        </div>
      </section>

      {/* Section 2: EMI Calculator */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Calculate Your EMI Instantly</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plan your finances better with our interactive EMI calculator. See exactly how much your monthly payment will be and the total interest you'll pay over time.
            </p>
          </div>
          <EmiCalculator />
        </div>
      </section>
      
      {/* Section 3: Trust Bar */}
      <TrustBar />

      {/* Section 4: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 5: How It Works */}
      <HowItWorks />

      {/* Section 6: Loan Types */}
      <LoanTypes />

      {/* Section 7: Partner Banks */}
      <PartnerBanksSection />

      {/* Section 8: Eligibility & Docs */}
      <EligibilityDocs />

      {/* Section 9: Rate Comparison */}
      <RateComparison />

      {/* Section 10: Testimonials */}
      <Testimonials />

      {/* Section 11: Popular Cities */}
      <PopularCities />

      {/* Section 12: FAQ */}
      <FAQ />

      {/* Section 13: Final CTA */}
      <FinalCTA />

      {/* Section 14: Blog Guides */}
      <BlogGuides />

    </>
  );
}
