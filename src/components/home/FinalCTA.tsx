import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-up">
          Ready to unlock your <span className="text-brand-mint">dream home?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-up stagger-1">
          Aaj apply karo, kal paisa. Check your eligibility in 2 minutes and get offers from 50+ lenders.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-2">
          <Link 
            href="#apply" 
            className="btn-interactive inline-block bg-brand-mint text-brand-deep font-bold px-8 py-4 rounded-full text-lg hover:bg-white"
          >
            Check Eligibility Now
          </Link>
          <div className="flex gap-4 justify-center">
            <a 
              href="tel:+917503388930"
              className="btn-interactive w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 border border-white/20"
            >
              <Phone size={24} />
            </a>
            <a 
              href="https://wa.me/917503388930"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-[#25D366] hover:bg-white/20 border border-white/20"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
