import { Users, Banknote, Building2 } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="bg-white py-6 md:py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Horizontal flex on mobile, 3-column grid on md+ */}
        <div className="flex flex-row md:grid md:grid-cols-3 items-center justify-between gap-2 sm:gap-4 md:gap-8 text-center divide-x divide-gray-100">
          
          {/* Stat 1 */}
          <div className="flex-1 px-1 sm:px-2 md:px-0 animate-fade-up stagger-1 group cursor-default">
            <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-1.5 sm:mb-2 md:mb-3 group-hover:scale-110 group-hover:bg-brand-mint/10 transition-transform duration-300">
              <Users size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-base sm:text-xl md:text-3xl font-extrabold text-brand-deep mb-0.5 group-hover:text-brand-mint transition-colors duration-300">
              10,000+
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-tight md:tracking-wide leading-tight">
              Happy Customers
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex-1 px-1 sm:px-2 md:px-0 animate-fade-up stagger-2 group cursor-default">
            <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-1.5 sm:mb-2 md:mb-3 group-hover:scale-110 group-hover:bg-brand-mint/10 transition-transform duration-300">
              <Banknote size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-base sm:text-xl md:text-3xl font-extrabold text-brand-deep mb-0.5 group-hover:text-brand-mint transition-colors duration-300">
              ₹500 Cr+
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-tight md:tracking-wide leading-tight">
              Loans Disbursed
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex-1 px-1 sm:px-2 md:px-0 animate-fade-up stagger-3 group cursor-default">
            <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-1.5 sm:mb-2 md:mb-3 group-hover:scale-110 group-hover:bg-brand-mint/10 transition-transform duration-300">
              <Building2 size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-base sm:text-xl md:text-3xl font-extrabold text-brand-deep mb-0.5 group-hover:text-brand-mint transition-colors duration-300">
              50+
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-tight md:tracking-wide leading-tight">
              Banks & NBFCs
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
