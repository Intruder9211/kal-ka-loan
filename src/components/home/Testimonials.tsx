import { Quote, User, BadgeCheck, Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { 
      id: 1, 
      name: "Rohit & Megha Sharma", 
      context: "Home Loan Sanctioned • ₹75 Lakhs (HDFC Bank)", 
      text: "We were struggling with rate negotiations across banks until we used Money Viora. Within 48 hours, they matched us with the lowest ROI available and handled every document verification seamlessly.",
      rating: 5,
      city: "Gurugram, Haryana"
    },
    { 
      id: 2, 
      name: "Vikram Malhotra", 
      context: "Balance Transfer • Saved ₹4.2 Lakhs in Interest", 
      text: "Transferred my existing home loan from 9.15% down to 7.45%. The entire sanction and title check process was digital and transparent, with zero hidden processing charges.",
      rating: 5,
      city: "Powai, Mumbai"
    },
    { 
      id: 3, 
      name: "Ananya Deshmukh", 
      context: "Self-Employed Home Loan • ₹1.2 Cr", 
      text: "As a business owner, traditional banks took weeks asking for repeated ITR proofs. Money Viora's loan specialist structured my financials properly and got my approval in under 4 days.",
      rating: 5,
      city: "Indiranagar, Bangalore"
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-slate-200/40 pointer-events-none">
        <Quote size={400} strokeWidth={1} />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-14 md:mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-deep text-xs font-semibold mb-3">
            <BadgeCheck size={14} className="text-brand-mint" /> Real Borrowers, Real Savings
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Customer <span className="text-brand-mint">Stories</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Discover why thousands of home buyers trust Money Viora for clear rates, zero surprises, and lightning-fast sanctions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <div 
              key={review.id} 
              className="bg-white p-7 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 relative flex flex-col h-full animate-fade-up group" 
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote size={28} className="text-brand-mint/30 group-hover:text-brand-mint/60 transition-colors" />
              </div>
              
              <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1 font-normal">
                &ldquo;{review.text}&rdquo;
              </p>
              
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                <div className="w-11 h-11 bg-brand-mint/15 text-brand-deep font-bold rounded-full flex items-center justify-center shrink-0 text-sm shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 truncate">
                    <span>{review.name}</span>
                    <BadgeCheck size={15} className="text-brand-mint shrink-0" />
                  </div>
                  <div className="text-xs text-brand-deep/80 font-medium truncate mt-0.5">{review.context}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{review.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
