import { Percent, FastForward, EyeOff, HeadphonesIcon, FileCheck, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: Percent, title: "Lowest Interest Rates", desc: "Compare 50+ lenders to find the cheapest rate starting at 8.35%." },
  { icon: FastForward, title: "Fast Sanction", desc: "Get your loan sanctioned in as little as 48 hours." },
  { icon: EyeOff, title: "Zero Hidden Charges", desc: "We charge 0 upfront fees. Complete transparency." },
  { icon: HeadphonesIcon, title: "Expert Support", desc: "Dedicated relationship manager for end-to-end guidance." },
  { icon: FileCheck, title: "Minimal Documentation", desc: "Digital paperless process with doorstep document collection." },
  { icon: ShieldCheck, title: "100% Secure", desc: "Your data is bank-grade encrypted and never shared without consent." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Why Choose Money Viora?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We make the complex home loan process simple, fast, and completely transparent.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className={`card-interactive bg-brand-light p-6 rounded-2xl animate-fade-up stagger-${(i%4)+1}`}>
              <div className="card-icon w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-mint mb-4 shadow-sm">
                <benefit.icon size={24} />
              </div>
              <h3 className="font-bold text-lg text-brand-deep mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
