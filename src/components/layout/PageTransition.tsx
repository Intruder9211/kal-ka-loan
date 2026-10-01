"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    setIsVisible(true);
    setIsFadingOut(false);
    
    // Draw takes 1s. Start fading out at 1s.
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1000);
    
    // Unmount after fade out (1s + 200ms = 1200ms)
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-brand-light flex items-center justify-center pointer-events-none transition-opacity duration-200 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden="true"
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24">
        {/* Soft Glow */}
        <div className="absolute inset-0 bg-brand-mint rounded-full blur-xl opacity-20"></div>
        
        {/* Rupee SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--color-brand-mint)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-full h-full relative z-10 rupee-draw-svg"
        >
          <path d="M6 3h12" pathLength="100" />
          <path d="M6 8h12" pathLength="100" />
          <path d="M6 13h3" pathLength="100" />
          <path d="M9 13c6.667 0 6.667-10 0-10" pathLength="100" />
          <path d="M9 13l8.5 8" pathLength="100" />
        </svg>
      </div>
    </div>
  );
}
