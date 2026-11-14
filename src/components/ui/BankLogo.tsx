"use client";

import Image from "next/image";
import { useState } from "react";
import { Building2 } from "lucide-react";

interface BankLogoProps {
  name: string;
  logoUrl?: string;
  className?: string;
  size?: number;
}

export default function BankLogo({ name, logoUrl, className = "w-12 h-12", size = 48 }: BankLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Auto-detect bank logo from name if logoUrl is not explicitly given
  const getAutoLogoPath = (bankName: string) => {
    const n = bankName.toLowerCase();
    if (n.includes("bajaj")) return "/images/banks/bajaj.svg";
    if (n.includes("karnataka")) return "/images/banks/karnataka.svg";
    if (n.includes("federal")) return "/images/banks/federal.svg";
    if (n.includes("hdfc")) return "/images/banks/hdfc.svg";
    if (n.includes("axis")) return "/images/banks/axis.svg";
    if (n.includes("kotak")) return "/images/banks/kotak.svg";
    if (n.includes("icici")) return "/images/banks/icici.svg";
    if (n.includes("idfc")) return "/images/banks/idfc.svg";
    return null;
  };

  const imageSrc = (logoUrl && (logoUrl.startsWith("/") || logoUrl.startsWith("http")))
    ? logoUrl 
    : getAutoLogoPath(name);

  if (imageSrc && !hasError) {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden bg-white shadow-xs border border-slate-200/80 p-1 flex items-center justify-center ${className}`}>
        <Image 
          src={imageSrc} 
          alt={`${name} Logo`}
          width={size} 
          height={size} 
          className="object-contain w-full h-full rounded-lg"
          onError={() => setHasError(true)}
          unoptimized
        />
      </div>
    );
  }

  // Elegant initial fallback with consistent bank-colored badge
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`shrink-0 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center shadow-xs border border-slate-700 ${className}`}>
      <span className="text-xs tracking-wider">{initials || "BK"}</span>
    </div>
  );
}

