import { MousePointerClick, GitCompareArrows, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: MousePointerClick, title: "1. Apply Online", desc: "Fill a simple 2-minute form to check your eligibility instantly." },
    { icon: GitCompareArrows, title: "2. Compare Offers", desc: "View tailored offers from 50+ banks & NBFCs in one place." },
    { icon: FileText, title: "3. Submit Documents", desc: "Upload docs online or request a free doorstep pickup." },
    { icon: CheckCircle, title: "4. Get Sanctioned", desc: "Loan approved in 48 hours and amount disbursed directly." },
  ];

  return (
    <section className="py-20 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Your dream home is just 4 simple steps away.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10"></div>
          
          {steps.map((step, i) => (
            <div key={i} className={`text-center animate-fade-up stagger-${i+1} group`}>
              <div className="w-20 h-20 bg-brand-deep border-2 border-brand-mint/30 rounded-full flex items-center justify-center mx-auto text-brand-mint mb-6 shadow-[0_0_20px_rgba(111,219,116,0.1)] relative transition-all duration-300 group-hover:scale-110 group-hover:border-brand-mint group-hover:shadow-[0_0_30px_rgba(111,219,116,0.3)]">
                <step.icon size={32} className="transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-mint text-brand-deep font-bold rounded-full flex items-center justify-center border-4 border-brand-deep transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-3 transition-colors group-hover:text-brand-mint">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
