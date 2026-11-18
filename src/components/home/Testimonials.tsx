"use client";

import { Quote, BadgeCheck, Star, Sparkles } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { 
      id: 1, 
      name: "Rohit & Megha Sharma", 
      context: "Home Loan Sanctioned • ₹75 Lakhs (HDFC Bank)", 
      text: "We were struggling with rate negotiations across banks until we used Money Viora. Within 48 hours, they matched us with the lowest ROI available and handled every document verification seamlessly.",
      rating: 5,
      city: "Gurugram, Haryana",
      initial: "R"
    },
    { 
      id: 2, 
      name: "Vikram Malhotra", 
      context: "Balance Transfer • Saved ₹4.2 Lakhs in Interest", 
      text: "Transferred my existing home loan from 9.15% down to 7.45%. The entire sanction and title check process was digital and transparent, with zero hidden processing charges.",
      rating: 5,
      city: "Powai, Mumbai",
      initial: "V"
    },
    { 
      id: 3, 
      name: "Ananya Deshmukh", 
      context: "Self-Employed Home Loan • ₹1.2 Cr", 
      text: "As a business owner, traditional banks took weeks asking for repeated ITR proofs. Money Viora's loan specialist structured my financials properly and got my approval in under 4 days.",
      rating: 5,
      city: "Indiranagar, Bangalore",
      initial: "A"
    },
    { 
      id: 4, 
      name: "Priya & Karthik Iyer", 
      context: "Plot & Construction • ₹90 Lakhs (SBI)", 
      text: "Getting construction stage disbursements is usually tedious, but Money Viora coordinated bank architect inspections and released tranches right on schedule.",
      rating: 5,
      city: "OMR, Chennai",
      initial: "P"
    },
    { 
      id: 5, 
      name: "Rajesh Kulkarni", 
      context: "Pre-Approved Home Loan • ₹60 Lakhs", 
      text: "Having a pre-approved sanction letter in hand gave me huge bargaining power with property builders in Pune. Closed my dream flat at a ₹3 Lakh discount!",
      rating: 5,
      city: "Baner, Pune",
      initial: "R"
    },
    { 
      id: 6, 
      name: "Siddharth Verma", 
      context: "Top-Up Home Loan • ₹25 Lakhs (Quick Disbursal)", 
      text: "Needed quick liquidity for home renovation. Money Viora processed the top-up at my existing home loan rate of 7.40% with zero valuation delays.",
      rating: 5,
      city: "Sector 62, Noida",
      initial: "S"
    },
  ];

  // Duplicate reviews array for infinite seamless looping
  const marqueeList = [...reviews, ...reviews];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-slate-50 via-stone-50/50 to-slate-50 relative overflow-hidden border-b border-stone-200/60">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-stone-200/30 pointer-events-none">
        <Quote size={380} strokeWidth={1} />
      </div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-mint/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 mb-12">
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-ping" />
            <BadgeCheck size={14} className="text-brand-mint" /> 
            <span>Real Borrowers, Real Savings</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Customer <span className="text-brand-mint drop-shadow-xs">Stories</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Discover why thousands of home buyers trust Money Viora for clear rates, zero surprises, and lightning-fast sanctions.
          </p>
        </div>
      </div>

      {/* 
        Continuous Left-to-Right Seamless Scrolling Marquee Container:
        Includes edge blur gradients and pause-on-hover
      */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track moving from LEFT TO RIGHT continuously */}
        <div className="flex gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] py-4 cursor-grab active:cursor-grabbing">
          {marqueeList.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[310px] sm:w-[380px] bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200/80 hover:border-emerald-500/40 relative flex flex-col justify-between shrink-0 hover:-translate-y-1 group/card"
            >
              <div>
                {/* Rating & Quote Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-brand-mint/40 group-hover/card:text-brand-mint transition-colors" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-tr from-brand-deep to-[#143228] text-brand-mint font-bold rounded-full flex items-center justify-center shrink-0 text-sm shadow-sm border border-emerald-500/20">
                  {review.initial}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 truncate">
                    <span>{review.name}</span>
                    <BadgeCheck size={14} className="text-brand-mint shrink-0" />
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold truncate mt-0.5">
                    {review.context}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {review.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Left-to-Right CSS Animation */}
      <style jsx global>{`
        @keyframes marqueeLtr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-ltr {
          animation: marqueeLtr 42s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
