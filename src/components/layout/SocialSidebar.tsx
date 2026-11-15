"use client";

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[8000] flex flex-col gap-2 sm:gap-2.5 items-end">
      
      {/* 1. YouTube Orb (Fintech Warm Copper / Coral instead of harsh red) */}
      <div 
        className="social-orb-wrapper" 
        style={{ "--orb-glow-color": "249, 115, 22" } as React.CSSProperties}
      >
        <span className="social-orb-label">YouTube</span>
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-orb-btn"
          aria-label="YouTube"
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0 -1.94 -2C18.88 4 12 4 12 4s-6.88 0 -8.6.46a2.78 2.78 0 0 0 -1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33a2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94 -2c.46 -1.71.46 -5.33.46 -5.33s0 -3.62 -.46 -5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
          </svg>
        </a>
      </div>
      
      {/* 2. Instagram Orb */}
      <div 
        className="social-orb-wrapper" 
        style={{ "--orb-glow-color": "225, 48, 108" } as React.CSSProperties}
      >
        <span className="social-orb-label">Instagram</span>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-orb-btn"
          aria-label="Instagram"
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
      </div>
      
      {/* 3. X (Twitter) Orb */}
      <div 
        className="social-orb-wrapper" 
        style={{ "--orb-glow-color": "180, 205, 230" } as React.CSSProperties}
      >
        <span className="social-orb-label">Twitter / X</span>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-orb-btn"
          aria-label="X (Twitter)"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        </a>
      </div>
    </div>
  );
}
