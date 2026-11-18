"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight, Globe2 } from "lucide-react";

interface CityItem {
  name: string;
  region: "north" | "west" | "south" | "east";
  state: string;
}

const CITIES: CityItem[] = [
  { name: "Delhi", region: "north", state: "NCR" },
  { name: "Gurugram", region: "north", state: "Haryana" },
  { name: "Noida", region: "north", state: "Uttar Pradesh" },
  { name: "Mumbai", region: "west", state: "Maharashtra" },
  { name: "Pune", region: "west", state: "Maharashtra" },
  { name: "Bengaluru", region: "south", state: "Karnataka" },
  { name: "Hyderabad", region: "south", state: "Telangana" },
  { name: "Chennai", region: "south", state: "Tamil Nadu" },
  { name: "Ahmedabad", region: "west", state: "Gujarat" },
  { name: "Kolkata", region: "east", state: "West Bengal" },
  { name: "Ghaziabad", region: "north", state: "Uttar Pradesh" },
  { name: "Faridabad", region: "north", state: "Haryana" },
];

export default function PopularCities() {
  const [activeRegion, setActiveRegion] = useState<"all" | "north" | "west" | "south" | "east">("all");

  const filteredCities = activeRegion === "all" 
    ? CITIES 
    : CITIES.filter(c => c.region === activeRegion);

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-[#07130f] to-[#0a1813] text-white relative overflow-hidden border-b border-emerald-950/40">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-brand-mint/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-brand-mint text-[11px] font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <Globe2 size={12} />
              <span>Pan-India Presence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Serving Home Buyers <span className="text-brand-mint">Across India</span>
            </h2>
          </div>

          {/* Minimal Region Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {[
              { id: "all", label: "All" },
              { id: "north", label: "North" },
              { id: "west", label: "West" },
              { id: "south", label: "South" },
              { id: "east", label: "East" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRegion(tab.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeRegion === tab.id
                    ? "bg-brand-mint text-slate-950 font-bold shadow-[0_0_10px_rgba(117,232,122,0.3)]"
                    : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Futuristic City Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {filteredCities.map((city) => (
            <Link
              key={city.name}
              href="/affordability"
              className="group p-2.5 sm:p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-emerald-500/30 transition-all duration-200 flex items-center justify-between hover:shadow-[0_0_12px_rgba(117,232,122,0.15)] hover:-translate-y-0.5"
            >
              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-brand-mint shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-white group-hover:text-brand-mint transition-colors truncate">
                    {city.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate pl-3.5 mt-0.5">
                  {city.state}
                </span>
              </div>
              <ArrowUpRight size={12} className="text-slate-500 group-hover:text-brand-mint shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
