import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LenderCard from "@/components/ui/LenderCard";
import lendersData from "@/data/lenders.json";

export default function PartnerBanksSection() {
  const topLenders = lendersData.slice(0, 3); // Show top 3

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-fade-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-2">Our Partner Banks & NBFCs</h2>
            <p className="text-gray-600">Compare rates from India's most trusted institutions.</p>
          </div>
          <Link href="/compare" className="hidden md:inline-flex items-center gap-2 text-brand-mint font-bold hover:text-brand-deep transition-colors">
            View All Partners <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="space-y-4">
          {topLenders.map((lender, i) => (
            <div key={lender.id} className="animate-fade-up" style={{animationDelay: `${i*150}ms`}}>
              <LenderCard lender={lender} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/compare" className="inline-flex items-center gap-2 text-brand-mint font-bold">
            View All Partners <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
