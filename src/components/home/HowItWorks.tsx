import { MousePointerClick, GitCompareArrows, FileText, CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: MousePointerClick, title: "Apply Online", desc: "Fill out a secure 2-minute form to check your initial eligibility instantly." },
    { icon: GitCompareArrows, title: "Compare Offers", desc: "Our platform matches you with the lowest rates from 30+ partner banks." },
    { icon: FileText, title: "Submit Documents", desc: "Upload your KYC and income documents directly through our secure portal." },
    { icon: CheckCircle, title: "Get Sanctioned", desc: "Receive your final sanction letter and get the loan disbursed in 48 hours." },
  ];

  return (
    <section className="py-24 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-mint/50 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Your Journey to a <span className="text-brand-mint">Home Loan</span></h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">We've eliminated the endless bank visits. Getting a home loan is now a simple 4-step digital process.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-brand-mint/30 to-transparent -z-10"></div>
          
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            
            return (
              <div key={i} className={`relative text-center animate-fade-up group`} style={{animationDelay: `${i*150}ms`}}>
                {/* Arrow for mobile (except last) */}
                {!isLast && (
                  <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-brand-mint/30">
                    <ArrowRight size={24} className="rotate-90" />
                  </div>
                )}

                <div className="w-20 h-20 bg-brand-deep border-2 border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-8 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand-mint group-hover:text-brand-mint group-hover:shadow-[0_10px_40px_rgba(7,153,116,0.2)] bg-opacity-50 backdrop-blur-sm z-10">
                  <step.icon size={32} className="transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 text-white font-bold rounded-lg flex items-center justify-center border-2 border-brand-deep transition-all duration-300 group-hover:bg-brand-mint group-hover:text-brand-deep">
                    {i + 1}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 transition-colors text-white group-hover:text-brand-mint">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-[250px] mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
