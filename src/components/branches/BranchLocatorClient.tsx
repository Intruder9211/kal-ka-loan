"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Phone, Mail, Clock, Building2, Navigation, CheckCircle } from "lucide-react";

interface Branch {
  id: string;
  city: string;
  state: string;
  area: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  timing: string;
}

export default function BranchLocatorClient({ initialBranches }: { initialBranches: Branch[] }) {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  // Fetch dynamic changes live from admin on mount
  useEffect(() => {
    fetch("/api/admin/branches")
      .then((res) => res.json())
      .then((data) => {
        if (data.branches && Array.isArray(data.branches) && data.branches.length > 0) {
          setBranches(data.branches);
        }
      })
      .catch((err) => console.error("Error fetching live branches:", err));
  }, []);

  const cities = useMemo(() => {
    const list = Array.from(new Set(branches.map((b) => b.city)));
    return ["All", ...list];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        b.city.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.pincode.includes(q) ||
        b.address.toLowerCase().includes(q);

      const matchesCity = selectedCity === "All" || b.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [branches, searchQuery, selectedCity]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-bold tracking-wide uppercase mb-4">
            <Building2 size={16} /> Pan-India Branches & Service Hubs
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find Your Nearest <span className="text-brand-mint">Branch</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Visit our physical experience centers or request a doorstep loan manager in your locality for personalized home loan sanction.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by city, locality, or 6-digit PIN code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
              />
            </div>
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All" ? "All Cities" : city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500 font-medium px-1 max-w-6xl mx-auto">
          <span>Showing {filteredBranches.length} branch locations</span>
          {(searchQuery || selectedCity !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("All");
              }}
              className="text-brand-mint hover:underline font-semibold"
            >
              Reset Search
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-brand-mint/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {branch.city}
                  </span>
                  <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    PIN {branch.pincode}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-mint transition-colors">
                  {branch.area} Branch
                </h3>
                
                <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5 leading-relaxed">
                  <MapPin size={15} className="text-brand-mint shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span>{branch.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400 shrink-0" />
                    <span>{branch.timing}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation size={13} /> Get Directions
                </a>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("open-lead-modal"));
                    }
                  }}
                  className="py-2 px-3 bg-brand-mint text-brand-deep hover:bg-brand-mint/90 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Book Visit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto">
            <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No branches found in this area</h3>
            <p className="text-sm text-slate-500 mb-6">
              Don't worry! We offer 100% doorstep loan consultation and digital home loan disbursals across India.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-lead-modal"));
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-mint text-brand-deep font-bold text-sm"
            >
              Request Doorstep Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
