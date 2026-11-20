import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  FileText, 
  IndianRupee, 
  Percent, 
  Home, 
  Clock, 
  Building, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Layers, 
  Calculator,
  Compass,
  PiggyBank
} from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import EmiCalculator from "@/components/calculators/EmiCalculator";

export const metadata: Metadata = {
  title: "Home Loan - Compare 50+ Banks, Lowest Rates from 7.25% | Money Viora",
  description: "Get complete details about home loans in India. Check eligibility, required documents, calculate EMI, tax deductions, and apply online for the lowest interest rates.",
};

const LOAN_TYPES = [
  {
    title: "Home Purchase Loan",
    desc: "For purchasing ready-to-move-in flats, independent houses, or resale properties from builders or owners.",
    icon: Home,
    tag: "Most Common",
    highlight: "Funding up to 90% of agreement value",
  },
  {
    title: "Plot & Construction Loan",
    desc: "Finances the purchase of non-agricultural residential land plus phased composite home construction.",
    icon: Layers,
    tag: "Custom Homes",
    highlight: "Disbursal linked to construction stages",
  },
  {
    title: "Home Extension & Renovation",
    desc: "Finance additional rooms, balconies, structural remodeling, flooring, or full interior makeovers.",
    icon: Building,
    tag: "Upgrade",
    highlight: "Lower rates than personal loans",
  },
  {
    title: "Balance Transfer + Top-Up",
    desc: "Transfer your high-interest existing loan to a new bank, lower your EMI, and access an extra cash top-up.",
    icon: TrendingUp,
    tag: "Maximum Savings",
    highlight: "Save ₹3L - ₹10L in interest over tenure",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Compare & Pre-Qualify",
    desc: "Fill in basic loan preferences and get tailored rate quotes from 50+ banking partners in under 2 minutes.",
    time: "2 Mins",
  },
  {
    step: "02",
    title: "Doorstep Verification",
    desc: "Our personal loan advisor coordinates physical verification and digital KYC at your home or office.",
    time: "Same Day",
  },
  {
    step: "03",
    title: "Legal & Tech Valuation",
    desc: "Empaneled institutional lawyers and engineers complete 30-year search and property valuation.",
    time: "24-48 Hours",
  },
  {
    step: "04",
    title: "Sanction & Disbursal",
    desc: "Receive the formal digital sanction letter and direct fund transfer to seller or builder account.",
    time: "Within 72 Hrs",
  },
];

export default function HomeLoanPage() {
  return (
    <div className="flex-1 bg-slate-50 text-slate-800">
      
      {/* 1. Hero Section with Fully Mobile Responsive Rate / LTV / Tenure counters */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl py-12 sm:py-16 md:py-20">
          {/* Ambient Glows */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep pointer-events-none" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-brand-mint/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-2xs backdrop-blur-sm">
                <CheckCircle2 size={16} className="text-brand-mint" />
                <span>India's Most Trusted Home Loan Comparison Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 leading-[1.15]">
                Unlock the door to your <span className="text-brand-mint">dream home.</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed mb-8 max-w-xl">
                Compare India's top 50+ banks instantly. Get the absolute lowest interest rates, zero hidden fees, dedicated doorstep service, and digital sanction letters within 48 hours.
              </p>
              
              {/* Highlight Counter Cards - Fully Mobile Responsive */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 backdrop-blur-sm hover:border-brand-mint/60 hover:bg-white/10 hover:shadow-[0_10px_25px_-5px_rgba(117,232,122,0.25)] hover:-translate-y-1 transition-all duration-300 min-w-0 cursor-default">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-brand-mint mb-1 sm:mb-2">
                    <Percent size={14} className="sm:w-[18px] sm:h-[18px] shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300" />
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 truncate">Rate</span>
                  </div>
                  <div className="font-black text-sm sm:text-2xl md:text-3xl text-white tracking-tight group-hover:text-brand-mint transition-colors">7.25%</div>
                  <div className="text-[9px] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">Starting ROI</div>
                </div>

                <div className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 backdrop-blur-sm hover:border-brand-mint/60 hover:bg-white/10 hover:shadow-[0_10px_25px_-5px_rgba(117,232,122,0.25)] hover:-translate-y-1 transition-all duration-300 min-w-0 cursor-default">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-brand-mint mb-1 sm:mb-2">
                    <ShieldCheck size={14} className="sm:w-[18px] sm:h-[18px] shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300" />
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 truncate">LTV</span>
                  </div>
                  <div className="font-black text-sm sm:text-2xl md:text-3xl text-white tracking-tight group-hover:text-brand-mint transition-colors">Up to 90%</div>
                  <div className="text-[9px] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">Funding</div>
                </div>

                <div className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 backdrop-blur-sm hover:border-brand-mint/60 hover:bg-white/10 hover:shadow-[0_10px_25px_-5px_rgba(117,232,122,0.25)] hover:-translate-y-1 transition-all duration-300 min-w-0 cursor-default">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-brand-mint mb-1 sm:mb-2">
                    <Clock size={14} className="sm:w-[18px] sm:h-[18px] shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300" />
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 truncate">Tenure</span>
                  </div>
                  <div className="font-black text-sm sm:text-2xl md:text-3xl text-white tracking-tight group-hover:text-brand-mint transition-colors">30 Yrs</div>
                  <div className="text-[9px] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">Max Repay</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#apply"
                  className="btn-interactive inline-flex items-center justify-center gap-2 bg-brand-mint text-brand-deep font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white shadow-[0_0_25px_rgba(117,232,122,0.35)] transition-all text-sm sm:text-base"
                >
                  Apply Online Now <ChevronRight size={18} className="icon-slide" />
                </a>
                <a
                  href="#calculator"
                  className="btn-interactive inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all text-sm sm:text-base"
                >
                  <Calculator size={16} /> Calculate EMI
                </a>
              </div>
            </div>
            
            {/* Right Hero Form */}
            <div className="lg:col-span-5 relative" id="apply">
              <div className="absolute inset-0 bg-brand-mint/25 blur-[120px] rounded-full z-0 pointer-events-none" />
              <div className="relative z-10 animate-fade-up stagger-1">
                <MultiStepLeadForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Home Loan EMI Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 md:py-20 bg-stone-50 border-b border-slate-200/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Calculator size={14} className="text-brand-mint" />
              <span>Instant Financial Planning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-3">
              Calculate Your <span className="text-emerald-600">Home Loan EMI</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
              Adjust loan amount, interest rate, and tenure using the interactive green slider handle to view exact monthly payments and total interest breakdown.
            </p>
          </div>

          <EmiCalculator />
        </div>
      </section>

      {/* 3. Types of Home Loans for Every Need */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Compass size={14} className="text-brand-mint" />
            <span>Tailored Financing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-3">
            Home Loan Products for <span className="text-emerald-600">Every Requirement</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
            Whether you are buying a builder apartment, constructing your family home, or transferring an existing loan, Money Viora has the right program.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {LOAN_TYPES.map((type, index) => {
            const Icon = type.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-mint/60 transition-all duration-400 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] relative overflow-hidden"
              >
                {/* Top Accent Gradient Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#86efac] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-deep text-brand-mint flex items-center justify-center mb-4 group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-2 group-hover:border-emerald-300 group-hover:bg-emerald-100/70 transition-colors">
                    {type.tag}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                    {type.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                    {type.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500 flex items-center gap-1.5 group-hover:text-emerald-700 transition-colors">
                  <Sparkles size={13} className="text-brand-mint group-hover:scale-115 transition-transform" />
                  <span>{type.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Triple Tax Deductions Section (IT Act 1961) - Fully Mobile Responsive */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-mint/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/15 border border-brand-mint/30 text-brand-mint text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
              <PiggyBank size={14} />
              <span>Tax Optimization</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3">
              Save Up to <span className="text-brand-mint">₹5 Lakhs Annually</span> in Taxes
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium max-w-xl mx-auto">
              The Government of India allows significant income tax rebates under the Income Tax Act for homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
            {/* Tax 1 */}
            <div className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 backdrop-blur-md hover:border-brand-mint/50 hover:bg-white/10 hover:shadow-[0_15px_35px_-10px_rgba(117,232,122,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between md:block mb-2 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-mint/20 text-brand-mint flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  §24b
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-brand-mint md:hidden">Up to ₹2 Lakh</div>
              </div>
              <h3 className="font-extrabold text-base sm:text-xl text-white mb-1 md:mb-2 group-hover:text-brand-mint transition-colors">Section 24(b)</h3>
              <div className="text-2xl sm:text-3xl font-black text-brand-mint mb-2 hidden md:block">Up to ₹2,00,000</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Deduction available on the total interest component repaid on your self-occupied property loan within every financial year.
              </p>
            </div>

            {/* Tax 2 */}
            <div className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 backdrop-blur-md hover:border-brand-mint/50 hover:bg-white/10 hover:shadow-[0_15px_35px_-10px_rgba(117,232,122,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between md:block mb-2 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-mint/20 text-brand-mint flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  §80C
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-brand-mint md:hidden">Up to ₹1.5 Lakh</div>
              </div>
              <h3 className="font-extrabold text-base sm:text-xl text-white mb-1 md:mb-2 group-hover:text-brand-mint transition-colors">Section 80C</h3>
              <div className="text-2xl sm:text-3xl font-black text-brand-mint mb-2 hidden md:block">Up to ₹1,50,000</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Claim tax deductions on the principal loan repayment amount along with stamp duty and registration charges incurred during property purchase.
              </p>
            </div>

            {/* Tax 3 */}
            <div className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 backdrop-blur-md hover:border-brand-mint/50 hover:bg-white/10 hover:shadow-[0_15px_35px_-10px_rgba(117,232,122,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between md:block mb-2 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-mint/20 text-brand-mint flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  Joint
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-brand-mint md:hidden">2X Benefits</div>
              </div>
              <h3 className="font-extrabold text-base sm:text-xl text-white mb-1 md:mb-2 group-hover:text-brand-mint transition-colors">Joint Applicant Bonus</h3>
              <div className="text-2xl sm:text-3xl font-black text-brand-mint mb-2 hidden md:block">Double Benefits</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                When co-borrowing with your spouse or family co-owner, both applicants can claim separate deductions, totaling up to ₹7,00,000 annually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Step-by-Step 4-Stage Express Journey - With Rich Hover Physics & Animations */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Zap size={14} className="text-brand-mint" />
            <span>Fast-Track Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-3">
            Your Seamless Journey to <span className="text-emerald-600">Home Ownership</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
            From online eligibility check to legal clearance and fund disbursement, we manage the entire institutional process for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_35px_-10px_rgba(16,185,129,0.18)] hover:border-brand-mint transition-all duration-300"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-mint to-[#86efac] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Big Step Number Watermark with Scale Animation */}
              <div className="text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-emerald-100/90 group-hover:scale-110 transition-all duration-300 absolute top-4 right-4 select-none">
                {step.step}
              </div>

              {/* Step Badge with Rotation on Hover */}
              <div className="w-10 h-10 rounded-xl bg-brand-deep text-brand-mint font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm group-hover:bg-brand-mint group-hover:text-brand-deep group-hover:rotate-6 transition-all duration-300">
                {step.step}
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-2 group-hover:border-emerald-300 group-hover:bg-emerald-100/80 transition-colors">
                Timeline: {step.time}
              </span>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Minimum Eligibility Benchmarks & Required Documents Checklist */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Minimum Eligibility Benchmarks */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={14} className="text-brand-mint" />
                  <span>Check Criteria</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-deep tracking-tight">
                  Minimum Eligibility Benchmarks
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-brand-mint/50 hover:-translate-y-1 hover:shadow-md hover:bg-emerald-50/20 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-700 transition-colors">Applicant Age</span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-deep transition-colors mt-0.5">21 - 65 Years</div>
                  <span className="text-[11px] text-slate-500">Calculated at loan maturity</span>
                </div>

                <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-brand-mint/50 hover:-translate-y-1 hover:shadow-md hover:bg-emerald-50/20 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-700 transition-colors">Monthly Income</span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-deep transition-colors mt-0.5">₹25,000+ / mo</div>
                  <span className="text-[11px] text-slate-500">Salaried; ₹3L+ ITR for business</span>
                </div>

                <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-brand-mint/50 hover:-translate-y-1 hover:shadow-md hover:bg-emerald-50/20 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-700 transition-colors">CIBIL Score</span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-deep transition-colors mt-0.5">650+ (750 for Best ROI)</div>
                  <span className="text-[11px] text-slate-500">Higher score unlocks prime rates</span>
                </div>

                <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-brand-mint/50 hover:-translate-y-1 hover:shadow-md hover:bg-emerald-50/20 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-700 transition-colors">Work Experience</span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-deep transition-colors mt-0.5">2+ Years Total</div>
                  <span className="text-[11px] text-slate-500">Min 6 mos in current job</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-start gap-3 hover:border-emerald-300 hover:shadow-sm transition-all duration-300 group">
                <Sparkles size={20} className="text-emerald-700 shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-12 transition-transform duration-300" />
                <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                  <strong>Pro Tip:</strong> Adding an earning co-applicant (spouse or parent) combines your monthly income pool, significantly boosting your loan eligibility and reducing FOIR stress.
                </p>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <FileText size={14} className="text-brand-mint" />
                  <span>Paperwork Guide</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-deep tracking-tight">
                  Required Documents Checklist
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 group/doc hover:bg-slate-50/80 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 cursor-default">
                  <strong className="text-sm font-extrabold text-slate-900 group-hover/doc:text-emerald-800 block mb-1 flex items-center gap-2 transition-colors">
                    <CheckCircle2 size={16} className="text-brand-mint group-hover/doc:scale-120 transition-transform" /> KYC Identification
                  </strong>
                  <p className="text-xs text-slate-500 pl-6 group-hover/doc:text-slate-600 transition-colors">
                    PAN Card (mandatory), Aadhaar Card, Passport, Voter ID or Driving License for identity and current address proof.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-3 group/doc hover:bg-slate-50/80 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 cursor-default">
                  <strong className="text-sm font-extrabold text-slate-900 group-hover/doc:text-emerald-800 block mb-1 flex items-center gap-2 transition-colors">
                    <CheckCircle2 size={16} className="text-brand-mint group-hover/doc:scale-120 transition-transform" /> Income Proof (Salaried)
                  </strong>
                  <p className="text-xs text-slate-500 pl-6 group-hover/doc:text-slate-600 transition-colors">
                    Last 3 months salary slips, latest Form 16 (Part A & B), and last 6 months operative bank account statements showing salary credits.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-3 group/doc hover:bg-slate-50/80 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 cursor-default">
                  <strong className="text-sm font-extrabold text-slate-900 group-hover/doc:text-emerald-800 block mb-1 flex items-center gap-2 transition-colors">
                    <CheckCircle2 size={16} className="text-brand-mint group-hover/doc:scale-120 transition-transform" /> Income Proof (Self-Employed)
                  </strong>
                  <p className="text-xs text-slate-500 pl-6 group-hover/doc:text-slate-600 transition-colors">
                    Last 2-3 years audited ITR with computation of income, P&L statements, balance sheet, and 12-month business bank statements.
                  </p>
                </div>

                <div className="group/doc hover:bg-slate-50/80 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 cursor-default">
                  <strong className="text-sm font-extrabold text-slate-900 group-hover/doc:text-emerald-800 block mb-1 flex items-center gap-2 transition-colors">
                    <CheckCircle2 size={16} className="text-brand-mint group-hover/doc:scale-120 transition-transform" /> Property Documents
                  </strong>
                  <p className="text-xs text-slate-500 pl-6 group-hover/doc:text-slate-600 transition-colors">
                    Allotment letter or registered sale agreement, builder NOC, sanctioned building plan, and chain of prior title deeds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
