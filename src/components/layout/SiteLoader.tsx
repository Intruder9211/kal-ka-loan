"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

export default function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false); // default false so server renders it, preventing page flash

  useEffect(() => {
    try {
      const played = sessionStorage.getItem("moneyviora_initial_loader");
      if (played === "true") {
        setHasPlayed(true);
        setIsVisible(false);
        return;
      }
      setHasPlayed(false);
    } catch (e) {
      // Ignore sessionStorage errors
      setIsVisible(false);
      return;
    }

    // Start progress simulation since true load progress is hard to track perfectly in Next.js App Router client side
    let currentProgress = 0;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // If document is fully loaded, accelerate progress
      if (document.readyState === "complete" && elapsed > 600) {
        currentProgress += 10;
      } else {
        // Slow trickle
        currentProgress += Math.random() * 5;
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Finish sequence
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
            try {
              sessionStorage.setItem("moneyviora_initial_loader", "true");
              // Dispatch event so PageTransition knows initial load is done
              window.dispatchEvent(new Event("initial_load_complete"));
            } catch (e) {}
          }, 300);
        }, 150);
      }
      
      setProgress(Math.min(currentProgress, 100));
    }, 50);

    // Failsafe 8s
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setIsFadingOut(true);
      setTimeout(() => setIsVisible(false), 300);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, []);

  if (!isVisible && hasPlayed) return null;

  return (
    <>
      <Script
        id="skip-loader-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (sessionStorage.getItem('moneyviora_initial_loader') === 'true') {
              document.documentElement.classList.add('skip-loader');
            }
          `,
        }}
      />
      <div 
        id="moneyviora-site-loader"
        className={`fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
        <div className="relative w-[200px] h-[50px] md:w-[280px] md:h-[70px] overflow-hidden">
        {/* Faded background version of the logo */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/logo.png" 
            alt="" 
            fill 
            className="object-contain object-center"
            priority
          />
        </div>
        
        {/* Reveal version of the logo acting as the "write-on" */}
        <div 
          className="absolute inset-0 transition-all duration-75 ease-out"
          style={{ clipPath: 'inset(0 ' + (100 - progress) + '% 0 0)' }}
        >
          <Image 
            src="/logo.png" 
            alt="Money Viora Logo" 
            fill 
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
      
      {/* Percentage text */}
      <div className="mt-4 text-brand-mint/60 font-mono text-sm tabular-nums tracking-widest">
        {Math.floor(progress)}%
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div[style*="clipPath"] {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </div>
    </>
  );
}
