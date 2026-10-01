import Link from "next/link";
import { MapPin } from "lucide-react";

export default function PopularCities() {
  const cities = ["Delhi NCR", "Gurgaon", "Noida", "Ghaziabad", "Faridabad", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-2 text-brand-deep font-bold mb-6">
          <MapPin className="text-brand-mint" /> 
          <h3>Serving Homebuyers Across India</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {cities.map((city, i) => (
            <Link 
              key={i} 
              href={`#apply`} 
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-600 hover:bg-brand-light hover:text-brand-deep hover:border-brand-mint/50 transition-colors"
            >
              Home Loan in {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
