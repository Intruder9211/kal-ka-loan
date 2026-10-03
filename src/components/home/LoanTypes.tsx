import Link from "next/link";
import { Home, ArrowRightLeft, HandCoins, Building, Landmark, ChevronRight, CheckCircle2 } from "lucide-react";

export default function LoanTypes() {
  const types = [
    { 
      name: "Fresh Home Loan", 
      href: "/home-loan", 
      icon: Home, 
      desc: "Finance your dream home with the lowest rates in the market.",
      rate: "Starts at 8.35%",
      tenure: "Up to 30 Yrs",
      benefits: ["Zero pre-closure charges", "Quick digital sanction"],
      popular: true
    },
    { 
      name: "Balance Transfer", 
      href: "/variants/balance-transfer", 
      icon: ArrowRightLeft, 
      desc: "Switch your existing expensive home loan to us and save lakhs.",
      rate: "Starts at 8.30%",
      tenure: "Up to 25 Yrs",
      benefits: ["Lower your current EMI", "Minimal documentation"],
      popular: false
    },
    { 
      name: "Top-Up Loan", 
      href: "/variants/top-up", 
      icon: HandCoins, 
      desc: "Need extra cash? Get funds instantly over your existing home loan.",
      rate: "Starts at 8.50%",
      tenure: "Same as existing",
      benefits: ["Use for personal needs", "No end-use restriction"],
      popular: false
    },
    { 
      name: "Plot & Construction", 
      href: "/variants/plot", 
      icon: Building, 
      desc: "Buy a plot and build your custom home with a composite loan.",
      rate: "Starts at 8.45%",
      tenure: "Up to 20 Yrs",
      benefits: ["Fund plot + construction", "Staged disbursements"],
      popular: false
    },
    { 
      name: "Loan Against Property", 
      href: "/variants/lap", 
      icon: Landmark, 
      desc: "Unlock the value of your commercial or residential property.",
      rate: "Starts at 9.50%",
      tenure: "Up to 15 Yrs",
      benefits: ["High loan amounts", "For business or personal"],
      popular: false
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Choose your perfect <span className="text-brand-mint">loan.</span></h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Whatever your real estate goal, we have a specialized product with transparent pricing.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {types.map((type, i) => (
            <div key={i} className={`group relative bg-white border ${type.popular ? 'border-brand-mint shadow-[0_8px_30px_rgb(7,153,116,0.12)]' : 'border-slate-200 shadow-sm'} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 animate-fade-up flex flex-col`} style={{animationDelay: `${i*100}ms`}}>
              
              {type.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-deep text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  MOST POPULAR
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${type.popular ? 'bg-brand-mint/20 text-brand-mint' : 'bg-slate-50 text-slate-500'}`}>
                  <type.icon size={28} />
                </div>
                <h3 className="font-bold text-xl text-slate-900">{type.name}</h3>
              </div>
              
              <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{type.desc}</p>
              
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Interest Rate</p>
                  <p className="text-sm font-bold text-slate-800">{type.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Max Tenure</p>
                  <p className="text-sm font-bold text-slate-800">{type.tenure}</p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-2 mb-8">
                {type.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-brand-mint shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Action */}
              <Link 
                href={type.href} 
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-colors ${type.popular ? 'bg-brand-mint text-brand-deep hover:bg-opacity-90' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
              >
                Explore Loan <ChevronRight size={18} className={type.popular ? "icon-slide" : "group-hover:translate-x-1 transition-transform"} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
