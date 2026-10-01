import Link from "next/link";
import { Home, ArrowRightLeft, HandCoins, Building, Landmark, ChevronRight } from "lucide-react";

export default function LoanTypes() {
  const types = [
    { name: "Home Loan", href: "/home-loan", icon: Home, desc: "For purchasing a new house or apartment." },
    { name: "Balance Transfer", href: "/variants/balance-transfer", icon: ArrowRightLeft, desc: "Shift existing loan for lower rates." },
    { name: "Top-Up Loan", href: "/variants/top-up", icon: HandCoins, desc: "Extra funds on existing home loan." },
    { name: "Plot/Construction", href: "/variants/plot", icon: Building, desc: "For buying plot and building home." },
    { name: "Loan Against Property", href: "/variants/lap", icon: Landmark, desc: "Use property to get funds." },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Loan Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Whatever your real estate need, we have a specialized loan product for it.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {types.map((type, i) => (
            <Link key={i} href={type.href} className="card-interactive bg-white p-6 rounded-2xl flex flex-col items-center text-center animate-fade-up group" style={{animationDelay: `${i*100}ms`}}>
              <div className="card-icon w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-brand-mint mb-4">
                <type.icon size={24} />
              </div>
              <h3 className="font-bold text-brand-deep mb-2">{type.name}</h3>
              <p className="text-xs text-gray-500 mb-4 flex-1">{type.desc}</p>
              <div className="text-brand-mint text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Know More <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
