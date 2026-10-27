"use client";
 
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Building, MapPin, ShieldCheck, CheckCircle2, ChevronRight, Award, IndianRupee } from "lucide-react";

interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  location: string;
  type: string;
  priceRange: string;
  reraNumber: string;
  status: string;
  approvedBanks: string[];
  highlights: string[];
}

export default function PreApprovedProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedBank, setSelectedBank] = useState("All");

  // Fetch latest dynamic projects from admin backend on mount
  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch((err) => console.error("Error fetching live verified projects:", err));
  }, []);

  const cities = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.city)));
    return ["All", ...list];
  }, [projects]);

  const banks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.approvedBanks.forEach((b) => set.add(b)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.reraNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = selectedCity === "All" || project.city === selectedCity;
      const matchesBank = selectedBank === "All" || project.approvedBanks.includes(selectedBank);

      return matchesSearch && matchesCity && matchesBank;
    });
  }, [projects, searchTerm, selectedCity, selectedBank]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-bold tracking-wide uppercase mb-4">
            <ShieldCheck size={16} /> Pre-Approved Builder Projects
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find Bank-Verified <span className="text-brand-mint">Properties</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Homes with pre-verified legal titles, RERA registrations, and ready approval from India's leading banks for fast 24-48 hour loan sanction.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by project name, developer, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
              />
            </div>

            {/* City Filter */}
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

            {/* Bank Filter */}
            <div>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:bg-white transition-all"
              >
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank === "All" ? "All Partner Banks" : bank}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500 font-medium px-1">
          <span>Showing {filteredProjects.length} pre-approved projects</span>
          {(searchTerm || selectedCity !== "All" || selectedBank !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All");
                setSelectedBank("All");
              }}
              className="text-brand-mint hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Project Card Header */}
              <div className="p-6 border-b border-slate-100 flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {project.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    RERA: {project.reraNumber.length > 15 ? `${project.reraNumber.slice(0, 15)}...` : project.reraNumber}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-mint transition-colors mt-1">
                  {project.name}
                </h3>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building size={14} className="text-slate-400" /> By {project.developer}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-3">
                  <MapPin size={14} className="text-brand-mint shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400">Configurations</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{project.type}</p>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400">Price Guide</span>
                    <p className="text-xs font-bold text-brand-deep mt-0.5">{project.priceRange}</p>
                  </div>
                </div>

                {/* Approved Banks Chips */}
                <div className="mt-4">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
                    Pre-Approved by Banks:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.approvedBanks.map((bank) => (
                      <span
                        key={bank}
                        className="text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 size={13} className="text-brand-mint shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href={`/compare?loanType=Home+Loan&city=${encodeURIComponent(project.city)}`}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-brand-deep hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  Check Loan Offers <ChevronRight size={14} />
                </Link>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("open-lead-modal"));
                    }
                  }}
                  className="py-2.5 px-4 rounded-xl border border-brand-mint/50 text-brand-deep hover:bg-brand-mint/10 font-bold text-xs transition-colors"
                >
                  Apply Here
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Building size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No matching projects found</h3>
            <p className="text-sm text-slate-500 mb-6">Try broadening your search query or city selection.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All");
                setSelectedBank("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-mint text-brand-deep font-bold text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
