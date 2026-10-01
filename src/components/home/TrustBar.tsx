import { Users, Banknote, Building2 } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="pt-4 md:pt-0 animate-fade-up stagger-1">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-3">
              <Users size={24} />
            </div>
            <div className="text-3xl font-extrabold text-brand-deep mb-1">10,000+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Happy Customers</div>
          </div>
          <div className="pt-4 md:pt-0 animate-fade-up stagger-2">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-3">
              <Banknote size={24} />
            </div>
            <div className="text-3xl font-extrabold text-brand-deep mb-1">₹500 Cr+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Loans Disbursed</div>
          </div>
          <div className="pt-4 md:pt-0 animate-fade-up stagger-3">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-mint mb-3">
              <Building2 size={24} />
            </div>
            <div className="text-3xl font-extrabold text-brand-deep mb-1">50+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Partner Banks & NBFCs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
