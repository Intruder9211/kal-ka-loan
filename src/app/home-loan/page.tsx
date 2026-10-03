import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, IndianRupee, Percent, Home, Clock, Building, ShieldCheck, ChevronRight } from "lucide-react";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";

export const metadata: Metadata = {
  title: "Home Loan - Interest Rates, Eligibility & Documents | Money Viora",
  description: "Get complete details about home loans in India. Check eligibility, view required documents, and apply online for the lowest interest rates.",
};

export default function HomeLoanPage() {
  return (
    <div className="flex-1 bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/40"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-sm font-bold mb-6">
              <Home size={16} /> Home Loan Products
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              Unlock the door to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-teal-200">dream home.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-medium">
              Compare India's top 50+ banks instantly. Get the absolute lowest interest rates, zero hidden charges, and sanction letters within 48 hours.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <Percent className="text-brand-mint mb-3" size={24} />
                <div className="font-black text-3xl mb-1">8.35%</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starting Rate</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <IndianRupee className="text-brand-mint mb-3" size={24} />
                <div className="font-black text-3xl mb-1">90%</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Max Funding</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hidden md:block">
                <Clock className="text-brand-mint mb-3" size={24} />
                <div className="font-black text-3xl mb-1">30 Yrs</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Max Tenure</div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative" id="apply">
            {/* Glow effect behind form */}
            <div className="absolute inset-0 bg-brand-mint/20 blur-[100px] rounded-full z-0"></div>
            <div className="relative z-10 animate-fade-up stagger-1">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Content Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Introduction */}
            <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <Building className="text-brand-mint" size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">What is a Home Loan?</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                A home loan is a secured financial product provided by banks and Housing Finance Companies (HFCs) to help you purchase a house, construct on a plot, or renovate an existing property. The property itself serves as collateral, which makes it one of the cheapest forms of borrowing available.
              </p>
            </section>

            {/* Eligibility Grid */}
            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="text-brand-mint" size={32} /> Minimum Eligibility
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-brand-mint/50 transition-colors">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Age Requirement</div>
                  <h3 className="font-extrabold text-xl text-slate-900 mb-2">21 to 65 years</h3>
                  <p className="text-sm text-slate-500 font-medium">Applicant age calculated at the time of loan maturity.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-brand-mint/50 transition-colors">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Income (Salaried)</div>
                  <h3 className="font-extrabold text-xl text-slate-900 mb-2">₹25,000+ / month</h3>
                  <p className="text-sm text-slate-500 font-medium">Net take-home salary. Self-employed requires ₹3L+ ITR.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-brand-mint/50 transition-colors">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Credit Score</div>
                  <h3 className="font-extrabold text-xl text-slate-900 mb-2">750 or above</h3>
                  <p className="text-sm text-slate-500 font-medium">Required to unlock the absolute lowest tier interest rates.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-brand-mint/50 transition-colors">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Work Experience</div>
                  <h3 className="font-extrabold text-xl text-slate-900 mb-2">2+ Years Total</h3>
                  <p className="text-sm text-slate-500 font-medium">Continuous employment or business vintage.</p>
                </div>
              </div>
            </section>

            {/* Documents section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                <FileText className="text-brand-mint" size={32} /> Required Documents
              </h2>
              
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <div className="p-8">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                      <ShieldCheck className="text-slate-600" size={24} />
                    </div>
                    <strong className="block text-slate-900 font-extrabold text-lg mb-3">KYC Documents</strong>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">PAN Card, Aadhaar Card, Passport, or Voter ID.</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                      <IndianRupee className="text-slate-600" size={24} />
                    </div>
                    <strong className="block text-slate-900 font-extrabold text-lg mb-3">Salaried Proof</strong>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">Last 3 months salary slips, Form 16, and last 6 months bank statements.</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                      <Building className="text-slate-600" size={24} />
                    </div>
                    <strong className="block text-slate-900 font-extrabold text-lg mb-3">Business Proof</strong>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">ITR for last 2 years, Profit & Loss statement, and Balance Sheet.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="md:hidden" id="apply-mobile">
              <MultiStepLeadForm />
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-24 shadow-xl">
              <div className="w-16 h-1 bg-brand-mint rounded-full mb-8"></div>
              <h3 className="font-extrabold text-2xl mb-8">Why apply through Money Viora?</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 size={24} className="text-brand-mint shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1">Compare 50+ Partners</strong>
                    <span className="text-sm text-slate-400">We scan the market to find you the absolute lowest rate.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 size={24} className="text-brand-mint shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1">Zero Convenience Fee</strong>
                    <span className="text-sm text-slate-400">Our advisory service is completely free for customers.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 size={24} className="text-brand-mint shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1">Expert Relationship Manager</strong>
                    <span className="text-sm text-slate-400">One point of contact from application to disbursement.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 size={24} className="text-brand-mint shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1">Doorstep Service</strong>
                    <span className="text-sm text-slate-400">We handle the bank visits and document collection.</span>
                  </div>
                </li>
              </ul>
              
              <Link href="/compare" className="w-full bg-white/10 hover:bg-brand-mint text-white hover:text-brand-deep transition-colors font-bold rounded-xl py-4 flex items-center justify-center gap-2 mt-10 group">
                Compare All Banks <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
